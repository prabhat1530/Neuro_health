"use client";
import { useState } from "react";

export default function BookingModal({ doctor, onClose }) {
    const [date, setDate] = useState("");
    const [isBooking, setIsBooking] = useState(false);

    const handleBook = async (e) => {
        e.preventDefault();
        setIsBooking(true);
        try {
            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ doctorId: doctor.id, appointmentDate: date })
            });
            const data = await res.json();
            if (data.success) {
                alert("Appointment booked successfully!");
                onClose();
            } else {
                alert("Failed to book appointment: " + data.error);
            }
        } catch (error) {
            alert("An error occurred.");
        }
        setIsBooking(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
                </div>

                <div className="mb-6">
                    <p className="text-gray-600 mb-1">Booking consultation with</p>
                    <p className="font-bold text-lg text-gray-900">{doctor.user?.name}</p>
                    <p className="text-sm text-blue-600">{doctor.specialization}</p>
                </div>

                <form onSubmit={handleBook}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
                        <input
                            type="datetime-local"
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isBooking}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isBooking ? "Booking..." : "Confirm"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
