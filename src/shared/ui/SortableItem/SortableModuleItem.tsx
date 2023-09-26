import React, {FC} from "react";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {setPreviewVisible} from "@/shared/ui/course/model";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {BsTrash} from "react-icons/bs";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";


type Props = {
   item: Module
   disabled: boolean
   deleteOpen: () => void
}

const SortableModuleItem: FC<Props> = ({item, disabled, deleteOpen}) => {

   const session = useSession();

   const updateModuleProgress = trpc.updateUserModulesProgress.useMutation();

   const dispatch = useAppDispatch();

   return (
      <div className={"flex justify-between items-center"}>
         {disabled ? (
            <Link
               href={`${Routes.USER_COURSE_PAGE_LESSONS}/${item.id}`}
               className={"cursor-pointer "}
               onClick={() => {
                  dispatch(setPreviewVisible(true));
                  updateModuleProgress.mutate({
                     id: session.data?.user.id!,
                     module_progress: {
                        module_id: item.id,
                        is_completed: true,
                     },
                  });
               }}
            >
               {item.title}
            </Link>
         ) : (
            <p>{item.title}</p>
         )}
         {session.data?.user.id === item.author_id && disabled && (
            <Button
               type={"submit"}
               theme={ButtonThemes.TEXT}
               className={"!text-light-error-main dark:!text-dark-error-main !p-2 !rounded-md"}
               onClick={deleteOpen}
            >
               <BsTrash/>
            </Button>
         )}
      </div>
   );
};

export default SortableModuleItem;