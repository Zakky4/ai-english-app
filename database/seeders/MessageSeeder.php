<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Message;

class MessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // メッセージデータを作成
        Message::create([
            'thread_id' => 1,
            'message_en' => 'Hello, how are you?',
            'message_ja' => 'こんにちは、お元気ですか？',
            'sender' => 1, // 1:user 2:AI
            'audio_file_path' => 'audio/message_1.mp3',
        ]);
        Message::create([
            'thread_id' => 1,
            'message_en' => 'I am fine, thank you.',
            'message_ja' => '元気です。ありがとうございます。',
            'sender' => 2, // 1:user 2:AI
            'audio_file_path' => 'audio/message_2.mp3',
        ]);
        Message::create([
            'thread_id' => 1,
            'message_en' => 'What is your name?',
            'message_ja' => 'あなたの名前は何ですか？',
            'sender' => 1, // 1:user 2:AI
            'audio_file_path' => 'audio/message_3.mp3',
        ]);
        Message::create([
            'thread_id' => 1,
            'message_en' => 'My name is John.',
            'message_ja' => '私の名前はジョンです。',
            'sender' => 2, // 1:user 2:AI
            'audio_file_path' => 'audio/message_4.mp3',
        ]);
        Message::create([
            'thread_id' => 1,
            'message_en' => 'Nice to meet you.',
            'message_ja' => 'よろしくお願いします。',
            'sender' => 1, // 1:user 2:AI
            'audio_file_path' => 'audio/message_5.mp3',
        ]);
        Message::create([
            'thread_id' => 1,
            'message_en' => 'Nice to meet you.',
            'message_ja' => 'よろしくお願いします。',
            'sender' => 1, // 1:user 2:AI
            'audio_file_path' => 'audio/message_6.mp3',
        ]);
        Message::create([
            'thread_id' => 1,
            'message_en' => 'Nice to meet you.',
            'message_ja' => 'よろしくお願いします。',
            'sender' => 1, // 1:user 2:AI
            'audio_file_path' => 'audio/message_7.mp3',
        ]); 
    }
}
