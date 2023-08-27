import {FormEventHandler, useState} from "react";
import {signIn} from "next-auth/react";
import {Routes} from "@/shared/config/routes";
import {useRouter} from "next/router";
import AuthForm from "@/pages/auth/ui/AuthForm";
import {useForm} from "react-hook-form";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";


interface LoginForm {
    email: string
    password: string
}

interface AuthError {
    isError: boolean,
    message: string
}

export default function SignInPage() {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>()
    const [authError, setAuthError] = useState<AuthError>({isError: false, message: ''})
    const router = useRouter()

    return (
        <AuthForm>

            <form onSubmit={handleSubmit(async (data) => {
                const res = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                })

                if (res?.status !== 200) {
                    setAuthError((prev) => ({isError: true, message: res?.error || 'Some error try again later'}))
                } else {
                    setAuthError((prev) => ({...prev, isError: false}))
                    router.push(Routes.USER_PROFILE)
                }
            })}
                  className={'max-w-[500px] flex flex-col gap-5 w-full p-5 rounded-xl border-2 border-light-primary-main dark:border-dark-primary-main'}>

                {authError.isError && <p className={'text-light-error-main'}>{authError.message}</p>}

                <label htmlFor="" className={'relative'}>
                    <p className={'absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background px-1'}>Email</p>
                    <input type="text"
                           className={'w-full px-2 py-1 bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main rounded-lg focus:outline-0'}
                           {...register('email', {required: true})}
                    />
                    {errors.email && <p className={'text-light-error-main'}>email is required</p>}
                </ label>
                <label htmlFor="" className={'relative'}>
                    <p className={'absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background px-1'}>Password</p>
                    <input type="text"
                           className={'w-full px-2 py-1 bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main rounded-lg focus:outline-0'}
                           {...register('password', {required: true})}
                    />
                    {errors.password && <p className={'text-light-error-main'}>password is required</p>}
                </ label>
                <Button theme={ButtonThemes.FILLED}>SUBMIT</Button>
            </form>
        </AuthForm>

    )
}

