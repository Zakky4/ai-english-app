<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Thread;
use App\Http\Services\ApiService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function store(Request $request, int $threadId)
    {
        // 音声ファイルの保存
        if ($request->hasFile('audio')) {   
            $audioFile = $request->file('audio');
            // ファイル名に日時を指定して保存
            $audioFileName = now()->format('YmdHis') . '.' . $audioFile->getClientOriginalExtension();
            $audioFilePath = $audioFile->storeAs('audio', $audioFileName, 'public');
            
            // ファイルの権限を設定（読み取り可能にする）
            $fullPath = storage_path('app/public/' . $audioFilePath);
            chmod($fullPath, 0644);
            
            // シンボリックリンク先のファイル権限も設定
            $publicPath = public_path('storage/' . $audioFilePath);
            if (file_exists($publicPath)) {
                chmod($publicPath, 0644);
            }
            
            // 音声ファイルを保存したパスをデータベースに保存
            $message = Message::create([
                'thread_id' => $threadId,
                'message_en' => 'dummy',
                'message_ja' => '',
                'sender' => 1,
                'audio_file_path' => $audioFilePath
            ]);

            // 音声データをWhisper APIに送信
            $apiService = new ApiService();
            $whisperResult = $apiService->callWhisperApi($fullPath);
            
            if ($whisperResult['success']) {
                // 音声認識が成功した場合、メッセージを更新
                $message->update([
                    'message_en' => $whisperResult['text']
                ]);
                
                // GPT APIを呼び出してレスポンスを取得
                $gptResponse = $this->getGptResponse($threadId);
                
                if ($gptResponse['success']) {
                    return response()->json([
                        'message' => '音声ファイルが正常に保存され、音声認識とGPT応答が完了しました',
                        'file_path' => $audioFilePath,
                        'message_id' => $message->id,
                        'transcribed_text' => $whisperResult['text'],
                        'gpt_response' => $gptResponse['content'],
                        'ai_message_id' => $gptResponse['ai_message_id']
                    ], 200);
                } else {
                    return response()->json([
                        'message' => '音声認識は完了しましたが、GPT応答の取得に失敗しました',
                        'file_path' => $audioFilePath,
                        'message_id' => $message->id,
                        'transcribed_text' => $whisperResult['text'],
                        'gpt_error' => $gptResponse['error']
                    ], 200);
                }
            } else {
                // 音声認識が失敗した場合
                return response()->json([
                    'message' => '音声ファイルは保存されましたが、音声認識に失敗しました',
                    'file_path' => $audioFilePath,
                    'message_id' => $message->id,
                    'error' => $whisperResult['error']
                ], 200);
            }
        }
        
        return response()->json([
            'error' => '音声ファイルが見つかりません'
        ], 400);
    }

    /**
     * GPT APIを呼び出してレスポンスを取得し、データベースに保存
     * @param int $threadId
     * @return array
     */
    private function getGptResponse(int $threadId)
    {
        try {
            // スレッドの存在確認
            $thread = Thread::findOrFail($threadId);
            
            // スレッドのメッセージを取得（最新のものから）
            $messages = $thread->messages()
                ->orderBy('created_at', 'asc')
                ->get();
            
            if ($messages->isEmpty()) {
                return [
                    'success' => false,
                    'error' => 'メッセージが見つかりません'
                ];
            }
            
            // GPT APIを呼び出し
            $apiService = new ApiService();
            $gptResult = $apiService->callGptApi($messages);
            
            if ($gptResult['success']) {
                // GPTのレスポンスをデータベースに保存
                $aiMessage = Message::create([
                    'thread_id' => $threadId,
                    'message_en' => $gptResult['content'],
                    'message_ja' => '', // 必要に応じて翻訳機能を追加
                    'sender' => 2, // AIメッセージ
                    'audio_file_path' => null
                ]);
                
                return [
                    'success' => true,
                    'content' => $gptResult['content'],
                    'ai_message_id' => $aiMessage->id,
                    'usage' => $gptResult['usage'] ?? null
                ];
            } else {
                return [
                    'success' => false,
                    'error' => $gptResult['error']
                ];
            }
            
        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => 'GPT応答の取得中にエラーが発生しました: ' . $e->getMessage()
            ];
        }
    }

    /**
     * テキストメッセージを送信してGPT応答を取得
     * @param Request $request
     * @param int $threadId
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendTextMessage(Request $request, int $threadId)
    {
        $request->validate([
            'message' => 'required|string|max:1000'
        ]);
        
        try {
            // ユーザーメッセージを保存
            $userMessage = Message::create([
                'thread_id' => $threadId,
                'message_en' => $request->message,
                'message_ja' => '',
                'sender' => 1, // ユーザーメッセージ
                'audio_file_path' => null
            ]);
            
            // GPT APIを呼び出してレスポンスを取得
            $gptResponse = $this->getGptResponse($threadId);
            
            if ($gptResponse['success']) {
                return response()->json([
                    'message' => 'メッセージが正常に送信され、GPT応答が完了しました',
                    'user_message_id' => $userMessage->id,
                    'gpt_response' => $gptResponse['content'],
                    'ai_message_id' => $gptResponse['ai_message_id']
                ], 200);
            } else {
                return response()->json([
                    'message' => 'メッセージは保存されましたが、GPT応答の取得に失敗しました',
                    'user_message_id' => $userMessage->id,
                    'gpt_error' => $gptResponse['error']
                ], 200);
            }
            
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'メッセージの送信中にエラーが発生しました: ' . $e->getMessage()
            ], 500);
        }
    }
}
