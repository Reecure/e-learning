import {FC, useEffect} from 'react';
import {FormProvider, useFieldArray, useForm, useFormContext} from 'react-hook-form';
import {Button} from '@/shared/ui';
import {ButtonThemes} from '@/shared/ui/Button/Button';
import {Label} from '@/shared/ui/Label';
import {v4 as uuidv4} from 'uuid'
import {trpc} from "@/shared/utils/trpc";
import CodeForm from "@/shared/ui/course/ui/CourseForms/CodeForm";
import TextForm from "@/shared/ui/course/ui/CourseForms/TextForm";
import ImageForm from "@/shared/ui/course/ui/CourseForms/ImageForm";
import {LessonContentType} from "@/shared/ui/course/ui/LessonContent/LessonContent";
import VideoForm from "@/shared/ui/course/ui/CourseForms/VideoForm";


type TextBlock = {
    id: string;
    title: string
    type: LessonContentType.TEXT;
    paragraphs: {
        id: string,
        text: string
    }[];
};

type ImageBlock = {
    id: string;
    type: LessonContentType.IMAGE;
    title: string;
    src: string;
};

type CodeBlock = {
    id: string;
    type: LessonContentType.CODE;
    code: string
};

type VideoBlock = {
    id: string,
    type: LessonContentType.VIDEO,
    url: string
}

type Block = TextBlock | ImageBlock | CodeBlock | VideoBlock;

interface FormData {
    blocks: Block[];
}

interface Props {
    initialData?: FormData
    lessonId: string
}

const CreateLessonContent: FC<Props> = ({initialData, lessonId}) => {

    const lessonUpdateContentQuery = trpc.updateLessonContent.useMutation()

    const methods = useForm<FormData>(
        {
            // @ts-ignore
            defaultValues: {blocks: initialData || []}
        }
    );
    const {handleSubmit, reset} = methods;

    useEffect(() => {
        // @ts-ignore
        reset({blocks: initialData || []});
    }, [initialData, reset]);

    const onSubmit = (data: FormData) => {
        try {
            lessonUpdateContentQuery.mutate({
                id: lessonId,
                lesson_content: {...data}
            })
        } catch (e) {
            console.log(e)
        }
    };

    const {append, fields, remove} = useFieldArray({
        control: methods.control,
        name: 'blocks',
    });

    const addTextBlock = () => {
        append({
            id: uuidv4(),
            type: LessonContentType.TEXT,
            title: '',
            paragraphs: [{
                id: uuidv4(),
                text: ''
            }]
        });
    };

    const addImageBlock = () => {
        append({id: uuidv4(), type: LessonContentType.IMAGE, title: '', src: ''});
    };

    const addCodeBlock = () => {
        append({id: uuidv4(), type: LessonContentType.CODE, code: ''})
    }

    const addVideoBlock = () => {
        append({id: uuidv4(), type: LessonContentType.VIDEO, url: ''})
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-5 '}>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            {field.type === LessonContentType.TEXT ? (
                                <div className={'flex gap-2 items-start'}>
                                    <TextForm index={index}/>
                                    <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(index)}>
                                        x
                                    </Button>
                                </div>

                            ) : field.type === LessonContentType.IMAGE ? (
                                <div className={'flex gap-2 items-start'}>
                                    <ImageForm index={index}/>
                                    <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(index)}>
                                        x
                                    </Button>
                                </div>

                            ) : field.type === LessonContentType.CODE ? (
                                <div className={'flex gap-2 items-start'}>
                                    <CodeForm index={index}/>
                                    <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(index)}>
                                        x
                                    </Button>
                                </div>
                            ) : field.type === LessonContentType.VIDEO ? (
                                <div className={'flex gap-2 items-start'}>
                                    <VideoForm index={index}/>
                                    <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(index)}>
                                        x
                                    </Button>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
                <div className={'flex gap-3'}>
                    <Button theme={ButtonThemes.FILLED} onClick={addTextBlock}>
                        Add Text Block
                    </Button>
                    <Button theme={ButtonThemes.FILLED} onClick={addImageBlock}>
                        Add Image Block
                    </Button>
                    <Button theme={ButtonThemes.FILLED} onClick={addCodeBlock}>
                        Add Code Block
                    </Button>
                    <Button theme={ButtonThemes.FILLED} onClick={addVideoBlock}>
                        Add Video Block
                    </Button>
                </div>
                <Button theme={ButtonThemes.FILLED} type="submit">
                    Save
                </Button>
            </form>
        </FormProvider>
    );
};


export default CreateLessonContent;
