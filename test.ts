import 'dotenv/config';

import { prisma, prismaError } from "./src/app/lib/prisma";

async function main() {
    if (!prisma) {
        throw new Error(prismaError ?? 'Prisma client is unavailable.');
    }

    const email = `alice+${Date.now()}@prisma.io`;

    const user = await prisma.user.create({
        data: {
            name: "Alice",
            email,
            posts: {
                create: {
                    title: "Hello World",
                    content: "This is my first post!",
                    published: true,
                },
            },
        },
        include: {
            posts: true,
        },
    });

    console.log("Created user:", user);

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
        },
    });
    console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
    .then(async () => {
        await prisma?.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma?.$disconnect();
        process.exit(1);
    });