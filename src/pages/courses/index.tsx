import {FC, ReactElement} from 'react';
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";
import {SmallCard} from "@/shared/ui";
import Layout from "@/pages/layout";
import BlogPage from "@/pages/blog";
import {Course} from "@/enteties/Course";

interface Props {
}

const CoursesPage = () => {

    const visibleCourses = trpc.getAllVisibleCourses.useQuery()

    if (visibleCourses.isLoading) {
        return <Loader/>
    }

    return (
        <div className={'mx-20 my-10'}>
            <div className={'grid grid-cols-3 gap-5'}>
                {
                    visibleCourses.data?.map(course => {
                        return <SmallCard key={course.id} course={course as Course}/>
                    })
                }
            </div>
        </div>
    );
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default CoursesPage;

