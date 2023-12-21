import { createContext, useEffect, useState } from "react"
import { getUserAccount } from '../services/userService'
import { useSession } from "next-auth/react"
import { setCookie } from "@/component/Cookie/actionCookie"
interface user {
    isLoading: boolean
    isAuthenticated: boolean,
    token: string,
    account: any
}

type GlobalContent = {
    user: user,
    setUser: (user:user) => void
    loginContext: (userData: any) => void,
    logoutContext: () => void,
}
const UserContext = createContext<GlobalContent>({ 
    user: {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }, 
    setUser: () => {},
    loginContext: () => {}, 
    logoutContext: () => {}
})

const UserProvider  = ({ children }: {children: any}) => {
    const { data: session  }:any = useSession()
    
    useEffect(() => {
        (session !== null && session?.user !== undefined) && setCookie(JSON.stringify(session?.user))
    }, [session])

    // User is the name of the "data" that gets stored in context
    const userDefaullt = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: { }
    }

    const [user, setUser] = useState<user>(userDefaullt)
    
    // Login updates the user data with a name parameter
    const loginContext = (userData: any) => {
        setUser({ ...userData, isLoading: false })
    }

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userDefaullt, isLoading: false });
    }

    const fetchUser  = async () => {
        let response: any = await getUserAccount()
        if (response && response.EC === 0) {
            let { groupWithRoles, email, username, access_token } = response.DT
            let data = {
                isAuthenticated: true,
                token: access_token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setUser({...userDefaullt, ...data})
        } else {
            setUser({ ...userDefaullt, isLoading: false });
        }
    }
    useEffect(() => {
        // (user.isAuthenticated || (session !== null && session?.user !== undefined)) ? fetchUser() : setUser({...userDefaullt, isLoading: false})
        user.account.groupWithRoles !== undefined ? fetchUser() : setUser({...userDefaullt, isLoading: false})
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }