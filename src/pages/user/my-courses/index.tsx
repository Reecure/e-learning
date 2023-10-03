import React, {type ReactElement, useState} from "react";
import Layout from "@/pages/layout";
import {Button, SmallCard} from "@/shared/ui";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import UserLayout from "@/pages/user/layout";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {ErrorWidget} from "@/widgets/ErrorWidget";
import {useRole} from "@/shared/hooks";
import {UserRoles} from "@/enteties/User";
import {type Course} from "@/enteties/Course";

enum CourseType {
    MyCourses = "My Courses",
    SubscribedCourses = "Subscribed",
}

const CoursesPage = () => {
	const session = useSession();

	const [courseRendered, setCoursesRendered] = useState(
		CourseType.SubscribedCourses,
	);

	const role = useRole();

	const subscribedCourses = trpc.getUserSubscribedCourses.useQuery({
		user_id: session.data?.user?.id || "",
	});
	const myselfCourses = trpc.getUserCustomCourses.useQuery({
		user_id: session.data?.user?.id || "",
	});

	if (subscribedCourses.error || myselfCourses.error) {
		return <ErrorWidget/>;
	}

	return (
		<>
			<div className={"relative mb-10"}>
				<div className={" flex gap-3"}>
					<div
						className={`${
							courseRendered === CourseType.SubscribedCourses
                            && "pb-3 border-b-4 border-light-primary-main dark:border-dark-primary-main z-[1]"
						}`}
					>
						<Button
							theme={ButtonThemes.TEXT}
							onClick={() => {
								setCoursesRendered(CourseType.SubscribedCourses);
							}}
						>
							{CourseType.SubscribedCourses}
						</Button>
					</div>
					<div
						className={`${
							courseRendered === CourseType.MyCourses
                            && "pb-3 border-b-4 border-light-primary-main dark:border-dark-primary-main z-[1]"
						}`}
					>
						{
							role === UserRoles.ADMIN || role === UserRoles.TEACHER ? <Button
								theme={ButtonThemes.TEXT}
								onClick={() => {
									setCoursesRendered(CourseType.MyCourses);
								}}
							>
								{CourseType.MyCourses}
							</Button> : <></>
						}
					</div>
				</div>
				<div
					className={
						"w-full h-[1px]  bg-light-primary-main dark:bg-dark-primary-main absolute bottom-[1px]"
					}
				></div>
			</div>
			<div>
				{
					(
						<>
							{courseRendered === CourseType.MyCourses ? (
								<div className={"grid grid-cols-1 gap-5"}>
									{subscribedCourses.status === "success" && myselfCourses.data?.map(item =>
										<SmallCard key={item.id}
											course={item as Course}/>)}
								</div>
							) : (
								<div className={"grid grid-cols-1 gap-5"}>
									{myselfCourses.status === "success" && subscribedCourses.data?.map(item =>
										<SmallCard key={item.id}
											course={item as Course}/>)}
								</div>
							)}
						</>
					)
				}
			</div>
		</>
	);
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<UserLayout>{page}</UserLayout>
		</Layout>
	);
};

export default CoursesPage;
