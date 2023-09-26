import {useSession} from "next-auth/react";

export function useRole() {
	const session = useSession();

	return session.data?.user.role;
}
