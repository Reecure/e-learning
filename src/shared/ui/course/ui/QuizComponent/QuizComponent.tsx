import {FC, useEffect, useState} from 'react';
import {Block} from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";
import CourseQuizGameQuestionWithAnswer from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameQuestionWithAnswer";
import CourseQuizGameAnswerWithFixedLetters
    from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameAnswerWithFixedLetters";
import {QuizContentType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {Loader} from "@/shared/ui/Loader";

interface Props {
    lesson_id: string
    blocks: Block[]
}

const QuizComponent: FC<Props> = ({blocks, lesson_id}) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [submitValuesVisible, setSubmitValuesVisible] = useState(false)

    const session = useSession()

    const updateLessonProgress = trpc.updateUserLessonsProgress.useMutation()
    const getLessonProgressById = trpc.getUserLessonsProgressById.useQuery({
        lesson_id: lesson_id,
        id: session.data?.user.id
    })

    const quizContentRender = (contentType: QuizContentType | string, block: any, handleAnswer: (arg1: string, arg2: string) => void) => {
        switch (contentType) {
            case QuizContentType.QUESTION_ANSWER:
                return <CourseQuizGameQuestionWithAnswer block={block} handleAnswer={handleAnswer}
                                                         isLast={submitValuesVisible}
                                                         submitHandler={submitHandler}
                />
            case QuizContentType.ANSWER_WITH_FIXED_LETTERS:
                return <CourseQuizGameAnswerWithFixedLetters block={block} handleAnswer={handleAnswer}
                                                             isLast={submitValuesVisible}
                                                             submitHandler={submitHandler}/>
            case QuizContentType.DRAG_BLOCKS:
                return <CourseQuizGameQuestionWithAnswer block={block} handleAnswer={handleAnswer}
                                                         isLast={submitValuesVisible}
                                                         submitHandler={submitHandler}
                />
            case QuizContentType.SORT_ANSWER:
                return <CourseQuizGameQuestionWithAnswer block={block} handleAnswer={handleAnswer}
                                                         isLast={submitValuesVisible}
                                                         submitHandler={submitHandler}
                />
        }
    }

    const handleAnswerOptionClick = (blockAnswer: string, answer: string) => {
        if (blockAnswer === answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < blocks.length) {
            if (nextQuestion === blocks.length - 1) {
                setSubmitValuesVisible(true)
            }
            setCurrentQuestion(nextQuestion);
        }
    };

    const submitHandler = () => {
        try {
            updateLessonProgress.mutate({
                id: session.data?.user.id,
                lesson_progress: {
                    lesson_id: lesson_id,
                    is_completed: true,
                    quizScore: score,
                    lessonType: ''
                }
            })
        } catch (e) {
            console.log(e)
        }
        setShowScore(true);
        setSubmitValuesVisible(false)
    }

    if (getLessonProgressById.isLoading) {
        return <Loader/>
    }

    return (
        <div className={'flex flex-col items-center justify-center '}>
            <div>
                {
                    showScore ? <div className={' flex flex-col gap-5'}>
                        <div className={"text-5xl"}>
                            Your score is {score}
                        </div>


                        <Button theme={ButtonThemes.FILLED} onClick={() => {
                            setShowScore(false)
                            setScore(0)
                            setCurrentQuestion(0)
                        }}>Try again</Button>
                    </div> : (
                        <>
                            <div>
                                Previous res = {getLessonProgressById.data?.quizScore}
                            </div>
                            <div className={'text-xl font-extrabold'}>
                                {currentQuestion + 1} / {" "}
                                {blocks.length}
                            </div>
                            <div className={'flex mt-5'}>
                                {quizContentRender(blocks[currentQuestion].type, blocks[currentQuestion], handleAnswerOptionClick)
                                }
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    );
};
export default QuizComponent;
