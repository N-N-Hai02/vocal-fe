"use client"
import GroupRole from '@/component/ManageGroupRole/GroupRole'
import Level from '@/component/ManageLevel/Level'
import Role from '@/component/ManageRole/Role'
import Users from '@/component/ManageUser/Users'
import Vocal from '@/component/ManageVocal/Vocal'
import { UserContext } from '@/context/UserContext'
import { redirect, usePathname } from 'next/navigation'
import { useContext } from 'react'

const AppRoutes = () => {
    const pathname = usePathname()
    const { user } = useContext(UserContext)

    // check permission step 1
    let authenticated:boolean
    user.isLoading === false ? authenticated = true : authenticated = user.isAuthenticated && user.account.groupWithRoles.id === 2 && user.account.groupWithRoles.name === 'admin'

    if (authenticated) {
        switch (pathname) {
            case '/admin/users':
                return <Users />
            case '/admin/roles':
                return <Role />
            case '/admin/group-role':
                return <GroupRole />
            case '/admin/vocal':
                return <Vocal />
            case '/admin/level':
                return <Level />
            default:
                return <div className='container'>404 not found</div>
        }
    } else {
        redirect('/login')
    }
}

export default AppRoutes