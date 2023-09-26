import {type FC, type ReactNode, Suspense} from "react";
import {Routes} from "@/shared/config/routes";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {Sidebar} from "@/widgets/Sidebar";
import {Loader} from "@/shared/ui/Loader";

type Props = {
	children: ReactNode | ReactNode[];
	contentClassName?: string;
};

const UserLayout: FC<Props> = ({children, contentClassName}) => {
	const router = useRouter();

	const session = useSession({
		required: true,
		onUnauthenticated() {
			router.push(Routes.LOGIN);
		},
	});

	if (session.status === "loading") {
		return <p>Loading</p>;
	}

	return (
		<Suspense fallback={<Loader/>}>
			<div className={"h-[calc(100vh_-_62px)] flex justify-between"}>
				<Sidebar/>
				<div className={`w-full overflow-y-auto p-5 ${contentClassName} `}>
					{children}
				</div>
			</div>
		</Suspense>
	);
};

export default UserLayout;
