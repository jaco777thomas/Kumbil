import { prisma } from "./lib/prisma";

async function main() {
    console.log("Creating admin...");
    try {
        await prisma.admin.upsert({
            where: { email: "admin@kumbil.in" },
            update: {},
            create: {
                email: "admin@kumbil.in",
                password: "admin", // In a real app, use hashing!
                name: "Administrator"
            }
        });
        console.log("Admin created: admin@kumbil.in / admin");
    } catch (e: any) {
        console.error("Error creating admin:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
