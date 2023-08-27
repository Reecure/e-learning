import {FC, FormEvent, useEffect, useState} from 'react';
import AuthForm from "@/pages/auth/ui/AuthForm";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import {Routes} from "@/shared/config/routes";
import {signIn} from "next-auth/react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useForm} from "react-hook-form";


interface SignupForm {
    firstname: string,
    lastname: string,
    password: string,
    email: string
}

const SignUpPage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<SignupForm>({
        defaultValues: {
            email: '',
            lastname: '',
            password: '',
            firstname: ''
        }
    })

    const [status, setStatus] = useState<null | string>(null)

    const mutation = trpc.createUser.useMutation()
    const router = useRouter()

    useEffect(() => {
        // if (status === 'success') {
        //     router.push(Routes.LOGIN)
        // }
    }, [mutation])

    if (status === 'loading') {
        return <>
            Loading ...
        </>
    }

    return (
        <AuthForm>
            <form onSubmit={handleSubmit(async (data) => {
                const res = await mutation.mutate({
                    email: data.email,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    password: data.password,
                })
                console.log(res)
                console.log(mutation)
            })}
                  className={'max-w-[500px] flex flex-col gap-5 w-full p-5 rounded-xl border-2 border-light-primary-main dark:border-dark-primary-main'}>
                <label htmlFor="" className={'relative'}>
                    <p className={'absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background px-1'}>Firstname</p>
                    <input type="text"
                           className={'w-full px-2 py-1 bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main rounded-lg focus:outline-0'}
                           {...register('firstname', {required: true})}
                    />
                    {errors.firstname && <p className={'text-light-error-main'}>email is required</p>}
                </ label>

                <label htmlFor="" className={'relative'}>
                    <p className={'absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background px-1'}>Lastname</p>
                    <input type="text"
                           className={'w-full px-2 py-1 bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main rounded-lg focus:outline-0'}
                           {...register('lastname', {required: true})}
                    />
                    {errors.lastname && <p className={'text-light-error-main'}>password is required</p>}
                </ label>

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
};
export default SignUpPage;
