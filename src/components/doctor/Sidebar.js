"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
    { label: "Dashboard", href: "/doctor/dashboard", icon: "📊" },
    { label: "Appointments", href: "/doctor/dashboard/appointments", icon: "📅" },
    { label: "Patients", href: "/doctor/dashboard/patients", icon: "👥" },
    { label: "Availability", href: "/doctor/dashboard/availability", icon: "🕐" },
    { label: "Prescriptions", href: "/doctor/dashboard/prescriptions", icon: "💊" },
];

export default function DoctorSidebar({ doctorName, specialty }) {
    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white flex flex-col shadow-2xl z-20">
            {/* Brand */}
            <div className="px-6 py-6 border-b border-blue-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-lg font-bold">
                        {doctorName?.charAt(0) || "D"}
                    </div>
                    <div>
                        <p className="font-bold text-sm leading-tight">{doctorName || "Doctor"}</p>
                        <p className="text-blue-300 text-xs">{specialty || "Specialist"}</p>
                    </div>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-white text-blue-900 shadow-md"
                                : "text-blue-100 hover:bg-blue-700"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-blue-700">
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-900/40 transition-all"
                >
                    <span className="text-lg">🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}
