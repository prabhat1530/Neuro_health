import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
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

    // Helper to get a random item from an array
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const firstNames = ["Amit", "Neha", "Rahul", "Priya", "Vikram", "Sneha", "Rohan", "Anjali", "Suresh", "Kavita", "Sanjay", "Pooja"];
    const lastNames = ["Sharma", "Verma", "Singh", "Gupta", "Kumar", "Patel", "Jain", "Rao", "Das", "Yadav"];

    // Generate EXACTLY 10 doctors per specialty per city
    let doctorIndex = 0;
    for (const location of locations) {
        for (const specialty of specialties) {
            for (let i = 0; i < 10; i++) {
                const firstName = getRandom(firstNames);
                const lastName = getRandom(lastNames);
                const name = `Dr. ${firstName} ${lastName}`;
                const email = `doctor_${location}_${specialty.replace(/\s+/g, '')}_${i}@example.com`.toLowerCase();

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
                        clinicAddress: "Main Road",
                        city: location,
                        rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
                        reviewCount: Math.floor(Math.random() * 200) + 5
                    }
                });

                doctorIndex++;
            }
        }
    }
    console.log(`Successfully generated ${doctorIndex} doctors across ${locations.length} cities and ${specialties.length} specialties.`);

    const labNames = ["Apollo Diagnostics", "Dr Lal PathLabs", "Thyrocare", "Metropolis", "SRL Diagnostics", "Max Lab", "Suburban Diagnostics", "Lupin Diagnostics", "Redcliffe Labs", "Healthians"];

    let labIndex = 0;
    for (const location of locations) {
        for (let i = 0; i < 10; i++) {
            const labNameStr = `${getRandom(labNames)} ${location} Center ${i + 1}`;
            const email = `lab_${location}_${i}@example.com`.toLowerCase();

            // Create User for Lab
            const user = await prisma.user.create({
                data: {
                    name: labNameStr,
                    email: email,
                    role: "LAB",
                }
            });

            // Create Lab Profile
            await prisma.lab.create({
                data: {
                    userId: user.id,
                    labName: labNameStr,
                    city: location,
                    address: `${Math.floor(Math.random() * 100) + 1}, Main Market, ${location}`,
                    rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
                    reviewCount: Math.floor(Math.random() * 500) + 50,
                    acceptsGovtSchemes: true,
                    basePrice: Math.floor(Math.random() * 10) * 100 + 500, // 500, 600, ... 1400
                }
            });

            labIndex++;
        }
    }
    console.log(`Successfully generated ${labIndex} labs across ${locations.length} cities.`);

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

        // We'll skip patient creation fields that don't exist yet, just rely on defaults
        await prisma.patient.create({
            data: {
                userId: user.id
            }
        });
    }

    console.log('Seeding finished.');

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
}
