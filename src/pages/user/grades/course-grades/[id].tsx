import {ReactElement, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {Bar, Pie} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import {trpc} from "@/shared/utils/trpc";
import {Loader} from "@/shared/ui/Loader";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {LessonType} from "@/enteties/Lesson";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Your grades",
		},
	},
};
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
	labels: [],
	datasets: [
		{
			data: [80, 20],
			backgroundColor: [
				"rgba(255, 206, 86, 0.2)",
				"rgba(153, 102, 255, 0.2)",
			],
			borderColor: [
				"rgba(255, 206, 86, 1)",
				"rgba(153, 102, 255, 1)",

			],
			borderWidth: 1,
		},
	],
};

const CourseGradesPage = () => {
	const [openModuleId, setOpenModuleId] = useState(null);
	const session = useSession();
	const router = useRouter();

	const courseInfo = trpc.getUserProgressOnCourse.useQuery({
		user_id: session.data?.user.id,
		course_id: router.query.id
	});

	useEffect(() => {
		console.log(courseInfo.data);
	}, [courseInfo.isLoading]);

	if (courseInfo.isLoading) {
		return <Loader/>;
	}

	return (
		<>
			<div className={"flex justify-between bg-neutral-200 dark:bg-neutral-800 p-5 rounded-md"}>
				<div>
					<h5>{courseInfo.data.courseProgress.userProgress.course_name}</h5>
					<div className={"flex gap-3"}>
						<div>
                            Start course at 23.05.22
						</div>
						<div>
                            Avg quiz sccore: 4.3
						</div>
						<div>
                            Completed modules: 3
						</div>
						<div>
                            Completed lessons: 5
						</div>
					</div>
				</div>
				<div className={"w-[150px] h-[150px]"}>
					<Pie data={data}/>
				</div>

			</div>

			<div className={"mt-5"}>
				{courseInfo.data.modulesProgress.modulesProgress.map(module => {
					const isOpen = openModuleId === module.module_id;

					return (
						<div key={module.module_id} className={""}>
							<div
								className={"flex justify-between px-4 py-2 border-light-primary-main dark:border-dark-primary-main border-2 mb-2 rounded-md"}>
								<h6>{module.module_name}</h6>
								<Button
									theme={ButtonThemes.TEXT}
									className={"!px-2 !py-1 rounded-md"}
									onClick={() => setOpenModuleId(isOpen ? null : module.module_id)}
								>
									{isOpen ? "Close" : "Open"}
								</Button>
							</div>
							<div
								className={`${isOpen ? "" : "hidden"} px-4 py-2 border-light-primary-main dark:border-dark-primary-main border-2 mb-2 rounded-md mt-1`}>
								<Bar options={options} data={{
									labels: courseInfo.data.lessonsProgress.lessonsProgres.filter((grade) => grade.module_id === module.module_id && grade.lessonType === LessonType.QUIZ).map(lesson => lesson.lesson_name),
									datasets: [
										{
											label: "Grade",
											barPercentage: 0.1,
											data: courseInfo.data.lessonsProgress.lessonsProgres.filter((grade) => grade.module_id === module.module_id).map(lesson => lesson.quizScore),
											backgroundColor: "#6750A4",
										}
									],
								}} className={"max-w-[500px] max-h-[200px]"}/>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

CourseGradesPage.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<UserLayout>{page}</UserLayout>
		</Layout>
	);
};


export default CourseGradesPage;