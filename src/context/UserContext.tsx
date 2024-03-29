import { createContext, useEffect, useState } from "react"
import { getUserAccount } from '../services/userService'
interface UserType {
    isLoading: boolean
    isAuthenticated: boolean,
    token: string,
    account: any
}

type GlobalContent = {
    user: UserType,
    setUser: (user: UserType) => void
    loginContext: (userData: any) => void,
    logoutContext: () => void,
}
const UserContext:any = createContext<GlobalContent>({ 
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
    // User is the name of the "data" that gets stored in context
    const userDefaullt = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: { }
    }

    const [user, setUser] = useState<UserType>(userDefaullt)
    
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
            let { groupWithRoles, email, username, access_token, id } = response.DT
            let data = {
                isAuthenticated: true,
                token: access_token,
                account: { groupWithRoles, email, username, id },
                isLoading: false
            }
            groupWithRoles?.Roles !== undefined ? setUser({...userDefaullt, ...data}) : setUser({...userDefaullt, isLoading: false})
        } 
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext }