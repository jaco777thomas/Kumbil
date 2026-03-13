import { hashPassword } from "./lib/password";
import { prisma } from "./lib/prisma";

async function main() {
    console.log("Creating admin...");
    try {
        const hashedPassword = await hashPassword("Admin@123");
        
        await prisma.admin.upsert({
            where: { email: "admin@kumbil.in" },
            update: {
                password: hashedPassword
            },
            create: {
                email: "admin@kumbil.in",
                password: hashedPassword,
                name: "Administrator"
            }
        });
        console.log("Admin updated/created: admin@kumbil.in / Admin@123");
    } catch (e: any) {
        console.error("Error creating admin:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
