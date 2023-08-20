
import { Inter } from 'next/font/google'
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";
import {FormEventHandler, useEffect, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [userInputs, setUserInputs] = useState({ email: 'user123@gm.com',
        password: '1234'})
    const session = useSession()

    const handleSubmit:  FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            email: userInputs.email,
            password: userInputs.password,
            redirect: false
        })

    console.log(res)
    }

    return (
        <main className={'space-x-4 w-full h-screen flex justify-center items-center'}>
            <form onSubmit={handleSubmit}>
                <button type={"submit"} className='border-2 border-white rounded-xl p-10' >sign in</button>
            </form>
            {
                session.status === 'authenticated' &&  <button onClick={() => signOut()} className='border-2 border-white rounded-xl p-10'>log out</button>
            }

        </main>
    )
}
