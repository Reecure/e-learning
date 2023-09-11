import {FC, useEffect, useState} from 'react';
import {trpc} from "@/shared/utils/trpc";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";

interface Props {
    moduleId: string
    lessonCanEdit: boolean
}

const CourseLessons: FC<Props> = ({moduleId, lessonCanEdit = true}) => {
    const lessonsQuery = trpc.getLessonsByModuleId.useQuery({module_id: moduleId});

    useEffect(() => {
        console.log(lessonsQuery.data)
        console.log(moduleId)
    }, [lessonsQuery])

    if (lessonsQuery.isLoading) {
        return <>Loading...</>;
    }

    return (
        <div className={'mt-5'}>
            <DragAndDrop items={lessonsQuery.data || []} canEdit={lessonCanEdit} isModule={false}/>
        </div>
    );
};
export default CourseLessons;