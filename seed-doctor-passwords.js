const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();

async function main() {
    const doctors = await p.user.findMany({ where: { role: "DOCTOR" } });
    console.log(`Setting passwords for ${doctors.length} doctors...`);
    for (const doc of doctors) {
        if (!doc.password) {
            await p.user.update({ where: { id: doc.id }, data: { password: "doctor123" } });
        }
    }

    // Print a clean list
    const all = await p.user.findMany({
        where: { role: "DOCTOR" },
        include: { doctorProfile: { select: { specialization: true, city: true } } },
        orderBy: { name: "asc" }
    });

    console.log("\n📋 All Doctors (login with password: doctor123):\n");
    all.forEach(d => {
        console.log(`  ✅ ${d.name.padEnd(30)} ${d.email}`);
    });
    console.log(`\nTotal: ${all.length} doctors`);
}

main().catch(console.error).finally(() => p.$disconnect());
