export default function LoadingSpinner({ message = "処理中..." }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 shadow-xl">
                {/* スピナーアニメーション */}
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
                
                {/* ローディングメッセージ */}
                <p className="text-gray-700 font-medium">{message}</p>
            </div>
        </div>
    )
}
