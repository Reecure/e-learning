import {FC, useEffect, useState} from "react";
import {trpc} from "@/shared/utils/trpc";
import TextBlock from "@/shared/ui/course/ui/CourseBlocks/TextBlock";
import CodeBlock from "@/shared/ui/course/ui/CourseBlocks/CodeBlock";
import ImageBlock from "@/shared/ui/course/ui/CourseBlocks/ImageBlock";
import Badge, {BadgeColors} from "@/shared/ui/Badge/Badge";
import CreateLessonContent from "@/shared/ui/course/ui/CreateLessonContent/CreateLessonContent";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import CreateLesson from "@/shared/ui/course/ui/CreateLesson/CreateLesson";
import {Label} from "@/shared/ui/Label";
import {useForm} from "react-hook-form";
import {useSession} from "next-auth/react";
import {Loader} from "@/shared/ui/Loader";
import CourseLessonForm from "@/shared/ui/course/ui/CourseLessonForm/CourseLessonForm";
import VideoBlock from "@/shared/ui/course/ui/CourseBlocks/VideoBlock";
import CourseQuizGameQuestionWithAnswer from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameQuestionWithAnswer";
import CreateLessonQuizContent from "@/shared/ui/course/ui/CreateLessonQuizContent/CreateLessonQuizContent";
import CourseQuizGameAnswerWithFixedLetters
   from "@/shared/ui/course/ui/CourseQuizGames/CourseQuizGameAnswerWithFixedLetters";
import QuizComponent from "@/shared/ui/course/ui/QuizComponent/QuizComponent";
import {useAppDispatch, useAppSelector} from "@/app/ReduxProvider/config/hooks";
import {isLessonPreviewVisible} from "@/shared/ui/course/model/selectors/currentLessonSelector";
import {setPreviewVisible} from "@/shared/ui/course/model";

export enum LessonContentType {
   TEXT = "TEXT",
   IMAGE = "IMAGE",
   CODE = "CODE",
   VIDEO = "VIDEO",
}

export enum QuizContentType {
   DRAG_BLOCKS = " DRAG_BLOCKS",
   QUESTION_ANSWER = "QUESTION_ANSWER",
   ANSWER_WITH_FIXED_LETTERS = "ANSWER_WITH_FIXED_LETTERS",
   SORT_ANSWER = "SORT_ANSWER",
}

export enum LessonType {
   TEXT = "TEXT",
   QUIZ = "QUIZ",
}

interface Props {
   lesson_id: string;
}

const LessonContent: FC<Props> = ({lesson_id}) => {
   const [lessonContentEditable, setLessonContentEditable] = useState(false);
   const [quizContentEditable, setQuizContentEditable] = useState(false);
   const [editableLesson, setLessonEditable] = useState(false);
   const lessonQuery = trpc.getLessonById.useQuery({lesson_id: lesson_id});

   const session = useSession();
   const dispatch = useAppDispatch();

   const contentRender = (
      contentType: LessonContentType | string,
      block: any,
   ) => {
      switch (contentType) {
      case LessonContentType.TEXT:
         return <TextBlock textBlock={block}/>;
      case LessonContentType.CODE:
         return <CodeBlock codeBlock={block}/>;
      case LessonContentType.IMAGE:
         return <ImageBlock imageBlock={block}/>;
      case LessonContentType.VIDEO:
         return <VideoBlock videoBlock={block}/>;
      }
   };

   const editableLessonHandle = () => {
      setLessonEditable((prev) => !prev);
   };

   if (lessonQuery.isLoading) {
      return <Loader/>;
   }
   if (lessonQuery.error) {
      return <>Something went wrong</>;
   }

   return (
      <div>
         <div className={"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5"}>
            <div className={"flex gap-2 items-center"}>
               <h4 className={"text-3xl sm:text-5xl font-extrabold my-3 sm:my-5"}>
                  {lessonQuery.data?.title}
               </h4>
               <Badge
                  color={BadgeColors.GREEN}
                  text={lessonQuery.data?.lesson_type!}
               />
            </div>
            {lessonQuery.data?.author_id === session.data?.user.id && (
               <div className={"flex gap-2 items-center"}>
                  <Button theme={ButtonThemes.FILLED} onClick={editableLessonHandle}>
                     Edit Lesson
                  </Button>
                  {lessonQuery.data?.lesson_type === LessonType.TEXT ? (
                     <Button
                        theme={ButtonThemes.FILLED}
                        onClick={() => setLessonContentEditable((prev) => !prev)}
                     >
                        Edit Content
                     </Button>
                  ) : (
                     <Button
                        theme={ButtonThemes.FILLED}
                        onClick={() => setQuizContentEditable((prev) => !prev)}
                     >
                        Edit Content
                     </Button>
                  )}
               </div>
            )}
         </div>
         {lessonQuery.data?.lesson_type === LessonType.TEXT ? (
            lessonContentEditable ? (
               <CreateLessonContent
                  lessonId={lesson_id}
                  initialData={lessonQuery.data?.lesson_content?.blocks as any}
               />
            ) : (

               lessonQuery.data?.lesson_content?.blocks?.map((lesson) => {
                  //@ts-ignore
                  return contentRender(lesson?.type, lesson);
               })
            )
         ) : quizContentEditable ? (

            <CreateLessonQuizContent
               lessonId={lesson_id}
               initialData={lessonQuery.data?.lesson_content?.blocks as any}
            />
         ) : (

            <QuizComponent
               lesson_id={lesson_id}
               blocks={lessonQuery.data?.lesson_content?.blocks as any}
            />
         )}
         <CourseLessonForm
            lessonId={lesson_id}
            title={lessonQuery.data?.title || ""}
            type={lessonQuery.data?.lesson_type || ""}
            openModal={editableLesson}
            setModalOpen={editableLessonHandle}
         />
      </div>
   );
};
export default LessonContent;
