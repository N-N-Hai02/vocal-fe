"use client"
import { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"

interface Props { children: ReactNode }

const AuthGoogleProviders = (props: Props) => <SessionProvider>{props.children}</SessionProvider>

export default AuthGoogleProviders