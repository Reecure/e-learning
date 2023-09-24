import {FC, useState} from "react";
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

   const [button, setbutton] = useState();

   const lessonsQuery = trpc.getLessonsByModuleId.useQuery({
      module_id: moduleId,
   });

   const refetchLessons = () => {
      lessonsQuery.refetch();
   };


   if (lessonsQuery.isLoading) {
      return <Loader/>;
   }

   return (
      <div className={"mt-5"}>
         <Button theme={ButtonThemes.FILLED} onClick={() => {
            console.log("refetch called");
            lessonsQuery.refetch();
         }}>refetch</Button>
         <DragAndDrop
            items={lessonsQuery?.data?.sort((a, b) => a.order - b.order) as any}
            canEdit={lessonCanEdit}
            isModule={false}
            refetch={refetchLessons}
            isUserAuthor={isUserLessons}
         />
      </div>
   );
};
export default CourseLessons;
