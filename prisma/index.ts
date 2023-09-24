import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   await prisma.modules.delete({
      where: {
         id: "64f9a151ca76ef7a5860ad97",
      },
   });

   await prisma.lessons.deleteMany({
      where: {
         module_id: "64f9a151ca76ef7a5860ad97",
      },
   });
}

main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
