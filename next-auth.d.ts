import NextAuth, {type DefaultSession} from "next-auth";
import {type UserRoles} from "@/enteties/User";

declare module "next-auth" {
	type Session = {
		user: {
			id: string;
			role: UserRoles;
		} & DefaultSession["user"];
	};
}
