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
    let authenticated:boolean = user.isAuthenticated && user.account.groupWithRoles.id === 2 && user.account.groupWithRoles.name === 'admin'

    switch (pathname) {
        case '/admin/users':
            return <>{authenticated && <Users />}</>
        case '/admin/roles':
            return <>{authenticated && <Role />}</>
        case '/admin/group-role':
            return <>{authenticated && <GroupRole />}</>
        case '/admin/vocal':
            return <>{authenticated && <Vocal />}</>
        case '/admin/level':
            return <>{authenticated && <Level />}</>
        default:
            return <div className='container'>404 not found</div>
    }
}

export default AppRoutes