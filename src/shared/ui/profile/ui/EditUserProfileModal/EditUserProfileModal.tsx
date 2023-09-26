import {type FC, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import {type SubmitHandler, useForm} from "react-hook-form";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Label} from "@/shared/ui/Label";
import {useSession} from "next-auth/react";
import {Text} from "@/shared/ui/Text";

type Props = {
	user: User;
};

const EditUserProfileModal: FC<Props> = ({user}) => {
	const session = useSession();
	const [userDefault, setUserDefault] = useState(user);

	const userMutation = trpc.updateUser.useMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors, isSubmitted},
	} = useForm({
		defaultValues: {
			...user,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			role: user.role,
		},
	});

	const onSubmitFormHandler: SubmitHandler<User> = async data => {
		await userMutation.mutate(data);
		await setUserDefault(data);
	};

	const cancelFormHandler = () => {
		reset(userDefault);
	};

	return (
		<div className={""}>
			<form
				action=''
				className={"flex flex-col gap-5 w-[400px]"}
				onSubmit={handleSubmit(onSubmitFormHandler)}
			>
				<p className={"mb-5 text-3xl text-center"}>Edit profile</p>
				<Label htmlFor={"firstname"} labelText={"Firstname"}>
					<input
						className='inputField'
						{...register("firstname", {required: true})}
					/>
					{errors.firstname && <Text error text={"Firstname is required"}/>}
				</Label>
				<Label htmlFor={"lastname"} labelText={"Lastname"}>
					<input
						className='inputField'
						{...register("lastname", {required: true})}
					/>
					{errors.lastname && <Text error text={"Lastname is required"}/>}
				</Label>
				{session.data?.user.role === UserRoles.ADMIN && (
					<>
						<Label htmlFor={"role"} labelText={"Role"}>
							<select
								className='bg-transparent border-[1px] border-light-primary-main dark:border-dark-primary-main p-1 w-full rounded-md  focus:outline-0 '
								{...register("role")}
							>
								<option
									className={"bg-light-background dark:bg-dark-background"}
									value={UserRoles.ADMIN}
								>
									{UserRoles.ADMIN}
								</option>
								<option className={"bg-light-background dark:bg-dark-background"} value={UserRoles.USER}>
									{UserRoles.USER}
								</option>
								<option
									className={"bg-light-background dark:bg-dark-background"}
									value={UserRoles.TEACHER}
								>
									{UserRoles.TEACHER}
								</option>
							</select>
						</Label>
					</>
				)}
				<>
					<Button type={"submit"} theme={ButtonThemes.OUTLINED}>
                  Save
					</Button>
					<Button
						theme={ButtonThemes.OUTLINED}
						onClick={() => {
							cancelFormHandler();
						}}
					>
                  Reset
					</Button>
				</>
			</form>
		</div>
	);
};

export default EditUserProfileModal;
