import {type FC, useEffect} from "react";
import {CSSTransition} from "react-transition-group";


type Props = {
    children: React.ReactNode;
    open: boolean;
    isSuccess?: boolean;
    onClose: () => void;
    timeoutDelay: number;
};

const Notification: FC<Props> = ({
	children,
	open,
	isSuccess,
	timeoutDelay,
	onClose,
}) => {
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (open) {
			const timeoutId = setTimeout(() => {
				onClose();
			}, timeoutDelay);
		}

		return () => {
			clearTimeout(timeoutId);
		};
	}, [open]);

	return (
		<CSSTransition
			in={open}
			timeout={400}
			mountOnEnter
			unmountOnExit
			classNames={{
				enterActive: "animate-slide-from-top",
				exitActive: "animate-slide-to-top",
			}}
		>
			<div
				className={`${
					isSuccess ? "text-green-600" : "text-dark-error-main"
				} fixed top-10 -translate-x-1/2 left-1/2  max-w-[300px] w-full p-4 rounded-md bg-dark-neutral-100 z-[1001]`}
			>
				{children}
			</div>
		</CSSTransition>
	);
};

export default Notification;
