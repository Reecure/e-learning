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
import {BsTrash} from "react-icons/bs";
import {AiOutlineCheck, AiOutlineClose, AiOutlineFileText} from "react-icons/ai";
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import {MdOutlineQuiz} from "react-icons/md";
import {Loader} from "@/shared/ui/Loader";


type LessonOrModule = Lesson | Module;

interface Props<T> {
    items: T;
    disabled: boolean;
    setCurrentLesson?: (id: string) => void;
    isModule: boolean
}

function isLesson(item: LessonOrModule): item is Lesson {
    return (item as Lesson).lesson_type !== undefined;
}

export const SortableModule: FC<Props<LessonOrModule>> = ({items, setCurrentLesson, disabled, isModule}) => {

    const [deleteIsOpen, setDeleteIsOpne] = useState(false)
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false)
    const [deleteValue, setDeleteValue] = useState('')
    const [isCompelted, setIsCompleted] = useState(false)

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

    const session = useSession()

    const deleteModule = trpc.deleteModule.useMutation()
    const deleteLesson = trpc.deleteLesson.useMutation()
    const updateModuleProgress = trpc.updateUserModulesProgress.useMutation()
    const updateLessonProgress = trpc.updateUserLessonsProgress.useMutation()
    const userProgressOnLesson = trpc.getUserLessonsProgressById.useQuery({
        id: session.data?.user.id,
        lesson_id: items.id
    })

    const dispatch = useAppDispatch()

    useEffect(() => {
        userProgressOnLesson.refetch()
    }, [userProgressOnLesson.isLoading, updateLessonProgress])

    useEffect(() => {
        deleteValue === 'delete' ? setDeleteButtonDisabled(true) : setDeleteButtonDisabled(false)
    }, [deleteValue])

    const deleteOpenHandler = () => {
        setDeleteIsOpne(prev => !prev)
    }

    const deleteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteValue(e.currentTarget.value)
    }

    const setIsCompletedHandler = () => {
        updateLessonProgress.mutate({
            id: session.data?.user.id!,
            lesson_progress: {
                lesson_id: items.id,
                is_completed: userProgressOnLesson.data?.is_completed === true ? false : true,
                quizScore: userProgressOnLesson.data?.quizScore,
                lessonType: ''
            }
        })
    }

    if (userProgressOnLesson.isLoading) {
        return <Loader/>
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}
             className={`${userProgressOnLesson.data?.is_completed && 'opacity-30'} hover:opacity-70 duration-300 px-2 py-3 w-full border-2 border-dark-primary-main mb-2  cursor-default ${!disabled && 'cursor-grab'} `}>
            {
                isModule ? <div className={'flex justify-between items-center'}>
                        {disabled ? <Link href={`${Routes.USER_COURSE_PAGE_LESSONS}/${items.id}`}
                                          className={'cursor-pointer '} onClick={() => {
                            updateModuleProgress.mutate({
                                id: session.data?.user.id!,
                                module_progress: {
                                    module_id: items.id,
                                    is_completed: true,
                                }
                            })
                        }}>{items.title}
                        </Link> : <p>{items.title}</p>}
                        {
                            session.data?.user.id === items.author_id &&
                            (disabled && <Button type={'submit'} theme={ButtonThemes.TEXT}
                                                 className={'!text-dark-error-main !p-2 !rounded-md'}
                                                 onClick={deleteOpenHandler}
                            ><BsTrash/></Button>)
                        }
                    </div>
                    : <div className={`flex justify-between items-center`}>
                        <div className={'flex items-center gap-1'}>
                            {isLesson(items) && items?.lesson_type === LessonType.TEXT ?
                                <span className={'text-md'}><AiOutlineFileText/></span> : <MdOutlineQuiz/>}
                            <p className={'cursor-pointer'}
                               onClick={() => {
                                   dispatch(setCurrentLessonId(items.id))
                                   updateLessonProgress.mutate({
                                       id: session.data?.user.id!,
                                       lesson_progress: {
                                           lesson_id: items.id,
                                           is_completed: userProgressOnLesson.data?.is_completed,
                                           quizScore: userProgressOnLesson.data?.quizScore,
                                           lessonType: ''
                                       }
                                   })
                               }}>{items.title}</p>
                        </div>
                        <div>
                            {
                                disabled && (isLesson(items) && items?.lesson_type === LessonType.TEXT && (
                                    <Button type={'submit'}
                                            className={`${userProgressOnLesson.data?.is_completed ? '!text-dark-error-main' : '!text-green-600'} !p-2 !rounded-md`}
                                            theme={ButtonThemes.TEXT}
                                            onClick={setIsCompletedHandler}
                                    >{userProgressOnLesson.data?.is_completed ? <AiOutlineClose/> :
                                        <AiOutlineCheck/>}</Button>))
                            }
                            {
                                session.data?.user.id === items.author_id &&
                                (disabled &&
                                    <Button type={'submit'}
                                            className={'!text-dark-error-main !p-2 !rounded-md'}
                                            theme={ButtonThemes.TEXT}
                                            onClick={deleteOpenHandler}
                                    ><BsTrash/></Button>)
                            }
                        </div>
                    </div>
            }
            <Modal isOpen={deleteIsOpen} setIsOpen={deleteOpenHandler}>
                <div className={'flex flex-col gap-3'}>
                    <p className={'text-xl'}>Write <span className={'underline text-dark-error-main'}>delete</span> to
                        delete {items.title}</p>
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
