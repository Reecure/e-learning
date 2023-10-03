import React, {type FC, useEffect, useState} from "react";
import {useAppDispatch} from "@/app/ReduxProvider/config/hooks";
import {type Module} from "@/enteties/Module";
import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {setPreviewVisible} from "@/shared/ui/course/model";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {BsTrash} from "react-icons/bs";
import {useSession} from "next-auth/react";
import {trpc} from "@/shared/utils/trpc";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Loader} from "@/shared/ui/Loader";
import {BiEdit} from "react-icons/bi";

type Props = {
    item: Module;
    disabled: boolean;
    deleteOpen: () => void;
    refetch: () => void;
};

const SortableModuleItem: FC<Props> = ({item, refetch, disabled, deleteOpen}) => {
	const [visibilityLoading, setVisibilityLoading] = useState(false);
	const session = useSession();

	const updateModuleProgress = trpc.updateUserModulesProgress.useMutation();
	const updateModuleVisibility = trpc.updateModuleVisibility.useMutation();


	const dispatch = useAppDispatch();

	useEffect(() => {
		refetch();
		if (updateModuleVisibility.status === "loading") {
			setVisibilityLoading(true);
		} else {
			setVisibilityLoading(false);
		}
	}, [updateModuleVisibility.isLoading]);

	const updateVisibleHandler = () => {
		try {
			updateModuleVisibility.mutate({
				id: item.id,
				is_visible: !item.is_visible
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className={"flex justify-between items-center"}>
			{disabled ? (
				<Link
					href={`${Routes.USER_COURSE_PAGE_LESSONS}/${item.id}`}
					className={"cursor-pointer "}
					onClick={() => {
						dispatch(setPreviewVisible(true));
						updateModuleProgress.mutate({
							id: session.data?.user.id || "",
							module_progress: {
								module_id: item.id,
								course_id: item.course_id,
								module_name: item.title,
								is_completed: true,
							},
						});
					}}
				>
					{item.title}
				</Link>
			) : (
				<p>{item.title}</p>
			)}
			{session.data?.user.id === item.author_id && disabled && (
				<div className={"flex"}>
					<Button
						type={"submit"}
						theme={ButtonThemes.TEXT}
						className={"!p-2 !rounded-md"}
					>
						<BiEdit/>
					</Button>

					<div>
						{
							visibilityLoading ?
								<span className={""}><Loader className={"!w-4 !h-4 "}/></span>
								: <Button
									type={"submit"}
									className={"!p-1 sm:!p-2 !rounded-md"}
									theme={ButtonThemes.TEXT}
									onClick={updateVisibleHandler}
								>
									{item.is_visible ? <AiFillEye/> : <AiFillEyeInvisible/>}
								</Button>
						}
					</div>
					<Button
						type={"submit"}
						theme={ButtonThemes.TEXT}
						className={"!text-light-error-main dark:!text-dark-error-main !p-2 !rounded-md"}
						onClick={deleteOpen}
					>
						<BsTrash/>
					</Button>
				</div>
			)}
		</div>
	);
};

export default SortableModuleItem;
