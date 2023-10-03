import {type FC, useEffect} from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {trpc} from "@/shared/utils/trpc";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {v4 as uuidv4} from "uuid";
import QuestionAnswerForm from "@/shared/ui/course/ui/CourseQuizForms/QuestionAnswerForm";
import QuestionAnswerFormWithFixedLettersAnswer
	from "@/shared/ui/course/ui/CourseQuizForms/QuestionAnswerFormWithFixedLettersAnswer";
import {QuizBlocks, QuizContentType} from "@/enteties/Lesson";


export type FormData = {
    blocks: QuizBlocks[];
};

type Props = {
    lessonId: string;
    initialData: QuizBlocks[];
    setQuizContentEditable: () => void
    setIsSuccessVisible: (id: string, visible: boolean, isSuccess: boolean, error?: string) => void
};

const CreateLessonQuizContent: FC<Props> = ({initialData, setQuizContentEditable, setIsSuccessVisible, lessonId}) => {
	const lessonUpdateContentQuery = trpc.updateLessonContent.useMutation();

	const methods = useForm<FormData>({
		defaultValues: {blocks: initialData || []},
	});
	const {handleSubmit, reset} = methods;

	useEffect(() => {
		reset({blocks: initialData || []});
	}, [initialData, reset]);

	const onSubmit = (data: FormData) => {
		try {
			lessonUpdateContentQuery.mutate({
				id: lessonId,
				lesson_content: {...data},
			});
		} catch (e) {
			console.log(e);
		} finally {
			setQuizContentEditable();
			setIsSuccessVisible(lessonId, true, true);

		}
	};

	const {append, fields, remove} = useFieldArray({
		control: methods.control,
		name: "blocks",
	});

	const addAnswerWithFixedLetters = () => {
		append({
			id: uuidv4(),
			type: QuizContentType.ANSWER_WITH_FIXED_LETTERS,
			question: "",
			answer: "",
		});
	};

	const addQuestionAnswerBlock = () => {
		append({
			id: uuidv4(),
			type: QuizContentType.QUESTION_ANSWER,
			question: "",
			correctAnswer: "",
			answer: [
				{
					otherAnswer: "",
				},
			],
		});
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={"flex flex-col gap-5 "}
			>
				{fields.map((field, index) => (
					<div key={field.id}>
						{field.type === QuizContentType.QUESTION_ANSWER ? (
							<div className={"flex gap-2 items-start"}>
								<QuestionAnswerForm index={index}/>
								<Button
									theme={ButtonThemes.TEXT}
									className={"!px-4 !py-2 !rounded-md"}
									type='button'
									onClick={() => {
										remove(index);
									}}
								>
                                    x
								</Button>
							</div>
						) : field.type === QuizContentType.ANSWER_WITH_FIXED_LETTERS ? (
							<div className={"flex gap-2 items-start"}>
								<QuestionAnswerFormWithFixedLettersAnswer index={index}/>
								<Button
									theme={ButtonThemes.TEXT}
									className={"!px-4 !py-2 !rounded-md"}
									type='button'
									onClick={() => {
										remove(index);
									}}
								>
                                    x
								</Button>
							</div>
						) : null}
					</div>
				))}
				<div className={"flex flex-col sm:flex-row gap-3"}>
					<Button theme={ButtonThemes.FILLED} onClick={addQuestionAnswerBlock}>
                        Add Question Answer
					</Button>
					<Button
						theme={ButtonThemes.FILLED}
						onClick={addAnswerWithFixedLetters}
					>
                        Add Answer with fixed letters
					</Button>
				</div>
				<Button theme={ButtonThemes.FILLED} type='submit'>
                    Save
				</Button>
			</form>
		</FormProvider>
	);
};

export default CreateLessonQuizContent;
