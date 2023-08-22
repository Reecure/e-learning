"use client"

import {Inter} from 'next/font/google'
import {FormEventHandler, useEffect, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";


export default function SignInPage() {
    const [userInputs, setUserInputs] = useState({
        username: '',
        password: ''
    })
    const session = useSession()

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            username: userInputs.username,
            password: userInputs.password,
            redirect: true,
            callbackUrl: Routes.USER_PROFILE
        })

        console.log(res)
    }

    useEffect(() => {
        console.log(session)
    }, [session])

    return (
        <main
            className={'space-x-4 w-full h-screen flex justify-center items-center bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text'}>
            <form onSubmit={handleSubmit}
                  className={'max-w-[500px] flex flex-col gap-5 w-full p-5 rounded-xl border-2 border-light-primary-main dark:border-dark-primary-main'}>
                <p className={'text-center font-bold text-xl uppercase'}>Login form</p>
                <div
                    className={'mx-auto mb-3 rounded-full w-[150px] p-1 flex justify-between border-2 border-light-primary-main dark:border-dark-primary-main'}>

                    <Link href={Routes.LOGIN}
                          className={'bg-dark-primary-hover-second p-1 rounded-full '}>SIGN IN</Link>


                    <Link href={Routes.SIGNUP} className={'p-1'}>SIGN UP</Link>
                </div>
                <label htmlFor="" className={'relative'}>
                    <p className={'absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background p-0'}>username</p>
                    <input type="text"
                           className={'w-full px-2 py-1 bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main rounded-lg focus:outline-0'}
                           onChange={(e) => setUserInputs(prevState => ({...prevState, username: e.target.value}))}
                    />
                </label>
                <label htmlFor="" className={'relative'}>
                    <p className={'absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background p-0'}>password</p>
                    <input type="text"
                           className={'w-full px-2 py-1 bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main rounded-lg focus:outline-0'}
                           onChange={(e) => setUserInputs(prevState => ({...prevState, password: e.target.value}))}
                    />
                </label>

                <Button theme={ButtonThemes.OUTLINED} className={'w-full mt-2'} type={'submit'}>Sign in</Button>
            </form>
            {
                session.status === 'authenticated' &&
                <button onClick={() => signOut({
                    redirect: true,
                    callbackUrl: '/'
                })} className='border-2 border-white rounded-xl p-10'>log out</button>
            }

        </main>
    )
}
