import {FC, ReactElement} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useAppSelector} from "@/app/ReduxProvider/config/hooks";
import {counterSelector} from "@/pages/user/profile/model";


const UserGrades = () => {
    return (
        <div>
            <div>UserGrades</div>
        </div>
    );
};
UserGrades.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default UserGrades;
