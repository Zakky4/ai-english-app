import { Head } from '@inertiajs/react'
import { SideMenu } from '../Components/SideMenu'

export default function Top({ }) {
    return (
        <>
            <Head title="MyEnglishApp - 英会話学習記録" />
            <div className="flex h-screen bg-gray-50">
                <SideMenu />
                
                {/* メインコンテンツエリア */}
                <div className="flex-1 bg-gray-800">
                    {/* ヘッダー */}
                    <header className="bg-gray-800 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div></div>
                            <div className="flex items-center space-x-4">
                                <button className="bg-gray-300 hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-medium transition-colors">
                                    ログアウト
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* メインコンテンツ */}
                    <main className="px-6 pb-6">
                        {/* タイトル */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-white">英会話学習記録</h1>
                        </div>

                        {/* 学習記録グリッド */}
                        <div className="bg-gray-700 p-6 rounded-lg">
                            <div className="grid grid-cols-7 gap-1">
                                {/* 7列 x 6行 = 42セル */}
                                {/* 1行目 */}
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-green-500 border border-gray-500 rounded"></div>
                                
                                {/* 2行目 */}
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-green-500 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                
                                {/* 3行目 */}
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                
                                {/* 4行目 */}
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                
                                {/* 5行目 */}
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                
                                {/* 6行目 */}
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                                <div className="w-16 h-16 bg-gray-300 border border-gray-500 rounded"></div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}