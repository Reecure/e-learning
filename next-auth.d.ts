import NextAuth, {DefaultSession} from "next-auth"
import {UserRoles} from "@/enteties/User";

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            role: UserRoles
        } & DefaultSession["user"]
    }
}
