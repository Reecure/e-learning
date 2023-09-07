import {FC, useEffect, useState} from 'react';
import {trpc} from "@/shared/utils/trpc";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {SortableModule} from "@/shared/ui/SortableItem/SortableModule";
import {Module} from "@/enteties/Module";
import DragAndDrop from "@/shared/ui/DragAndDrop/DragAndDrop";

interface Props {
    course_id: string
    courseModulesEdit: boolean

}

const CourseModules: FC<Props> = ({course_id, courseModulesEdit}) => {

    const modulesQuery = trpc.getModulesByCourseId.useQuery({course_id: course_id});

    if (modulesQuery.isLoading) {
        return <>Loading...</>;
    }

    return (
        <div className={'mt-5'}>
            <DragAndDrop items={modulesQuery.data!} canEdit={courseModulesEdit} isModule/>
        </div>
    );
};

export default CourseModules;
{/*<div className={'flex flex-col gap-3 mt-5'}>*/
}
{/*    {*/
}
{/*        modulesQuery.data?.map(modules => {*/
}
{/*            return <div key={modules.id}*/
}
{/*                        className={`w-full py-3 px-4 border-[1px] border-light-primary-main cursor-pointer hover:scale-[1.01] duration-200 ${*/
}
{/*                            courseModulesEdit ? 'draggable' : ''*/
}
{/*                        }`}*/
}
{/*                        draggable={courseModulesEdit ? 'true' : 'false'}>*/
}
{/*                <Link*/
}
{/*                    href={`/user/my-courses/course/course-module-lessons/${modules.id}`}*/
}
{/*                >{modules.title}</Link>*/
}
{/*            </div>*/
}
{/*        })*/
}
{/*    }*/
}
{/*</div>*/
}
