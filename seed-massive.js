const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cities = ["Delhi", "Gurugram", "Noida", "Sonipat", "Panipat", "Rohtak", "Faridabad"];

async function main() {
    console.log("Starting massive seed...");

    // 1. Seed Doctors
    const specializations = [
        "Cardiologist", "Dentist", "Dermatologist", "General Physician",
        "Gynecologist", "Orthopedist", "Pediatrician", "Psychiatrist",
        "Neurologist", "Ophthalmologist", "ENT Specialist", "Urologist",
        "Gastroenterologist", "Endocrinologist", "Oncologist", "Pulmonologist"
    ];

    const firstNames = ["Arun", "Sanjay", "Vikram", "Rahul", "Priya", "Anjali", "Deepa", "Rohan", "Sneha", "Amit", "Meera", "Karan", "Sunita", "Rajesh", "Pooja", "Varun"];
    const lastNames = ["Sharma", "Verma", "Gupta", "Malhotra", "Kapoor", "Jain", "Mehta", "Chopra", "Reddy", "Nair", "Iyer", "Mishra", "Pandey", "Yadav", "Singh", "Gill"];

    console.log("Seeding 60 Doctors...");
    for (let i = 0; i < 60; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const spec = specializations[Math.floor(Math.random() * specializations.length)];
        const email = `doctor.${i}.${Date.now()}@nuerohealth.com`;

        await prisma.user.create({
            data: {
                email,
                name: `${firstName} ${lastName}`,
                role: "DOCTOR",
                doctorProfile: {
                    create: {
                        specialization: spec,
                        experienceYears: Math.floor(Math.random() * 25) + 2,
                        consultationFee: Math.floor(Math.random() * 15) * 100 + 400,
                        bio: `Experienced ${spec} dedicated to patient care in ${city}. Specialists in advanced medical procedures.`,
                        city,
                        rating: parseFloat((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
                        reviewCount: Math.floor(Math.random() * 200) + 10,
                        isVerified: true,
                    }
                }
            }
        });
    }

    // 2. Seed Labs
    console.log("Seeding 25 Labs...");
    const labBrands = ["Apollo Diagnostics", "Dr Lal PathLabs", "SRL Diagnostics", "Thyrocare", "Metropolis", "Max Labs", "Fortis Health", "Medall"];
    for (let i = 0; i < 25; i++) {
        const brand = labBrands[Math.floor(Math.random() * labBrands.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const email = `lab.${i}.${Date.now()}@nuerohealth.com`;

        await prisma.user.create({
            data: {
                email,
                name: `${brand} - ${city}`,
                role: "LAB",
                labProfile: {
                    create: {
                        labName: `${brand} ${city} Center`,
                        city,
                        rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
                        basePrice: Math.floor(Math.random() * 10) * 100 + 300,
                        acceptsGovtSchemes: true,
                        tests: {
                            create: [
                                { testName: "Complete Blood Count (CBC)", price: 450 },
                                { testName: "Blood Sugar (Fasting)", price: 150 },
                                { testName: "Lipid Profile", price: 850 },
                                { testName: "Liver Function Test (LFT)", price: 1200 },
                                { testName: "Thyroid Profile (T3, T4, TSH)", price: 950 },
                                { testName: "Vitamin D3", price: 1500 },
                                { testName: "Full Body Checkup", price: 2999 },
                                { testName: "MRI Scan", price: 4500 },
                                { testName: "CT Scan", price: 3500 },
                                { testName: "X-Ray Chest", price: 600 }
                            ]
                        }
                    }
                }
            }
        });
    }

    // 3. Seed Caretakers
    console.log("Seeding 20 Caretakers...");
    const carerRoles = ["Senior Citizen Care", "Child Care", "Physiotherapy Assistant", "Post-Surgical Care", "General Nursing"];
    const carerNames = ["Sunita Devi", "Ramesh Kumar", "Laxmi Bai", "Kamla Sharma", "Rajeshwari", "Savitri", "Madan Lal", "Gopal Das", "Asha", "Sita"];
    for (let i = 0; i < 20; i++) {
        const name = carerNames[Math.floor(Math.random() * carerNames.length)] + " " + (i % 2 === 0 ? "A" : "B");
        const city = cities[Math.floor(Math.random() * cities.length)];
        const spec = carerRoles[Math.floor(Math.random() * carerRoles.length)];

        await prisma.caretaker.create({
            data: {
                name,
                city,
                specialization: spec,
                experienceYears: Math.floor(Math.random() * 15) + 3,
                hourlyRate: Math.floor(Math.random() * 3) * 100 + 200,
                dailyRate: Math.floor(Math.random() * 10) * 100 + 800,
                rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
                isVerified: true,
                acceptsGovtSchemes: true,
                bio: `Dedicated home care professional specializing in ${spec}. Trained for emergency response and medical assistance.`
            }
        });
    }

    // 4. Seed Medical Equipment
    console.log("Seeding 30 Equipment items...");
    const equipment = [
        { name: "Oxygen Concentrator (5L)", cat: "Respiratory", price: 4500 },
        { name: "Motorized Hospital Bed", cat: "Beds", price: 3500 },
        { name: "Portable Ventilator", cat: "Respiratory", price: 8000 },
        { name: "Wheelchair (Foldable)", cat: "Mobility", price: 1200 },
        { name: "CPAP Machine", cat: "Respiratory", price: 2500 },
        { name: "Patient Monitor", cat: "Diagnostic", price: 1800 },
        { name: "Suction Machine", cat: "Respiratory", price: 1000 },
        { name: "Walking Frame / Walker", cat: "Mobility", price: 400 },
        { name: "Medical Air Mattress", cat: "Beds", price: 700 }
    ];

    for (let i = 0; i < 30; i++) {
        const item = equipment[Math.floor(Math.random() * equipment.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];

        await prisma.rentalEquipment.create({
            data: {
                equipmentName: `${item.name} - ${city} Center`,
                vendorName: `HealthRent ${city}`,
                category: item.cat,
                city,
                dailyRate: Math.floor(item.price / 30),
                weeklyRate: Math.floor(item.price / 4),
                monthlyRate: item.price,
                isAvailable: true,
                isVerified: true,
                rating: parseFloat((Math.random() * (5 - 4) + 4).toFixed(1)),
                acceptsGovtSchemes: true,
                description: `Premium quality ${item.name} available for monthly rental. Well-maintained and sanitized.`
            }
        });
    }

    console.log("✅ Massive seed complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
