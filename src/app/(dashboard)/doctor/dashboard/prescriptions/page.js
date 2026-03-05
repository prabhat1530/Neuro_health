"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import DoctorSidebar from "../../../../../components/doctor/Sidebar";

export default function DoctorPrescriptionsPage() {
    const { data: session } = useSession();
    const [prescriptions] = useState([
        { id: 1, patient: "Prabhat Kumar", date: "2026-03-05", meds: "Paracetamol, Cetirizine", status: "Sent" },
        { id: 2, patient: "Aryan Jandge", date: "2026-03-04", meds: "Amoxicillin", status: "Draft" },
    ]);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <DoctorSidebar doctorName={session?.user?.name} />

            <main className="ml-64 flex-1 p-8 text-gray-900">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold">Digital Prescriptions</h1>
                            <p className="text-gray-500 text-sm mt-1">Access and create post-consultation prescriptions.</p>
                        </div>
                        <button className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                            <span>➕</span> Create New
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {prescriptions.map(p => (
                            <div key={p.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center text-xl">💊</div>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${p.status === "Sent" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                                        {p.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-lg mb-1">{p.patient}</h3>
                                <p className="text-gray-400 text-xs mb-4">Issued on {new Date(p.date).toLocaleDateString()}</p>
                                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600 border border-gray-100">
                                    {p.meds}
                                </div>
                                <div className="mt-6 flex gap-3">
                                    <button className="flex-1 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">Download PDF</button>
                                    <button className="flex-1 py-2 border border-blue-100 text-blue-600 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
