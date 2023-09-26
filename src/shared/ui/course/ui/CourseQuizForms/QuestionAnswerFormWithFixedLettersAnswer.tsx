import {type FC} from "react";
import {Label} from "@/shared/ui/Label";
import {useFormContext} from "react-hook-form";

type Props = {
	index: number;
};

const QuestionAnswerFormWithFixedLettersAnswer: FC<Props> = ({index}) => {
	const {register} = useFormContext();
	return (
		<div className={"flex flex-col gap-5 w-full"}>
			<h5 className={"text-2xl"}>Answer with fixed letters</h5>
			<Label htmlFor={`blocks.${index}.question`} labelText={"Question"}>
				<input
					className={"inputField"}
					{...register(`blocks.${index}.question`)}
				/>
			</Label>
			<Label htmlFor={`blocks.${index}.answer`} labelText={"Answer"}>
				<input
					className={"inputField"}
					{...register(`blocks.${index}.answer`)}
				/>
			</Label>
		</div>
	);
};

export default QuestionAnswerFormWithFixedLettersAnswer;
