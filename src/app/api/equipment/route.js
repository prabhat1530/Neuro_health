import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const location = searchParams.get("location");
    const category = searchParams.get("category");
    const minRating = searchParams.get("minRating");
    const maxPrice = searchParams.get("maxPrice");
    const availableOnly = searchParams.get("availableOnly");

    try {
        const andConditions = [];

        if (location) {
            const variants = [location, location.toLowerCase(), location.charAt(0).toUpperCase() + location.slice(1).toLowerCase()];
            andConditions.push({ OR: variants.map(v => ({ city: { contains: v } })) });
        }

        if (query) {
            andConditions.push({
                OR: [
                    { equipmentName: { contains: query } },
                    { vendorName: { contains: query } },
                    { description: { contains: query } },
                ]
            });
        }

        if (category && category !== "All") {
            andConditions.push({ category: { contains: category } });
        }

        if (minRating) {
            andConditions.push({ rating: { gte: parseFloat(minRating) } });
        }

        if (maxPrice) {
            andConditions.push({ monthlyRate: { lte: parseFloat(maxPrice) } });
        }

        if (availableOnly === "true") {
            andConditions.push({ isAvailable: true });
        }

        const items = await prisma.rentalEquipment.findMany({
            where: andConditions.length > 0 ? { AND: andConditions } : {},
            orderBy: { rating: "desc" },
        });

        return NextResponse.json({ success: true, data: items });
    } catch (error) {
        console.error("Equipment fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch equipment" }, { status: 500 });
    }
}
