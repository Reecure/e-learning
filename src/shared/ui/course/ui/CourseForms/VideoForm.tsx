import {type FC} from "react";
import {useFormContext} from "react-hook-form";
import {Label} from "@/shared/ui/Label";

type Props = Record<string, unknown>;

const VideoForm: FC<{index: number}> = ({index}) => {
	const {register} = useFormContext();

	return (
		<div className={"flex flex-col gap-5 w-full"}>
			<Label htmlFor={`blocks.${index}.url`} labelText={"Video URL"}>
				<input className={"inputField"} {...register(`blocks.${index}.url`)} />
			</Label>
		</div>
	);
};

export default VideoForm;
