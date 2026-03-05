import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Patient-only routes — doctors should NOT access these
const PATIENT_ROUTES = ["/labs", "/caretakers", "/equipment", "/user", "/search"];

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        const isDoctor = token?.role === "DOCTOR";

        // If a DOCTOR tries to visit patient-facing routes → send to their dashboard
        if (isDoctor) {
            // Allow /doctor/dashboard for doctors
            if (path.startsWith("/doctor/dashboard")) {
                return NextResponse.next();
            }
            // Block doctors from all patient routes
            for (const route of PATIENT_ROUTES) {
                if (path.startsWith(route)) {
                    return NextResponse.redirect(new URL("/doctor/dashboard", req.url));
                }
            }
        }

        // Doctor dashboard — patients/users cannot access
        if (path.startsWith("/doctor/dashboard") && !isDoctor) {
            return NextResponse.redirect(new URL("/doctor", req.url));
        }

        // Provider specific routes (Doctors only)
        if (path.startsWith("/provider") && !isDoctor) {
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
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;

                // ONLY allow the homepage to be public
                if (path === "/") {
                    return true;
                }

                // require token for every other route (/doctor, /labs, etc.)
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/user/:path*",
        "/doctor/:path*",
        "/provider/:path*",
        "/admin/:path*",
        "/search/:path*",
        "/labs/:path*",
        "/caretakers/:path*",
        "/equipment/:path*",
    ],
};
