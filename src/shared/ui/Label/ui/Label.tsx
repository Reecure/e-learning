import { FC, ReactNode } from "react";
import { Input } from "@/shared/ui/Input";

interface Props {
  htmlFor: string;
  labelText: string;
  children: ReactNode | ReactNode[];
}

const Label: FC<Props> = ({ labelText, children, htmlFor }) => {
   return (
      <label htmlFor={htmlFor} className={"relative"}>
         <p
            className={
               "absolute text-[12px] -top-[11px] left-4 bg-light-background dark:bg-dark-background px-1"
            }
         >
            {labelText}
         </p>
         {children}
      </label>
   );
};
export default Label;
