"use server";
import { cookies } from "next/headers";

const setCookie = async (user:any) => {
    cookies().set({
        name: 'vocal-auth-google-cl',
        value: user,
        secure: true,
        httpOnly: true,
        path: '/',
        domain: process.env.BE_URL_DOMAIN,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000
    })

    cookies().set({
        name: 'vocal-auth-google-sv',
        value: user,
        secure: true,
        httpOnly: true,
        path: '/',
        domain: process.env.BE_URL_DOMAIN,
        sameSite: 'lax', 
        maxAge: 60 * 60 * 1000
    })
}

const removeCookie = () => {
    cookies().delete('vocal-auth-google-cl')
    cookies().delete('vocal-auth-google-sv')
}

export { setCookie, removeCookie }

