import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const specialty = searchParams.get("specialty");
    const location = searchParams.get("location");
    const city = searchParams.get("city");

    try {
        const filters = { status: "VERIFIED" };

        if (specialty) {
            filters.specialization = { contains: specialty }; // SQLite contains is case-sensitive or insensitive based on PRAGMA, usually simplified for MVP
        }

        if (location) {
            filters.location = { contains: location };
        }

        if (city) {
            // Prioritize hyper-local searches
            filters.city = { contains: city };
        }

        const doctors = await prisma.doctor.findMany({
            where: filters,
            include: {
                user: { select: { name: true, image: true } },
                treatmentEstimates: true
            }
        });

        return NextResponse.json({ success: true, data: doctors });
    } catch (error) {
        console.error("Doctor fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch doctors" }, { status: 500 });
    }
}
