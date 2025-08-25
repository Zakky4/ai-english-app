<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Thread extends Model
{
    /** @use HasFactory<\Database\Factories\ThreadFactory> */
    use HasFactory;

    /**
     * 一括代入可能な属性（フィラブルプロパティ）
     * 
     * これらの属性は、Thread::create()やThread::update()などの
     * 一括代入メソッドで更新することができます。
     * 
     * セキュリティ上の理由から、更新を許可したい属性のみを
     * 明示的にリストアップする必要があります。
     * 
     * 例：
     * Thread::create(['title' => '新しいスレッド']); // OK
     * Thread::create(['user_id' => 999]); // エラー（fillableに含まれていない）
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        // 'user_id', // 必要に応じて追加（現在はスレッドテーブルにuser_idカラムがない）
        // 'description', // 必要に応じて追加
    ];

    /**
     * 一括代入を完全に無効化する属性（ガードプロパティ）
     * 
     * これらの属性は、一括代入で更新することができません。
     * 例：id, created_at, updated_at など
     * 
     * @var array<int, string>
     */
    protected $guarded = [
        'id',
        'created_at',
        'updated_at',
    ];

    /**
     * 自動変換される属性
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * スレッドのメッセージを取得
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    /**
     * スレッドの最新メッセージを取得
     */
    public function latestMessage()
    {
        return $this->hasOne(Message::class)->latestOfMany();
    }

    /**
     * メッセージを持つスレッドのみを含むクエリのスコープ
     */
    public function scopeWithMessages($query)
    {
        return $query->has('messages');
    }

    /**
     * メッセージを持たないスレッドのみを含むクエリのスコープ
     */
    public function scopeWithoutMessages($query)
    {
        return $query->doesntHave('messages');
    }

    /**
     * スレッド作成時のバリデーションルール
     * 
     * @return array<string, string>
     */
    public static function getValidationRules(): array
    {
        return [
            'title' => 'required|string|max:255',
        ];
    }

    /**
     * スレッド更新時のバリデーションルール
     * 
     * @return array<string, string>
     */
    public static function getUpdateValidationRules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
        ];
    }
}
