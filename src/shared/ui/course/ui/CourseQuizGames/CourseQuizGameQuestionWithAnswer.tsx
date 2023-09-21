import {FC, useEffect, useState} from 'react';
import {QuestionAnswerBlock} from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

interface Props {
    block: QuestionAnswerBlock
    handleAnswer: (correct: string, userSelect: string) => void
    isLast: boolean
    submitHandler: () => void
}

const createAnswer = (blockWithAnswers: QuestionAnswerBlock): string[] => {
    let res: string[] = []
    let arrayWithAnswer = [...blockWithAnswers.answer]

    arrayWithAnswer.forEach(item => {
        return res.push(item.otherAnswer)
    })

    return res
}

interface IsCorrect {
    selectedId: number,
    value: string
}

const CourseQuizGameQuestionWithAnswer: FC<Props> = ({block, submitHandler, handleAnswer, isLast}) => {

    const [answers, setAnswers] = useState<string[]>([]);
    const [isSelected, setSelected] = useState<IsCorrect | null>(null);

    useEffect(() => {
    }, [isLast])

    useEffect(() => {
        setAnswers([...createAnswer(block), block.correctAnswer]);
    }, [block]);

    return (
        <div className={'mb-5'}>
            <h5 className={'text-lg font-extrabold'}>{block.question}</h5>
            {answers.map((item, i) => (
                <div key={i} className={'flex gap-1 items-center'}>
                    <div>{i + 1}.</div>
                    <Button
                        className={`!px-1 rounded-md ${
                            isSelected?.selectedId === i
                                ? 'bg-light-primary-main/10 dark:bg-dark-primary-main/10'
                                : ''
                        }`}
                        theme={ButtonThemes.TEXT}
                        onClick={() => {
                            setSelected({
                                selectedId: i,
                                value: item,
                            });
                        }}
                    >
                        {item}
                    </Button>
                </div>
            ))}
            <Button
                theme={ButtonThemes.FILLED}
                onClick={() => {
                    if (!isLast) {
                        handleAnswer(block.correctAnswer, isSelected?.value)
                        setSelected(null)
                    } else {
                        handleAnswer(block.correctAnswer, isSelected?.value)
                        submitHandler()
                    }
                }}
            >
                {isLast ? 'Submit' : "Next"}
            </Button>
        </div>
    );
};
export default CourseQuizGameQuestionWithAnswer;
