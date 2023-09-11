import {FC, useEffect, useState} from 'react';
import {trpc} from "@/shared/utils/trpc";
import TextBlock from "@/shared/ui/course/ui/CourseBlocks/TextBlock";
import CodeBlock from "@/shared/ui/course/ui/CourseBlocks/CodeBlock";
import ImageBlock from "@/shared/ui/course/ui/CourseBlocks/ImageBlock";
import Badge, {BadgeColors} from "@/shared/ui/Badge/Badge";
import CreateLessonContent from "@/shared/ui/course/ui/CreateLessonContent/CreateLessonContent";
import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import CreateLesson from "@/shared/ui/course/ui/CreateLesson/CreateLesson";
import {Label} from "@/shared/ui/Label";
import {useForm} from "react-hook-form";
import {useSession} from "next-auth/react";

export enum LessonContentType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    CODE = 'CODE'
}

export enum LessonType {
    VIDEO = 'VIDEO',
    TEXT = 'TEXT',
    QUIZ = 'QUIZ'
}

interface Props {
    lesson_id: string
}

const LessonContent: FC<Props> = ({lesson_id}) => {
    const [lessonContentEditable, setLessonContentEditable] = useState(false)
    const [editableLesson, setLessonEditable] = useState(false)
    const lessonQuery = trpc.getLessonById.useQuery({lesson_id: lesson_id})

    const session = useSession()

    const {register, handleSubmit} = useForm(
        {
            defaultValues: {
                lessonTitle: lessonQuery.data?.title,
                lesson_type: lessonQuery.data?.lesson_type
            }
        }
    )


    const contentRender = (contentType: LessonContentType | string, block: any) => {
        switch (contentType) {
            case LessonContentType.TEXT:
                return <TextBlock textBlock={block}/>
            case LessonContentType.CODE:
                return <CodeBlock codeBlock={block}/>
            case LessonContentType.IMAGE:
                return <ImageBlock imageBlock={block}/>
        }
    }

    const editableLessonHandle = () => {
        setLessonEditable(prev => !prev)
    }

    if (lessonQuery.isLoading) {
        return <>Loading</>
    }
    if (lessonQuery.data === undefined) {
        return <>There is no lessons of this course</>
    }
    if (lessonQuery.error) {
        return <>Something went wrong</>
    }

    return (
        <div>
            <div className={'flex justify-between items-center gap-2 items-center'}>
                <div className={'flex gap-2 items-center'}>
                    <h4 className={'text-5xl font-extrabold my-5'}>
                        {lessonQuery.data?.title}
                    </h4>
                    <Badge color={BadgeColors.GREEN} text={lessonQuery.data?.lesson_type!}/>
                </div>
                {
                    lessonQuery.data?.author_id === session.data?.user.id &&
                    <div className={'flex gap-2 items-center'}>
                        <Button theme={ButtonThemes.FILLED} onClick={editableLessonHandle}>Edit
                            Lesson</Button>
                        <Button theme={ButtonThemes.FILLED} onClick={() => setLessonContentEditable(prev => !prev)}>Edit
                            Content</Button>
                    </div>
                }

            </div>
            {
                lessonContentEditable ?
                    // @ts-ignore
                    <CreateLessonContent lessonId={lesson_id} initialData={lessonQuery.data?.lesson_content?.blocks}/> :
                    (
                        // @ts-ignore
                        lessonQuery.data?.lesson_content?.blocks?.map(lesson => {
                            return contentRender(lesson.type, lesson)
                        }))
            }
            <Modal isOpen={editableLesson} setIsOpen={editableLessonHandle}>
                <form onSubmit={handleSubmit(async (data) => {
                    try {
                        console.log({...data})
                    } catch (error) {

                    }
                })} className={'flex flex-col gap-5 w-[300px]'}>
                    <p className={'mb-5 text-center text-3xl'}>Update Lesson</p>
                    <Label htmlFor={'title'} labelText={'Title'}>
                        <input type="text" {...register('lessonTitle')} className={'inputField'}/>
                    </Label>
                    <Label htmlFor={'lesson_type'} labelText={'Lesson Type'}>
                        <select
                            className={'inputField'} {...register('lesson_type')}>
                            <option className={'bg-dark-background'} value={LessonType.TEXT}>{LessonType.TEXT}</option>
                            <option className={'bg-dark-background'} value={LessonType.QUIZ}>{LessonType.QUIZ}</option>
                            <option className={'bg-dark-background'}
                                    value={LessonType.VIDEO}>{LessonType.VIDEO}</option>
                        </select>
                    </Label>
                    <Button type={'submit'} theme={ButtonThemes.FILLED} className={'mt-5 w-full'}>Update module</Button>
                </form>
            </Modal>
        </div>
    );
};
export default LessonContent;
