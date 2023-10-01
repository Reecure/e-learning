import {type ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";
import {useSession} from "next-auth/react";
import CreateModule from "@/shared/ui/course/ui/CreateModule/CreateModule";
import CourseTabs from "@/shared/ui/course/ui/CourseTabs/CourseTabs";
import CourseHeader from "@/shared/ui/course/ui/CourseHeader/CourseHeader";
import CourseAboutTab from "@/shared/ui/course/ui/CourseTabs/CourseAboutTab";
import CourseReviewsTab from "@/shared/ui/course/ui/CourseTabs/CourseReviewsTab";
import CourseContentTab from "@/shared/ui/course/ui/CourseTabs/CourseContentTab";

export enum Tabs {
    ABOUT = "About",
    COURSE_CONTENT = "Course content",
    REVIEWS = "Reviews",
}

const CoursePage = () => {
	const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.ABOUT);
	const [courseModulesEdit, setCourseModuleEdit] = useState(false);
	const [moduleCreated, setModuleCreated] = useState(false);
	const [isUserCourse, setIsUserCourse] = useState(false);

	const router = useRouter();
	const session = useSession();

	const {data, isLoading} = trpc.getCourseById.useQuery({
		course_id: router.query.id as string,
	});

	useEffect(() => {
		if (session.data?.user.id === data?.author_id) {
			setIsUserCourse(true);
		}
	}, [session.data?.user.id, data?.author_id]);

	useEffect(() => {
		console.log(data?.id);
	}, [data]);

	const courseModuleEditHandler = () => {
		setCourseModuleEdit(prev => !prev);
	};

	const setCurrentTabHandler = (current: Tabs) => {
		setCurrentTab(current);
	};

	if (data?.id === undefined) {
		return <>course doesnt exist</>;
	}

	if (isLoading) {
		return <Loader/>;
	}

	return (
		<div>
			{data && (
				<CourseHeader
					data={data}
					isUserCourse={isUserCourse}
				/>
			)}

			<div className={""}>
				<div className={"flex justify-between items-center"}>
					<CourseTabs
						currentTab={currentTab}
						setCurrentTab={setCurrentTabHandler}
					/>
					{currentTab === Tabs.COURSE_CONTENT && isUserCourse && (!courseModulesEdit ? (
						<Button
							theme={ButtonThemes.FILLED}
							onClick={courseModuleEditHandler}
							className={"ml-5"}
						>
                            Edit
						</Button>
					) : (
						<div className={"flex gap-x-2"}>
							<Button
								theme={ButtonThemes.FILLED}
								onClick={courseModuleEditHandler}
								className={"ml-5"}
							>
                                Close
							</Button>
						</div>
					))}
				</div>

				<div className={"mt-5"}>
					{currentTab === Tabs.ABOUT && (
						<CourseAboutTab
							courseAboutText={data?.description || ""}
						/>
					)}
				</div>

				<div>
					{currentTab === Tabs.COURSE_CONTENT && (
						<>
							{isUserCourse && courseModulesEdit && (
								<CreateModule
									courseId={router.query.id as string}
								/>
							)}
							<CourseContentTab
								courseModulesEdit={courseModulesEdit}
								moduleId={router.query.id as string}
								isUserAuthor={isUserCourse}
							/>
						</>
					)}
				</div>

				<div className={"mt-5"}>
					{currentTab === Tabs.REVIEWS && <CourseReviewsTab/>}
				</div>
			</div>
		</div>
	);
};

CoursePage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<UserLayout>{page}</UserLayout>
		</Layout>
	);
};

export default CoursePage;
