import { FC } from "react";

interface Props {}

const ErrorWidget: FC<Props> = () => {
   return (
      <div className={"w-full h-full flex justify-center items-center"}>
         <p className={"text-5xl"}>Server Error</p>
      </div>
   );
};
export default ErrorWidget;
