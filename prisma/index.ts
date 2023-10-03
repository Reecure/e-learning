import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const res = await prisma.lessons.findUnique({
		where: {
			id: "6519875003478186b143e69a",
		}
	});

	console.log(res);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
