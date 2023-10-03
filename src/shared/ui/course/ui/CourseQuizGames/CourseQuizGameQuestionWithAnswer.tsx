import {type FC, useEffect, useState} from "react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {QuestionAnswerBlock} from "@/enteties/Lesson";

type Props = {
    block: QuestionAnswerBlock;
    handleAnswer: (correct: string, userSelect: string) => void;
    isLast: boolean;
    submitHandler: () => void;
};

const createAnswer = (blockWithAnswers: QuestionAnswerBlock): string[] => {
	const res: string[] = [];
	const arrayWithAnswer = [...blockWithAnswers.answer];

	arrayWithAnswer.forEach(item => res.push(item.otherAnswer));

	return res;
};

type IsCorrect = {
    selectedId: number;
    value: string;
};

const CourseQuizGameQuestionWithAnswer: FC<Props> = ({
	block,
	submitHandler,
	handleAnswer,
	isLast,
}) => {
	const [answers, setAnswers] = useState<string[]>([]);
	const [isSelected, setSelected] = useState<IsCorrect | null>(null);

	useEffect(() => {
	}, [isLast]);

	useEffect(() => {
		setAnswers([...createAnswer(block), block.correctAnswer]);
	}, [block]);

	return (
		<div className={"mb-5"}>
			<>
				<h5 className={"text-lg font-extrabold"}>{block.question}</h5>
				{answers.map((item, i) => (
					<div key={i} className={"flex gap-1 items-center"}>
						<div>{i + 1}.</div>
						<Button
							className={`!px-1 rounded-md ${
								isSelected?.selectedId === i
									? "bg-light-primary-main/10 dark:bg-dark-primary-main/10"
									: ""
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
			</>
			<Button
				theme={ButtonThemes.FILLED}
				onClick={() => {
					handleAnswer(block.correctAnswer, isSelected?.value || "");
					if (!isLast) {
						setSelected(null);
					} else if (isLast) {
						submitHandler();
					}
				}}
			>
				{isLast ? "Submit" : "Next"}
			</Button>
		</div>
	);
};

export default CourseQuizGameQuestionWithAnswer;
