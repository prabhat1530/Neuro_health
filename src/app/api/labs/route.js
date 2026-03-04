import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query")?.toLowerCase() || "";
        const location = searchParams.get("location")?.toLowerCase() || "";
        const minRating = parseFloat(searchParams.get("minRating")) || 0;
        const maxPrice = parseInt(searchParams.get("maxPrice")) || 999999;

        let whereClause = {
            rating: {
                gte: minRating
            },
            basePrice: {
                lte: maxPrice
            }
        };

        if (location) {
            whereClause.city = { contains: location };
        }

        if (query) {
            whereClause.labName = { contains: query };
        }

        const labs = await prisma.lab.findMany({
            where: whereClause,
            include: {
                user: {
                    select: { name: true, email: true }
                }
            },
            orderBy: {
                rating: 'desc'
            }
        });

        return NextResponse.json(labs);
    } catch (error) {
        console.error("Error fetching labs:", error);
        return NextResponse.json({ error: "Failed to fetch labs" }, { status: 500 });
    }
}
