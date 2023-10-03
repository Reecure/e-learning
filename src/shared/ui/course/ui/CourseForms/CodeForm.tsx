import {type FC} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/shared/ui/Label";


const CodeForm: FC<{ index: number }> = ({index}) => {
	const {register} = useFormContext();

	return (
		<div className={"flex flex-col gap-5 w-full"}>
			<Label htmlFor={`blocks.${index}.code`} labelText={"Code"}>
				{/* eslint-disable-next-line no-mixed-spaces-and-tabs */}
				<textarea id={"myTextarea"}
					className={"inputField whitespace-pre-wrap"} {...register(`blocks.${index}.code`)}
				/>
			</Label>
		</div>
	);
};

export default CodeForm;
