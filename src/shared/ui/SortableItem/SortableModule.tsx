import React, {FC} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Lesson} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {setCurrentLessonId} from "@/shared/ui/course/model/slices/currentLessonSlice";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";

type LessonOrModule = Lesson | Module

interface Props {
    items: LessonOrModule,
    disabled: boolean
    isModule: boolean
    setCurrentLesson?: (id: string) => void
}


export const SortableModule: FC<Props> = ({items, setCurrentLesson, disabled, isModule}) => {
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

    const deleteModule = trpc.deleteModule.useMutation()
    const deleteLesson = trpc.deleteLesson.useMutation()

    const session = useSession()

    const dispatch = useAppDispatch()

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className={` px-2 py-3 w-full border-2 border-dark-primary-main mb-2  cursor-default ${!disabled && 'cursor-grab'} `}>
            {
                isModule ? <div className={'flex justify-between items-center'}>
                        <Link href={`${Routes.USER_COURSE_PAGE_LESSONS}/${items.id}`}
                              className={'cursor-pointer '}>{items.title}
                        </Link>
                        {
                            session.data?.user.id === items.author_id &&
                            (disabled && <Button type={'submit'} theme={ButtonThemes.FILLED}
                                                 onClick={() => {
                                                     try {
                                                         deleteModule.mutate({id: items.id})
                                                     } catch (e) {
                                                         console.log(e)
                                                     }
                                                 }}
                            >Delete</Button>)
                        }
                    </div>
                    : <div className={'flex justify-between items-center'}>
                        <p className={'cursor-pointer'}
                           onClick={() => dispatch(setCurrentLessonId(items.id))}>{items.title}</p>
                        {
                            session.data?.user.id === items.author_id &&
                            (disabled && <Button type={'submit'} theme={ButtonThemes.FILLED}
                                                 onClick={() => {
                                                     try {
                                                         deleteLesson.mutate({id: items.id})
                                                     } catch (e) {
                                                         console.log(e)
                                                     }
                                                 }}
                            >Delete</Button>)
                        }
                    </div>
            }

        </div>
    );
}
