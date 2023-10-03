import {type ReactElement} from "react";
import Layout from "@/pages/layout";
import UserLayout from "@/pages/user/layout";
import {trpc} from "@/shared/utils/trpc";
import {useSession} from "next-auth/react";
import {AccessDenied} from "@/widgets/AccesDenied";
import {Loader} from "@/shared/ui/Loader";
import UserRaw from "@/shared/ui/adminComponents/userRaw/UserRaw";
import {User} from "@/enteties/User";

const UserAdmin = () => {
	const {data} = useSession();

	const users = trpc.getUsers.useQuery();

	if (data?.user.role !== "admin") {
		return <AccessDenied/>;
	}

	if (users.isLoading) {
		return <Loader/>;
	}

	if (users.data === null || undefined) {
		return <>Error</>;
	}

	return (
		<div>
			<table className={"min-w-full border-2 border-light-primary-main"}>
				<thead>
					<tr className={"border-b-2 border-light-primary-main text-2xl"}>
						<td
							className={
								"p-3  text-center border-light-primary-main  border-r-2"
							}
						></td>
						<td
							className={
								"p-3  text-center border-light-primary-main border-r-2"
							}
						>
                        Firstname
						</td>
						<td
							className={
								"p-3  text-center border-light-primary-main border-r-2"
							}
						>
                        Lastname
						</td>
						<td
							className={
								"p-3  text-center border-light-primary-main border-r-2"
							}
						>
                        Email
						</td>
						<td
							className={
								"p-3  text-center border-light-primary-main border-r-2"
							}
						>
                        Role
						</td>
						<td className={"p-3  text-center w-[300px]"}></td>
					</tr>
				</thead>
				<tbody>
					{users.data?.map((user, i) => <UserRaw user={user as User} index={i} key={user.id}/>)}
				</tbody>
			</table>
		</div>
	);
};

UserAdmin.getLayout = function getLayout(page: ReactElement) {
	return (
		<Layout>
			<UserLayout>{page}</UserLayout>
		</Layout>
	);
};

export default UserAdmin;
