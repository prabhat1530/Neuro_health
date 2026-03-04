import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // Provider specific routes (Doctors only)
        if (path.startsWith("/provider") && token?.role !== "DOCTOR") {
            return NextResponse.redirect(new URL("/doctor", req.url));
        }

        // Admin specific routes
        if (path.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/user/:path*",
        "/doctor/:path*",
        "/admin/:path*",
        "/search/:path*",
        "/labs/:path*",
    ],
};
