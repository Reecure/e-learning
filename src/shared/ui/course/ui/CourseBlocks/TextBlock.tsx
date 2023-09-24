import { FC, ReactNode } from "react";

enum BlockTypes {}

interface Props {
  textBlock: {
    id: string;
    title: string;
    paragraphs: {
      id: string;
      text: string;
    }[];
    type: BlockTypes;
  };
}

const TextBlock: FC<Props> = ({ textBlock }) => {
   return (
      <div>
         <h5 className={"text-3xl font-bold mb-3"}>{textBlock?.title}</h5>
         <p>
            {textBlock?.paragraphs.map((paragraph) => {
               return (
                  <p className={"mb-3"} key={paragraph.id}>
                     {paragraph.text}
                  </p>
               );
            })}
         </p>
      </div>
   );
};
export default TextBlock;
