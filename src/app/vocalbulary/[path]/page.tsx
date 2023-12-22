"use client"
import VocabularyList from '@/component/ManageVocalbulary/VocabularyList'
import VocalbularyDetail from '@/component/ManageVocalbulary/VocalbularyDetail'
import VocalbularyFlashcard from '@/component/ManageVocalbulary/VocalbularyFlashcard'
import VocalbularyTest from '@/component/ManageVocalbulary/VocalbularyTest'
import { UserContext } from '@/context/UserContext'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useContext } from 'react'

const VocalBularyRoute = () => {
    const pathname = usePathname()
    const { data: session }: any = useSession()
    const { user } = useContext(UserContext)

    // check permission step 1
    let authenticated:boolean = (user.isAuthenticated || (session?.user !== undefined))

    switch (pathname) {
        case '/vocalbulary/Detail':
            return <>{authenticated && <VocalbularyDetail />}</>
        case '/vocalbulary/Flashcard':
            return <>{authenticated && <VocalbularyFlashcard />}</>
        case '/vocalbulary/List':
            return <>{authenticated && <VocabularyList />}</>
        case '/vocalbulary/Test':
            return <>{authenticated && <VocalbularyTest />}</>
        default:
            return <div className='container'>404 not found vocalbulary</div>
    }
}

export default VocalBularyRoute