import {FC, useEffect} from "react";
import {useForm} from "react-hook-form";
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {Button, Modal} from "@/shared/ui";
import {Label} from "@/shared/ui/Label";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";

interface Props {
   lessonId: string;
   title: string;
   type: LessonType | string;
   openModal: boolean;
   setModalOpen: () => void;
}

const CourseLessonForm: FC<Props> = ({
   lessonId,
   type,
   title,
   setModalOpen,
   openModal,
}) => {
   const {register, handleSubmit} = useForm({
      values: {
         lessonTitle: title,
         lesson_type: type,
      },
   });

   const updateLesson = trpc.updateLessonInfo.useMutation();

   return (
      <div>
         <Modal isOpen={openModal} setIsOpen={setModalOpen}>
            <form
               onSubmit={handleSubmit(async (data) => {
                  try {
                     updateLesson.mutate({
                        id: lessonId,
                        lesson_type: data.lesson_type || "",
                        title: data.lessonTitle || "",
                        lesson_content: {
                           blocks: []
                        }
                     });
                  } catch (error) {
                     console.log(error);
                  }
               })}
               className={"flex flex-col gap-5 w-[300px]"}
            >
               <p className={"mb-5 text-center text-3xl"}>Update Lesson</p>
               <Label htmlFor={"title"} labelText={"Title"}>
                  <input
                     type="text"
                     {...register("lessonTitle")}
                     className={"inputField"}
                  />
               </Label>
               <Label htmlFor={"lesson_type"} labelText={"Lesson Type"}>
                  <select className={"inputField"} {...register("lesson_type")}>
                     <option className={"bg-dark-background"} value={LessonType.TEXT}>
                        {LessonType.TEXT}
                     </option>
                     <option className={"bg-dark-background"} value={LessonType.QUIZ}>
                        {LessonType.QUIZ}
                     </option>
                  </select>
               </Label>
               <Button
                  type={"submit"}
                  theme={ButtonThemes.FILLED}
                  className={"mt-5 w-full"}
               >
                  Update module
               </Button>
            </form>
         </Modal>
      </div>
   );
};
export default CourseLessonForm;
