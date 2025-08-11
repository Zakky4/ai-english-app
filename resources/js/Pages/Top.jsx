import { Head } from '@inertiajs/react'
import { SideMenu } from '../Components/SideMenu'
import { 
    HiAcademicCap, 
    HiChatAlt2, 
    HiBookOpen, 
    HiStar
} from "react-icons/hi"

export default function Top({ }) {
    return (
        <>
            <Head title="AI English - ダッシュボード" />
            <div className="flex h-screen bg-gray-50">
                <SideMenu />
                
                {/* メインコンテンツエリア */}
                <div className="flex-1 overflow-auto">
                    {/* ヘッダー */}
                    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
                                <p className="text-gray-600">AI英会話アプリへようこそ</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-semibold">U</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* メインコンテンツ */}
                    <main className="p-6">
                        {/* 統計カード */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <HiAcademicCap className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">完了レッスン</p>
                                        <p className="text-2xl font-bold text-gray-900">24</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <HiChatAlt2 className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">AI会話回数</p>
                                        <p className="text-2xl font-bold text-gray-900">156</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <HiBookOpen className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">学習時間</p>
                                        <p className="text-2xl font-bold text-gray-900">32h</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <HiStar className="w-6 h-6 text-orange-600" />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">獲得ポイント</p>
                                        <p className="text-2xl font-bold text-gray-900">1,240</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* メインアクション */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">新しいレッスンを始めよう</h3>
                                        <p className="text-blue-100 mb-4">AIと一緒に英語を学んで、スキルを向上させましょう</p>
                                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                            レッスン開始
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">AI会話を始める</h3>
                                        <p className="text-green-100 mb-4">自然な会話を通じて実践的な英語力を身につけましょう</p>
                                        <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                                            会話開始
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 最近の活動 */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">最近の活動</h3>
                                <button className="text-blue-600 hover:text-blue-700 font-medium">すべて表示</button>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <HiAcademicCap className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="font-medium text-gray-900">ビジネス英語レッスン完了</p>
                                        <p className="text-sm text-gray-600">2時間前</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-600">+50 ポイント</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <HiChatAlt2 className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="font-medium text-gray-900">AI会話セッション完了</p>
                                        <p className="text-sm text-gray-600">5時間前</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-600">+30 ポイント</p>
                                    </div>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <HiBookOpen className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <p className="font-medium text-gray-900">語彙学習完了</p>
                                        <p className="text-sm text-gray-600">1日前</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-600">+25 ポイント</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}