"use client"

import {ReactElement, useEffect} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";
import {UserProfileComponent} from "@/shared/ui/profile";
import {ErrorWidget} from "@/widgets/ErrorWidget";
import {useAppDispatch, useAppSelector} from "@/app/ReduxProvider/config/hooks";
import {counterSelector, decreaseCount, increaseCount} from "@/pages/user/profile/model";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";


const UserProfile = () => {
    const session = useSession()

    const dispatch = useAppDispatch()

    const counter = useAppSelector(counterSelector)
    const {data, isLoading, refetch} = trpc.getUser.useQuery({email: session.data?.user?.email!})

    useEffect(() => {
        refetch()
        console.log('refetch profile')
    }, [counter])

    if (isLoading) {
        return <Loader/>
    }

    if (data === null || data === undefined) {
        return <ErrorWidget/>;
    }

    return (
        <div>
            <UserProfileComponent user={data} refetch={refetch}/>
            {counter}
            <Button theme={ButtonThemes.FILLED} onClick={() => dispatch(increaseCount())}>Inc</Button>
            <Button theme={ButtonThemes.FILLED} onClick={() => dispatch(decreaseCount())}>Dec</Button>
        </div>
    );
};

UserProfile.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}

export default UserProfile;
