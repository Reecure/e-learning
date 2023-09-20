import {initTRPC, TRPCError} from "@trpc/server";
import * as trpcNext from '@trpc/server/adapters/next'
import {z} from 'zod'
import {PrismaClient} from "@prisma/client";
import {UserRoles} from "@/enteties/User";
import bcrypt from 'bcrypt';
import {LessonType} from "@/shared/ui/course/ui/LessonContent/LessonContent";


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
                    courses_progress: [],
                    modules_progress: [],
                    lessons_progress: []
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
    getUserSubscribedCourses: t.procedure.input(z.object({
        user_id: z.string()
    })).query(async ({input}) => {
        const user = await prisma.users.findUnique({
            where: {
                id: input.user_id
            }
        });

        const userCourses = user?.courses;
        return prisma.courses.findMany({
            where: {
                id: {
                    in: userCourses
                },
            }
        })
    }),
    getUserCustomCourses: t.procedure.input(z.object({
        user_id: z.string()
    })).query(async ({input}) => {
        return prisma.courses.findMany({
            where: {
                author_id: input.user_id
            }
        })
    }),
    updateUserCourseProgress: t.procedure.input(z.object({
        id: z.string(),
        course_progress: z.object({
            course_id: z.string(),
            is_completed: z.boolean(),
        })
    })).mutation(async ({input}) => {

        let user = await prisma.users.findUnique({
            where: {
                id: input.id
            }
        },)

        const existingProgressIndex = user?.courses_progress.findIndex(
            (item) => item?.course_id === input.course_progress.course_id
        );

        if (existingProgressIndex !== -1) {
            return 0
        } else {
            return prisma.users.update({
                where: {
                    id: input.id
                },
                data: {
                    courses_progress: {
                        push: input.course_progress
                    }
                }
            })
        }
    }),
    updateUserModulesProgress: t.procedure.input(z.object({
        id: z.string(),
        module_progress: z.object({
            module_id: z.string(),
            is_completed: z.boolean(),
        })
    })).mutation(async ({input}) => {

        let user = await prisma.users.findUnique({
            where: {
                id: input.id
            }
        },)

        const existingProgressIndex = user?.modules_progress.findIndex(
            (item) => item?.module_id === input.module_progress.module_id
        );

        if (existingProgressIndex !== -1) {
            return 0
        } else {
            return prisma.users.update({
                where: {
                    id: input.id
                },
                data: {
                    modules_progress: {
                        push: input.module_progress
                    }
                }
            })
        }
    }),
    updateUserLessonsProgress: t.procedure.input(z.object({
        id: z.string(),
        lesson_progress: z.object({
            lesson_id: z.string(),
            lessonType: z.string(),
            quizScore: z.number().optional(),
            is_completed: z.boolean(),
        })
    })).mutation(async ({input}) => {

        const {id, lesson_progress} = input;

        let user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return null;
        }

        const existingProgressIndex = user.lessons_progress.findIndex(
            (item) => item?.lesson_id === lesson_progress.lesson_id
        );

        if (existingProgressIndex !== -1) {
            user.lessons_progress[existingProgressIndex] = lesson_progress;
        } else {
            user.lessons_progress.push(lesson_progress);
        }

        const updatedUser = await prisma.users.update({
            where: {
                id: id
            },
            data: {
                lessons_progress: user.lessons_progress
            }
        });

        return updatedUser;
    }),
    getUserLessonsProgressById: t.procedure.input(z.object({
        id: z.string(),
        lesson_id: z.string()
    })).query(async ({input}) => {

        const {id, lesson_id} = input;

        let user = await prisma.users.findUnique({
            where: {
                id: id
            }
        });

        if (!user) {
            return null;
        }

        const existingProgressIndex = user.lessons_progress.findIndex(
            (item) => item?.lesson_id === lesson_id
        );

        return user.lessons_progress[existingProgressIndex];
    }),

    updateUserCourses: t.procedure.input(z.object({
        id: z.string(),
        course_id: z.string()
    })).mutation(async ({input}) => {
        return prisma.users.update({
            where: {
                id: input.id
            },
            data: {
                courses: {
                    push: input.course_id
                }
            }
        })
    }),
    deleteUserCourses: t.procedure.input(z.object({
        id: z.string(),
        course_id: z.string()
    })).mutation(async ({input}) => {
        const userId = input.id;
        const courseId = input.course_id;

        const user = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        const updatedCourses = user.courses.filter(course => course !== courseId);

        await prisma.users.update({
            where: {
                id: userId
            },
            data: {
                courses: updatedCourses
            }
        });

        return "Course removed successfully";
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
    getModuleById: t.procedure.input(z.object({
        module_id: z.string()
    })).query(async ({input}) => {
        return prisma.modules.findUnique({
            where: {
                id: input.module_id
            }
        })
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
        author_id: z.string(),
        order: z.number()
    })).mutation(async ({input}) => {
            const createdModule = await prisma.modules.create({
                data: {
                    title: input.title,
                    author_id: input.author_id,
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
        author_id: z.string(),
        lesson_type: z.string(),
        lesson_content: z.any(),
    })).mutation(async ({input}) => {
            return prisma.lessons.create({
                data: {
                    title: input.title,
                    order: input.order,
                    author_id: input.author_id,
                    module_id: input.module_id,
                    lesson_type: input.lesson_type,
                    lesson_content: input.lesson_content,
                }
            })
        }
    ),
    updateLessonContent: t.procedure.input(z.object({
        id: z.string(),
        lesson_content: z.any()
    })).mutation(async ({input}) => {
            return prisma.lessons.update({
                where: {
                    id: input.id
                },
                data: {
                    lesson_content: input.lesson_content,
                }
            })
        }
    ),
    updateLessonOrder: t.procedure.input(z.object({
        id: z.string(),
        order: z.number()
    })).mutation(async ({input}) => {
            return prisma.lessons.update({
                where: {
                    id: input.id
                },
                data: {
                    order: input.order
                }
            })
        }
    ),
    updateLessonInfo: t.procedure.input(z.object({
        id: z.string(),
        title: z.string(),
        lesson_type: z.string()
    })).mutation(async ({input}) => {
            return prisma.lessons.update({
                where: {
                    id: input.id
                },
                data: {
                    title: input.title,
                    lesson_type: input.lesson_type
                }
            })
        }
    ),
    updateModuleOrder: t.procedure.input(z.object({
        id: z.string(),
        order: z.number()
    })).mutation(async ({input}) => {
            return prisma.modules.update({
                where: {
                    id: input.id
                },
                data: {
                    order: input.order
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
    ),
    deleteModule: t.procedure.input(z.object({
        id: z.string(),
    })).mutation(async ({input}) => {
            await prisma.modules.delete({
                where: {
                    id: input.id
                }
            })

            await prisma.lessons.deleteMany({
                where: {
                    module_id: input.id
                }
            })
        }
    ),
    deleteLesson: t.procedure.input(z.object({
        id: z.string(),
    })).mutation(async ({input}) => {
            await prisma.lessons.delete({
                where: {
                    id: input.id
                }
            })
        }
    ),
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

