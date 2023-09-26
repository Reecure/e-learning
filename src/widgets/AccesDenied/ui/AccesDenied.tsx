import {type FC} from "react";

type Props = Record<string, unknown>;

const AccessDenied: FC<Props> = () => (
	<div className={"w-full h-full flex justify-center items-center"}>
		<p className={"text-5xl"}>Access Denied</p>
	</div>
);

export default AccessDenied;
