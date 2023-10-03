import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				// Define the expected fields here
				email: {label: "Email", type: "email"},
				password: {label: "Password", type: "password"},
			},
			async authorize(credentials, req) {
				const user = await prisma.users.findUnique({
					where: {email: credentials?.email},
				});
				if (
					user && (await bcrypt.compare(
						credentials !== undefined ? credentials.password : "",
						user.password,
					))
				) {
					const {id, role, email} = user;
					return {id, role, email};
				}

				throw new Error("Invalid Email or Password");
			},
		}),
	],

	pages: {
		signIn: "/auth/signin",
		signOut: "/",
		error: "/auth/error",
	},
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({token, user}) {
			return {...token, ...user};
		},
		async session({session, token}) {
			session.user = token;
			return session;
		},
	},

	secret: "SECRETqwekasdkop1238iqwjasdjyg16ywge1",
});
