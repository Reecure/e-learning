import Link from "next/link";
import {Routes} from "@/shared/config/routes";
import {AiOutlineUser} from "react-icons/ai";
import {PiCertificateBold, PiStudentDuotone} from "react-icons/pi";
import {RiAdminLine} from "react-icons/ri";
import {RxExit} from "react-icons/rx";
import {signOut, useSession} from "next-auth/react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

const Sidebar = () => {
	const session = useSession();

	return (
		<aside
			className={
				" py-5 flex justify-between flex-col items-center border-r-2 text-2xl border-black w-20"
			}
		>
			<div className={"flex flex-col items-center gap-y-5 w-20 "}>
				<Link
					href={Routes.USER_PROFILE}
					className={"hover:opacity-70 hover:scale-[1.2]"}
				>
					<AiOutlineUser/>
				</Link>
				<Link
					href={Routes.USER_COURSES}
					className={"hover:opacity-70 hover:scale-[1.2]"}
				>
					<PiStudentDuotone/>
				</Link>
				<Link
					href={Routes.USER_GRADES}
					className={"hover:opacity-70 hover:scale-[1.2]"}
				>
					<PiCertificateBold/>
				</Link>
				{session.data?.user.role === "admin" && (
					<>
						<Link
							href={Routes.ADMIN_PANEL}
							className={"hover:opacity-70 hover:scale-[1.2]"}
						>
							<RiAdminLine/>
						</Link>
					</>
				)}
			</div>
			<Button
				theme={ButtonThemes.TEXT}
				className={"!p-2 rounded-lg"}
				onClick={() => {
					signOut({callbackUrl: "/"});
				}}
			>
				<RxExit/>
			</Button>
		</aside>
	);
};

export default Sidebar;
