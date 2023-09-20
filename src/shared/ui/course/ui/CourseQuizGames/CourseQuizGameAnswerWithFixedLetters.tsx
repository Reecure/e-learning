import {FC} from 'react';
import {AnswerWithFixedLetters} from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";

interface Props {
    block: AnswerWithFixedLetters
    handleAnswer: (correct: string, userSelect: string) => void
}

const CourseQuizGameAnswerWithFixedLetters: FC<Props> = ({block, handleAnswer}) => {

    return (
        <div>
            <div>CourseQuizGameAnswerWithFixedLetters</div>
        </div>
    );
};
export default CourseQuizGameAnswerWithFixedLetters;
