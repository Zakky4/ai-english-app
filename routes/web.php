<?php

use App\Http\Controllers\ThreadController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

// ルート「/」にアクセスした際は「/top」にリダイレクト
Route::get('/', function () {
    return redirect('/top');
});

Route::middleware('auth')->group(function () {
    // トップ画面
    Route::get('/top', [ThreadController::class, 'index'])->name('top');
    // 英会話画面
    Route::get('/thread/{threadId}', [ThreadController::class, 'show'])->name('thread.show');
    // 新規スレッド作成
    Route::get('/thread', [ThreadController::class, 'store'])->name('thread.store');
    // メッセージ保存処理（音声）
    Route::post('/thread/{threadId}/message', [MessageController::class, 'store'])->name('message.store');
    // テキストメッセージ送信処理
    Route::post('/thread/{threadId}/text-message', [MessageController::class, 'sendTextMessage'])->name('message.text');
    // メッセージ翻訳処理
    Route::post('/message/{messageId}/translate', [MessageController::class, 'translateMessage'])->name('message.translate');
});

// 音声ファイル配信用ルート（認証不要）
Route::get('/storage/{path}', function ($path) {
    $filePath = storage_path('app/public/' . $path);
    
    if (!file_exists($filePath)) {
        abort(404);
    }
    
    $mimeType = mime_content_type($filePath);
    
    return response()->file($filePath, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->where('path', '.*');
