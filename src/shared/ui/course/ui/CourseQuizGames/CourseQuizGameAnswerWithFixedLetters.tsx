import {type ChangeEvent, type FC, useEffect, useRef, useState} from "react";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Button} from "@/shared/ui";
import {AnswerWithFixedLetters} from "@/enteties/Lesson";

type Props = {
    block: AnswerWithFixedLetters;
    handleAnswer: (correct: string, userSelect: string) => void;
    isLast: boolean;
    submitHandler: () => void;
};

const CourseQuizGameAnswerWithFixedLetters: FC<Props> = ({
	block,
	handleAnswer,
	submitHandler,
	isLast,
}) => {
	const [inputValues, setInputValues] = useState<string[]>(
		new Array(block.answer.length).fill(""),
	);
	const inputRefs = useRef<HTMLInputElement[]>([]);

	useEffect(() => {
		setInputValues(new Array(block.answer.length).fill(""));
	}, [handleAnswer]);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const newInputValues: string[] = [...inputValues];
		newInputValues[index] = e.target.value;
		setInputValues(newInputValues);

		if (index < block.answer.length - 1) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		if (e.key === "Backspace" && index >= 0) {
			e.preventDefault();

			if (inputValues[index] !== "") {
				const newInputValues = [...inputValues];
				newInputValues[index] = "";
				setInputValues(newInputValues);
			}

			if (index > 0) {
				inputRefs.current[index - 1].focus();
			}
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1].focus();
		} else if (e.key === "ArrowRight" && index < block.answer.length - 1) {
			inputRefs.current[index + 1].focus();
		}
	};

	return (
		<div>
			<h5 className={"text-lg font-extrabold"}>{block.question}</h5>
			<div className={"mb-5"}>
				{block.answer.split("").map((_, i) => (
					<input
						key={i}
						type={"text"}
						className={
							"max-w-[15px] mr-2 focus:none outline-0 bg-transparent border-b-[1px] border-dark-primary-main"
						}
						value={inputValues[i] || ""}
						maxLength={1}
						onChange={e => {
							handleInputChange(e, i);
						}}
						onKeyDown={e => {
							handleKeyDown(e, i);
						}}

						ref={el => (inputRefs.current[i] = el!)}
					/>
				))}
			</div>
			<Button
				theme={ButtonThemes.FILLED}
				onClick={() => {
					if (!isLast) {
						handleAnswer(block?.answer, inputValues.join(""));
					} else {
						handleAnswer(block?.answer, inputValues.join(""));
						submitHandler();
					}
				}}
			>
				{isLast ? "Submit" : "Next"}
			</Button>
		</div>
	);
};

export default CourseQuizGameAnswerWithFixedLetters;
