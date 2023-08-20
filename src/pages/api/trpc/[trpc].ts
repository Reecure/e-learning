import {initTRPC} from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next'
import {z} from 'zod'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const t = initTRPC.create()

const appRouter = t.router({
    greeting: t.procedure
        .input(
        z.object({
            name: z.string().nullish()
        }).nullish()
    )
        .query(({input})=>{
        return {
            text: `hello ${input?.name ?? 'client'}`
        }
    }),
    bye: t.procedure.query(() => {
        return {
            text: `bye`
        }
    }),
    getUsers: t.procedure
        .query(() => {
            return prisma.users.findMany();
        }),
    getUser: t.procedure.input(z.object({
        email: z.string()
    })).query(({input}) => {
        return prisma.users.findUnique({
            where: {

            },
        });
    })
})


export type  AppRouter = typeof appRouter

export default  trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({
        prisma
    })
})

