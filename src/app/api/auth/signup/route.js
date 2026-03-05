import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, role, ayushmanCardNumber, specialization, experienceYears, consultationFee } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
        }

        const userRole = role ? role.toUpperCase() : "PATIENT";

        const user = await prisma.user.create({
            data: {
                name: name || "User",
                email,
                password,
                role: userRole
            }
        });

        if (userRole === "DOCTOR") {
            await prisma.doctor.create({
                data: {
                    userId: user.id,
                    specialization: specialization || "General Physician",
                    experienceYears: parseInt(experienceYears) || 0,
                    consultationFee: parseFloat(consultationFee) || 500,
                    city: "India",
                    clinicName: `${name || "Doctor"}'s Clinic`,
                }
            });
        } else {
            await prisma.patient.create({
                data: {
                    userId: user.id,
                    ayushmanCardNumber: ayushmanCardNumber || null
                }
            });
        }

        return NextResponse.json({ success: true, user: { id: user.id, email: user.email, role: user.role } }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Something went wrong during signup", details: error.message }, { status: 500 });
    }
}
