import { Head } from '@inertiajs/react'
import { SideMenu } from '../../Components/SideMenu'
import LogoutButton from '../../Components/LogoutButton'

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
                                <LogoutButton />
                            </div>
                        </div>
                    </header>

                    {/* メインコンテンツ */}
                    <main className="px-6 pb-6">
                        {/* タイトル */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-white">英会話画面</h1>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}