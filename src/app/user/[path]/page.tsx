"use client"
import VocabularyList from '@/component/ManageVocalbulary/VocabularyList'
import VocalbularyDetail from '@/component/ManageVocalbulary/VocalbularyDetail'
import VocalbularyFavorite from '@/component/ManageVocalbulary/VocalbularyFavorite'
import VocalbularyFlashcard from '@/component/ManageVocalbulary/VocalbularyFlashcard'
import VocalbularyHome from '@/component/ManageVocalbulary/VocalbularyHome'
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
        case '/user/Vocalbulary-Home':
            return <>{authenticated && <VocalbularyHome />}</>
        case '/user/Detail-Vocal':
            return <>{authenticated && <VocalbularyDetail />}</>
        case '/user/Flashcard-Vocal':
            return <>{authenticated && <VocalbularyFlashcard />}</>
        case '/user/List-Vocal':
            return <>{authenticated && <VocabularyList />}</>
        case '/user/Test-Vocal':
            return <>{authenticated && <VocalbularyTest />}</>
        case '/user/Favorite-Vocal':
            return <>{authenticated && <VocalbularyFavorite />}</>
        default:
            return <div className='container'>404 not found vocalbulary</div>
    }
}

export default VocalBularyRoute