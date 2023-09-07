import {ReactElement, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import Image from "next/image";
import {trpc} from "@/shared/utils/trpc";
import CourseModules from "@/shared/ui/course/ui/CourseModules/CourseModules";
import {Loader} from "@/shared/ui/Loader";
import {useSession} from "next-auth/react";
import CourseForm from "@/shared/ui/course/ui/CourseForm/CourseForm";
import {difficultLevelBadgeHelper} from "@/shared/helpers";
import CreateModule from "@/shared/ui/course/ui/CreateModule/CreateModule";

enum Tabs {
    ABOUT = 'About',
    COURSE_CONTENT = 'Course content',
    REVIEWS = 'Reviews'
}

const CoursePage = () => {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.ABOUT)
    const [courseModulesEdit, setCourseModuleEdit] = useState(false)
    const [isUserCourse, setIsUserCourse] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [moduleCreated, setModuleCreated] = useState(false)

    const router = useRouter()
    const session = useSession()

    const {data, isLoading, error} = trpc.getCourseById.useQuery({course_id: router.query.id as string})
    const updateCourse = trpc.updateCourse.useMutation()

    useEffect(() => {
        if (session.data?.user.id === data?.author_id) {
            setIsUserCourse(true)
            console.log('user role')
        }

    }, [session.data?.user.id, data?.author_id])

    const openEditHandler = () => {
        setEditModalOpen((prev) => !prev);
    };

    const updateCourseHandler = async (data: any) => {
        await updateCourse.mutate({
            ...data,
        })
    };

    const courseModuleEditHandler = () => {
        setCourseModuleEdit(prev => !prev)
    }

    const moduleCreatedHandler = () => {
        setModuleCreated(prev => !prev)
    }

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div>
            {/* Header */}
            <div className={'flex justify-between mb-14'}>
                <div className={'flex flex-col justify-between'}>
                    <div>
                        {difficultLevelBadgeHelper(data?.difficulty_level || '')}
                        <div className={'max-w-[400px] mb-5'}>
                            <h3 className={'text-3xl font-extrabold'}>{data?.title}</h3>
                        </div>
                        <div className={'max-w-[600px] mb-5'}>
                            <p>
                                {data?.cover_description}
                            </p>
                        </div>

                    </div>
                    <div className={'flex justify-center flex-col gap-3'}>
                        <div className={'flex justify-between gap-10'}>
                            <p>
                                <span>{data?.students_id.length}</span> {data?.students_id.length! !== 1 ? 'students' : 'student'}
                            </p>
                            <p>{data?.duration}</p>
                            <p>Created at 27.03.23</p>
                            <p>Last update at 27.03.23</p>
                        </div>
                        <Button theme={ButtonThemes.FILLED}>Add to courses</Button>
                        {
                            isUserCourse && <>
                                <Button theme={ButtonThemes.FILLED} onClick={openEditHandler}>Edit course</Button>
                            </>
                        }
                        <Modal isOpen={editModalOpen} setIsOpen={openEditHandler}>
                            <CourseForm courseData={data} onSubmit={updateCourseHandler} isCreating={false}/>
                        </Modal>

                    </div>

                </div>
                <div>
                    <Image src={data?.cover_image!} alt={'image'}
                           className={'max-w-[550px]  object-cover'}
                           width={700}
                           height={350}/>
                </div>
            </div>

            {/*    Main Content*/}
            <div>
                <div className={'flex justify-between'}>
                    <div>
                        <Button theme={ButtonThemes.TEXT} onClick={() => {
                            setCurrentTab(Tabs.ABOUT)
                        }}>
                            {Tabs.ABOUT}
                        </Button>
                        <Button theme={ButtonThemes.TEXT} onClick={() => {
                            setCurrentTab(Tabs.COURSE_CONTENT)
                        }}>
                            {Tabs.COURSE_CONTENT}
                        </Button>
                        <Button theme={ButtonThemes.TEXT} onClick={() => {
                            setCurrentTab(Tabs.REVIEWS)
                        }}>
                            {Tabs.REVIEWS}
                        </Button>
                    </div>
                    {
                        currentTab === Tabs.COURSE_CONTENT &&
                        isUserCourse && (
                            !courseModulesEdit ?
                                <Button theme={ButtonThemes.FILLED} onClick={courseModuleEditHandler}>Edit</Button>
                                :
                                <div className={'flex gap-x-2'}>
                                    <Button theme={ButtonThemes.FILLED} onClick={courseModuleEditHandler}>Save</Button>
                                    <Button theme={ButtonThemes.FILLED} onClick={courseModuleEditHandler}>Cancel</Button>
                                </div>)
                    }
                </div>

                {/* About */}
                <div>
                    {
                        currentTab === Tabs.ABOUT && <>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci autem cumque distinctio
                            exercitationem expedita impedit inventore ipsam minima, odio qui quibusdam quo quos sapiente
                            voluptatem? Accusamus eum provident temporibus?
                        </>
                    }
                </div>

                {/* Course content */}
                <div>
                    {
                        currentTab === Tabs.COURSE_CONTENT && <>
                            {isUserCourse && courseModulesEdit && <CreateModule courseId={data?.id!}/>}
                            <CourseModules courseModulesEdit={courseModulesEdit} course_id={data?.id!}/>
                        </>
                    }
                </div>

                {/* Reviews */}

                <div>
                    {
                        currentTab === Tabs.REVIEWS && <>
                            Reviews
                        </>
                    }
                </div>
            </div>

        </div>
    );
};

CoursePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <UserLayout>
                {page}
            </UserLayout>
        </Layout>
    )
}
export default CoursePage;
