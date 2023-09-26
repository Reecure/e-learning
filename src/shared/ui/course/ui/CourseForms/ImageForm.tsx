import {type FC} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/shared/ui/Label";

const ImageForm: FC<{index: number}> = ({index}) => {
	const {register} = useFormContext();

	return (
		<div className={"flex flex-col gap-5 w-full"}>
			<Label htmlFor={`blocks.${index}.title`} labelText={"Title"}>
				<input
					className={"inputField"}
					{...register(`blocks.${index}.title`)}
				/>
			</Label>
			<Label htmlFor={`blocks.${index}.src`} labelText={"Src"}>
				<input className={"inputField"} {...register(`blocks.${index}.src`)} />
			</Label>
		</div>
	);
};

export default ImageForm;
