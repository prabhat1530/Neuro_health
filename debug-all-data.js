const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const doctors = await prisma.doctor.findMany({
        include: { user: true }
    });
    console.log(`Found ${doctors.length} doctors in the database.`);
    doctors.forEach(d => {
        console.log(`- Doctor: ${d.user.name}, Email: ${d.user.email}, ID: ${d.id}`);
    });

    const appointments = await prisma.appointment.findMany({
        include: { doctor: { include: { user: true } }, patient: { include: { user: true } } }
    });
    console.log(`\nFound ${appointments.length} total appointments in the database.`);
    appointments.forEach(a => {
        console.log(`- Booking for ${a.doctor.user.name} (${a.doctorId}) by ${a.patient.user.name} on ${a.date}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
