import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const type = searchParams.get("type");
    const location = searchParams.get("location");
    const city = searchParams.get("city");
    const minRating = searchParams.get("minRating");
    const maxPrice = searchParams.get("maxPrice");

    try {
        let filters = {};

        const orConditions = [];

        // Build case-insensitive location checks
        if (location) {
            const locLower = location.toLowerCase();
            const locTitle = location.charAt(0).toUpperCase() + location.substring(1).toLowerCase();
            const locUpper = location.toUpperCase();

            orConditions.push(
                { city: { contains: locLower } },
                { city: { contains: locTitle } },
                { city: { contains: locUpper } }
            );
        }

        const andConditions = [];

        if (orConditions.length > 0) {
            andConditions.push({ OR: orConditions });
        }

        if (query) {
            if (type === "symptom") {
                const { getSpecialtiesForQuery } = require("../../../lib/symptomMapper");
                const mappedSpecialties = getSpecialtiesForQuery(query);

                if (mappedSpecialties.length > 0) {
                    andConditions.push({
                        OR: mappedSpecialties.map(spec => ({ specialization: { contains: spec } }))
                    });
                } else {
                    // Symptom not found in map, attempt a fuzzy string search on specialization just in case
                    andConditions.push({ specialization: { contains: query } });
                }
            } else if (type === "doctor") {
                // Search by user name
                const lower = query.toLowerCase();
                const title = query.charAt(0).toUpperCase() + query.substring(1).toLowerCase();

                andConditions.push({
                    OR: [
                        { user: { name: { contains: query } } },
                        { user: { name: { contains: lower } } },
                        { user: { name: { contains: title } } }
                    ]
                });
            } else { // type === "specialty" or default
                andConditions.push({ specialization: { contains: query } });
            }
        }

        if (minRating) {
            andConditions.push({ rating: { gte: parseFloat(minRating) } });
        }

        if (maxPrice) {
            andConditions.push({ consultationFee: { lte: parseFloat(maxPrice) } });
        }

        if (andConditions.length > 0) {
            filters.AND = andConditions;
        }

        const doctors = await prisma.doctor.findMany({
            where: filters,
            include: {
                user: { select: { name: true, email: true } }
            }
        });

        return NextResponse.json({ success: true, data: doctors });
    } catch (error) {
        console.error("Doctor fetch error:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch doctors" }, { status: 500 });
    }
}
