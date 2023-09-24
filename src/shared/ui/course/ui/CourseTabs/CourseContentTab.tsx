import {FC, useEffect} from "react";
import CourseModules from "@/shared/ui/course/ui/CourseModules/CourseModules";
import {Module} from "@/enteties/Module";

interface Props {
   courseModulesEdit: boolean;
   moduleId: string;
   isUserAuthor: boolean;
}

const CourseContentTab: FC<Props> = ({
   courseModulesEdit,
   moduleId,
   isUserAuthor,
}) => {
   return (
      <>
         <CourseModules
            courseModulesEdit={courseModulesEdit}
            moduleId={moduleId}
            isUserAuthor={isUserAuthor}
         />
      </>
   );
};
export default CourseContentTab;
