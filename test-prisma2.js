const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const labs = await prisma.lab.findMany({
            where: { city: { contains: "delhi" } }
        });
        console.log("Success with 'delhi':", labs.length);
        
        const labs2 = await prisma.lab.findMany({
            where: { city: { contains: "Delhi" } }
        });
        console.log("Success with 'Delhi':", labs2.length);
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
