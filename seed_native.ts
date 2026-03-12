import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding with native engine...");
    try {
        const farm = await prisma.farm.upsert({
            where: { id: "farm-1" },
            update: {},
            create: {
                id: "farm-1",
                name: "Native Farm",
                village: "V",
                region: "R",
                description: "D",
                practicesSummary: "P"
            }
        });
        console.log("Seeding SUCCESS! Farm created:", farm.name);
    } catch (e: any) {
        console.error("Seeding FAIL:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
