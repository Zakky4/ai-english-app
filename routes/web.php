<?php

use App\Http\Controllers\ThreadController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    // トップ画面
    Route::get('/top', [ThreadController::class, 'index'])->name('top');
    // 英会話画面
    Route::get('/thread/{threadId}', [ThreadController::class, 'show'])->name('thread.show');
    // 新規スレッド作成
    Route::get('/thread', [ThreadController::class, 'store'])->name('thread.store');
    // メッセージ保存処理
    Route::post('/thread/{threadId}/message', [MessageController::class, 'store'])->name('message.store');
});
