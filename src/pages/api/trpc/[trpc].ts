import {initTRPC, TRPCError} from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next'
import {z} from 'zod'
import {PrismaClient} from "@prisma/client";
import {UserRoles} from "@/enteties/User";
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
                    avatar: '',
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
        role: z.string(),
    })).mutation(async ({input}) => {
        return prisma.users.update({
            where: {
                email: input.email
            },
            data: {
                email: input.email,
                firstname: input.firstname,
                lastname: input.lastname,
                role: input.role,
            }
        })
    }),
    deleteUser: t.procedure.input(z.object({
        id: z.string(),
    })).mutation(async ({input}) => {
        return prisma.users.delete({
            where: {
                id: input.id
            }
        })
    }),
    updateUserAvatar: t.procedure.input(z.object({
        email: z.string(),
        avatar: z.string(),

    })).mutation(async ({input}) => {
        return prisma.users.update({
            where: {
                email: input.email
            },
            data: {
                avatar: input.avatar
            }
        })
    }),
    getAllVisibleCourses: t.procedure.query(async ({input}) => {
        return prisma.courses.findMany({
            where: {
                isVisible: true
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
    createCourse: t.procedure.input(z.object({
        cover_image: z.string(),
        title: z.string(),
        description: z.string(),
        cover_description: z.string(),
        rating: z.number(),
        creation_date: z.string(),
        isVisible: z.boolean(),
        author_id: z.string(),
        category_id: z.string(),
        difficulty_level: z.string(),
        duration: z.string(),
        students_id: z.any()
    })).mutation(async ({input}) => {
            return prisma.courses.create({
                data: {
                    cover_image: input.cover_image,
                    title: input.title,
                    description: input.description,
                    cover_description: input.cover_description,
                    rating: input.rating,
                    creation_date: input.creation_date,
                    isVisible: input.isVisible,
                    author_id: input.author_id,
                    category_id: input.category_id,
                    difficulty_level: input.difficulty_level,
                    duration: input.duration,
                    students_id: input.students_id,
                }
            })
        }
    ),
    createModule: t.procedure.input(z.object({
        title: z.string(),
        course_id: z.string(),
        order: z.number()
    })).mutation(async ({input}) => {
            const createdModule = await prisma.modules.create({
                data: {
                    title: input.title,
                    course_id: input.course_id,
                    order: input.order
                }
            });

            // Добавьте дополнительное сообщение или данные, которые вы хотите вернуть
            const additionalMessage = "Модуль успешно создан";

            return {
                module: createdModule,
                message: additionalMessage
            };
        }
    ),
    createLesson: t.procedure.input(z.object({
        title: z.string(),
        order: z.number(),
        module_id: z.string(),
        lesson_type: z.string(),
        lesson_content: z.any(),
    })).mutation(async ({input}) => {
            return prisma.lessons.create({
                data: {
                    title: input.title,
                    order: input.order,
                    module_id: input.module_id,
                    lesson_type: input.lesson_type,
                    lesson_content: input.lesson_content,
                }
            })
        }
    ),
    updateCourse: t.procedure.input(z.object({
        id: z.string(),
        cover_image: z.string(),
        title: z.string(),
        description: z.string(),
        cover_description: z.string(),
        isVisible: z.boolean(),
        difficulty_level: z.string(),
        duration: z.string(),
    })).mutation(async ({input}) => {
            return prisma.courses.update({
                where: {
                    id: input.id
                },
                data: {
                    cover_image: input.cover_image,
                    title: input.title,
                    description: input.description,
                    cover_description: input.cover_description,
                    isVisible: input.isVisible,
                    difficulty_level: input.difficulty_level,
                    duration: input.duration,
                }
            })
        }
    )
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

