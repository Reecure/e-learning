import {FC, useEffect, useState} from 'react';
import {QuestionAnswerBlock} from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

interface Props {
    block: QuestionAnswerBlock
    handleAnswer: (correct: string, userSelect: string) => void
}

const createAnswer = (blockWithAnswers: QuestionAnswerBlock): string[] => {
    let res: string[] = []
    let arrayWithAnswer = [...blockWithAnswers.answer]

    arrayWithAnswer.forEach(item => {
        return res.push(item.otherAnswer)
    })

    return res
}

const CourseQuizGameQuestionWithAnswer: FC<Props> = ({block, handleAnswer}) => {

    const [answers, setAnswers] = useState<string[]>([])

    useEffect(() => {
        setAnswers([...createAnswer(block), block.correctAnswer])
    }, [block])

    return (
        <div className={'mb-5'}>
            <h5 className={'text-lg font-extrabold'}>{block.question}</h5>
            {
                answers.map((item, i) => {
                    return <div key={i} className={'flex gap-1 items-center'}>
                        <div>{i + 1}.</div>
                        <Button className={'!px-1 rounded-md'} theme={ButtonThemes.TEXT} onClick={
                            () => {
                                handleAnswer(block.correctAnswer, item)
                            }
                        }>{item}</Button>
                    </div>
                })
            }
        </div>
    );
};
export default CourseQuizGameQuestionWithAnswer;
