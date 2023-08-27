import {ReactElement, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import Image from "next/image";
import {trpc} from "@/shared/utils/trpc";
import CourseModules from "@/pages/user/my-courses/course/ui/CourseModules/CourseModules";

enum Tabs {
    ABOUT = 'About',
    COURSE_CONTENT = 'Course content',
    REVIEWS = 'Reviews'
}

const CoursePage = () => {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.ABOUT)
    const router = useRouter()

    const courseQuery = trpc.getCourseById.useQuery({course_id: router.query.id as string})


    useEffect(() => {
        console.log(courseQuery.data)
    }, [courseQuery])

    if (courseQuery.error) {
        return <div>Error loading course data</div>;
    }

    if (courseQuery.isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className={'flex justify-between mb-14'}>
                <div>
                    <div className={'mb-5'}>
                        <p>
                            some tag
                        </p>
                    </div>
                    <div className={'max-w-[400px] mb-5'}>
                        <h3 className={'text-3xl font-extrabold'}>Zero to hero in React Js with Thomas Wayne</h3>
                    </div>
                    <div className={'max-w-[600px] mb-5'}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Adipisci consequuntur culpa doloribus eum facere,
                            facilis ipsa laboriosam.
                        </p>
                    </div>
                    <div className={'flex gap-10 mb-5'}>
                        <p><span>735</span> students</p>
                        <p>6 hr</p>
                        <p>Created at 27.03.23</p>
                    </div>
                    <div>
                        <Button theme={ButtonThemes.FILLED}>Start now</Button>
                    </div>
                </div>
                <div>
                    <Image src={courseQuery.data?.cover_image!} alt={'image'}
                           width={700}
                           height={450}/>
                </div>
            </div>

            {/*    Main Content*/}
            <div>
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
                            <CourseModules course_id={courseQuery.data?.id!}/>
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
