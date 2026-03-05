"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DoctorSidebar from "../../../../../components/doctor/Sidebar";

const initialDays = [
    { day: "Monday", slots: "09:00 AM - 05:00 PM", active: true },
    { day: "Tuesday", slots: "09:00 AM - 05:00 PM", active: true },
    { day: "Wednesday", slots: "09:00 AM - 05:00 PM", active: true },
    { day: "Thursday", slots: "09:00 AM - 05:00 PM", active: true },
    { day: "Friday", slots: "02:00 PM - 08:00 PM", active: true },
    { day: "Saturday", slots: "10:00 AM - 02:00 PM", active: true },
    { day: "Sunday", slots: "Closed", active: false },
];

export default function DoctorAvailabilityPage() {
    const { data: session } = useSession();
    const [days, setDays] = useState(initialDays);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <DoctorSidebar doctorName={session?.user?.name} />

            <main className="ml-64 flex-1 p-8 text-gray-900">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold font-heading">Clinic Availability</h1>
                        <p className="text-gray-500 text-sm mt-1">Configure your weekly working hours and slot durations.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-gray-800">Weekly Schedule</h2>
                            <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                Save Changes
                            </button>
                        </div>

                        <div className="space-y-4">
                            {days.map((d, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${d.active ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-400"}`}>
                                            {d.day.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{d.day}</p>
                                            <p className="text-xs text-gray-400">{d.active ? "Available" : "Unavailable"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className={`text-sm font-medium ${d.active ? "text-gray-700" : "text-gray-300"}`}>
                                            {d.slots}
                                        </span>
                                        <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-not-allowed">
                                            <div className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-all ${d.active ? "translate-x-6 bg-blue-600" : "bg-white"}`}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
