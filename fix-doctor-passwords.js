const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Updating all doctors with default password 'password123'...");

    const updated = await prisma.user.updateMany({
        where: { role: "DOCTOR" },
        data: { password: "password123" }
    });

    console.log(`✅ Updated ${updated.count} doctors.`);

    const doctor = await prisma.user.findFirst({
        where: { role: "DOCTOR" },
        select: { email: true }
    });

    if (doctor) {
        console.log(`Sample Doctor Email: ${doctor.email}`);
        console.log(`Password: password123`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
