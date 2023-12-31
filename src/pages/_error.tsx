import {type FC} from "react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import {useRouter} from "next/router";

type Props = Record<string, unknown>;

const ErrorPage: FC<Props> = () => {
	const router = useRouter();

	return (
		<div className={"w-full h-full flex justify-center items-center"}>
			<p className={"text-5xl"}>Something went wrong</p>
			<Button
				theme={ButtonThemes.FILLED_TONAL}
				onClick={async () => router.push("/")}
			>
        go home
			</Button>
		</div>
	);
};

export default ErrorPage;
