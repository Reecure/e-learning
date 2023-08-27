import {FC, ReactElement, useEffect} from 'react';
import Layout from "@/pages/layout";
import {SmallCard} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";
import UserLayout from "@/pages/user/layout";

const CoursesPage = () => {
    const session = useSession()

    const courses = trpc.getUserCourses.useQuery({author_id: session.data?.user.id!})

    if (courses.error) {
        return <p>Error</p>
    }

    return (
        <>
            {courses.status === 'success' && courses.data.map(item => {
                return <Link href={`/user/my-courses/course/${item.id}`} key={item.id}>{item.title}</Link>
            })}
        </>
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
