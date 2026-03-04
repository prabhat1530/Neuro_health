const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const query = "lipid";
        const maxPrice = 999999;
        
        let whereClause = {
            rating: { gte: 0 },
        };
        
        whereClause.OR = [
            { labName: { contains: query } },
            { tests: { some: { testName: { contains: query }, price: { lte: maxPrice } } } }
        ];
        
        const labs = await prisma.lab.findMany({
            where: whereClause,
            include: {
                user: { select: { name: true, email: true } },
                tests: { where: { testName: { contains: query } } }
            },
            take: 2
        });
        
        console.log("Success:", labs.length);
    } catch (e) {
        console.error("Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();
