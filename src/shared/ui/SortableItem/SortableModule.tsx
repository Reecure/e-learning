import React, {type FC, useEffect, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {type Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {type Lesson} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {setCurrentLessonId, setPreviewVisible} from "@/shared/ui/course/model/slices/currentLessonSlice";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {BsTrash} from "react-icons/bs";
import {
	AiOutlineCheck,
	AiOutlineClose,
	AiOutlineFileText,
} from "react-icons/ai";
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {MdOutlineQuiz} from "react-icons/md";
import {Loader} from "@/shared/ui/Loader";
import SortableModuleItem from "@/shared/ui/SortableItem/SortableModuleItem";
import SortableLessonItem from "@/shared/ui/SortableItem/SortableLessonItem";
import Notification from "@/shared/ui/Notification/Notification";

type LessonOrModule = Lesson | Module;

type Props<T> = {
	item: T;
	disabled: boolean;
	isModule: boolean;
	refetch: () => void;
};

export const SortableModule: FC<Props<LessonOrModule>> = ({
	item,
	disabled,
	isModule,
	refetch,
}) => {
	const [deleteIsOpen, setDeleteIsOpen] = useState(false);
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
	const [deleteValue, setDeleteValue] = useState("");
	const [submitError, setSubmitError] = useState({isError: false, error: ""});
	const [notificationOpen, setNotificationOpen] = useState(false);

	const {attributes, listeners, setNodeRef, transform, transition}
      = useSortable({id: item?.id});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const deleteModule = trpc.deleteModule.useMutation();
	const deleteLesson = trpc.deleteLesson.useMutation();

	useEffect(() => {
		refetch();
	}, [deleteModule.isLoading, deleteLesson.isLoading]);

	useEffect(() => {
		deleteValue === "delete"
			? setDeleteButtonDisabled(true)
			: setDeleteButtonDisabled(false);
	}, [deleteValue]);

	const deleteOpenHandler = () => {
		setDeleteIsOpen(prev => !prev);
	};

	const deleteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDeleteValue(e.currentTarget.value);
	};

	const setNotificationOpenHandler = () => {
		setNotificationOpen(prev => !prev);
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`px-2 py-3 w-full border-2 border-light-primary-main dark:border-dark-primary-main rounded-md mb-2  cursor-default ${
				!disabled && "cursor-grab"
			} `}
		>
			{isModule ? (
			// Module
				<SortableModuleItem item={item as Module} disabled={disabled}
					deleteOpen={deleteOpenHandler}/>
			) : (
			// Lesson
				<SortableLessonItem item={item as Lesson} disabled={disabled}
					deleteOpen={deleteOpenHandler}/>
			)}

			{/* {Delete modal} */}
			<Modal isOpen={deleteIsOpen} setIsOpen={deleteOpenHandler}>
				<div className={"flex flex-col gap-3"}>
					<div className={"text-xl"}>
                  Write{" "}
						<span className={"underline text-dark-error-main"}>
                     delete
						</span>{" "}
                  to delete {item?.title}
					</div>
					<input
						type='text'
						className={"inputField"}
						onChange={deleteValueHandler}
					/>
					{isModule ? (
						<Button
							disabled={!deleteButtonDisabled}
							theme={ButtonThemes.FILLED}
							onClick={() => {
								try {
									deleteModule.mutate({id: item.id});
									deleteOpenHandler();
								} catch (e) {
									console.log(e);
								}
							}}
						>
                     DELETE
						</Button>
					) : (
						<Button
							disabled={!deleteButtonDisabled}
							theme={ButtonThemes.FILLED}
							onClick={() => {
								try {
									deleteLesson.mutate({id: item.id});
									refetch();
									setNotificationOpenHandler();
									deleteOpenHandler();
								} catch (e) {
									console.log(e);
								}
							}}
						>
                     DELETE
						</Button>
					)}
				</div>
			</Modal>
			<Notification
				open={notificationOpen}
				onClose={setNotificationOpenHandler}
				isSuccess={!submitError.isError}
				timeoutDelay={3000}
			>
				{submitError.isError
					? "Some server error try later"
					: `${isModule ? "Module delete success. Reload page." : "Lesson delete success. Reload page."}`}
			</Notification>
		</div>
	);
};
