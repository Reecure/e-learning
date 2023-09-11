import {FC} from 'react';
import {Label} from "@/shared/ui/Label";
import {DifficultLevels} from "@/enteties/Course/model/types/course";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useForm} from "react-hook-form";

interface Props {
    courseData: any,
    onSubmit: any,
    isCreating: boolean
}

const CourseForm: FC<Props> = ({courseData, isCreating, onSubmit}) => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: courseData, // Pass initial course data here
    });

    const submitHandler = async (data: any) => {
        await onSubmit(data);
        reset();
    };

    return (
        <>
            <form className={'flex flex-col gap-5 w-[450px]'} onSubmit={handleSubmit(submitHandler)}>
                <p className={'text-3xl mb-5 text-center font-extrabold'}>{isCreating ? 'Create Course' : 'Edit Course'}</p>
                <Label htmlFor={'title'} labelText={'Title'}>
                    <input className={'inputField'}  {...register('title')}/>
                </Label>
                <Label htmlFor={'cover_description'} labelText={'Cover description'}>
                    <input className={'inputField'} {...register('cover_description')}/>
                </Label>
                <Label htmlFor={'description'} labelText={'Description'}>
                    <input className={'inputField'} {...register('description')}/>
                </Label>
                <Label htmlFor={'cover_image'} labelText={'Cover Image'}>
                    <input className={'inputField'} {...register('cover_image')}/>
                </Label>
                <Label htmlFor={'duration'} labelText={'Duration'}>
                    <input className={'inputField'} {...register('duration')}/>
                </Label>
                <select className={'inputField'} {...register('difficulty_level')}
                        name="difficulty_level"
                        defaultValue={DifficultLevels.EASY}>
                    <option className={'bg-dark-background'} value={DifficultLevels.EASY}>Easy</option>
                    <option className={'bg-dark-background'} value={DifficultLevels.MEDIUM}>Medium
                    </option>
                    <option className={'bg-dark-background'} value={DifficultLevels.HARD}>Hard</option>
                </select>

                <div className={'flex items-center'}>
                    <label className={'relative'}>
                        <input type={"checkbox"} {...register('isVisible')}
                               className={'peer relative top-[2px] appearance-none mr-2 w-4 h-4 rounded-sm border-[1px] ' +
                                   'border-neutral-950 dark:border-dark-neutral-950 ' +
                                   'checked:bg-light-primary-main ' +
                                   'dark:checked:bg-dark-primary-main ' +
                                   'checked:border-none'}/>
                        <svg
                            className={'absolute pointer-events-none hidden top-[3px] left-[1px] w-[15px] h-[15px] stroke-dark-primary-hover peer-checked:block'}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round"
                                  stroke-linejoin="round" stroke-width="2"
                                  d="M4 12.611 8.923 17.5 20 6.5"/>
                        </svg>
                    </label>

                    <p className={'whitespace-nowrap'}>Open for community</p>
                </div>
                <Button type={'submit'}
                        theme={ButtonThemes.FILLED}>{isCreating ? 'Create course' : "Update course"}</Button>
                <Button type={"button"} theme={ButtonThemes.FILLED} onClick={() => {
                    reset()
                }}>Reset</Button>
            </form>
        </>
    );
};
export default CourseForm;
