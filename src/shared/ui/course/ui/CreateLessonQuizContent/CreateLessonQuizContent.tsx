import {FC, useEffect} from "react";
import {FormProvider, useFieldArray, useForm} from "react-hook-form";
import {trpc} from "@/shared/utils/trpc";
import {QuizContentType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {v4 as uuidv4} from "uuid";
import QuestionAnswerForm from "@/shared/ui/course/ui/CourseQuizForms/QuestionAnswerForm";
import QuestionAnswerFormWithFixedLettersAnswer
   from "@/shared/ui/course/ui/CourseQuizForms/QuestionAnswerFormWithFixedLettersAnswer";

export type QuestionAnswerBlock = {
   id: string;
   type: QuizContentType.QUESTION_ANSWER;
   question: string;
   correctAnswer: string;
   answer: {
      otherAnswer: string;
   }[];
};

export type AnswerWithFixedLetters = {
   id: string;
   type: QuizContentType.ANSWER_WITH_FIXED_LETTERS;
   question: string;
   answer: string;
};

export type Block = QuestionAnswerBlock | AnswerWithFixedLetters;

interface FormData {
   blocks: Block[];
}

interface Props {
   lessonId: string;
   initialData: FormData;
}

const CreateLessonQuizContent: FC<Props> = ({initialData, lessonId}) => {
   const lessonUpdateContentQuery = trpc.updateLessonContent.useMutation();

   const methods = useForm<FormData>({

      //@ts-ignore
      defaultValues: {blocks: initialData || []},
   });
   const {handleSubmit, reset} = methods;

   useEffect(() => {
      //@ts-ignore
      reset({blocks: initialData || []});
   }, [initialData, reset]);

   const onSubmit = (data: FormData) => {
      try {
         lessonUpdateContentQuery.mutate({
            id: lessonId,
            lesson_content: {...data},
         });
      } catch (e) {
         console.log(e);
      }
   };

   const {append, fields, remove} = useFieldArray({
      control: methods.control,
      name: "blocks",
   });

   const addAnswerWithFixedLetters = () => {
      append({
         id: uuidv4(),
         type: QuizContentType.ANSWER_WITH_FIXED_LETTERS,
         question: "",
         answer: "",
      });
   };

   const addQuestionAnswerBlock = () => {
      append({
         id: uuidv4(),
         type: QuizContentType.QUESTION_ANSWER,
         question: "",
         correctAnswer: "",
         answer: [
            {
               otherAnswer: "",
            },
         ],
      });
   };

   return (
      <FormProvider {...methods}>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className={"flex flex-col gap-5 "}
         >
            {fields.map((field, index) => {
               return (
                  <div key={field.id}>
                     {field.type === QuizContentType.QUESTION_ANSWER ? (
                        <div className={"flex gap-2 items-start"}>
                           <QuestionAnswerForm index={index}/>
                           <Button
                              theme={ButtonThemes.TEXT}
                              className={"!px-4 !py-2 !rounded-md"}
                              type="button"
                              onClick={() => remove(index)}
                           >
                              x
                           </Button>
                        </div>
                     ) : field.type === QuizContentType.ANSWER_WITH_FIXED_LETTERS ? (
                        <div className={"flex gap-2 items-start"}>
                           <QuestionAnswerFormWithFixedLettersAnswer index={index}/>
                           <Button
                              theme={ButtonThemes.TEXT}
                              className={"!px-4 !py-2 !rounded-md"}
                              type="button"
                              onClick={() => remove(index)}
                           >
                              x
                           </Button>
                        </div>
                     ) : null}
                  </div>
               );
            })}
            <div className={"flex gap-3"}>
               <Button theme={ButtonThemes.FILLED} onClick={addQuestionAnswerBlock}>
                  Add Question Answer
               </Button>
               <Button
                  theme={ButtonThemes.FILLED}
                  onClick={addAnswerWithFixedLetters}
               >
                  Add Answer with fixed letters
               </Button>
            </div>
            <Button theme={ButtonThemes.FILLED} type="submit">
               Save
            </Button>
         </form>
      </FormProvider>
   );
};
export default CreateLessonQuizContent;
