import {type FC, useEffect, useState} from "react";
import {trpc} from "@/shared/utils/trpc";
import TextBlock from "@/shared/ui/course/ui/CourseBlocks/TextBlock";
import CodeBlock from "@/shared/ui/course/ui/CourseBlocks/CodeBlock";
import ImageBlock from "@/shared/ui/course/ui/CourseBlocks/ImageBlock";
import Badge, {BadgeColors} from "@/shared/ui/Badge/Badge";
import {Button,} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useSession} from "next-auth/react";
import {Loader} from "@/shared/ui/Loader";
import CourseLessonForm from "@/shared/ui/course/ui/CourseLessonForm/CourseLessonForm";
import VideoBlock from "@/shared/ui/course/ui/CourseBlocks/VideoBlock";
import {
	ICodeBlock,
	IImageBlock,
	ITextBlock,
	IVideoBlock,
	LessonBlocks,
	LessonContentType,
	LessonType
} from "@/enteties/Lesson";
import CreateLessonQuizContent from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";
import CreateLessonContent from "@/shared/ui/course/ui/CreateLessonContent/CreateLessonContent";
import QuizComponent from "@/shared/ui/course/ui/QuizComponent/QuizComponent";

type Props = {
    lesson_id: string;
};

const LessonContent: FC<Props> = ({lesson_id}) => {
	const [lessonContentEditable, setLessonContentEditable] = useState(false);
	const [quizContentEditable, setQuizContentEditable] = useState(false);
	const [editableLesson, setLessonEditable] = useState(false);

	const [isLessonUpdateSuccess, setIsLessonUpdateSuccess] = useState({
		id: "",
		visible: false,
		isSuccess: false,
		error: ""
	});
	const lessonQuery = trpc.getLessonById.useQuery({lesson_id});

	const session = useSession();

	const contentRender = (
		contentType: LessonContentType,
		block: LessonBlocks,
	) => {
		switch (contentType) {
		case LessonContentType.TEXT:
			return <TextBlock textBlock={block as ITextBlock}/>;
		case LessonContentType.CODE:
			return <CodeBlock codeBlock={block as ICodeBlock}/>;
		case LessonContentType.IMAGE:
			return <ImageBlock imageBlock={block as IImageBlock}/>;
		case LessonContentType.VIDEO:
			return <VideoBlock videoBlock={block as IVideoBlock}/>;
		}
	};

	useEffect(() => {
		console.log(lessonQuery.data);
	}, [lessonQuery]);

	const editableLessonHandle = () => {
		setLessonEditable(prev => !prev);
	};

	const LessonContentEditableHandler = () => {
		setLessonContentEditable(prev => !prev);
	};
	const QuizContentEditableHandler = () => {
		setQuizContentEditable(prev => !prev);
	};

	const setIsLessonUpdateSuccessHandler = (id: string, visible: boolean, isSuccess: boolean, error?: string) => {
		setIsLessonUpdateSuccess({id: id, visible: visible, isSuccess: isSuccess, error: error || ""});
	};

	if (lessonQuery.isLoading) {
		return <Loader/>;
	}

	if (lessonQuery.error) {
		return <>Something went wrong</>;
	}

	return (
		<div>
			<div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5"}>
				<div className={"flex gap-2 items-center"}>
					<h4 className={"text-3xl sm:text-5xl font-extrabold my-3 sm:my-5"}>
						{lessonQuery.data?.title}
					</h4>
					<Badge
						color={BadgeColors.GREEN}
						text={lessonQuery.data?.lesson_type || ""}
					/>
				</div>
				{lessonQuery.data?.author_id === session.data?.user.id && (
					<div className={"flex gap-2 items-center"}>
						<Button theme={ButtonThemes.FILLED} onClick={editableLessonHandle}>
                            Edit Lesson
						</Button>
						{lessonQuery.data?.lesson_type === LessonType.TEXT ? (
							<Button
								theme={ButtonThemes.FILLED}
								onClick={LessonContentEditableHandler}
							>
                                Edit Content
							</Button>
						) : (
							<Button
								theme={ButtonThemes.FILLED}
								onClick={QuizContentEditableHandler}
							>
                                Edit Content
							</Button>
						)}
					</div>
				)}
			</div>
			{lessonQuery.data?.lesson_type === LessonType.TEXT ? (
				lessonContentEditable ? (
					<>
						<CreateLessonContent
							lessonId={lesson_id}
							setLessonContentEditable={LessonContentEditableHandler}
							setIsSuccessVisible={setIsLessonUpdateSuccessHandler}
							initialData={lessonQuery.data?.lesson_content?.blocks}
						/>
					</>
				) : (
					<>
						<>
							{isLessonUpdateSuccess.id === lesson_id && isLessonUpdateSuccess.visible && (isLessonUpdateSuccess.isSuccess ? <>all
                                ok</> : <>some
                                error</>)}
						</>
						<div>
							{
								lessonQuery.data?.lesson_content.blocks.map(lesson =>
									contentRender(lesson.type, lesson),
								)
							}
						</div>
					</>
				)
			) : quizContentEditable ? (

				<CreateLessonQuizContent
					lessonId={lesson_id}
					setQuizContentEditable={QuizContentEditableHandler}
					setIsSuccessVisible={setIsLessonUpdateSuccessHandler}
					initialData={lessonQuery.data?.lesson_content.blocks as any}
				/>
			) : (
				<>
					<QuizComponent
						updateInfo={isLessonUpdateSuccess}
						lesson_id={lesson_id}
						blocks={lessonQuery.data?.lesson_content.blocks as any}
					/>
				</>
			)}
			<CourseLessonForm
				lessonId={lesson_id}
				title={lessonQuery.data?.title || ""}
				type={lessonQuery.data?.lesson_type}
				openModal={editableLesson}
				setModalOpen={editableLessonHandle}
				refetch={lessonQuery.refetch}
			/>
		</div>
	);
};

export default LessonContent;
