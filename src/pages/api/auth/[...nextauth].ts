import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {trpc} from "@/shared/utils/trpc";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

interface Credentials {
  email: string
    password: string
}


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                const email = 'myname'
                    const password = '1234'
                try {
                    const user = await prisma.users.findFirst({
                        where: { email: email },
                    });

                    if (!user) {
                        return null; // Return null if user is not found
                    }

                    // Perform password validation here (you might want to use a secure method like bcrypt)
                    const validPassword = user.password === password;

                    if (!validPassword) {
                        return null; // Return null if password is invalid
                    }

                    return { id: user.id, email: user.email }; // Return user object if authentication is successful
                } catch (error) {
                    console.error("Error during authentication:", error);
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: 'jwt'
    },
    secret: 'SECRET'
})
