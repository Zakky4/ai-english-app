// import Layout from './Layout'
import { Head } from '@inertiajs/react'
import { SideMenu } from '../Components/SideMenu'

export default function Top({ }) {
    return (
        <>
            <Head title="Top" />
            <div className="flex">
                <SideMenu />
                <h1>AI英会話アプリのトップページ</h1>
            </div>
        </>
    )
}