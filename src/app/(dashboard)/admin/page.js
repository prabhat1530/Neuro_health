"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchPendingDoctors = async () => {
        setIsLoading(true);
        // Ideally this would be an admin-only API route
        try {
            const res = await fetch("/api/doctors"); // Simplified: fetch all and filter client side
            const data = await res.json();
            if (data.success) {
                // We filter for PENDING on the client just for MVP simplicity if API doesn't support query by status
                setDoctors(data.data.filter(d => d.status === "PENDING"));
            }
        } catch (error) {
            console.error("Failed to fetch", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPendingDoctors();
    }, []);

    const verifyDoctor = async (id) => {
        alert(`Doctor ${id} verified! (Needs API implementation)`);
        // In a real MVP, we'd hit /api/admin/doctors/[id]/verify PATCH
        setDoctors(doctors.filter(d => d.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6 border-b pb-4">Pending Doctor Verifications</h2>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : doctors.length > 0 ? (
                        <div className="space-y-4">
                            {doctors.map(doctor => (
                                <div key={doctor.id} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold">{doctor.user?.name || "Anonymous Doctor"}</h3>
                                            <p className="text-sm text-gray-600">MCI Reg: {doctor.mciRegNumber}</p>
                                            <p className="text-sm text-gray-600">Specialty: {doctor.specialization}</p>
                                            <p className="text-sm text-gray-600 mt-1">Requested Level: <span className="font-medium text-blue-600">{doctor.verificationLevel}</span></p>
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => verifyDoctor(doctor.id)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-medium"
                                            >
                                                Verify Doctor
                                            </button>
                                        </div>
                                    </div>

                                    {doctor.verificationLevel === "FULL_CLINIC_VISIT" && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-100">
                                            <h4 className="text-sm font-bold text-gray-800 mb-2">Submitted Clinic Documents / Photos</h4>
                                            <div className="flex gap-2">
                                                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Image 1</div>
                                                <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">Image 2</div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">Physical visit required to finalize verification.</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No pending doctor verifications at this time.</p>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
                    <h2 className="text-xl font-bold mb-6 border-b pb-4">Government Scheme Approvals (Patients)</h2>

                    <div className="space-y-4">
                        {/* Mock pending patient for MVP demonstration */}
                        <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h3 className="font-bold">Rajesh Kumar</h3>
                                <p className="text-sm text-gray-600">Scheme: Ayushman Bharat (PM-JAY)</p>
                                <p className="text-sm text-blue-600 cursor-pointer hover:underline">View Uploaded ID Card</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => alert("Patient Ayushman Bharat ID Verified!")}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Approve Scheme
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm italic">Showing simulated patient data for MVP.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
