"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DoctorSidebar from "../../../../components/doctor/Sidebar";
import DashboardCards from "../../../../components/doctor/DashboardCards";
import AppointmentTable from "../../../../components/doctor/AppointmentTable";

export default function DoctorDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dashData, setDashData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("all");
    const [lastRefresh, setLastRefresh] = useState(null);

    // Role guard
    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        if (status === "authenticated" && session?.user?.role !== "DOCTOR") router.push("/doctor");
    }, [status, session, router]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("/api/doctor/appointments");
            const data = await res.json();
            if (data.success) {
                setDashData(data.data);
                setLastRefresh(new Date());
            }
        } catch (e) {
            console.error("Dashboard fetch error:", e);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "DOCTOR") {
            fetchData();
            // Auto-refresh every 30s to pick up new bookings
            const interval = setInterval(fetchData, 30000);
            return () => clearInterval(interval);
        }
    }, [status, session, fetchData]);

    if (status === "loading" || (status === "authenticated" && session?.user?.role !== "DOCTOR")) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    const appointments = dashData?.appointments || [];
    const stats = dashData?.stats || {};
    const doctor = dashData?.doctor || {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const filteredAppointments = appointments.filter(a => {
        if (activeTab === "today") {
            const d = new Date(a.date);
            return d >= today && d < tomorrow;
        }
        if (activeTab === "pending") return a.status === "PENDING";
        if (activeTab === "confirmed") return a.status === "CONFIRMED";
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <DoctorSidebar
                doctorName={session?.user?.name}
                specialty={doctor.specialization}
            />

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 min-h-screen">
                {/* Top Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {session?.user?.name?.split(" ")[0]}! 👋
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            {lastRefresh && <span className="ml-3 text-green-500">● Live</span>}
                        </p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 shadow-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Refresh
                    </button>
                </div>

                {/* Stats Cards */}
                {isLoading ? (
                    <div className="grid grid-cols-4 gap-5 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <DashboardCards stats={stats} />
                )}

                {/* Appointment Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100" id="appointments">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Appointments</h2>
                            <p className="text-sm text-gray-400">Click Accept or Reject to manage booking requests</p>
                        </div>
                        {/* Filter Tabs */}
                        <div className="sm:ml-auto flex gap-2 flex-wrap">
                            {[
                                { key: "all", label: "All" },
                                { key: "pending", label: "⏳ Pending" },
                                { key: "today", label: "📅 Today" },
                                { key: "confirmed", label: "✓ Confirmed" },
                            ].map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === tab.key
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {tab.label}
                                    {tab.key === "pending" && stats.pendingCount > 0 && (
                                        <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                            {appointments.filter(a => a.status === "PENDING").length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {isLoading ? (
                            <div className="space-y-3">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <AppointmentTable appointments={filteredAppointments} onRefresh={fetchData} />
                        )}
                    </div>
                </div>

                {/* Clinic Info Card */}
                {doctor.clinicName && (
                    <div className="mt-6 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">🏥 My Clinic</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400">Clinic Name</p>
                                <p className="font-semibold text-gray-900">{doctor.clinicName}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">City</p>
                                <p className="font-semibold text-gray-900">{doctor.city}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Consultation Fee</p>
                                <p className="font-semibold text-gray-900">₹{doctor.consultationFee}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Experience</p>
                                <p className="font-semibold text-gray-900">{doctor.experienceYears} years</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
