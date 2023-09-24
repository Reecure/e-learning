import { FC } from "react";
import { LessonContentType } from "@/shared/ui/course/ui/LessonContent/LessonContent";
import Image from "next/image";

interface Props {
  imageBlock: {
    id?: string;
    type?: LessonContentType;
    src: string;
    title: string;
  };
}

const ImageBlock: FC<Props> = ({ imageBlock }) => {
   return (
      <div>
         <div className={"w-full"}>
            <Image
               src={imageBlock.src}
               alt={"image"}
               width={400}
               height={250}
               className={"mx-auto object-cover w-[400px] h-[250px] mb-2"}
            ></Image>
         </div>
         <div className={"text-center"}>{imageBlock.title}</div>
      </div>
   );
};
export default ImageBlock;
