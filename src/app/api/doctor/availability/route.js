import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "DOCTOR") {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const doctor = await prisma.doctor.findUnique({
            where: { email: session.user.email }
        });

        if (!doctor) return NextResponse.json({ success: false, error: "Doctor profile not found" }, { status: 404 });

        // For now return empty slots or a mock, matching the UI expectation
        return NextResponse.json({
            success: true,
            data: {
                slots: [
                    { day: "Monday", active: true, morning: "09:00 - 12:00", evening: "16:00 - 19:00" },
                    { day: "Tuesday", active: true, morning: "09:00 - 12:00", evening: "16:00 - 19:00" },
                    { day: "Wednesday", active: true, morning: "09:00 - 12:00", evening: "16:00 - 19:00" },
                ]
            }
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
