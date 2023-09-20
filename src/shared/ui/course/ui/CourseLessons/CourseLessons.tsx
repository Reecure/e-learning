import {FC, useEffect, useState} from 'react';
import {trpc} from "@/shared/utils/trpc";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";
import {Lesson} from "@/enteties/Lesson";
import {users} from "@prisma/client";
import {Loader} from "@/shared/ui/Loader";

interface Props {
    moduleId: string
    lessonCanEdit: boolean
    isUserLessons: boolean
}

const CourseLessons: FC<Props> = ({moduleId, lessonCanEdit, isUserLessons}) => {
    const lessonsQuery = trpc.getLessonsByModuleId.useQuery({module_id: moduleId});

    if (lessonsQuery.isLoading) {
        return <Loader/>;
    }

    return (
        <div className={'mt-5'}>
            <DragAndDrop items={lessonsQuery?.data?.sort((a, b) => a.order - b.order) as any} canEdit={lessonCanEdit}
                         isModule={false} isUserAuthor={isUserLessons}/>
        </div>
    );
};
export default CourseLessons;
