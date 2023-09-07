import React, {FC} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Lesson} from "@/enteties/Lesson";
import {LessonOrModuleArray} from "@/shared/ui/DragAndDrop/DragAndDrop";

type LessonOrModule = Lesson | Module

interface Props {
    items: LessonOrModule,
    disabled: boolean
    isModule: boolean
}


export const SortableModule: FC<Props> = ({items, disabled, isModule}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: items.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className={`px-2 py-3 w-full border-2 border-dark-primary-main mb-2  cursor-default ${!disabled && 'cursor-grab'} `}>
            {
                isModule ? <Link href={`${Routes.USER_COURSE_PAGE_LESSONS}/${items.id}`}
                                 className={'cursor-pointer '}
                >
                    {items.title}
                </Link> : <p>{items.title}</p>
            }
        </div>
    );
}
