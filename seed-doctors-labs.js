const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cities = ["Delhi", "Gurugram", "Noida", "Sonipat", "Panipat", "Faridabad", "Rohtak"];
const specialties = ["Cardiologist", "Dermatologist", "Dentist", "Gynecologist", "General Physician", "Pediatrician", "Orthopedist", "Psychiatrist", "Neurologist", "Ophthalmologist"];
const firstNames = ["Amit", "Neha", "Rahul", "Priya", "Vikram", "Sneha", "Rohan", "Anjali", "Suresh", "Kavita", "Sanjay", "Pooja", "Deepak", "Sunita", "Ramesh"];
const lastNames = ["Sharma", "Verma", "Singh", "Gupta", "Kumar", "Patel", "Jain", "Rao", "Das", "Yadav", "Mehta", "Chopra"];
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Specific well-rounded doctors
const specificDoctors = [
    { name: "Dr. Priya Sharma", city: "Delhi", specialty: "Cardiologist", exp: 15, fee: 800, rating: 4.9, reviews: 312, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Ravi Gupta", city: "Gurugram", specialty: "Dermatologist", exp: 10, fee: 600, rating: 4.7, reviews: 218, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Anjali Singh", city: "Noida", specialty: "Gynecologist", exp: 12, fee: 700, rating: 4.8, reviews: 175, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Suresh Kumar", city: "Sonipat", specialty: "General Physician", exp: 8, fee: 300, rating: 4.6, reviews: 440, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Meena Patel", city: "Faridabad", specialty: "Pediatrician", exp: 9, fee: 400, rating: 4.7, reviews: 290, verified: "TELECONSULT_ONLY" },
    { name: "Dr. Vikram Rao", city: "Rohtak", specialty: "Orthopedist", exp: 18, fee: 900, rating: 4.9, reviews: 156, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Pooja Mehta", city: "Panipat", specialty: "Psychiatrist", exp: 7, fee: 500, rating: 4.5, reviews: 98, verified: "TELECONSULT_ONLY" },
    { name: "Dr. Deepak Jain", city: "Delhi", specialty: "Neurologist", exp: 20, fee: 1200, rating: 5.0, reviews: 204, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Kavita Das", city: "Gurugram", specialty: "Ophthalmologist", exp: 11, fee: 550, rating: 4.6, reviews: 133, verified: "FULL_CLINIC_VISIT" },
    { name: "Dr. Amit Chopra", city: "Noida", specialty: "Dentist", exp: 6, fee: 350, rating: 4.4, reviews: 267, verified: "FULL_CLINIC_VISIT" },
];

// Lab names
const labNames = [
    "PathCare Diagnostics", "Dr. Lal PathLabs", "SRL Diagnostics",
    "Thyrocare", "Metropolis Healthcare", "City Lab", "MedPlus Labs",
    "HealthCheck Labs", "Apollo Diagnostics", "Max Diagnostics"
];

const testNames = ["CBC", "LFT", "KFT", "Lipid Profile", "Thyroid Panel (T3/T4/TSH)", "HbA1c", "Vitamin D", "Vitamin B12", "ECG", "Chest X-Ray", "MRI Brain", "CT Scan Abdomen", "Urine Culture", "Blood Sugar (Fasting)", "HIV Test"];

async function main() {
    console.log("Seeding doctors...");

    // 1. Seed specific curated doctors
    for (const doc of specificDoctors) {
        const email = `doc_${doc.name.replace(/\s+/g, "_").toLowerCase()}@example.com`;
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) continue;

        const user = await prisma.user.create({
            data: { name: doc.name, email, role: "DOCTOR" }
        });

        await prisma.doctor.create({
            data: {
                userId: user.id,
                specialization: doc.specialty,
                experienceYears: doc.exp,
                consultationFee: doc.fee,
                city: doc.city,
                clinicName: `${doc.name.replace("Dr. ", "")} Clinic`,
                clinicAddress: `Sector ${Math.floor(Math.random() * 20) + 1}, ${doc.city}`,
                rating: doc.rating,
                reviewCount: doc.reviews,
                isVerified: true,
                bio: `${doc.name} is a highly experienced ${doc.specialty} based in ${doc.city}.`,
            }
        });
    }

    // 2. Seed 20 more random doctors
    for (let i = 0; i < 20; i++) {
        const name = `Dr. ${getRandom(firstNames)} ${getRandom(lastNames)}`;
        const email = `rand_doctor_${i}_${Date.now()}@example.com`;
        const city = getRandom(cities);
        const specialty = getRandom(specialties);

        const user = await prisma.user.create({
            data: { name, email, role: "DOCTOR" }
        });

        await prisma.doctor.create({
            data: {
                userId: user.id,
                specialization: specialty,
                experienceYears: Math.floor(Math.random() * 20) + 3,
                consultationFee: (Math.floor(Math.random() * 8) + 3) * 100,
                city,
                clinicName: `${name.replace("Dr. ", "")} Clinic`,
                clinicAddress: `Sector ${Math.floor(Math.random() * 30) + 1}, ${city}`,
                rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
                reviewCount: Math.floor(Math.random() * 300) + 20,
                isVerified: Math.random() > 0.3,
            }
        });
    }
    console.log(`✅ Doctors seeded.`);

    // 3. Seed Labs
    console.log("Seeding labs...");
    for (let i = 0; i < labNames.length; i++) {
        const city = cities[i % cities.length];
        const email = `lab_${i}_${Date.now()}@example.com`;

        const user = await prisma.user.create({
            data: { name: labNames[i], email, role: "LAB" }
        });

        const lab = await prisma.lab.create({
            data: {
                userId: user.id,
                labName: labNames[i],
                city,
                address: `Sector ${Math.floor(Math.random() * 20) + 1}, ${city}`,
                rating: parseFloat((3.8 + Math.random() * 1.2).toFixed(1)),
                reviewCount: Math.floor(Math.random() * 500) + 50,
                acceptsGovtSchemes: Math.random() > 0.3,
                basePrice: (Math.floor(Math.random() * 5) + 3) * 100,
            }
        });

        // Seed 4-6 tests per lab
        const numTests = Math.floor(Math.random() * 3) + 4;
        const shuffled = [...testNames].sort(() => Math.random() - 0.5).slice(0, numTests);
        for (const testName of shuffled) {
            await prisma.labTest.create({
                data: {
                    labId: lab.id,
                    testName,
                    price: (Math.floor(Math.random() * 10) + 2) * 100,
                }
            });
        }
    }
    console.log(`✅ Labs seeded.`);
    console.log("🎉 All done!");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
