import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: {
                patientProfile: {
                    include: {
                        appointments: {
                            include: {
                                doctor: {
                                    include: {
                                        user: {
                                            select: { name: true }
                                        }
                                    }
                                }
                            },
                            orderBy: {
                                date: 'desc'
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                ayushmanCardNumber: user.patientProfile?.ayushmanCardNumber || null,
                appointments: user.patientProfile?.appointments || []
            }
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
