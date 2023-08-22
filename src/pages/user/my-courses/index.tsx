import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";

const UserCourses = () => {

    return (
        <div>
            <div>UserCourses</div>
        </div>
    );
};

UserCourses.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}

export default UserCourses;
