"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DoctorSidebar from "../../../../../components/doctor/Sidebar";

export default function DoctorPatientsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        if (status === "authenticated" && session?.user?.role !== "DOCTOR") router.push("/doctor");
    }, [status, session, router]);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("/api/doctor/appointments");
            const data = await res.json();
            if (data.success) {
                // Extract unique patients from appointments
                const appointments = data.data.appointments || [];
                const patientMap = new Map();

                appointments.forEach(appt => {
                    const p = appt.patient;
                    if (p && !patientMap.has(p.id)) {
                        patientMap.set(p.id, {
                            id: p.id,
                            name: p.user?.name,
                            email: p.user?.email,
                            lastVisit: appt.date,
                            totalAppointments: appointments.filter(a => a.patientId === p.id).length
                        });
                    }
                });

                setPatients(Array.from(patientMap.values()));
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

    if (status === "loading" || !session) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <DoctorSidebar doctorName={session?.user?.name} />

            <main className="ml-64 flex-1 p-8 text-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold">My Patients</h1>
                        <p className="text-gray-500 text-sm mt-1">Directory of patients who have consulted with you</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {isLoading ? (
                            <div className="p-12 text-center text-gray-400">Loading patients...</div>
                        ) : patients.length === 0 ? (
                            <div className="p-12 text-center text-gray-400">
                                <p className="text-4xl mb-3">👥</p>
                                <p>No patients found in your history.</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left py-4 px-6 font-semibold">Patient Name</th>
                                        <th className="text-left py-4 px-6 font-semibold">Email</th>
                                        <th className="text-left py-4 px-6 font-semibold">Total Visits</th>
                                        <th className="text-left py-4 px-6 font-semibold">Last Visit</th>
                                        <th className="text-right py-4 px-6 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {patients.map(patient => (
                                        <tr key={patient.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6 font-medium">{patient.name}</td>
                                            <td className="py-4 px-6 text-gray-500">{patient.email}</td>
                                            <td className="py-4 px-6 text-gray-500">{patient.totalAppointments}</td>
                                            <td className="py-4 px-6 text-gray-500">
                                                {new Date(patient.lastVisit).toLocaleDateString("en-IN")}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button className="text-blue-600 font-medium hover:underline">View History</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
