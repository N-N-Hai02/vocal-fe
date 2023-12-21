"use server";
import { cookies } from "next/headers";

const setCookie = async (user:any) => {
    cookies().set({
        name: 'vocal-auth-google',
        value: user,
        httpOnly: true,
        path: '/',
    })
}

const removeCookie = () => cookies().delete('vocal-auth-google')

export { setCookie, removeCookie }

