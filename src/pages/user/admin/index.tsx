import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";

const UserAdmin = () => {

    return (
        <div>
            <div>UserAdmin</div>
        </div>
    );
};

UserAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default UserAdmin;
