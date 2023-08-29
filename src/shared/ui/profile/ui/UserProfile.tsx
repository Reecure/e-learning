import {FC, useState} from 'react';
import {User} from "@/enteties/User";
import {SubmitHandler, useForm} from "react-hook-form";
import {Label} from "@/shared/ui/Label";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {trpc} from "@/shared/utils/trpc";

interface Props {
    user: User
}


const UserProfileComponent: FC<Props> = ({user}) => {

    const [isEditable, setEditable] = useState(false)
    const [userDefault, setUserDefault] = useState(user)

    const userMutation = trpc.updateUser.useMutation()

    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            ...user,
            'firstname': user.firstname,
            "lastname": user.lastname,
            "email": user.email,
        }
    })

    const onSubmitFormHandler: SubmitHandler<User> = async (data) => {
        await userMutation.mutate(data)
        setUserDefault(data)
        setEditable(false)
    }
    const cancelFormHandler = () => {
        reset(userDefault)
    }

    return (
        <div className={''}>
            {/*Action Buttons*/}
            <div className={'mb-5'}>
                {
                    !isEditable &&
                    <Button theme={ButtonThemes.OUTLINED} onClick={() => setEditable(true)}>Edit</Button>
                }

            </div>

            <form action="" className={'flex flex-col gap-5'} onSubmit={handleSubmit(onSubmitFormHandler)}>
                <Label htmlFor={'firstname'} labelText={'Firstname'}>
                    <input disabled={!isEditable} className='inputField' {...register('firstname')} />
                </Label>
                <Label htmlFor={'lastname'} labelText={'Lastname'}>
                    <input disabled={!isEditable} className='inputField' {...register('lastname')} />
                </Label>
                <Label htmlFor={'email'} labelText={'Email'}>
                    <input disabled className='inputField' {...register('email')} />
                </Label>
                {
                    isEditable && <>
                        <Button type={"submit"} theme={ButtonThemes.OUTLINED}>Save</Button>
                        <Button theme={ButtonThemes.OUTLINED} onClick={() => {
                            cancelFormHandler()
                            setEditable(false)
                        }}>Cancel</Button>
                    </>
                }
            </form>
        </div>
    );
};
export default UserProfileComponent;
