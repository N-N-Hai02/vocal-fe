"use client"
import Login from '@/component/ManageUser/Login'
import Register from '@/component/ManageUser/Register'
import { redirect, usePathname } from 'next/navigation'

const HomeRoutes = () => {
    const pathname = usePathname()

    const authenticated = true

    if (authenticated) {
        switch (pathname) {
            case '/login':
                return <Login />
            case '/register':
                return <Register />
            default:
                return <div className='container'>404 not found</div>
        }
    } else {
        redirect('/login')
    }
}

export default HomeRoutes