import {ReactElement} from 'react';
import Layout from "@/pages/layout";
import {SmallCard} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import UserLayout from "@/pages/user/layout";


const CoursesPage = () => {
    const session = useSession()

    const courses = trpc.getUserCourses.useQuery({author_id: session.data?.user.id!})

    if (courses.error) {
        return <p>Error</p>
    }

    return (
        <div className={'grid grid-cols-3 gap-5'}>
            {courses.status === 'success' && courses.data.map((item) => {
                return <SmallCard key={item.id} course={item}/>
            })}
        </div>
    );
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default CoursesPage;
