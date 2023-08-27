import {FC, ReactElement, useEffect, useState} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import LessonContent from "@/shared/ui/course/ui/LessonContent/LessonContent";

const CourseModuleLessonsPage = () => {

    const [currentLesson, setCurrentLesson] = useState('')
    const router = useRouter()
    const lessons = trpc.getLessonsByModuleId.useQuery({module_id: router.query.id! as string})

    useEffect(() => {
        if (!lessons.isLoading && !lessons.error)
            setCurrentLesson(lessons.data[0]?.id)
    }, [lessons.isLoading])

    if (lessons.isLoading) {
        return <>Loading...</>
    }

    return (
        <div className={'flex'}>
            <div
                className={'bg-light-primary-main dark:bg-dark-neutral-100 p-5 max-w-[250px] w-full h-[calc(100vh_-_62px)]'}>
                <p className={'text-xl mb-5'}>Lessons</p>
                <div className={'flex flex-col gap-3'}>
                    {
                        lessons.data?.map((lesson, i) => {
                            return <p key={lesson.id}
                                      onClick={() => setCurrentLesson(lesson.id)}
                                      className={'w-full py-1 px-3 border-[1px] border-light-primary-main rounded-md hover:opacity-70 cursor-pointer'}>{lesson.title}</p>
                        })
                    }

                </div>
            </div>
            <div className={'ml-5 w-full overflow-y-auto'}>
                <LessonContent lesson_id={currentLesson}/>
            </div>
        </div>
    );
};

CourseModuleLessonsPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout contentClassName={'!p-0'}>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default CourseModuleLessonsPage;
