import {type FC} from "react";

type Props = Record<string, unknown>;

const ErrorWidget: FC<Props> = () => (
	<div className={"w-full h-full flex justify-center items-center"}>
		<p className={"text-5xl"}>Server Error</p>
	</div>
);

export default ErrorWidget;
