import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../auth/[...nextauth]/route";

// PATCH: accept or reject an appointment
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "DOCTOR") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { action } = await request.json(); // "CONFIRMED" or "CANCELLED"

        if (!["CONFIRMED", "CANCELLED"].includes(action)) {
            return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
        }

        // Verify the appointment belongs to this doctor
        const doctor = await prisma.doctor.findUnique({ where: { userId: session.user.id } });
        if (!doctor) {
            return NextResponse.json({ success: false, error: "Doctor profile not found" }, { status: 404 });
        }

        const appointment = await prisma.appointment.findFirst({
            where: { id, doctorId: doctor.id }
        });

        if (!appointment) {
            return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 });
        }

        const updated = await prisma.appointment.update({
            where: { id },
            data: { status: action },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("Appointment update error:", error);
        return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
    }
}
