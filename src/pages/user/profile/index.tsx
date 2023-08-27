"use client"

import {ReactElement, useEffect} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";

const UserProfile = () => {
    const session = useSession()

    const {data, fetchStatus} = trpc.getUser.useQuery({email: session.data?.user?.email!})

    if (fetchStatus === 'fetching') {
        return <>Loadding...</>
    }

    if (data === null || undefined) {
        return <>Error!!!</>
    }

    return (
        <div>
            <div className={'border-1 border-light-primary-main px-2 py-1'}>{data?.firstname}</div>
            <div className={'border-1 border-light-primary-main px-2 py-1'}>{data?.lastname}</div>
            <div className={'border-1 border-light-primary-main px-2 py-1'}>{data?.email}</div>
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
