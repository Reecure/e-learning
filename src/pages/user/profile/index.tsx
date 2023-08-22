"use client"

import {ReactElement} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";

const UserProfile = () => {


    return (
        <div>
            <div>UserProfile</div>
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
