import { FC, InputHTMLAttributes } from "react";
import { DeepMap, FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Text } from "@/shared/ui/Text";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  register?: UseFormRegisterReturn;
  errors?: DeepMap<any, FieldError>;
  name: string;
}

const Input: FC<Props> = ({
   className,
   register,
   errors,
   name,
   ...otherProps
}) => {
   return (
      <>
         <input
            type={"text"}
            {...otherProps}
            {...register}
            className={`${className} `}
         />
      </>
   );
};
export default Input;
