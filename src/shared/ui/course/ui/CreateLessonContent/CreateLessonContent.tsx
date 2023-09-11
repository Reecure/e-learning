import {FC, useEffect} from 'react';
import {FormProvider, useFieldArray, useForm, useFormContext} from 'react-hook-form';
import {Button} from '@/shared/ui';
import {ButtonThemes} from '@/shared/ui/Button/Button';
import {Label} from '@/shared/ui/Label';
import {v4 as uuidv4} from 'uuid'
import {trpc} from "@/shared/utils/trpc";


type TextBlock = {
    id: string;
    title: string
    type: 'TEXT';
    paragraphs: {
        id: string,
        text: string
    }[];
};

type ImageBlock = {
    id: string;
    type: 'IMAGE';
    title: string;
    src: string;
};

type Block = TextBlock | ImageBlock;

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
        console.log(data);
    };

    const {append, fields, remove} = useFieldArray({
        control: methods.control,
        name: 'blocks',
    });

    const addTextBlock = () => {
        append({
            id: uuidv4(),
            type: 'TEXT',
            title: '',
            paragraphs: [{
                id: uuidv4(),
                text: ''
            }]
        });
    };

    const addImageBlock = () => {
        append({id: uuidv4(), type: 'IMAGE', title: '', src: ''});
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-5 '}>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            {field.type === 'TEXT' ? (
                                <div className={'flex gap-2 items-start'}>
                                    <TextForm index={index}/>
                                    <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(index)}>
                                        x
                                    </Button>
                                </div>

                            ) : field.type === 'IMAGE' ? (
                                <div className={'flex gap-2 items-start'}>
                                    <ImageForm index={index}/>
                                    <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(index)}>
                                        x
                                    </Button>
                                </div>

                            ) : null}
                        </div>
                    );
                })}
                <Button theme={ButtonThemes.FILLED} onClick={addTextBlock}>
                    Add Text Block
                </Button>
                <Button theme={ButtonThemes.FILLED} onClick={addImageBlock}>
                    Add Image Block
                </Button>
                <Button theme={ButtonThemes.FILLED} type="submit">
                    Submit
                </Button>
            </form>
        </FormProvider>
    );
};

const TextForm: FC<{ index: number, initFields?: any }> = ({index}) => {
    const {register, control} = useFormContext();
    const {fields, remove, append: appendParagraph} = useFieldArray({
        control,
        name: `blocks.${index}.paragraphs`,
    });

    const appendEmptyParagraph = () => {
        appendParagraph({id: uuidv4(), text: ''});
    };

    return (
        <div className={'flex flex-col gap-5 w-full'}>
            <Label htmlFor={`blocks.${index}.title`} labelText={'Title'}>
                <input className={'inputField'} {...register(`blocks.${index}.title`)} />
            </Label>
            {fields.map((field, paragraphIndex) => {
                return (
                    <div key={field.id} className={'flex gap-2 items-start'}>
                        <textarea
                            className={'inputField'}
                            {...register(`blocks.${index}.paragraphs.${paragraphIndex}.text`)}
                        />
                        <Button theme={ButtonThemes.TEXT} type="button" onClick={() => remove(paragraphIndex)}>
                            x
                        </Button>
                    </div>
                );
            })}
            <Button theme={ButtonThemes.FILLED} onClick={appendEmptyParagraph}>
                Add paragraph
            </Button>
        </div>
    );
};

const ImageForm: FC<{ index: number }> = ({index}) => {
    const {register} = useFormContext();

    return (
        <div className={'flex flex-col gap-5'}>
            <Label htmlFor={`blocks.${index}.title`} labelText={'Title'}>
                <input className={'inputField'} {...register(`blocks.${index}.title`)} />
            </Label>
            <Label htmlFor={`blocks.${index}.src`} labelText={'Src'}>
                <input className={'inputField'} {...register(`blocks.${index}.src`)} />
            </Label>
        </div>
    );
};

export default CreateLessonContent;
