import {FC, FormEvent, ReactElement, useEffect, useState} from 'react';
import AuthForm from "@/pages/auth/ui/AuthForm";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import {Routes} from "@/shared/config/routes";
import {signIn, useSession} from "next-auth/react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useForm} from "react-hook-form";
import {Input} from "@/shared/ui/Input";
import {Label} from "@/shared/ui/Label";
import {Text} from "@/shared/ui/Text";
import {Loader} from "@/shared/ui/Loader";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import SignInPage from "@/pages/auth/signin";


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
    const session = useSession();

    useEffect(() => {
        if (status === 'success') {
            router.push(Routes.LOGIN)
        }
    }, [mutation])

    if (session.status === 'authenticated') {
        return <div className={'w-full h-full flex justify-center items-center'}>
            <p className={'text-2xl'}>
                You are an authenticated
            </p>
        </div>
    }

    if (status === 'loading') {
        return <Loader/>
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

                <p className={'text-center text-2xl'}>Signup Form</p>

                <Label htmlFor={'firstname'} labelText={'Firstname'}>
                    <input className={'inputField'} {...register('firstname', {required: true})}
                    />
                    {errors.firstname && <Text error text={`Firstname is required`}/>}
                </Label>

                <Label htmlFor={"lastname"} labelText={'Lastname'}>
                    <input className={'inputField'} type="text"
                           {...register('lastname', {required: true})}
                    />
                    {errors.lastname && <Text error text={'Lastname is required'}/>}
                </Label>

                <Label htmlFor={'email'} labelText={'Email'}>
                    <input className={'inputField'} type="text"
                           {...register('email', {required: true})}
                    />
                    {errors.email && <Text error text={'Email is required'}/>}
                </ Label>

                <Label htmlFor={'password'} labelText={'Password'}>
                    <input className={'inputField'} type="password"
                           {...register('password', {required: true})}
                    />
                    {errors.password && <Text error text={'Password is required'}/>}
                </ Label>
                <Button theme={ButtonThemes.FILLED}>SUBMIT</Button>
            </form>
        </AuthForm>
    )
};
SignUpPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default SignUpPage;
