import React, {type FC, useEffect, useState} from "react";
import {AiFillEye, AiFillEyeInvisible, AiOutlineCheck, AiOutlineClose, AiOutlineFileText} from "react-icons/ai";
import {MdOutlineQuiz} from "react-icons/md";
import {setCurrentLessonId, setPreviewVisible} from "@/shared/ui/course/model";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {BsTrash} from "react-icons/bs";
import {type Lesson, LessonType} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {Loader} from "@/shared/ui/Loader";

type Props = {
    item: Lesson;
    disabled: boolean;
    deleteOpen: () => void;
    refetch: () => void;
};

const SortableLessonItem: FC<Props> = ({item, refetch, deleteOpen, disabled}) => {
	const [progressLoading, setProgressLoading] = useState(false);
	const [visibilityLoading, setVisibilityLoading] = useState(false);

	const session = useSession();

	const updateLessonProgress = trpc.updateUserLessonsProgress.useMutation();
	const userProgressOnLesson = trpc.getUserLessonsProgressById.useQuery({
		id: session.data?.user.id || "",
		lesson_id: item.id,
	});
	const updateVisibility = trpc.updateLessonVisibility.useMutation();

	const dispatch = useAppDispatch();

	useEffect(() => {
		userProgressOnLesson.refetch();
		if (updateLessonProgress.status === "loading") {
			setProgressLoading(true);
		} else {
			setProgressLoading(false);
		}
	}, [updateLessonProgress.isLoading]);

	useEffect(() => {
		refetch();
		if (updateVisibility.status === "loading") {
			setVisibilityLoading(true);
		} else {
			setVisibilityLoading(false);
		}
	}, [updateVisibility.isLoading]);

	const setIsCompletedHandler = () => {
		try {
			updateLessonProgress.mutate({
				id: session.data?.user.id || "",
				lesson_progress: {
					lesson_id: item.id,
					module_id: item.module_id,
					lesson_name: item.title,
					is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed !== true || false,
					quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
					lessonType: item.lesson_type,
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

	const updateVisibleHandler = () => {
		try {
			updateVisibility.mutate({
				id: item.id,
				is_visible: !item.is_visible
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={"flex justify-between items-center"}>
			<div
				className={`flex items-center gap-1 ${userProgressOnLesson.data?.is_completed && "duration-300 opacity-30"}`}>
				{item?.lesson_type === LessonType.TEXT ? (
					<span className={"text-md"}>
						<AiOutlineFileText/>
					</span>
				) : (
					<MdOutlineQuiz/>
				)}
				<p
					className={"cursor-pointer"}
					onClick={() => {
						dispatch(setCurrentLessonId(item.id));
						dispatch(setPreviewVisible(false));
						updateLessonProgress.mutate({
							id: session.data?.user.id || "",
							lesson_progress: {
								lesson_id: item.id,
								lesson_name: item.title,
								module_id: item.module_id,
								is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed || false,
								quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
								lessonType: item.lesson_type,
							},
						});
					}}
				>
					{item.title}
				</p>
			</div>
			<div className={"flex items-center"}>
				{disabled
                    && item?.lesson_type === LessonType.TEXT && (
					progressLoading ? <span className={"!p-1"}><Loader className={"!w-4 !h-4 "}/></span>
						: <Button
							type={"submit"}

							className={`${
								userProgressOnLesson.data?.is_completed
									? "!text-light-error-main dark:!text-dark-error-main"
									: "!text-green-600"
							} ${progressLoading ? "!p-1 sm:!p-2 pointer-events-none !hover:none" : "!p-1 sm:!p-2"} !rounded-md`}
							theme={ButtonThemes.TEXT}
							onClick={() => {
								setIsCompletedHandler();
							}}

						>
							<>
								{userProgressOnLesson.data?.is_completed ? (
									<AiOutlineClose/>
								) : (
									<AiOutlineCheck/>
								)}
							</>

						</Button>
				)}
				{session.data?.user.id === item.author_id && disabled && (
					<div className={"flex items-center"}>
						<div>
							{
								visibilityLoading ?
									<span className={""}><Loader className={"!w-4 !h-4 "}/></span>
									: <Button
										type={"submit"}
										className={"!p-1 sm:!p-2 !rounded-md"}
										theme={ButtonThemes.TEXT}
										onClick={updateVisibleHandler}
									>
										{item.is_visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
									</Button>
							}
						</div>
						<Button
							type={"submit"}
							className={"!text-light-error-main dark:!text-dark-error-main !p-1 sm:!p-2 !rounded-md"}
							theme={ButtonThemes.TEXT}
							onClick={deleteOpen}
						>
							<BsTrash/>
						</Button>
					</div>

				)}
			</div>
		</div>
	);
};

export default SortableLessonItem;
