import {FC, useEffect, useState} from "react";
import {trpc} from "@/shared/utils/trpc";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {Loader} from "@/shared/ui/Loader";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

interface Props {
   moduleId: string;
   lessonCanEdit: boolean;
   isUserLessons: boolean;
}

const CourseLessons: FC<Props> = ({
   moduleId,
   lessonCanEdit,
   isUserLessons,
}) => {

   const lessonsQuery = trpc.getLessonsByModuleId.useQuery({
      module_id: moduleId,
   });

   useEffect(() => {
      console.log(lessonsQuery.data);
   }, [lessonsQuery]);
   
   if (lessonsQuery.isLoading) {
      return <Loader/>;
   }

   return (
      <div className={"mt-5"}>
         <DragAndDrop
            items={lessonsQuery?.data?.sort((a, b) => a.order - b.order) as any}
            canEdit={lessonCanEdit}
            isModule={false}
            refetch={lessonsQuery.refetch}
            isUserAuthor={isUserLessons}
         />
      </div>
   );
};
export default CourseLessons;
