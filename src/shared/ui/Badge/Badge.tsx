import { FC } from "react";

export enum BadgeColors {
  GREEN = "bg-green-600",
  YELLOW = "bg-yellow-500",
  RED = "bg-red-600",
}

interface Props {
  color: BadgeColors;
  text: string;
}

const Badge: FC<Props> = ({ color, text }) => {
   return (
      <div
         className={`${color} px-3 py-1 max-w-min rounded-full text-white mb-3`}
      >
         <p>{text}</p>
      </div>
   );
};
export default Badge;
