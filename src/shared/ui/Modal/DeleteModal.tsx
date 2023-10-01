import {Button, Modal} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import React, {FC, useEffect, useState} from "react";

interface Props {
    itemName: string
    deleteIsOpen: boolean
    deleteOpenHandler: () => void
    deleteFunc: () => void
    setNotificationOpen?: () => void
}

const DeleteModal: FC<Props> = ({deleteIsOpen, deleteOpenHandler, itemName, deleteFunc, setNotificationOpen}) => {
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
	const [deleteValue, setDeleteValue] = useState("");

	useEffect(() => {
		deleteValue === "delete"
			? setDeleteButtonDisabled(true)
			: setDeleteButtonDisabled(false);
	}, [deleteValue]);


	const deleteValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDeleteValue(e.currentTarget.value);
	};

	return (
		<Modal isOpen={deleteIsOpen} setIsOpen={deleteOpenHandler}>
			<div className={"flex flex-col gap-3"}>
				<div className={"text-xl"}>
                    Write{" "}
					<span className={"underline text-dark-error-main"}>
                     delete
					</span>{" "}
                    to delete {itemName}
				</div>
				<input
					type='text'
					className={"inputField"}
					onChange={deleteValueHandler}
				/>
				<Button
					disabled={!deleteButtonDisabled}
					theme={ButtonThemes.FILLED}
					onClick={() => {
						deleteFunc();
						setNotificationOpen && setNotificationOpen();
					}}
				>
                    DELETE
				</Button>
			</div>
		</Modal>
	);
};

export default DeleteModal;