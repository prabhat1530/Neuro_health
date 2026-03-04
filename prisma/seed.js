const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing data...');
    await prisma.review.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.treatmentEstimate.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding dummy data...');

    const locations = ["Model Town", "Sector 14", "Sector 15", "Murthal Road", "Kundli", "Omaxe City"];
    const specialties = [
        "Dentist",
        "Gynecologist",
        "Cardiologist",
        "Dermatologist",
        "General Physician",
        "Pediatrician",
        "Orthopedist"
    ];

    // Helper to get a random item from an array
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const firstNames = ["Amit", "Neha", "Rahul", "Priya", "Vikram", "Sneha", "Rohan", "Anjali", "Suresh", "Kavita", "Sanjay", "Pooja"];
    const lastNames = ["Sharma", "Verma", "Singh", "Gupta", "Kumar", "Patel", "Jain", "Rao", "Das", "Yadav"];

    // Create 30 mock doctors
    for (let i = 0; i < 30; i++) {
        const firstName = getRandom(firstNames);
        const lastName = getRandom(lastNames);
        const name = `Dr. ${firstName} ${lastName}`;
        const email = `doctor${i}@example.com`;
        const location = getRandom(locations);
        const specialty = getRandom(specialties);

        // Create User
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                role: "DOCTOR",
            }
        });

        // Create Doctor Profile
        await prisma.doctor.create({
            data: {
                userId: user.id,
                specialization: specialty,
                experienceYears: Math.floor(Math.random() * 25) + 3, // 3 to 27 years
                consultationFee: Math.floor(Math.random() * 5) * 100 + 300, // 300, 400, 500, etc.
                location: location,
                city: "Sonipat",
                mciRegNumber: `MCI-${10000 + i}`,
                status: "VERIFIED",
                acceptsGovtSchemes: Math.random() > 0.5
            }
        });
    }

    // Create some patients
    for (let i = 0; i < 10; i++) {
        const firstName = getRandom(firstNames);
        const lastName = getRandom(lastNames);
        const name = `${firstName} ${lastName}`;
        const email = `patient${i}@example.com`;

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                role: "USER"
            }
        });

        await prisma.patient.create({
            data: {
                userId: user.id,
                age: Math.floor(Math.random() * 60) + 18,
            }
        });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
