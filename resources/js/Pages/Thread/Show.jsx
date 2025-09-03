import { Head } from '@inertiajs/react'
import { SideMenu } from '../../Components/SideMenu'
import LogoutButton from '../../Components/LogoutButton'
import { HiSpeakerphone, HiMicrophone, HiTranslate } from 'react-icons/hi'
import { useState, useRef } from 'react'
import axios from 'axios'

export default function Show({ thread, threads, messages }) {
    const [isRecording, setIsRecording] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const recordingIntervalRef = useRef(null)

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
        }
    }

    const handleMicrophoneClick = () => {
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

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
                                className={`w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
                                    isRecording 
                                        ? 'bg-red-500 animate-pulse' 
                                        : 'bg-white hover:bg-gray-100'
                                }`}
                            >
                                <HiMicrophone className={`w-8 h-8 ${
                                    isRecording ? 'text-white' : 'text-gray-800'
                                }`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}