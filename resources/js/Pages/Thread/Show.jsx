import { Head } from '@inertiajs/react'
import { SideMenu } from '../../Components/SideMenu'
import LogoutButton from '../../Components/LogoutButton'
import LoadingSpinner from '../../Components/LoadingSpinner'
import { HiMicrophone, HiTranslate } from 'react-icons/hi'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

export default function Show({ thread, threads, messages: initialMessages }) {
    const [isRecording, setIsRecording] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [messages, setMessages] = useState(initialMessages) // メッセージの状態を管理
    const [isTranslating, setIsTranslating] = useState({}) // 各メッセージの翻訳状態を管理
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const recordingIntervalRef = useRef(null)
    const audioRef = useRef(null)

    // 最新の音声ファイルを自動再生
    useEffect(() => {
        const playLatestAudio = async () => {
            // ローディング中（翻訳処理中）の場合は音声を再生しない
            if (isLoading) {
                return
            }

            // 音声ファイルを持つメッセージをフィルタリング
            const messagesWithAudio = messages.filter(message => message.audio_file_path)
            
            if (messagesWithAudio.length === 0) {
                return
            }

            // 最新のメッセージ（作成日時順）を取得
            const latestMessage = messagesWithAudio.sort((a, b) => 
                new Date(b.created_at) - new Date(a.created_at)
            )[0]

            if (latestMessage && latestMessage.audio_file_path) {
                try {
                    // 音声ファイルの存在確認
                    const audioUrl = `/storage/${latestMessage.audio_file_path}`
                    
                    // 音声ファイルの存在を確認
                    const response = await fetch(audioUrl, { method: 'HEAD' })
                    if (!response.ok) {
                        console.error(`音声ファイルが見つかりません: ${audioUrl} (${response.status})`)
                        return
                    }

                    // 音声要素を作成
                    const audio = new Audio(audioUrl)
                    
                    // 音声の読み込みエラーハンドリング
                    audio.addEventListener('error', (e) => {
                        console.error('音声ファイルの読み込みに失敗しました:', e)
                        console.error('ファイルパス:', audioUrl)
                    })
                    
                    // 音声の読み込み完了を待つ
                    audio.addEventListener('canplaythrough', () => {
                        // ローディング中でない場合のみ自動再生を試行
                        if (!isLoading) {
                            const playPromise = audio.play()
                            
                            if (playPromise !== undefined) {
                                playPromise.catch(error => {
                                    console.log('自動再生がブロックされました:', error)
                                    // ユーザーが何らかの操作をした後に再生を試行
                                    const playOnInteraction = () => {
                                        if (!isLoading) {
                                            audio.play().catch(console.error)
                                        }
                                        document.removeEventListener('click', playOnInteraction)
                                        document.removeEventListener('keydown', playOnInteraction)
                                    }
                                    document.addEventListener('click', playOnInteraction)
                                    document.addEventListener('keydown', playOnInteraction)
                                })
                            }
                        }
                    })
                    
                    // 音声の読み込みを開始
                    audio.load()
                    
                } catch (error) {
                    console.error('音声の再生に失敗しました:', error)
                }
            }
        }

        // メッセージが存在し、ローディング中でない場合のみ実行
        if (messages && messages.length > 0 && !isLoading) {
            playLatestAudio()
        }
    }, [messages, isLoading])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                await sendAudioToServer(audioBlob)
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
            setRecordingTime(0)

            // 録音時間のカウント
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)

        } catch (error) {
            console.error('録音の開始に失敗しました:', error)
            alert('マイクへのアクセスが拒否されました。ブラウザの設定を確認してください。')
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            setRecordingTime(0)
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current)
            }
        }
    }

    const sendAudioToServer = async (audioBlob) => {
        try {
            setIsLoading(true)
            const formData = new FormData()
            formData.append('audio', audioBlob, 'recording.webm')

            await axios.post(`/thread/${thread.id}/message`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            console.log('音声ファイルが正常に送信されました')
            location.reload()
        } catch (error) {
            console.error('音声ファイルの送信に失敗しました:', error)
            alert('音声ファイルの送信に失敗しました。')
            setIsLoading(false)
        }
    }

    const handleMicrophoneClick = () => {
        // ローディング中は操作を無効化
        if (isLoading) return
        
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    // 翻訳機能
    const handleTranslateClick = async (messageId, currentLanguage) => {
        // 既に翻訳中の場合は何もしない
        if (isTranslating[messageId]) return

        try {
            setIsTranslating(prev => ({ ...prev, [messageId]: true }))
            
            // 翻訳処理中は音声自動再生を無効化
            setIsLoading(true)
            
            // 翻訳先言語を決定
            const targetLanguage = currentLanguage === 'en' ? 'ja' : 'en'
            
            const response = await axios.post(`/message/${messageId}/translate`, {
                target_language: targetLanguage
            })

            if (response.data.translated_text) {
                // 翻訳成功時はメッセージの状態を更新
                setMessages(prevMessages => 
                    prevMessages.map(message => {
                        if (message.id === messageId) {
                            if (targetLanguage === 'ja') {
                                return { ...message, message_ja: response.data.translated_text }
                            } else {
                                return { ...message, message_en: response.data.translated_text }
                            }
                        }
                        return message
                    })
                )
            } else {
                alert('翻訳に失敗しました。')
            }
        } catch (error) {
            console.error('翻訳エラー:', error)
            alert('翻訳に失敗しました。')
        } finally {
            setIsTranslating(prev => ({ ...prev, [messageId]: false }))
            setIsLoading(false)
        }
    }

    // 翻訳ボタンの表示状態を取得
    const getTranslateButtonText = (message) => {
        if (isTranslating[message.id]) {
            return '翻訳中...'
        }
        // 日本語が存在する場合は「Aあ」、存在しない場合は「翻訳」
        return message.message_ja ? 'Aあ' : '翻訳'
    }

    return (
        <>
            <Head title="MyEnglishApp - 英会話学習記録" />
            <div className={`flex h-screen bg-gray-800 ${isLoading ? 'pointer-events-none' : ''}`}>
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
                                                {message.audio_file_path && (
                                                    <div className="mt-2">
                                                        <audio controls className="w-full">
                                                            <source src={`/storage/${message.audio_file_path}`} type="audio/webm" />
                                                            <source src={`/storage/${message.audio_file_path}`} type="audio/mpeg" />
                                                            お使いのブラウザは音声再生をサポートしていません。
                                                        </audio>
                                                    </div>
                                                )}
                                                <p className="text-gray-500 text-xs mt-1">
                                                    {new Date(message.created_at).toLocaleTimeString('ja-JP', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>


                                            {/* 翻訳ボタン */}
                                            <button 
                                                onClick={() => handleTranslateClick(message.id, 'en')}
                                                disabled={isTranslating[message.id]}
                                                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    isTranslating[message.id] ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                {getTranslateButtonText(message)}
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
                                                {message.audio_file_path && (
                                                    <div className="mt-2">
                                                        <audio controls className="w-full">
                                                            <source src={`/storage/${message.audio_file_path}`} type="audio/webm" />
                                                            <source src={`/storage/${message.audio_file_path}`} type="audio/mpeg" />
                                                            お使いのブラウザは音声再生をサポートしていません。
                                                        </audio>
                                                    </div>
                                                )}
                                                <p className="text-blue-200 text-xs mt-1">
                                                    {new Date(message.created_at).toLocaleTimeString('ja-JP', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>

                                            {/* 翻訳ボタン */}
                                            <button 
                                                onClick={() => handleTranslateClick(message.id, 'en')}
                                                disabled={isTranslating[message.id]}
                                                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                                    isTranslating[message.id] ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            >
                                                {getTranslateButtonText(message)}
                                            </button>

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
                        <div className="flex flex-col items-center space-y-2">
                            {/* 録音時間表示 */}
                            {isRecording && (
                                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                    {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                                </div>
                            )}
                            
                            {/* マイクボタン */}
                            <button 
                                onClick={handleMicrophoneClick}
                                disabled={isLoading}
                                className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
                                    isLoading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : isRecording 
                                            ? 'bg-red-500 animate-pulse hover:shadow-xl' 
                                            : 'bg-white hover:bg-gray-100 hover:shadow-xl'
                                }`}
                            >
                                <HiMicrophone className={`w-8 h-8 ${
                                    isLoading ? 'text-gray-600' : isRecording ? 'text-white' : 'text-gray-800'
                                }`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* ローディングスピナー */}
            {isLoading && <LoadingSpinner message="音声を処理中..." />}
        </>
    )
}