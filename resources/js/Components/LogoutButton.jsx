import { router } from '@inertiajs/react'

export default function LogoutButton({
    className = '',
    disabled,
    children = 'ログアウト',
    ...props
}) {
    const handleLogout = () => {
        router.post('/logout')
    }

    return (
        <button
            {...props}
            onClick={handleLogout}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black transition duration-150 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:bg-gray-400 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
