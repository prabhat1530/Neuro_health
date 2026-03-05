"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DoctorSidebar from "../../../../../components/doctor/Sidebar";
import AppointmentTable from "../../../../../components/doctor/AppointmentTable";

export default function DoctorAppointmentsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        if (status === "authenticated" && session?.user?.role !== "DOCTOR") router.push("/doctor");
    }, [status, session, router]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("/api/doctor/appointments");
            const data = await res.json();
            if (data.success) {
                setAppointments(data.data.appointments || []);
            }
        } catch (e) {
            console.error("Fetcher error:", e);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "DOCTOR") {
            fetchData();
        }
    }, [status, session, fetchData]);

    const filtered = appointments.filter(a => {
        if (activeTab === "pending") return a.status === "PENDING";
        if (activeTab === "confirmed") return a.status === "CONFIRMED";
        if (activeTab === "completed") return a.status === "COMPLETED";
        if (activeTab === "cancelled") return a.status === "CANCELLED";
        return true;
    });

    if (status === "loading" || !session) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <DoctorSidebar doctorName={session?.user?.name} />

            <main className="ml-64 flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Appointments Management</h1>
                            <p className="text-gray-500 text-sm mt-1">View and manage all your patient bookings</p>
                        </div>
                    </div>

                    <div className="mb-6 flex gap-2">
                        {["all", "pending", "confirmed", "completed", "cancelled"].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <AppointmentTable
                        appointments={filtered}
                        onRefresh={fetchData}
                    />
                </div>
            </main>
        </div>
    );
}
