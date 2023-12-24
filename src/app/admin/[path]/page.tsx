"use client"
import GroupRole from '@/component/ManageGroupRole/GroupRole'
import Level from '@/component/ManageLevel/Level'
import Role from '@/component/ManageRole/Role'
import Users from '@/component/ManageUser/Users'
import Vocal from '@/component/ManageVocal/Vocal'
import { UserContext } from '@/context/UserContext'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

const AppRoutes = () => {
    const pathname = usePathname()
    const { user } = useContext(UserContext)

    // check permission step 1
    const authenAdmin:boolean = user.isAuthenticated && (user.account.groupWithRoles.id === 2 && user.account.groupWithRoles.name === 'admin')
    const authenMember:boolean = user.isAuthenticated && (user.account.groupWithRoles.id === 1 && user.account.groupWithRoles.name === 'member')

    switch (pathname) {
        case '/admin/users':
            return <>{authenAdmin && <Users />}</>
        case '/admin/roles':
            return <>{authenAdmin && <Role />}</>
        case '/admin/group-role':
            return <>{authenAdmin && <GroupRole />}</>
        case '/admin/vocal':
            return <>{(authenAdmin || authenMember) && <Vocal />}</>
        case '/admin/level':
            return <>{(authenAdmin || authenMember) && <Level />}</>
        default:
            return <div className='container'>404 not found</div>
    }
}

export default AppRoutes