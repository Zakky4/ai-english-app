import { Head } from '@inertiajs/react'
import { SideMenu } from '../../Components/SideMenu'
import LogoutButton from '../../Components/LogoutButton'
import { HiSpeakerphone, HiMicrophone, HiTranslate } from 'react-icons/hi'

export default function Show({ thread, threads, messages }) {

    return (
        <>
            <Head title="MyEnglishApp - 英会話学習記録" />
            <div className="flex h-screen bg-gray-800">
                <SideMenu threads={threads} />

                {/* メインコンテンツエリア */}
                <div className="flex-1 bg-gray-800 relative flex flex-col">
                    {/* ヘッダー */}
                    <header className="bg-gray-800 px-6 py-4 flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="text-white text-lg font-semibold">
                                {thread.title}
                            </div>
                            <div className="flex items-center space-x-4">
                                <LogoutButton />
                            </div>
                        </div>
                    </header>

                    {/* チャットエリア */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* チャットメッセージ */}
                        <div className="flex-1 px-6 pt-4 pb-20 overflow-y-auto space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 1 ? 'justify-end' : 'justify-start'}`}
                                >
                                    {message.sender === 2 && (
                                        <div className="flex items-center space-x-2">
                                            {/* AIアイコン */}
                                            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">AI</span>
                                            </div>

                                            {/* AIメッセージ */}
                                            <div className="bg-gray-300 rounded-lg px-4 py-2 max-w-xs">
                                                <p className="text-gray-800">{message.message_en}</p>
                                                {message.message_ja && (
                                                    <p className="text-gray-600 text-sm mt-1">{message.message_ja}</p>
                                                )}
                                                <p className="text-gray-500 text-xs mt-1">
                                                    {new Date(message.created_at).toLocaleTimeString('ja-JP', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>

                                            {/* スピーカーボタン */}
                                            <button className="p-2 text-gray-400 hover:text-white transition-colors">
                                                <HiSpeakerphone className="w-5 h-5" />
                                            </button>

                                            {/* 日本語/英語切り替えボタン */}
                                            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-colors">
                                                Aあ
                                            </button>
                                        </div>
                                    )}

                                    {message.sender === 1 && (
                                        <div className="flex items-center space-x-2">
                                            {/* ユーザーメッセージ */}
                                            <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-xs">
                                                <p className="text-white">{message.message_en}</p>
                                                {message.message_ja && (
                                                    <p className="text-blue-100 text-sm mt-1">{message.message_ja}</p>
                                                )}
                                                <p className="text-blue-200 text-xs mt-1">
                                                    {new Date(message.created_at).toLocaleTimeString('ja-JP', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>

                                            {/* ユーザーラベル */}
                                            <span className="text-gray-400 text-sm">You</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 右下のマイクボタン */}
                    <div className="absolute bottom-6 right-6">
                        <button className="w-16 h-16 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
                            <HiMicrophone className="w-8 h-8 text-gray-800" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}