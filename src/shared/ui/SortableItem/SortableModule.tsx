import React, {FC, useEffect, useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Lesson} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {setCurrentLessonId, setPreviewVisible} from "@/shared/ui/course/model/slices/currentLessonSlice";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {BsTrash} from "react-icons/bs";
import {
   AiOutlineCheck,
   AiOutlineClose,
   AiOutlineFileText,
} from "react-icons/ai";
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {MdOutlineQuiz} from "react-icons/md";
import {Loader} from "@/shared/ui/Loader";
import SortableModuleItem from "@/shared/ui/SortableItem/SortableModuleItem";
import SortableLessonItem from "@/shared/ui/SortableItem/SortableLessonItem";

type LessonOrModule = Lesson | Module;

interface Props<T> {
   item: T;
   disabled: boolean;
   isModule: boolean;
   refetch: () => void;
}

export const SortableModule: FC<Props<LessonOrModule>> = ({
   item,
   disabled,
   isModule,
   refetch
}) => {
   const [deleteIsOpen, setDeleteIsOpen] = useState(false);
   const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
   const [deleteValue, setDeleteValue] = useState("");

   const {attributes, listeners, setNodeRef, transform, transition} =
      useSortable({id: item?.id});

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
   };

   const deleteModule = trpc.deleteModule.useMutation();
   const deleteLesson = trpc.deleteLesson.useMutation();

   useEffect(() => {
      deleteValue === "delete"
         ? setDeleteButtonDisabled(true)
         : setDeleteButtonDisabled(false);
   }, [deleteValue]);

   useEffect(() => {
      console.log("deleteLesson.isLoading", deleteLesson.isLoading);
      console.log("deleteModule.isLoading", deleteModule.isLoading);
      refetch();
   }, [deleteModule.isLoading, deleteLesson.isLoading]);

   const deleteOpenHandler = () => {
      setDeleteIsOpen((prev) => !prev);
   };

   const deleteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeleteValue(e.currentTarget.value);
   };

   return (
      <div
         ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}
         className={`px-2 py-3 w-full border-2 border-dark-primary-main mb-2  cursor-default ${
            !disabled && "cursor-grab"
         } `}
      >
         {isModule ? (
            // Module
            <SortableModuleItem item={item as Module} disabled={disabled}
                                deleteOpen={deleteOpenHandler}/>
         ) : (
            //Lesson
            <SortableLessonItem item={item as Lesson} disabled={disabled}
                                deleteOpen={deleteOpenHandler}/>
         )}

         {/*{Delete modal}*/}
         <Modal isOpen={deleteIsOpen} setIsOpen={deleteOpenHandler}>
            <div className={"flex flex-col gap-3"}>
               <p className={"text-xl"}>
                  Write{" "}
                  <span className={"underline text-dark-error-main"}>
                     delete
                  </span>{" "}
                  to delete {item?.title}
               </p>
               <input
                  type="text"
                  className={"inputField"}
                  onChange={deleteValueHandler}
               />
               {isModule ? (
                  <Button
                     disabled={!deleteButtonDisabled}
                     theme={ButtonThemes.FILLED}
                     onClick={() => {
                        try {
                           deleteModule.mutate({id: item.id});
                           deleteOpenHandler();
                        } catch (e) {
                           console.log(e);
                        } finally {
                           console.log("refetch called");
                           refetch();
                        }
                     }}
                  >
                     DELETE
                  </Button>
               ) : (
                  <Button
                     disabled={!deleteButtonDisabled}
                     theme={ButtonThemes.FILLED}
                     onClick={() => {
                        try {
                           deleteLesson.mutate({id: item.id});
                           deleteOpenHandler();
                        } catch (e) {
                           console.log(e);
                        } finally {
                           console.log("refetch called");
                           refetch();
                        }
                     }}
                  >
                     DELETE
                  </Button>
               )}
            </div>
         </Modal>
      </div>
   );
};
