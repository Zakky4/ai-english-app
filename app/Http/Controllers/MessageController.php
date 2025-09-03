<?php

namespace App\Http\Controllers;

use App\Models\Message;
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

            return response()->json([
                'message' => '音声ファイルが正常に保存されました',
                'file_path' => $audioFilePath,
                'message_id' => $message->id
            ], 200);
        }
        
        return response()->json([
            'error' => '音声ファイルが見つかりません'
        ], 400);
    }
}
