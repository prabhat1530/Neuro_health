import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    try {
        if (!doctorId) {
            return NextResponse.json({ success: false, error: "Missing doctorId" }, { status: 400 });
        }

        const estimates = await prisma.treatmentEstimate.findMany({
            where: { doctorId },
        });

        return NextResponse.json({ success: true, data: estimates });
    } catch (error) {
        console.error("Estimate fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch estimates" }, { status: 500 });
    }
}
