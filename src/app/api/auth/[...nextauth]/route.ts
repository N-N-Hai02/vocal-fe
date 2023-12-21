import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
// import CredentialsProvider from '@/component/ManageAuthGoogle/credentials'

const options: any = {
    session: {
        strategy: 'jwt'
    },
    site: process.env.NEXTAUTH_URL,
    providers: [
        // CredentialsProvider,
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        jwt: async ({ token, user }: any) => {
            user && (token.user = user)
            return token
        },
        async session({ session, token, user }: any) {
            return {
                ...session,
                user: { ...session.user, ...user, ...token.user! }
            }
        },
    },
    cookies: {
        sessionToken: {
            name: 'HaiNguyen.session-token',
            options: {
                httpOnly: true,
                sameSite: 'none',
                path: '/',
                secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? true : false,
                maxAge: 60 * 60 * 1000
            }
        },
        callbackUrl: {
            name: 'HaiNguyen.callback-url',
            options: {
                sameSite: 'none',
                path: '/',
                secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? true : false
            }
        },
        csrfToken: {
            name: 'HaiNguyen.csrf-token',
            options: {
                sameSite: 'none',
                path: '/',
                secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? true : false
            }
        }
    }
}

const handler = (req: any, res: any) => NextAuth(req, res, options)

export { handler as GET, handler as POST }