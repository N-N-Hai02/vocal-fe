import CredentialsProvider from 'next-auth/providers/credentials'

export default CredentialsProvider({
    name: 'Credentials',
    credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'email@site.com' },
        password: { label: 'Password', type: 'password', placeholder: 'password' },
    },
    async authorize({ username, password }: any, _req) {
        console.log("check username: ", username)
        console.log("check password: ", password)
        console.log("check _req: ", _req)
        // try {
        //     const { data, error }: any = await fetch("http://")
        //     if (!data?.user || error) {
        //         return null
        //     }
        //     return data.user
        // } catch (error) {
        //     return error
        // }
        return null
    },
})