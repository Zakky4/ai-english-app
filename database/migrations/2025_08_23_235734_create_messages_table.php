<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // bigint, PK
            $table->unsignedBigInteger('thread_id')->comment('スレッドID'); // bigint, FK
            $table->text('message_en')->nullable()->comment('英語メッセージ'); // text
            $table->text('message_ja')->nullable()->comment('日本語メッセージ'); // text
            $table->smallInteger('sender')->comment('1:user 2:AI')->comment('送信者'); // smallint
            $table->string('audio_file_path')->nullable()->comment('音声ファイルパス'); // varchar
            $table->timestamps(); // created_at, updated_at
            
            // 外部キー制約の追加
            $table->foreign('thread_id')->references('id')->on('threads')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
