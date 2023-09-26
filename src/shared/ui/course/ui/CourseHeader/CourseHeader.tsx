import {type FC, useEffect, useState} from "react";
import {difficultLevelBadgeHelper} from "@/shared/helpers";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import CourseForm from "@/shared/ui/course/ui/CourseForms/CourseForm";
import Image from "next/image";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {type Course} from "@/enteties/Course";

type Props = {
	data: Course;
	isUserCourse: boolean;
};

const CourseHeader: FC<Props> = ({data, isUserCourse}) => {
	const [userHaveCourse, setUserHaveCourse] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState(false);

	const session = useSession();

	const user = trpc.getUser.useQuery({email: session.data?.user.email!});
	const deleteCourseFromUserCourses = trpc.deleteUserCourses.useMutation();
	const addToCourses = trpc.updateUserCourses.useMutation();
	const updateCourse = trpc.updateCourse.useMutation();
	const updateUserCourseProgress = trpc.updateUserCourseProgress.useMutation();
	const deleteCourse = trpc.deleteCourse.useMutation();

	useEffect(() => {
		user.refetch();
		const courseHaveStudentId
         = user.data?.courses !== null
         && user?.data?.courses.find(id => id === data?.id);
		setUserHaveCourse(courseHaveStudentId !== undefined);
	}, [deleteCourseFromUserCourses, addToCourses]);

	const openEditHandler = () => {
		setEditModalOpen(prev => !prev);
	};

	const updateCourseHandler = async (data: any) => {
		await updateCourse.mutate({
			...data,
		});
	};

	return (
		<div className={"flex justify-between mb-14"}>
			<div className={"flex flex-col justify-between"}>
				<div>
					{difficultLevelBadgeHelper(data?.difficulty_level || "")}
					<div className={"max-w-[400px] mb-5"}>
						<h3 className={"text-3xl font-extrabold"}>{data?.title}</h3>
					</div>
					<div className={"max-w-[600px] mb-5"}>
						<p>{data?.cover_description}</p>
					</div>
				</div>
				<div className={"flex justify-center flex-col gap-3"}>
					<div className={"flex flex-col sm:flex-row justify-between gap-2 sm:gap-10"}>
						<p>
							{/* eslint no-constant-condition: "off" */}
							<span>{1}</span> {1 !== 1 ? "students" : "student"}
						</p>
						<p>{data?.duration}</p>
						<p>Created at 27.03.23</p>
						<p>Last update at 27.03.23</p>
					</div>
					<div className={"flex flex-col sm:flex-row gap-2"}>
						{userHaveCourse ? (
							<Button
								theme={ButtonThemes.FILLED}
								onClick={async () => {
									try {
										await deleteCourseFromUserCourses.mutate({
											id: session.data?.user.id!,
											course_id: data?.id,
										});
									} catch (e) {
										console.log(e);
									}
								}}
							>
                        Remove from Courses
							</Button>
						) : (
							<Button
								theme={ButtonThemes.FILLED}
								onClick={async () => {
									try {
										await addToCourses.mutate({
											id: session.data?.user.id!,
											course_id: data?.id,
										});

										await updateUserCourseProgress.mutate({
											id: session.data?.user.id!,
											course_progress: {
												course_id: data?.id,
												is_completed: false,
											},
										});
									} catch (e) {
										console.log(e);
									}
								}}
							>
                        Add to courses
							</Button>
						)}
						{isUserCourse && (
							<>
								<Button theme={ButtonThemes.FILLED} onClick={openEditHandler}>
                           Edit course
								</Button>
								<Button theme={ButtonThemes.FILLED} onClick={() => {
									deleteCourse.mutate({
										id: data.id,
									});
								}}>Delete course</Button>
							</>
						)}
					</div>
					<Modal isOpen={editModalOpen} setIsOpen={openEditHandler}>
						<CourseForm
							courseData={data}
							onSubmit={updateCourseHandler}
							isCreating={false}
						/>
					</Modal>
				</div>
			</div>
			<div>
				<Image
					src={data?.cover_image}
					alt={"image"}
					className={"hidden sm:block max-w-[550px]  object-cover"}
					width={700}
					height={350}
				/>
			</div>
		</div>
	);
};

export default CourseHeader;
