// "use client"
// import Head from 'next/head'
// import { useSession, signIn, signOut } from "next-auth/react"

// const SinginButton = () => {
//     const { data: session, token }:any = useSession()

//     console.log("check session:", session)
//     console.log("check token:", token)

//     return (
//         <div>
//             <Head>
//                 <title>Create Next App</title>
//                 <meta name="description" content="Generated by create next app" />
//                 <link rel="icon" href="/favicon.ico" />
//             </Head>
//             <div>
//                 {session && session?.user ? (
//                     <button onClick={() => signOut()}>Sign out</button>
//                 ) : (
//                     <button onClick={() => signIn()}>Sign in</button>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default SinginButton