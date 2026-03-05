import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET: fetch all appointments for the logged-in doctor
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "DOCTOR") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const doctor = await prisma.doctor.findUnique({
            where: { userId: session.user.id },
        });

        if (!doctor) {
            return NextResponse.json({ success: false, error: "Doctor profile not found" }, { status: 404 });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const appointments = await prisma.appointment.findMany({
            where: { doctorId: doctor.id },
            include: {
                patient: {
                    include: { user: { select: { name: true, email: true } } }
                }
            },
            orderBy: { date: "asc" },
        });

        const totalPatients = new Set(appointments.map(a => a.patientId)).size;
        const todayAppointments = appointments.filter(a => {
            const d = new Date(a.date);
            return d >= today && d < tomorrow;
        });
        const upcomingAppointments = appointments.filter(a => new Date(a.date) >= tomorrow);

        // Monthly earnings from CONFIRMED/COMPLETED appointments this month
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthlyEarnings = appointments
            .filter(a => new Date(a.date) >= monthStart && (a.status === "CONFIRMED" || a.status === "COMPLETED"))
            .length * doctor.consultationFee;

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    totalPatients,
                    todayCount: todayAppointments.length,
                    upcomingCount: upcomingAppointments.length,
                    monthlyEarnings,
                },
                appointments,
                doctor,
            }
        });
    } catch (error) {
        console.error("Doctor dashboard error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
