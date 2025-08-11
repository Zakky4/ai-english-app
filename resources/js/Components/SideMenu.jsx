
"use client";

import { 
    HiLightningBolt,
    HiHome, 
    HiAcademicCap, 
    HiChatAlt2, 
    HiUserGroup, 
    HiCog, 
    HiChartBar,
    HiBookOpen
} from "react-icons/hi";

export function SideMenu() {
    return (
        <div className="w-64 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
            {/* ヘッダー */}
            <div className="p-4 border-b border-blue-700">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <HiLightningBolt className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">AI English</span>
                </div>
            </div>
            
            {/* メニュー項目 */}
            <div className="p-4">
                <div className="space-y-2">
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiHome className="w-5 h-5" />
                        <span className="font-medium">ホーム</span>
                    </a>
                    
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiAcademicCap className="w-5 h-5" />
                        <span className="font-medium">レッスン</span>
                    </a>
                    
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiChatAlt2 className="w-5 h-5" />
                        <span className="font-medium">AI会話</span>
                    </a>
                    
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiBookOpen className="w-5 h-5" />
                        <span className="font-medium">学習記録</span>
                    </a>
                    
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiChartBar className="w-5 h-5" />
                        <span className="font-medium">進捗管理</span>
                    </a>
                    
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiUserGroup className="w-5 h-5" />
                        <span className="font-medium">コミュニティ</span>
                    </a>
                </div>
                
                <div className="mt-8 pt-4 border-t border-blue-700">
                    <a href="#" className="flex items-center space-x-3 p-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors">
                        <HiCog className="w-5 h-5" />
                        <span className="font-medium">設定</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
