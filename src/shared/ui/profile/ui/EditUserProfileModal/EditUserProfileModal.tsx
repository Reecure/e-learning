import {type FC, useEffect, useState} from "react";
import {type User, UserRoles} from "@/enteties/User";
import {Button} from "@/shared/ui";
import {trpc} from "@/shared/utils/trpc";
import {type SubmitHandler, useForm} from "react-hook-form";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {Label} from "@/shared/ui/Label";
import {useSession} from "next-auth/react";
import {Text} from "@/shared/ui/Text";
import Notification from "@/shared/ui/Notification/Notification";

interface Props {
    user: User
}

const EditUserProfileModal: FC<Props> = ({user}) => {
	const session = useSession();
	const [userDefault, setUserDefault] = useState(user);
	const [notificationOpen, setNotificationOpen] = useState(false);
	const [submitError, setSubmitError] = useState(false);

	const userMutation = trpc.updateUser.useMutation();

	const {
		register,
		handleSubmit,
		reset,
		formState: {errors}
	} = useForm({
		defaultValues: {
			...user,
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			role: user.role
		}
	});

	useEffect(() => {
		console.log("register change");
	}, [userDefault]);

	const notificationOpenHandler = () => {
		setNotificationOpen(prev => !prev);
	};

	const cancelFormHandler = () => {
		reset(userDefault);
	};

	const onSubmitFormHandler: SubmitHandler<User> = data => {
		notificationOpenHandler();
		try {
			userMutation.mutate(data);
			setUserDefault(data);
		} catch (e) {
			setSubmitError(true);
		} finally {
			setSubmitError(false);
		}
	};

	return (
		<div className={""}>
			<form
				action=''
				className={"flex flex-col gap-5 w-full"}
				onSubmit={handleSubmit(onSubmitFormHandler)}
			>
				<p className={"mb-5 text-3xl text-center"}>Edit profile</p>
				<Label htmlFor={"firstname"} labelText={"Firstname"}>
					<input
						className='inputField'
						{...register("firstname", {required: true})}
					/>
					{(errors.firstname != null) && <Text error text={"Firstname is required"}/>}
				</Label>
				<Label htmlFor={"lastname"} labelText={"Lastname"}>
					<input
						className='inputField'
						{...register("lastname", {required: true})}
					/>
					{(errors.lastname != null) && <Text error text={"Lastname is required"}/>}
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
								<option className={"bg-light-background dark:bg-dark-background"}
									value={UserRoles.USER}>
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
					<Button type={"submit"} theme={ButtonThemes.FILLED}>
                        Save
					</Button>
					<Button
						theme={ButtonThemes.FILLED}
						onClick={() => {
							cancelFormHandler();
						}}
					>
                        Reset
					</Button>
				</>
			</form>
			<Notification open={notificationOpen} onClose={notificationOpenHandler} timeoutDelay={3000}
				isSuccess={!submitError}>
                success
			</Notification>
		</div>
	);
};

export default EditUserProfileModal;
