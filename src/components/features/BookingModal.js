"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function BookingModal({ doctor, onClose }) {
    const { data: session } = useSession();
    const [date, setDate] = useState("");
    const [isBooking, setIsBooking] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState("");

    const handleBook = async (e) => {
        e.preventDefault();
        setIsBooking(true);
        setError("");

        try {
            // Parse datetime-local value into date and time parts
            const dt = new Date(date);
            const dateStr = dt.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const startHour = dt.getHours();
            const startMin = dt.getMinutes();
            const startTime = `${String(startHour).padStart(2, "0")}:${String(startMin).padStart(2, "0")}`;
            const endHour = startHour + 1 > 23 ? 23 : startHour + 1;
            const endTime = `${String(endHour).padStart(2, "0")}:${String(startMin).padStart(2, "0")}`;

            const res = await fetch("/api/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    doctorId: doctor.id,
                    date: dateStr,
                    startTime,
                    endTime,
                }),
            });

            const data = await res.json();

            if (data.success) {
                setIsBooked(true);
                setBookingDetails({ date: dateStr, startTime, endTime });
            } else {
                setError(data.error || "Failed to book appointment.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
        setIsBooking(false);
    };

    // ── Success Screen ─────────────────────────────────────
    if (isBooked) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Appointment Booked! 🎉</h2>
                    <p className="text-gray-500 text-sm mb-5">You'll receive a confirmation shortly.</p>

                    <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Doctor</span>
                            <span className="font-semibold text-gray-900">{doctor.user?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Specialty</span>
                            <span className="font-medium text-blue-600">{doctor.specialization}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date</span>
                            <span className="font-medium text-gray-900">{bookingDetails?.date}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Time</span>
                            <span className="font-medium text-gray-900">{bookingDetails?.startTime} – {bookingDetails?.endTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className="font-semibold text-yellow-600">Pending Confirmation</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    // ── Booking Form ───────────────────────────────────────
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
                </div>

                <div className="bg-blue-50 rounded-lg px-4 py-3 mb-6">
                    <p className="text-xs text-gray-400 mb-0.5">Booking consultation with</p>
                    <p className="font-bold text-gray-900">{doctor.user?.name}</p>
                    <p className="text-sm text-blue-600">{doctor.specialization} · ₹{doctor.consultationFee}</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2 mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleBook}>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            required
                            min={new Date().toISOString().slice(0, 16)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <p className="text-xs text-gray-400 mt-1">Appointment duration: 1 hour</p>
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
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-semibold"
                        >
                            {isBooking ? "Booking..." : "Confirm Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
