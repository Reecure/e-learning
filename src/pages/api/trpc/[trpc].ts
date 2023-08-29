import {initTRPC, TRPCError} from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next'
import {z} from 'zod'
import {PrismaClient} from "@prisma/client";
import {User, UserRoles} from "@/enteties/User";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient()

const t = initTRPC.create()

const appRouter = t.router({

    // ----------------User action--------------
    getUsers: t.procedure
        .query(({input}) => {
            return prisma.users.findMany()
        }),
    getUser: t.procedure.input(z.object({
        email: z.string()
    }))
        .query(({input}) => {
            return prisma.users.findUnique({
                where: {
                    email: input.email
                }
            });
        }),
    createUser: t.procedure.input(z.object({
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
        password: z.string(),
    })).mutation(async ({input}) => {
        const hashedPassword = await bcrypt.hash(input.password, 10)

        const user = await prisma.users.findFirst({
            where: {
                email: input.email
            },
        })
        if (user) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'User with this email exist',
            })
        } else {
            return prisma.users.create({
                data: {
                    firstname: input.firstname,
                    lastname: input.lastname,
                    email: input.email,
                    password: hashedPassword,
                    role: UserRoles.USER,
                    courses: [],
                    is_new_user: true,
                    registration_date: new Date().toISOString(),
                }
            })
        }
    }),
    updateUser: t.procedure.input(z.object({
        email: z.string(),
        firstname: z.string(),
        lastname: z.string(),
    })).mutation(async ({input}) => {
        return prisma.users.update({
            where: {
                email: input.email
            },
            data: {
                email: input.email,
                firstname: input.firstname,
                lastname: input.lastname,
            }
        })
    }), deleteUser: t.procedure.input(z.object({
        id: z.string(),
    })).mutation(async ({input}) => {
        return prisma.users.delete({
            where: {
                id: input.id
            }
        })
    }),
    getUserCourses: t.procedure.input(z.object({
        author_id: z.string()
    })).query(async ({input}) => {
        return prisma.courses.findMany({
            where: {
                author_id: input.author_id
            }
        })
    }),
    getCourseById: t.procedure.input(z.object({
        course_id: z.string()
    })).query(async ({input}) => {
        return prisma.courses.findUnique({
            where: {
                id: input.course_id
            }
        })
    }),
    getModulesByCourseId: t.procedure.input(z.object({
        course_id: z.string()
    })).query(async ({input}) => {
        return prisma.modules.findMany({
            where: {
                course_id: input.course_id
            }
        });
    }),
    getLessonsByModuleId: t.procedure.input(z.object({
        module_id: z.string()
    })).query(async ({input}) => {
        return prisma.lessons.findMany({
            where: {
                module_id: input.module_id
            }
        });
    }),
    getLessonById: t.procedure.input(z.object({
        lesson_id: z.string()
    })).query(async ({input}) => {
        return prisma.lessons.findUnique({
            where: {
                id: input.lesson_id
            }
        })
    }),

})


export type  AppRouter = typeof appRouter

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({
        prisma
    }),
    onError(opts) {
        const {error, type, path, input, ctx, req} = opts;
        console.error('Error:', error);
        if (error.code === 'INTERNAL_SERVER_ERROR') {
            // send to bug reporting
        }
    },
})

