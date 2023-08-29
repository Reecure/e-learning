"use client"

import {ReactElement, useEffect} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";
import {UserProfileComponent} from "@/shared/ui/profile";

const UserProfile = () => {
    const session = useSession()

    const {data, isLoading} = trpc.getUser.useQuery({email: session.data?.user?.email!})

    if (isLoading) {
        return <Loader/>
    }

    if (data === null || data === undefined) {
        return <>Error!!!</>;
    }

    return (
        <div>
            <UserProfileComponent user={data}/>
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
