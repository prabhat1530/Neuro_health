const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Clearing existing data...');
    await prisma.review.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.lab.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding dummy data...');

    const locations = ["Delhi", "Gurugram", "Noida", "Sonipat", "Panipat", "Faridabad", "Rohtak"];
    const specialties = [
        "Dentist",
        "Gynecologist",
        "Cardiologist",
        "Dermatologist",
        "General Physician",
        "Pediatrician",
        "Orthopedist",
        "Psychiatrist"
    ];

    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const firstNames = ["Amit", "Neha", "Rahul", "Priya", "Vikram", "Sneha", "Rohan", "Anjali", "Suresh", "Kavita", "Sanjay", "Pooja"];
    const lastNames = ["Sharma", "Verma", "Singh", "Gupta", "Kumar", "Patel", "Jain", "Rao", "Das", "Yadav"];

    let doctorIndex = 0;
    for (const location of locations) {
        for (const specialty of specialties) {
            for (let i = 0; i < 10; i++) {
                const firstName = getRandom(firstNames);
                const lastName = getRandom(lastNames);
                const name = `Dr. ${firstName} ${lastName}`;
                const email = `doctor_${location}_${specialty.replace(/\s+/g, '')}_${i}@example.com`.toLowerCase();

                const user = await prisma.user.create({
                    data: {
                        name: name,
                        email: email,
                        role: "DOCTOR",
                    }
                });

                await prisma.doctor.create({
                    data: {
                        userId: user.id,
                        specialization: specialty,
                        experienceYears: Math.floor(Math.random() * 25) + 3,
                        consultationFee: Math.floor(Math.random() * 5) * 100 + 300,
                        clinicAddress: "Main Road",
                        city: location,
                        rating: Number((Math.random() * 2 + 3).toFixed(1)),
                        reviewCount: Math.floor(Math.random() * 200) + 5
                    }
                });

                doctorIndex++;
            }
        }
    }
    console.log(`Successfully generated ${doctorIndex} doctors.`);

    const labNames = ["Apollo Diagnostics", "Dr Lal PathLabs", "Thyrocare", "Metropolis", "SRL Diagnostics", "Max Lab", "Suburban Diagnostics", "Lupin Diagnostics", "Redcliffe Labs", "Healthians"];

    let labIndex = 0;
    for (const location of locations) {
        for (let i = 0; i < 10; i++) {
            const labNameStr = `${getRandom(labNames)} ${location} Center ${i + 1}`;
            const email = `lab_${location}_${i}@example.com`.toLowerCase();

            const user = await prisma.user.create({
                data: {
                    name: labNameStr,
                    email: email,
                    role: "LAB",
                }
            });

            await prisma.lab.create({
                data: {
                    userId: user.id,
                    labName: labNameStr,
                    city: location,
                    address: `${Math.floor(Math.random() * 100) + 1}, Main Market, ${location}`,
                    rating: Number((Math.random() * 2 + 3).toFixed(1)),
                    reviewCount: Math.floor(Math.random() * 500) + 50,
                    acceptsGovtSchemes: true,
                    basePrice: Math.floor(Math.random() * 10) * 100 + 500,
                }
            });

            labIndex++;
        }
    }
    console.log(`Successfully generated ${labIndex} labs.`);

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
                userId: user.id
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
