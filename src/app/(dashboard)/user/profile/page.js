"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            if (status === "authenticated") {
                try {
                    const res = await fetch("/api/user/profile");
                    const data = await res.json();
                    if (data.success) {
                        setProfileData(data.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch profile", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchProfile();
    }, [status]);

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Loading profile...</p>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
                <p className="text-red-500 font-medium">Failed to load profile data.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="bg-blue-600 px-6 py-8 flex justify-between items-start">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-4xl uppercase shadow-md">
                                {profileData.name.charAt(0)}
                            </div>
                            <div className="text-white">
                                <h1 className="text-3xl font-bold">{profileData.name}</h1>
                                <p className="text-blue-100 mt-1">{profileData.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                        >
                            Log Out
                        </button>
                    </div>

                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Account Details</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-600">Phone</span>
                                    <span className="font-medium text-gray-900">{profileData.phone || "Not provided"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-50 pb-2">
                                    <span className="text-gray-600">Account Type</span>
                                    <span className="font-medium text-gray-900 capitalize">{profileData.role.toLowerCase()}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Government Schemes</h3>
                            {profileData.ayushmanCardNumber ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-green-800 font-bold mb-1">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                        Ayushman Bharat Active
                                    </div>
                                    <p className="text-sm text-green-700">Card No: <span className="font-mono">{profileData.ayushmanCardNumber}</span></p>
                                    <p className="text-xs text-green-600 mt-2 font-medium">Eligible for 60% standard discount</p>
                                </div>
                            ) : (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                                    <p className="text-gray-500 text-sm">No Ayushman Bharat card linked</p>
                                    <button className="text-blue-600 text-sm font-medium mt-2 hover:underline">Link Card Now</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-xl font-bold text-gray-900">Your Appointments</h2>
                    </div>

                    <div className="p-6">
                        {profileData.appointments.length > 0 ? (
                            <div className="space-y-4">
                                {profileData.appointments.map((appointment) => {
                                    const dateObj = new Date(appointment.date);
                                    const formattedDate = dateObj.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

                                    return (
                                        <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors flex flex-col sm:flex-row gap-4 justify-between items-center">
                                            <div className="flex gap-4 items-center w-full sm:w-auto">
                                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex flex-col items-center justify-center shrink-0">
                                                    <span className="text-xs font-bold leading-none">{dateObj.getDate()}</span>
                                                    <span className="text-[10px] uppercase leading-none mt-1">{dateObj.toLocaleString('default', { month: 'short' })}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">Dr. {appointment.doctor.user.name}</h4>
                                                    <div className="flex gap-3 text-sm text-gray-500 mt-1">
                                                        <span className="flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> {appointment.startTime}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex sm:flex-col gap-3 sm:gap-1 items-center sm:items-end w-full sm:w-auto">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${appointment.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                    appointment.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {appointment.status}
                                                </span>
                                                <span className="text-sm font-medium text-gray-900">₹{appointment.paymentStatus === 'PAID' ? 'Paid' : 'To Pay'}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📅</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
                                <p className="text-gray-500 mb-6">You haven't booked any doctor consultations.</p>
                                <button onClick={() => router.push('/user')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Find a Doctor
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
