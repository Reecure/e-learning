import {type FC} from "react";

type Props = {
	className?: string;
	onClick?: () => void;
};

const Overlay: FC<Props> = ({className, onClick}) => (
	<div
		onClick={onClick}
		className={`${className} flex items-center justify-center fixed top-0 bottom-0 right-0 left-0 cursor-pointer z-[100] bg-black/40`}
	/>
);

export default Overlay;
