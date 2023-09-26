import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Lesson} from "@/enteties/Lesson";
import {trpc} from "@/shared/utils/trpc";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Label} from "@/shared/ui/Label";
import Notification from "@/shared/ui/Notification/Notification";
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {useSession} from "next-auth/react";

interface Props {
   moduleId: string;
}

const CreateLesson: FC<Props> = ({moduleId}) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [submitError, setSubmitError] = useState({isError: false, error: ""});
   const [notificationOpen, setNotificationOpen] = useState(false);
   const [buttonDisabled, setButtonDisabled] = useState(false);

   const createLesson = trpc.createLesson.useMutation();
   const getLessons = trpc.getLessonsByModuleId.useQuery({
      module_id: moduleId,
   });
   const session = useSession();

   const {register, handleSubmit} = useForm<Lesson>({
      defaultValues: {
         title: "",
         lesson_type: LessonType.TEXT,
         module_id: moduleId,
         lesson_content: {
            //@ts-ignore
            blocks: []
         },
         order: getLessons.data?.length,
      },
   });

   useEffect(() => {
      getLessons.refetch();
   }, [createLesson.isLoading]);

   useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      if (buttonDisabled) {
         const timeoutId = setTimeout(() => {
            setButtonDisabled(false);
         }, 3000);
      }

      return () => {
         clearTimeout(timeoutId);
      };
   }, [buttonDisabled]);

   const modalOpenHandler = () => {
      setModalOpen((prev) => !prev);
   };

   const setNotificationOpenHandler = () => {
      setNotificationOpen((prev) => !prev);
   };

   return (
      <div>
         <div
            onClick={modalOpenHandler}
            className={
               "mb-5 flex items-center justify-center w-full border-dashed border-[1px] py-2 " +
               "border-dark-primary-main hover:border-opacity-60 " +
               "hover:text-opacity-60 cursor-pointer text-dark-primary-main"
            }
         >
            <p>Add Lesson</p>
         </div>

         <Modal isOpen={modalOpen} setIsOpen={modalOpenHandler}>
            <form
               onSubmit={handleSubmit(async (data) => {
                  console.log({...data});
                  try {
                     const res = await createLesson.mutate({
                        ...data,
                        author_id: session.data?.user.id!,
                        lesson_type: data.lesson_type,
                        order: getLessons.data?.length!,
                     });
                     setSubmitError({isError: false, error: ""});
                     setNotificationOpenHandler();
                     setButtonDisabled(true);
                  } catch (error) {
                     setSubmitError({isError: true, error: "some error"});
                     setNotificationOpenHandler();
                     setButtonDisabled(true);
                  } finally {
                     getLessons.refetch();
                  }
               })}
               className={"flex flex-col gap-5 w-[300px]"}
            >
               <p className={"mb-5 text-center text-3xl"}>Create Lesson</p>
               <Label htmlFor={"title"} labelText={"Title"}>
                  <input
                     type="text"
                     {...register("title")}
                     className={"inputField"}
                  />
               </Label>
               <Label htmlFor={"lesson_type"} labelText={"Lesson Type"}>
                  <select className={"inputField"} {...register("lesson_type")}>
                     <option className={"bg-light-background dark:bg-dark-background"} value={LessonType.TEXT}>
                        {LessonType.TEXT}
                     </option>
                     <option className={"bg-light-background dark:bg-dark-background"} value={LessonType.QUIZ}>
                        {LessonType.QUIZ}
                     </option>
                  </select>
               </Label>
               <Button
                  type={"submit"}
                  disabled={buttonDisabled}
                  theme={ButtonThemes.FILLED}
                  className={"mt-5 w-full"}
               >
                  Create lesson
               </Button>
            </form>
         </Modal>

         <Notification
            open={notificationOpen}
            onClose={setNotificationOpenHandler}
            isSuccess={!submitError.isError}
            timeoutDelay={3000}
         >
            {submitError.isError
               ? "Some server error try later"
               : "Lesson create success. Reload page."}
         </Notification>
      </div>
   );
};
export default CreateLesson;
