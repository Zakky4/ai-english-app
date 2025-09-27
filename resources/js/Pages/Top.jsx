import { Head } from '@inertiajs/react'
import { SideMenu } from '../Components/SideMenu'
import LogoutButton from '../Components/LogoutButton'
import LearningRecordGrid from '../Components/LearningRecordGrid'

export default function Top({ threads }) {
    return (
        <>
            <Head title="MyEnglishApp - 英会話学習記録" />
            <div className="flex h-screen bg-gray-50">
                <SideMenu threads={threads} />
                
                {/* メインコンテンツエリア */}
                <div className="flex-1 bg-gray-800">
                    {/* ヘッダー */}
                    <header className="bg-gray-800 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div></div>
                            <div className="flex items-center space-x-4">
                                <LogoutButton />
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
                        <LearningRecordGrid />
                    </main>
                </div>
            </div>
        </>
    )
}