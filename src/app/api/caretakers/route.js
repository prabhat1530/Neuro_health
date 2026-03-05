import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const location = searchParams.get("location");
    const minRating = searchParams.get("minRating");
    const maxPrice = searchParams.get("maxPrice");
    const availability = searchParams.get("availability");

    try {
        const andConditions = [];

        if (location) {
            const locVariants = [location, location.toLowerCase(), location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()];
            andConditions.push({
                OR: locVariants.map(v => ({ city: { contains: v } }))
            });
        }

        if (query) {
            andConditions.push({
                OR: [
                    { specialization: { contains: query } },
                    { name: { contains: query } },
                    { bio: { contains: query } },
                ]
            });
        }

        if (minRating) {
            andConditions.push({ rating: { gte: parseFloat(minRating) } });
        }

        if (maxPrice) {
            andConditions.push({ dailyRate: { lte: parseFloat(maxPrice) } });
        }

        if (availability && availability !== "All") {
            andConditions.push({ availability: { contains: availability } });
        }

        const caretakers = await prisma.caretaker.findMany({
            where: andConditions.length > 0 ? { AND: andConditions } : {},
            orderBy: { rating: "desc" },
        });

        return NextResponse.json({ success: true, data: caretakers });
    } catch (error) {
        console.error("Caretaker fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch caretakers" }, { status: 500 });
    }
}
