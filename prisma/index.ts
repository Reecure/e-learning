import {UserRoles} from "../src/enteties/User";
import {now} from "next-auth/client/_utils";


import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {


    let res = await prisma.users.findUnique({
        where: {
            email: 'asddsahgsjhjdsfj'
        }
    })
    console.log(res)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
