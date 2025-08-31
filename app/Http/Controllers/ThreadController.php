<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\StoreThreadRequest;
use App\Http\Requests\UpdateThreadRequest;
use App\Models\Thread;
use App\Models\Message;

class ThreadController extends Controller
{
    /**
     * トップ画面を表示
     */
    public function index(): InertiaResponse
    {
        // 全スレッドを取得（作成日時順）
        $threads = Thread::orderBy('id', 'desc')->get();
        
        return Inertia::render('Top', [
            'threads' => $threads
        ]);
    }

    /**
     * 新規スレッド作成
     */
    public function store()
    {
        // 現在日時をタイトルとして新しいThreadを作成
        $now = now()->format('Y-m-d H:i:s');
        $thread = Thread::create([
            'title' => $now,
        ]);

        // 作成したスレッドのshowアクションへリダイレクト
        return redirect()->route('thread.show', ['threadId' => $thread->id]);
    }

    /**
     * 英会話画面を表示
     */
    public function show(int $threadId)
    {
        // スレッドデータを取得
        $thread = Thread::findOrFail($threadId);
        // メッセージデータを取得（作成日時順）
        $messages = Message::where('thread_id', $threadId)
            ->orderBy('created_at', 'asc')
            ->get();
        // 全スレッドを取得（作成日時順）
        $threads = Thread::orderBy('id', 'desc')->get();
        // フロントエンドに渡す
        return Inertia::render('Thread/Show', [
            'thread' => $thread,
            'threads' => $threads,
            'messages' => $messages
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Thread $thread)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Thread $thread)
    {
        //
    }
}
