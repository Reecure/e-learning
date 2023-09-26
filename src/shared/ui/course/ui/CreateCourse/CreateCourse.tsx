import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Course} from "@/enteties/Course";
import {useSession} from "next-auth/react";
import {DifficultLevels} from "@/enteties/Course/model/types/course";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Label} from "@/shared/ui/Label";
import {trpc} from "@/shared/utils/trpc";
import {Text} from "@/shared/ui/Text";
import CourseForm from "@/shared/ui/course/ui/CourseForms/CourseForm";

interface Props {
}

const CreateCourse: FC<Props> = () => {
   const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);

   const session = useSession();

   const createCourse = trpc.createCourse.useMutation();

   const openModalCreateCourseHandler = () => {
      setCreateCourseModalOpen((prev) => !prev);
   };

   const createCourseHandler = async (data: any) => {
      const res = await createCourse.mutate({
         ...data,
         rating: 0,
         creation_date: new Date().toISOString(),
         category_id: "",
         author_id: session.data?.user.id || "",
      });
   };

   return (
      <div>
         <Button
            theme={ButtonThemes.OUTLINED}
            onClick={openModalCreateCourseHandler}
         >
            Create course
         </Button>
         <Modal
            isOpen={createCourseModalOpen}
            setIsOpen={openModalCreateCourseHandler}
         >
            <div className={"w-full max-w-[500px]"}>
               <CourseForm
                  courseData={{}}
                  onSubmit={createCourseHandler}
                  isCreating={true}
               />
            </div>
         </Modal>
      </div>
   );
};
export default CreateCourse;
