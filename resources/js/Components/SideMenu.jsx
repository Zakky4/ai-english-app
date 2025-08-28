
"use client";

import { HiPlus, HiChatAlt2 } from "react-icons/hi";

export function SideMenu({ threads = [] }) {
    return (
        <div className="w-64 h-screen bg-green-600 text-white flex flex-col">
            {/* アプリタイトル */}
            <div className="p-6 border-b border-green-500 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="/favicon.png" alt="MyEnglishApp" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-bold text-white">MyEnglishApp</span>
                </div>
            </div>
            
            {/* 新規スレッド作成ボタン */}
            <div className="p-4 flex-shrink-0">
                <button className="w-full flex items-center space-x-3 p-3 bg-gray-300 hover:bg-gray-200 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                        <HiPlus className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-black font-medium">新規スレッド作成</span>
                </button>
            </div>
            
            {/* 英会話スレッド一覧 - スクロール可能 */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                    {threads.length > 0 ? (
                        threads.map((thread) => (
                            <a 
                                key={thread.id} 
                                href={`/thread/${thread.id}`}
                                className="flex items-center space-x-3 p-3 text-white hover:bg-green-500 rounded-lg transition-colors"
                            >
                                <HiChatAlt2 className="w-5 h-5 text-blue-300" />
                                <span className="font-medium truncate">{thread.title}</span>
                            </a>
                        ))
                    ) : (
                        <div className="text-center text-gray-300 py-4">
                            <p>スレッドがありません</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

