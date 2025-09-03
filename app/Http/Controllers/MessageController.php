<?php

namespace App\Http\Controllers;

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
            
            return response()->json([
                'message' => '音声ファイルが正常に保存されました',
                'file_path' => $audioFilePath
            ], 200);
        }
        
        return response()->json([
            'error' => '音声ファイルが見つかりません'
        ], 400);
    }
}
