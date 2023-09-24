import { FC } from "react";

interface Props {
  error?: boolean;
  text: string;
}

const Text: FC<Props> = ({ text, error }) => {
   return (
      <p
         className={`${
            error ? "text-light-error-main dark:text-dark-error-main" : ""
         }`}
      >
         {text}
      </p>
   );
};
export default Text;
