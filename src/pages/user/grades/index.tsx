import {type ReactElement, useEffect} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Loader} from "@/shared/ui/Loader";

const UserGrades = () => {

	const session = useSession();
	const coursesWithProgress = trpc.getUserCoursesProgress.useQuery({user_id: session.data?.user.id});
	// const user = trpc.getUserProgressOnCourse.useQuery({user_id: session.data?.user.id,});

	useEffect(() => {
		console.log(coursesWithProgress.data);
	}, [coursesWithProgress.isLoading]);

	if (coursesWithProgress.isLoading) {
		return <Loader/>;
	}

	return (
		<div>
			{
				coursesWithProgress.data.map((course) => {
					return <div key={course?.course_id} className={"p-4 border-2 border-amber-300 rounded-md"}>
						<Link href={`${Routes.USER_GRADES}/course-grades/${course.course_id}`}>
							{course?.course_name}
						</Link>

					</div>;
				})
			}
		</div>
	);
};

UserGrades.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<UserLayout>{page}</UserLayout>
		</Layout>
	);
};

export default UserGrades;
