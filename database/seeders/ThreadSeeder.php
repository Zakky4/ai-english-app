<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Thread;

class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // スレッドダミーデータを作成
        Thread::create([
            'title' => '英会話',
        ]);
        Thread::create([
            'title' => '英会話の練習',
        ]);
    }
}
