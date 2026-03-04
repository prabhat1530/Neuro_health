import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, role, ayushmanCardNumber } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        if (role !== "DOCTOR" && ayushmanCardNumber) {
            const ayushmanRegex = /^AYU\d{12}$/;
            if (!ayushmanRegex.test(ayushmanCardNumber)) {
                return NextResponse.json({ error: "Invalid Ayushman Card. Must start with 'AYU' followed by 12 digits (e.g. AYU452178963014)." }, { status: 400 });
            }
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
        }

        const userRole = role ? role.toUpperCase() : "PATIENT";

        // Create the user in the database
        const user = await prisma.user.create({
            data: {
                name: name || "User",
                email,
                password, // Simplified for MVP. In prod use bcrypt
                role: userRole
            }
        });

        // Initialize corresponding profile based on role
        if (userRole === "DOCTOR") {
            await prisma.doctor.create({
                data: {
                    userId: user.id,
                    specialization: "General Physician",
                    experienceYears: 0,
                    consultationFee: 500,
                    city: "Sonipat",
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
