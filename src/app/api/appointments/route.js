import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: "Please log in to book an appointment." }, { status: 401 });
        }

        const body = await request.json();
        const { doctorId, date, startTime, endTime } = body;

        if (!doctorId || !date || !startTime || !endTime) {
            return NextResponse.json({ success: false, error: "Missing required fields (doctorId, date, startTime, endTime)." }, { status: 400 });
        }

        // Find or auto-create the patient profile for this user
        let patient = await prisma.patient.findUnique({
            where: { userId: session.user.id }
        });

        if (!patient) {
            // Auto-create a patient profile if one doesn't exist
            patient = await prisma.patient.create({
                data: { userId: session.user.id }
            });
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId: patient.id,
                doctorId,
                date: new Date(date + "T00:00:00.000Z"),
                startTime,
                endTime,
                status: "PENDING",
                paymentStatus: "UNPAID",
            }
        });

        return NextResponse.json({ success: true, data: appointment });
    } catch (error) {
        console.error("Appointment creation error:", error);
        return NextResponse.json({ success: false, error: "Failed to create appointment. Please try again." }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const patient = await prisma.patient.findUnique({
            where: { userId: session.user.id }
        });

        if (!patient) {
            return NextResponse.json({ success: true, data: [] });
        }

        const appointments = await prisma.appointment.findMany({
            where: { patientId: patient.id },
            include: {
                doctor: {
                    include: { user: { select: { name: true } } }
                }
            },
            orderBy: { date: "desc" }
        });

        return NextResponse.json({ success: true, data: appointments });
    } catch (error) {
        console.error("Appointment fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 });
    }
}
