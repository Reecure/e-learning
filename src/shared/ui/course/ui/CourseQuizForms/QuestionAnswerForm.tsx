import { FC } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "@/shared/ui/Label";
import { Button } from "@/shared/ui";
import { ButtonThemes } from "@/shared/ui/Button/Button";

interface Props {
  index: number;
}

const QuestionAnswerForm: FC<Props> = ({ index }) => {
   const { register, control } = useFormContext();
   const {
      fields,
      remove,
      append: appendAnswer,
   } = useFieldArray({
      control,
      name: `blocks.${index}.answer`,
   });

   const appendIncorrectAnswer = () => {
      appendAnswer({ otherAnswer: "" });
   };
   return (
      <div className={"flex flex-col gap-5 w-full"}>
         <h5 className={"text-2xl"}>Question Answer Block</h5>
         <Label htmlFor={`blocks.${index}.question`} labelText={"Question"}>
            <input
               className={"inputField"}
               {...register(`blocks.${index}.question`)}
            />
         </Label>
         <Label
            htmlFor={`blocks.${index}.correctAnswer`}
            labelText={"CorrectAnswer"}
         >
            <input
               className={"inputField"}
               {...register(`blocks.${index}.correctAnswer`)}
            />
         </Label>
         {fields.map((field, otherAnswerIndex) => {
            return (
               <div key={field.id} className={"flex gap-2 items-start"}>
                  <div className={"w-full"}>
                     <Label
                        htmlFor={`blocks.${index}.answer.${otherAnswerIndex}.otherAnswer`}
                        labelText={"Incorrect Answer"}
                     >
                        <input
                           className={"inputField w-full"}
                           {...register(
                              `blocks.${index}.answer.${otherAnswerIndex}.otherAnswer`,
                           )}
                        />
                     </Label>
                  </div>
                  <Button
                     theme={ButtonThemes.TEXT}
                     type="button"
                     className={'!px-2 !py-0 rounded-md'}
                     onClick={() => remove(otherAnswerIndex)}
                  >
              x
                  </Button>
               </div>
            );
         })}
         <Button
            type={"button"}
            theme={ButtonThemes.FILLED}
            onClick={appendIncorrectAnswer}
         >
        Add Answer
         </Button>
      </div>
   );
};
export default QuestionAnswerForm;
