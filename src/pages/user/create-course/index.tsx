import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";


const UserCreateCourse = () => {

    return (
        <div>
            <div>UserCreateCourse</div>
        </div>
    );
};

UserCreateCourse.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default UserCreateCourse;
