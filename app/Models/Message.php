<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'thread_id',
        'message_en',
        'message_ja',
        'sender',
        'audio_file_path',
    ];

    /**
     * 自動変換される属性
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sender' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * メッセージが属するスレッドを取得
     */
    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }

    /**
     * ユーザーメッセージのみを含むクエリのスコープ
     */
    public function scopeFromUser($query)
    {
        return $query->where('sender', 1);
    }

    /**
     * AIメッセージのみを含むクエリのスコープ
     */
    public function scopeFromAI($query)
    {
        return $query->where('sender', 2);
    }

    /**
     * 音声付きメッセージのみを含むクエリのスコープ
     */
    public function scopeWithAudio($query)
    {
        return $query->whereNotNull('audio_file_path');
    }

    /**
     * 送信者タイプを文字列で取得
     */
    public function getSenderTypeAttribute(): string
    {
        return $this->sender === 1 ? 'user' : 'AI';
    }

    /**
     * メッセージがユーザーからのものかチェック
     */
    public function isFromUser(): bool
    {
        return $this->sender === 1;
    }

    /**
     * メッセージがAIからのものかチェック
     */
    public function isFromAI(): bool
    {
        return $this->sender === 2;
    }

    /**
     * メッセージに音声が付いているかチェック
     */
    public function hasAudio(): bool
    {
        return !is_null($this->audio_file_path);
    }
}
