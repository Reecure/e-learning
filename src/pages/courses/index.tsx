import {type ReactElement} from "react";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";
import {SmallCard} from "@/shared/ui";
import Layout from "@/pages/layout";
import {type Course} from "@/enteties/Course";
import {BsSearch} from "react-icons/bs";
import {LessonType} from "@/enteties/Lesson";

type Props = Record<string, unknown>;

const CoursesPage = () => {
	const visibleCourses = trpc.getAllVisibleCourses.useQuery();

	if (visibleCourses.isLoading) {
		return <Loader/>;
	}

	return (
		<div className={"p-3 sm:p-5 md:p-7 lg:p-10 xl:px-20 "}>

			<div className={"flex flex-col md:flex-row gap-5 bg-neutral-800 p-5 rounded-md mb-10"}>
				<div className={"w-full"}>
					<div
						className={"flex mx-auto items-center max-w-[400px] rounded-md border-[1px]  border-dark-primary-main"}>
						<input type='text' className={"inputField !border-0"}/>
						<span
							className={"hover:bg-dark-primary-main/25 mr-1 px-[6px] py-1 rounded-md cursor-pointer duration-200"}>
							<BsSearch/>
						</span>
					</div>
				</div>
				<div className={"flex justify-between gap-5"}>
					{
						Array(4).fill(null).map((item, i) => <select key={i} className={"inputField max-w-[250px]"}>
							<option className={"bg-light-background dark:bg-dark-background"} value={LessonType.TEXT}>
                                1
							</option>
							<option className={"bg-light-background dark:bg-dark-background"} value={LessonType.QUIZ}>
                                2
							</option>
						</select>)
					}

				</div>
			</div>

			<div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"}>
				{visibleCourses.data?.map(course => <SmallCard key={course.id} course={course as Course}/>)}
			</div>
		</div>
	);
};

CoursesPage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default CoursesPage;
