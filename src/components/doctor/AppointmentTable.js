"use client";
import { useState } from "react";

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    CONFIRMED: "bg-green-100 text-green-700 border border-green-300",
    CANCELLED: "bg-red-100 text-red-600 border border-red-200",
    COMPLETED: "bg-blue-100 text-blue-700 border border-blue-300",
};

export default function AppointmentTable({ appointments = [], onRefresh }) {
    const [loading, setLoading] = useState(null); // stores appointment id being acted on

    const handleAction = async (id, action) => {
        setLoading(id + action);
        try {
            const res = await fetch(`/api/doctor/appointments/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });
            const data = await res.json();
            if (data.success) {
                if (onRefresh) onRefresh();
            } else {
                alert(data.error || "Failed to update appointment.");
            }
        } catch (err) {
            alert("Something went wrong.");
        }
        setLoading(null);
    };

    if (appointments.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                <p className="text-4xl mb-3">📋</p>
                <p className="text-gray-400 font-medium">No appointments yet</p>
                <p className="text-gray-300 text-sm mt-1">Appointments booked by patients will appear here</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left py-4 px-5 font-semibold text-gray-600">Patient</th>
                            <th className="text-left py-4 px-5 font-semibold text-gray-600">Date</th>
                            <th className="text-left py-4 px-5 font-semibold text-gray-600">Time</th>
                            <th className="text-left py-4 px-5 font-semibold text-gray-600">Payment</th>
                            <th className="text-left py-4 px-5 font-semibold text-gray-600">Status</th>
                            <th className="text-left py-4 px-5 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {appointments.map((appt) => {
                            const patientName = appt.patient?.user?.name || "Unknown";
                            const patientEmail = appt.patient?.user?.email || "";
                            const dateStr = new Date(appt.date).toLocaleDateString("en-IN", {
                                day: "2-digit", month: "short", year: "numeric"
                            });

                            return (
                                <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                                                {patientName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{patientName}</p>
                                                <p className="text-gray-400 text-xs">{patientEmail}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-5 text-gray-700">{dateStr}</td>
                                    <td className="py-4 px-5 text-gray-700">{appt.startTime} – {appt.endTime}</td>
                                    <td className="py-4 px-5">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${appt.paymentStatus === "PAID" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                                            {appt.paymentStatus}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[appt.status] || "bg-gray-100 text-gray-600"}`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-5">
                                        {appt.status === "PENDING" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleAction(appt.id, "CONFIRMED")}
                                                    disabled={loading === appt.id + "CONFIRMED"}
                                                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {loading === appt.id + "CONFIRMED" ? "..." : "✓ Accept"}
                                                </button>
                                                <button
                                                    onClick={() => handleAction(appt.id, "CANCELLED")}
                                                    disabled={loading === appt.id + "CANCELLED"}
                                                    className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors"
                                                >
                                                    {loading === appt.id + "CANCELLED" ? "..." : "✗ Reject"}
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-300 text-xs italic">No action needed</span>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
