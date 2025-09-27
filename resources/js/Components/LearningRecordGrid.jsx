import { useState, useEffect, useRef } from 'react'

export default function LearningRecordGrid({ learningData }) {
    const [gridData, setGridData] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [cellSize, setCellSize] = useState(16) // デフォルトサイズ（px）
    const containerRef = useRef(null)

    // 曜日ラベル
    const dayLabels = ['日', '月', '火', '水', '木', '金', '土']

    // 最適なセルサイズを計算
    const calculateOptimalCellSize = () => {
        if (!containerRef.current) return

        const containerWidth = containerRef.current.offsetWidth
        const padding = 48 // コンテナのパディング（24px * 2）
        const dayLabelWidth = 32 // 曜日ラベルの幅
        const weekGap = 4 // 週間の間隔（1px * 4週）
        const availableWidth = containerWidth - padding - dayLabelWidth - weekGap
        
        // 12週分のセルを配置するための最大サイズを計算
        const maxCellSize = Math.floor(availableWidth / 12)
        
        // 最小サイズ（12px）と最大サイズ（32px）の制限を設ける
        const minSize = 12
        const maxSize = 32
        const optimalSize = Math.max(minSize, Math.min(maxSize, maxCellSize))
        
        setCellSize(optimalSize)
    }

    // 過去3ヶ月分の日付データを生成
    useEffect(() => {
        const generateGridData = () => {
            if (!learningData) return

            const today = new Date()
            const thisWeekSunday = new Date(learningData.thisWeekSunday)
            const startDate = new Date(learningData.startDate)
            const endDate = new Date(learningData.endDate)

            const data = []
            
            // 今週から過去12週分のデータを生成（右から左に向かって）
            for (let week = 0; week < 12; week++) {
                const weekData = []
                const weekStartDate = new Date(thisWeekSunday)
                weekStartDate.setDate(thisWeekSunday.getDate() - (week * 7))
                
                for (let day = 0; day < 7; day++) {
                    const cellDate = new Date(weekStartDate)
                    cellDate.setDate(weekStartDate.getDate() + day)
                    
                    // 今日より未来の日付は表示しない
                    const isFuture = cellDate > today
                    const isWithinRange = cellDate >= startDate && cellDate <= endDate
                    
                    // 学習日かどうかを判定
                    const dateString = cellDate.toISOString().split('T')[0]
                    const hasActivity = learningData.learningDates.includes(dateString)
                    
                    weekData.push({
                        date: cellDate,
                        isFuture,
                        isWithinRange,
                        hasActivity
                    })
                }
                // データを逆順で追加（右から左の表示順序にするため）
                data.unshift(weekData)
            }

            setGridData(data)
        }

        generateGridData()
    }, [learningData])

    // ウィンドウリサイズ時の処理
    useEffect(() => {
        const handleResize = () => {
            calculateOptimalCellSize()
        }

        // 初回計算
        calculateOptimalCellSize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // セルの背景色を決定
    const getCellBackground = (cell) => {
        if (cell.isFuture || !cell.isWithinRange) {
            return 'bg-gray-600' // 未来または範囲外
        }
        if (cell.hasActivity) {
            return 'bg-green-500' // 学習あり
        }
        return 'bg-gray-300' // 学習なし
    }

    return (
        <div ref={containerRef} className="bg-gray-700 p-6 rounded-lg w-full">
            <div className="flex">
                {/* 曜日ラベル */}
                <div className="flex flex-col mr-2 flex-shrink-0">
                    <div style={{ height: `${cellSize}px` }}></div> {/* ヘッダー用のスペース */}
                    {dayLabels.map((label, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                height: `${cellSize}px`, 
                                width: `${cellSize}px`,
                                marginBottom: '4px'
                            }}
                            className="flex items-center justify-center text-xs text-gray-300"
                        >
                            {label}
                        </div>
                    ))}
                </div>

                {/* グリッド */}
                <div className="flex flex-1 overflow-x-auto">
                    {gridData.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col mr-1 flex-shrink-0">
                            {/* 週のヘッダー（月の最初の週のみ表示） */}
                            <div 
                                style={{ 
                                    height: `${cellSize}px`, 
                                    width: `${cellSize}px`,
                                    marginBottom: '4px'
                                }}
                                className="flex items-center justify-center text-xs text-gray-300"
                            >
                                {weekIndex === 0 && (
                                    <span>{week[0].date.getMonth() + 1}月</span>
                                )}
                            </div>
                            
                            {/* 週の日付セル */}
                            {week.map((cell, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    style={{ 
                                        width: `${cellSize}px`, 
                                        height: `${cellSize}px`,
                                        marginBottom: '4px'
                                    }}
                                    className={`${getCellBackground(cell)} border border-gray-500 rounded`}
                                    title={`${cell.date.getFullYear()}/${cell.date.getMonth() + 1}/${cell.date.getDate()}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* 凡例 */}
            <div className="flex items-center justify-end mt-4 text-sm text-gray-300">
                <span className="mr-2">少ない</span>
                <div className="flex space-x-1">
                    <div 
                        style={{ width: `${Math.max(12, cellSize - 4)}px`, height: `${Math.max(12, cellSize - 4)}px` }}
                        className="bg-gray-300 border border-gray-500 rounded"
                    ></div>
                    <div 
                        style={{ width: `${Math.max(12, cellSize - 4)}px`, height: `${Math.max(12, cellSize - 4)}px` }}
                        className="bg-green-200 border border-gray-500 rounded"
                    ></div>
                    <div 
                        style={{ width: `${Math.max(12, cellSize - 4)}px`, height: `${Math.max(12, cellSize - 4)}px` }}
                        className="bg-green-400 border border-gray-500 rounded"
                    ></div>
                    <div 
                        style={{ width: `${Math.max(12, cellSize - 4)}px`, height: `${Math.max(12, cellSize - 4)}px` }}
                        className="bg-green-500 border border-gray-500 rounded"
                    ></div>
                </div>
                <span className="ml-2">多い</span>
            </div>
        </div>
    )
}
