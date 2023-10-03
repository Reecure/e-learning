import {type FC, useEffect, useState} from "react";

import CourseQuizGameQuestionWithAnswer from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameQuestionWithAnswer";
import CourseQuizGameAnswerWithFixedLetters
	from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameAnswerWithFixedLetters";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {Loader} from "@/shared/ui/Loader";
import {AnswerWithFixedLetters, LessonBlocks, QuestionAnswerBlock, QuizContentType} from "@/enteties/Lesson";
import InfoForUser from "@/shared/ui/InfoForUser/InfoForUser";

type Props = {
    updateInfo: {
        id: string,
        visible: boolean,
        isSuccess: boolean,
        error?: string
    }
    lesson_id: string;
    blocks: LessonBlocks[];
};

const QuizComponent: FC<Props> = ({blocks, lesson_id, updateInfo}) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [submitValuesVisible, setSubmitValuesVisible] = useState(false);

	const session = useSession();

	const updateLessonProgress = trpc.updateUserLessonsProgress.useMutation();
	const getLessonProgressById = trpc.getUserLessonsProgressById.useQuery({
		lesson_id,
		id: session.data?.user.id!,
	});

	const quizContentRender = (contentType: QuizContentType | string, block: Block, handleAnswer: (arg1: string, arg2: string) => void) => {
		switch (contentType) {
		case QuizContentType.QUESTION_ANSWER:
			return (
				<CourseQuizGameQuestionWithAnswer
					block={block as QuestionAnswerBlock}
					handleAnswer={handleAnswer}
					isLast={submitValuesVisible}
					submitHandler={submitHandler}
				/>
			);
		case QuizContentType.ANSWER_WITH_FIXED_LETTERS:
			return (
				<CourseQuizGameAnswerWithFixedLetters
					block={block as AnswerWithFixedLetters}
					handleAnswer={handleAnswer}
					isLast={submitValuesVisible}
					submitHandler={submitHandler}
				/>
			);
		case QuizContentType.DRAG_BLOCKS:
			return (
				<CourseQuizGameQuestionWithAnswer
					block={block as QuestionAnswerBlock}
					handleAnswer={handleAnswer}
					isLast={submitValuesVisible}
					submitHandler={submitHandler}
				/>
			);
		case QuizContentType.SORT_ANSWER:
			return (
				<CourseQuizGameQuestionWithAnswer
					block={block as QuestionAnswerBlock}
					handleAnswer={handleAnswer}
					isLast={submitValuesVisible}
					submitHandler={submitHandler}
				/>
			);
		}
	};

	useEffect(() => {
		if (blocks.length === 1) {
			setSubmitValuesVisible(true);
		}
	}, [blocks, showScore]);

	useEffect(() => {
		if (showScore) {
			try {
				updateLessonProgress.mutate({
					id: session.data?.user.id!,
					lesson_progress: {
						lesson_id,
						lesson_name: getLessonProgressById.data?.lesson_name || "",
						module_id: getLessonProgressById.data?.module_id || "",
						is_completed: true,
						quizScore: score,
						lessonType: getLessonProgressById.data?.lessonType || "",
					},
				});
			} catch (e) {
				console.log(e);
			}
		}
	}, [showScore]);

	const handleAnswerOptionClick = (blockAnswer: string, answer: string) => {
		let updatedScore = score;
		if (blockAnswer === answer) {
			updatedScore += 1;
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < blocks.length) {
			setCurrentQuestion(nextQuestion);
			if (nextQuestion === blocks.length - 1) {
				setSubmitValuesVisible(true);
			}
		}

		setScore(updatedScore);
	};

	const submitHandler = () => {
		setShowScore(true);
		setSubmitValuesVisible(false);
	};

	if (getLessonProgressById.isLoading) {
		return <Loader/>;
	}

	return (
		<div className={"flex flex-col items-center justify-center "}>
			<div className={"mb-5 w-full"}>
				{lesson_id === updateInfo.id && updateInfo.visible && (updateInfo.isSuccess ?
					<InfoForUser isSuccess text={"Success"}/> :
					<InfoForUser isSuccess={false} text={"Error"}/>)}
			</div>
			<div>
				{showScore ? (
					<div className={" flex flex-col gap-5"}>
						<div className={"text-5xl"}>Your score is {score}</div>

						<Button
							theme={ButtonThemes.FILLED}
							onClick={() => {
								setShowScore(false);
								setScore(0);
								setCurrentQuestion(0);
							}}
						>
                            Try again
						</Button>
					</div>
				) : (
					<>
						<div>
							{blocks?.length && (
								<div>
                                    Previous res = {getLessonProgressById.data?.quizScore}
								</div>
							)}
						</div>
						<div className={"text-xl font-extrabold"}>
							{blocks?.length ? (
								<div>
									{currentQuestion + 1} / {blocks?.length}
								</div>
							) : (
								<div>0/0</div>
							)}
						</div>
						<div className={"flex mt-5"}>
							{blocks?.length === 0 || blocks === undefined ? (
								<div>Empty</div>
							) : (
								quizContentRender(
									blocks[currentQuestion].type,
									blocks[currentQuestion],
									handleAnswerOptionClick,
								)
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default QuizComponent;
