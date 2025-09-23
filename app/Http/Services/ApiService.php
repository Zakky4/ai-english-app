<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Http;

class ApiService
{
    public function callWhisperApi($audioFilePath)
    {
        // $audioFilePathのデータは、storage/app/public/audio/20250903225054.webmのような文字列で保存されている
        // これをcurlでWhisper APIに送信する場合は、以下のようなコマンドになる
        // curl https://api.openai.com/v1/audio/translations \
        //   -H "Authorization: $OPENAI_API_KEY" \
        //   -H "Content-Type: multipart/form-data" \
        //   -F file="@$audioFilePath" \
        //   -F model="whisper-1"

        try {
            // ファイルの存在確認
            if (!file_exists($audioFilePath)) {
                throw new \Exception("音声ファイルが見つかりません: {$audioFilePath}");
            }

            // ファイルサイズの確認（25MB制限）
            $fileSize = filesize($audioFilePath);
            if ($fileSize > 25 * 1024 * 1024) {
                throw new \Exception("音声ファイルが大きすぎます。25MB以下にしてください。");
            }

            // OpenAI APIキーの取得
            $apiKey = config('services.openai.api_key');
            if (!$apiKey) {
                throw new \Exception("OpenAI APIキーが設定されていません。");
            }

            // Whisper APIにリクエストを送信
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
            ])->attach('file', file_get_contents($audioFilePath), basename($audioFilePath))
            ->post('https://api.openai.com/v1/audio/translations', [
                'model' => 'whisper-1',
                'language' => 'en'
            ]);

            // レスポンスの処理
            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'text' => $data['text'] ?? '',
                    'data' => $data
                ];
            } else {
                $errorData = $response->json();
                return [
                    'success' => false,
                    'error' => $errorData['error']['message'] ?? 'APIリクエストが失敗しました。',
                    'status_code' => $response->status()
                ];
            }

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * GPT APIにリクエストを送信
     * @param Collection<Message> $messages メッセージのコレクション
     */
    public function callGptApi($messages)
    {
        try {
            // OpenAI APIキーの取得
            $apiKey = config('services.openai.api_key');
            if (!$apiKey) {
                throw new \Exception("OpenAI APIキーが設定されていません。");
            }

            // メッセージをGPT APIの形式に変換
            $formattedMessages = $this->formatMessagesForGpt($messages);

            // GPT APIにリクエストを送信
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $apiKey,
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini', // gpt-5-nanoは存在しないため、gpt-4o-miniを使用
                'messages' => $formattedMessages,
                'max_tokens' => 1000,
                'temperature' => 0.7,
            ]);

            // レスポンスの処理
            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'content' => $data['choices'][0]['message']['content'] ?? '',
                    'usage' => $data['usage'] ?? null,
                    'data' => $data
                ];
            } else {
                $errorData = $response->json();
                return [
                    'success' => false,
                    'error' => $errorData['error']['message'] ?? 'GPT APIリクエストが失敗しました。',
                    'status_code' => $response->status()
                ];
            }

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * メッセージをGPT APIの形式に変換
     * @param Collection<Message> $messages
     * @return array
     */
    private function formatMessagesForGpt($messages)
    {
        $formattedMessages = [];
        
        // システムメッセージを追加（英語学習アシスタントとして）
        $formattedMessages[] = [
            'role' => 'system',
            'content' => 'You are a helpful English learning assistant. You help users practice English conversation and provide corrections and suggestions for improvement.'
        ];

        // メッセージを変換
        foreach ($messages as $message) {
            $role = $message->isFromUser() ? 'user' : 'assistant';
            $content = $message->message_en ?? $message->message_ja ?? '';
            
            if (!empty($content)) {
                $formattedMessages[] = [
                    'role' => $role,
                    'content' => $content
                ];
            }
        }

        return $formattedMessages;
    }

    /**
     * テキストを翻訳する
     * @param string $text 翻訳するテキスト
     * @param string $targetLanguage 翻訳先言語（'ja' または 'en'）
     * @return array
     */
    public function callTranslateApi($text, $targetLanguage = 'ja')
    {
        try {
            // OpenAI APIキーの取得
            $apiKey = config('services.openai.api_key');
            if (!$apiKey) {
                throw new \Exception("OpenAI APIキーが設定されていません。");
            }

            // 翻訳先言語に応じてプロンプトを設定
            $prompt = $targetLanguage === 'ja' 
                ? "以下の英語を自然な日本語に翻訳してください。翻訳のみを返してください。\n\n{$text}"
                : "以下の日本語を自然な英語に翻訳してください。翻訳のみを返してください。\n\n{$text}";

            // GPT APIにリクエストを送信
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $apiKey,
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'max_tokens' => 500,
                'temperature' => 0.3,
            ]);

            // レスポンスの処理
            if ($response->successful()) {
                $data = $response->json();
                return [
                    'success' => true,
                    'translated_text' => trim($data['choices'][0]['message']['content'] ?? ''),
                    'usage' => $data['usage'] ?? null,
                    'data' => $data
                ];
            } else {
                $errorData = $response->json();
                return [
                    'success' => false,
                    'error' => $errorData['error']['message'] ?? '翻訳APIリクエストが失敗しました。',
                    'status_code' => $response->status()
                ];
            }

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * GPT APIのレスポンスを音声に変換
     * @param string $text
     * @return array
     */
    public function callTtsApi($text)
    {
        try {
            // OpenAI APIキーの取得
            $apiKey = config('services.openai.api_key');
            if (!$apiKey) {
                throw new \Exception("OpenAI APIキーが設定されていません。");
            }

            // 音声ファイルの保存先ディレクトリを確認・作成
            $audioDir = storage_path('app/public/ai_audio');
            if (!file_exists($audioDir)) {
                mkdir($audioDir, 0755, true);
            }

            // 現在日時でファイル名を生成
            $timestamp = now()->format('YmdHis');
            $fileName = "tts_{$timestamp}.wav";
            $filePath = $audioDir . '/' . $fileName;

            // TTS APIにリクエストを送信
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->post('https://api.openai.com/v1/audio/speech', [
                'model' => 'tts-1',
                'input' => $text,
                'voice' => 'nova',
                'response_format' => 'wav'
            ]);

            // レスポンスの処理
            if ($response->successful()) {
                // 音声データをファイルに保存
                file_put_contents($filePath, $response->body());
                
                return [
                    'success' => true,
                    'file_path' => $filePath,
                    'file_name' => $fileName,
                    'file_url' => asset('storage/audio/' . $fileName)
                ];
            } else {
                $errorData = $response->json();
                return [
                    'success' => false,
                    'error' => $errorData['error']['message'] ?? 'TTS APIリクエストが失敗しました。',
                    'status_code' => $response->status()
                ];
            }

        } catch (\Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
}