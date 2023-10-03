import {FC} from "react";

interface Props {
    text: string,
    isSuccess: boolean
}

const InfoForUser: FC<Props> = ({isSuccess, text}) => {

	return (
		<div
			className={`w-full px-3 py-2 border-[1px]  ${isSuccess ? "border-green-700 bg-green-700/10" : "border-dark-error-main bg-dark-error-main/10"} rounded-md`}>
			{text}
		</div>
	);
};

export default InfoForUser;