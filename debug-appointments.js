const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'doc_dr._priya_sharma@example.com';
    const doctorUser = await prisma.user.findUnique({
        where: { email },
        include: { doctorProfile: true }
    });

    if (!doctorUser || !doctorUser.doctorProfile) {
        console.log("Doctor not found!");
        return;
    }

    const doctorId = doctorUser.doctorProfile.id;
    console.log(`Doctor ID for ${email}: ${doctorId}`);

    const appointments = await prisma.appointment.findMany({
        where: { doctorId: doctorId },
        include: { patient: { include: { user: true } } }
    });

    console.log(`Found ${appointments.length} appointments for this doctor.`);
    appointments.forEach(a => {
        console.log(`- Date: ${a.date}, Patient: ${a.patient.user.name}, Status: ${a.status}`);
    });
}

main().catch(console.error).finally(() => prisma.$disconnect());
