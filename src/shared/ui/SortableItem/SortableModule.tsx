import React, {FC, useEffect, useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {Lesson} from "@/enteties/Lesson";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {setCurrentLessonId} from "@/shared/ui/course/model/slices/currentLessonSlice";
import {Button, Modal} from "@/shared/ui";
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

    const [deleteIsOpen, setDeleteIsOpne] = useState(false)
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false)
    const [deleteValue, setDeleteValue] = useState('')

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

    useEffect(() => {
        deleteValue === 'delete' ? setDeleteButtonDisabled(true) : setDeleteButtonDisabled(false)
    }, [deleteValue])

    const deleteOpenHandler = () => {
        setDeleteIsOpne(prev => !prev)
    }

    const deleteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteValue(e.currentTarget.value)
    }

    useEffect(() => {
    }, [items])

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className={` px-2 py-3 w-full border-2 border-dark-primary-main mb-2  cursor-default ${!disabled && 'cursor-grab'} `}>
            {
                isModule ? <div className={'flex justify-between items-center'}>
                        {disabled ? <Link href={`${Routes.USER_COURSE_PAGE_LESSONS}/${items.id}`}
                                          className={'cursor-pointer '}>{items.title}
                        </Link> : <p>{items.title}</p>}
                        {
                            session.data?.user.id === items.author_id &&
                            (disabled && <Button type={'submit'} theme={ButtonThemes.FILLED}
                                                 onClick={deleteOpenHandler}
                            >Delete</Button>)
                        }
                    </div>
                    : <div className={'flex justify-between items-center'}>
                        <p className={'cursor-pointer'}
                           onClick={() => dispatch(setCurrentLessonId(items.id))}>{items.title}</p>
                        {
                            session.data?.user.id === items.author_id &&
                            (disabled && <Button type={'submit'} theme={ButtonThemes.FILLED}
                                                 onClick={deleteOpenHandler}
                            >Delete</Button>)
                        }
                    </div>
            }
            <Modal isOpen={deleteIsOpen} setIsOpen={deleteOpenHandler}>
                <div className={'flex flex-col gap-3'}>
                    <p className={'text-xl'}>Write <span className={'underline text-dark-error-main'}>delete</span> to
                        delete {isModule ? 'module' : 'lesson'}</p>
                    <input type="text" className={'inputField'} onChange={deleteValueHandler}/>
                    {
                        isModule ? <Button disabled={!deleteButtonDisabled} theme={ButtonThemes.FILLED} onClick={() => {
                                try {
                                    deleteModule.mutate({id: items.id})
                                    deleteOpenHandler()
                                } catch (e) {
                                    console.log(e)
                                }
                            }}>DELETE</Button>
                            : <Button disabled={!deleteButtonDisabled} theme={ButtonThemes.FILLED} onClick={() => {
                                try {
                                    deleteLesson.mutate({id: items.id})
                                    deleteOpenHandler()
                                } catch (e) {
                                    console.log(e)
                                }
                            }}>DELETE</Button>
                    }

                </div>
            </Modal>
        </div>
    );
}
