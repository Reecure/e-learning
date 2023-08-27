import {PrismaClient} from '@prisma/client';

import {z} from 'zod';
import bcrypt from "bcrypt";
import {UserRoles} from "@/enteties/User";
import {initTRPC, TRPCError} from "@trpc/server";

const prisma = new PrismaClient()

const t = initTRPC.create()

export const userProcedures = {
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
    })
};

export type UserProcedures = typeof userProcedures;
