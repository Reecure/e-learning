import {type FC, type InputHTMLAttributes} from "react";
import {type DeepMap, type FieldError, type UseFormRegisterReturn} from "react-hook-form";

type Props = {
    className?: string;
    register?: UseFormRegisterReturn;
    errors?: DeepMap<never, FieldError>;
    name: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = ({
	className,
	register,
	errors,
	name,
	...otherProps
}) => (
	<>
		<input
			type={"text"}
			{...otherProps}
			{...register}
			className={`${className} `}
		/>
	</>
);

export default Input;
