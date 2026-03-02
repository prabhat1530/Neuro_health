import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { doctorId, appointmentDate } = body;

        if (!doctorId || !appointmentDate) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        // Get the patient profile for the user
        const patient = await prisma.patient.findUnique({
            where: { userId: session.user.id }
        });

        if (!patient) {
            return NextResponse.json({ success: false, error: "Patient profile not found" }, { status: 404 });
        }

        const appointment = await prisma.appointment.create({
            data: {
                patientId: patient.id,
                doctorId,
                appointmentDate: new Date(appointmentDate),
                status: "SCHEDULED",
            }
        });

        return NextResponse.json({ success: true, data: appointment });
    } catch (error) {
        console.error("Appointment creation error:", error);
        return NextResponse.json({ success: false, error: "Failed to create appointment" }, { status: 500 });
    }
}
