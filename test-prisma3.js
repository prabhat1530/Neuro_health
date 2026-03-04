const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const query = "lipid";
        const maxPrice = 999999;
        
        const labs = await prisma.lab.findMany({
            where: { city: { contains: "delhi" } },
            include: {
                tests: query ? { where: { testName: { contains: query } } } : false
            }
        });
        console.log("Success with tests include:", labs.length);
    } catch (e) {
        console.error("Error with include:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
