import React, {FC, useEffect} from "react";
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {AiOutlineCheck, AiOutlineClose, AiOutlineFileText} from "react-icons/ai";
import {MdOutlineQuiz} from "react-icons/md";
import {setCurrentLessonId, setPreviewVisible} from "@/shared/ui/course/model";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {BsTrash} from "react-icons/bs";
import {Lesson} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";


type Props = {
   item: Lesson
   disabled: boolean
   deleteOpen: () => void
}

const SortableLessonItem: FC<Props> = ({item, deleteOpen, disabled}) => {
   const session = useSession();

   const updateLessonProgress = trpc.updateUserLessonsProgress.useMutation();
   const userProgressOnLesson = trpc.getUserLessonsProgressById.useQuery({
      id: session.data?.user.id!,
      lesson_id: item.id,
   });

   const dispatch = useAppDispatch();

   useEffect(() => {
      userProgressOnLesson.refetch();
   }, [updateLessonProgress.isLoading]);

   const setIsCompletedHandler = async () => {
      updateLessonProgress.mutate({
         id: session.data?.user.id!,
         lesson_progress: {
            lesson_id: item.id,
            is_completed: userProgressOnLesson.data?.is_completed !== true,
            quizScore: userProgressOnLesson.data?.quizScore || 0,
            lessonType: "",
         },
      });

   };


   return (
      <div className={"flex justify-between items-center"}>
         <div className={"flex items-center gap-1"}>
            {item?.lesson_type === LessonType.TEXT ? (
               <span className={"text-md"}>
                        <AiOutlineFileText/>
                     </span>
            ) : (
               <MdOutlineQuiz/>
            )}
            <p
               className={"cursor-pointer"}
               onClick={() => {
                  dispatch(setCurrentLessonId(item.id));
                  dispatch(setPreviewVisible(false));
                  updateLessonProgress.mutate({
                     id: session.data?.user.id!,
                     lesson_progress: {
                        lesson_id: item.id,
                        is_completed: userProgressOnLesson && userProgressOnLesson.data?.is_completed || false,
                        quizScore: userProgressOnLesson && userProgressOnLesson.data?.quizScore || 0,
                        lessonType: "",
                     },
                  });
               }}
            >
               {item.title}
            </p>
         </div>
         <div>
            {disabled &&
               item?.lesson_type === LessonType.TEXT && (
                  <Button
                     type={"submit"}

                     className={`${
                        userProgressOnLesson.data?.is_completed
                           ? "!text-dark-error-main"
                           : "!text-green-600"
                     } !p-2 !rounded-md`}
                     theme={ButtonThemes.TEXT}
                     onClick={setIsCompletedHandler}

                  >
                     {userProgressOnLesson.data?.is_completed ? (
                        <AiOutlineClose/>
                     ) : (
                        <AiOutlineCheck/>
                     )}
                  </Button>
               )}
            {session.data?.user.id === item.author_id && disabled && (
               <Button
                  type={"submit"}
                  className={"!text-dark-error-main !p-2 !rounded-md"}
                  theme={ButtonThemes.TEXT}
                  onClick={deleteOpen}
               >
                  <BsTrash/>
               </Button>
            )}
         </div>
      </div>
   );
};

export default SortableLessonItem;