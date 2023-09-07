import {ReactElement, useEffect, useState} from 'react';
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {useRouter} from "next/router";
import LessonContent from "@/shared/ui/course/ui/LessonContent/LessonContent";
import CreateLesson from "@/shared/ui/course/ui/CreateLesson/CreateLesson";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import CourseLessons from "@/shared/ui/course/ui/CourseLessons/CourseLessons";

const CourseModuleLessonsPage = () => {
    const [currentLesson, setCurrentLesson] = useState('')
    const [canLessonEdit, setCanLessonEdit] = useState(false)
    const router = useRouter()
    const lessons = trpc.getLessonsByModuleId.useQuery({module_id: router.query.id! as string})


    useEffect(() => {
        if (!lessons.isLoading && !lessons.error)
            setCurrentLesson(lessons.data[0]?.id)
    }, [lessons.isLoading])

    const CanLessonEditHandler = () => {
        setCanLessonEdit(prev => !prev)
    }


    if (lessons.isLoading) {
        return <>Loading...</>
    }

    return (
        <div className={'flex'}>
            <div
                className={'bg-light-primary-main dark:bg-dark-neutral-100 p-5 max-w-[250px] w-full h-[calc(100vh_-_62px)]'}>
                <div className={'flex justify-between items-center mb-5'}>
                    <p className={'text-xl mb-5'}>Lessons</p>
                    <Button theme={ButtonThemes.FILLED} onClick={CanLessonEditHandler}
                            className={'p-1!'}>Edit</Button>
                </div>
                {canLessonEdit && <CreateLesson moduleId={router.query.id as string}/>}

                <CourseLessons moduleId={router.query.id as string} lessonCanEdit={canLessonEdit}/>

                {/*<div className={'flex flex-col gap-3'}>*/}
                {/*    {*/}
                {/*        lessons.data?.map((lesson, i) => {*/}
                {/*            return <p key={lesson.id}*/}
                {/*                      onClick={() => setCurrentLesson(lesson.id)}*/}
                {/*                      className={'w-full py-1 px-3 border-[1px] border-light-primary-main rounded-md hover:opacity-70 cursor-pointer'}>{lesson.title}</p>*/}
                {/*        })*/}
                {/*    }*/}

                {/*</div>*/}
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
