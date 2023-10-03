import {type FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Modal} from "@/shared/ui";
import {Label} from "@/shared/ui/Label";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {LessonType} from "@/enteties/Lesson";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import Notification from "@/shared/ui/Notification/Notification";
import {useRouter} from "next/router";

type Props = {
    lessonId: string;
    title: string;
    type: LessonType;
    openModal: boolean;
    refetch: () => void
    setModalOpen: () => void;
};

const disableTiming = 3000;

const CourseLessonForm: FC<Props> = ({
	lessonId,
	type,
	title,
	setModalOpen,
	openModal,
	refetch
}) => {

	const [startLessonType, setStartLessonType] = useState(type);
	const [visibleMessage, setVisibleMessage] = useState(false);
	const [isOpenNotification, setIsOpenNotification] = useState(false);
	const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

	const {register, handleSubmit, watch} = useForm({
		values: {
			lessonTitle: title,
			lesson_type: type,
		},
	});

	const router = useRouter();

	const lessonType = watch("lesson_type");

	const updateLesson = trpc.updateLessonInfo.useMutation();

	useEffect(() => {
		if (startLessonType !== lessonType) {
			setVisibleMessage(true);
		} else {
			setVisibleMessage(false);
		}
	}, [lessonType]);

	useEffect(() => {
		setStartLessonType(type);
	}, [type]);

	useEffect(() => {

		const buttonTimer = setTimeout(() => {
			setButtonIsDisabled(false);
		}, disableTiming);

		return () => {
			clearTimeout(buttonTimer);
		};
	}, [isOpenNotification]);

	const openNotificationHandler = () => {
		setIsOpenNotification(prev => !prev);
	};

	return (
		<div>
			<Modal isOpen={openModal} setIsOpen={setModalOpen}>
				<form
					onSubmit={handleSubmit(async data => {
						openNotificationHandler();
						setButtonIsDisabled(true);
						try {
							updateLesson.mutate({
								id: lessonId,
								lesson_type: data.lesson_type || "",
								title: data.lessonTitle || "",
								lesson_content: {
									blocks: [],
								},
							});
						} catch (e) {
							console.log(e);
						} finally {
							router.reload();
						}
					})}
					className={"flex flex-col gap-5 w-[300px]"}
				>
					<p className={"mb-5 text-center text-3xl"}>Update Lesson</p>
					<Label htmlFor={"title"} labelText={"Title"}>
						<input
							type='text'
							{...register("lessonTitle")}
							className={"inputField"}
						/>
					</Label>
					<Label htmlFor={"lesson_type"} labelText={"Lesson Type"}>
						<select className={"inputField"} {...register("lesson_type")}>
							<option className={"bg-light-background dark:bg-dark-background"} value={LessonType.TEXT}>
								{LessonType.TEXT}
							</option>
							<option className={"bg-light-background dark:bg-dark-background"} value={LessonType.QUIZ}>
								{LessonType.QUIZ}
							</option>
						</select>
					</Label>

					<Button
						type={"submit"}
						theme={ButtonThemes.FILLED}
						className={"mb-2 w-full"}
						disabled={buttonIsDisabled}
					>
                        Update Lesson
					</Button>
				</form>
				{visibleMessage ?
					<div
						className="text-light-error-main dark:text-dark-error-main flex items-center gap-2 ">
						<div className={"group relative duration-150"}>
							<AiOutlineQuestionCircle
								className="cursor-pointer transition duration-300 transform"/>
							<span
								className={"hidden group-hover:block absolute top-6 left-0 bg-dark-background text-sm whitespace-nowrap border-[1px] text-white p-1 border-dark-primary-container"}>You change type</span>
						</div>
						<p
							className="text-light-error-main dark:text-dark-error-main">
                            All content will be deleted
						</p>
					</div> : ""}
			</Modal>
			<Notification open={isOpenNotification} onClose={openNotificationHandler} isSuccess={true}
				timeoutDelay={disableTiming}>
                Success
			</Notification>
		</div>
	);
};

export default CourseLessonForm;
