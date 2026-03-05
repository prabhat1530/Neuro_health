const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const equipmentData = [
    // MOBILITY
    { vendorName: "MedRent Delhi", city: "Delhi", address: "Karol Bagh, New Delhi", equipmentName: "Standard Wheelchair", category: "Mobility", description: "Foldable, lightweight standard wheelchair suitable for indoor and outdoor use.", dailyRate: 80, weeklyRate: 450, monthlyRate: 1500, depositAmount: 2000, isAvailable: true, isVerified: true, rating: 4.7, reviewCount: 134, acceptsGovtSchemes: true },
    { vendorName: "HealthCare Rentals", city: "Gurugram", address: "Sector 14, Gurugram", equipmentName: "Electric Wheelchair", category: "Mobility", description: "Power-operated electric wheelchair with joystick control. 10hr battery life.", dailyRate: 350, weeklyRate: 2000, monthlyRate: 7000, depositAmount: 8000, isAvailable: true, isVerified: true, rating: 4.8, reviewCount: 67, acceptsGovtSchemes: false },
    { vendorName: "Sonipat Medical Rentals", city: "Sonipat", address: "Model Town, Sonipat", equipmentName: "Crutches (Pair)", category: "Mobility", description: "Aluminum adjustable crutches for post-fracture or surgery patients.", dailyRate: 30, weeklyRate: 150, monthlyRate: 500, depositAmount: 300, isAvailable: true, isVerified: true, rating: 4.5, reviewCount: 44, acceptsGovtSchemes: true },
    { vendorName: "Noida MedEquip", city: "Noida", address: "Sector 18, Noida", equipmentName: "Walking Frame / Zimmer Frame", category: "Mobility", description: "Sturdy aluminium walking frame for elderly or post-op patients.", dailyRate: 50, weeklyRate: 280, monthlyRate: 900, depositAmount: 500, isAvailable: true, isVerified: false, rating: 4.3, reviewCount: 29, acceptsGovtSchemes: true },

    // RESPIRATORY
    { vendorName: "BreathEasy Rentals", city: "Delhi", address: "Lajpat Nagar, New Delhi", equipmentName: "Oxygen Concentrator (5L)", category: "Respiratory", description: "Hospital-grade 5-litre oxygen concentrator. Ideal for home use during recovery.", dailyRate: 500, weeklyRate: 2800, monthlyRate: 9000, depositAmount: 10000, isAvailable: true, isVerified: true, rating: 4.9, reviewCount: 210, acceptsGovtSchemes: true },
    { vendorName: "PulmoRent", city: "Faridabad", address: "NIT Faridabad", equipmentName: "BiPAP Machine", category: "Respiratory", description: "Bi-level positive airway pressure machine for sleep apnea and respiratory conditions.", dailyRate: 600, weeklyRate: 3500, monthlyRate: 11000, depositAmount: 12000, isAvailable: true, isVerified: true, rating: 4.7, reviewCount: 55, acceptsGovtSchemes: false },
    { vendorName: "HealthPlus Rohtak", city: "Rohtak", address: "Civil Lines, Rohtak", equipmentName: "Nebulizer Machine", category: "Respiratory", description: "Compressor nebulizer for respiratory medication delivery. Silent operation.", dailyRate: 80, weeklyRate: 450, monthlyRate: 1400, depositAmount: 1500, isAvailable: true, isVerified: true, rating: 4.6, reviewCount: 78, acceptsGovtSchemes: true },

    // HOSPITAL BEDS
    { vendorName: "BedRent Pro", city: "Delhi", address: "Rohini, New Delhi", equipmentName: "Semi-Fowler Hospital Bed", category: "Hospital Beds", description: "Manual semi-fowler position hospital bed with safety railings and adjustable headrest.", dailyRate: 400, weeklyRate: 2400, monthlyRate: 8000, depositAmount: 5000, isAvailable: true, isVerified: true, rating: 4.8, reviewCount: 96, acceptsGovtSchemes: true },
    { vendorName: "Homecare Beds Panipat", city: "Panipat", address: "Sector 11, Panipat", equipmentName: "Fowler Bed (Electric)", category: "Hospital Beds", description: "Full-electric fowler hospital bed with remote control. Ideal for paralysis and post-surgical patients.", dailyRate: 700, weeklyRate: 4000, monthlyRate: 13000, depositAmount: 15000, isAvailable: true, isVerified: true, rating: 4.9, reviewCount: 42, acceptsGovtSchemes: false },
    { vendorName: "MedRent Express", city: "Gurugram", address: "DLF Phase 2, Gurugram", equipmentName: "Overbed Table", category: "Hospital Beds", description: "Height-adjustable overbed table for hospital beds. Perfect for eating, reading, or working.", dailyRate: 50, weeklyRate: 280, monthlyRate: 900, depositAmount: 500, isAvailable: true, isVerified: false, rating: 4.2, reviewCount: 18, acceptsGovtSchemes: true },

    // DIAGNOSTIC
    { vendorName: "DiagnoRent Delhi", city: "Delhi", address: "Dwarka, New Delhi", equipmentName: "Pulse Oximeter", category: "Diagnostic", description: "Fingertip pulse oximeter to monitor SpO2 and heart rate at home.", dailyRate: 40, weeklyRate: 200, monthlyRate: 700, depositAmount: 500, isAvailable: true, isVerified: true, rating: 4.6, reviewCount: 154, acceptsGovtSchemes: true },
    { vendorName: "VitalMonitor Noida", city: "Noida", address: "Sector 62, Noida", equipmentName: "Blood Pressure Monitor", category: "Diagnostic", description: "Digital automatic BP monitor for home use. Memory for 60 readings.", dailyRate: 60, weeklyRate: 320, monthlyRate: 1000, depositAmount: 800, isAvailable: true, isVerified: true, rating: 4.5, reviewCount: 88, acceptsGovtSchemes: false },
    { vendorName: "HomeMonitor Sonipat", city: "Sonipat", address: "Sector 14, Sonipat", equipmentName: "Glucometer Kit", category: "Diagnostic", description: "Blood glucose monitoring kit. Includes lancets and test strips (50 strips).", dailyRate: 70, weeklyRate: 400, monthlyRate: 1200, depositAmount: 1000, isAvailable: true, isVerified: false, rating: 4.3, reviewCount: 31, acceptsGovtSchemes: true },
];

async function main() {
    console.log("Seeding rental equipment...");
    for (const item of equipmentData) {
        await prisma.rentalEquipment.create({ data: item });
    }
    console.log(`✅ Seeded ${equipmentData.length} equipment listings.`);
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
