"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";

function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get("role") === "doctor" ? "doctor" : "user";

    const [role, setRole] = useState(initialRole);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        ayushmanCardNumber: "",
        specialization: "",
    });

    const isDoctor = role === "doctor";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: isDoctor ? "DOCTOR" : "USER",
            ...(isDoctor ? {
                specialization: formData.specialization,
            } : {
                ayushmanCardNumber: formData.ayushmanCardNumber,
            })
        };

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();

            if (res.ok) {
                // Use standard signIn to established a persistent session
                await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    callbackUrl: isDoctor ? "/doctor/dashboard" : "/",
                    redirect: true,
                });
            } else {
                setError(data.error || "Signup failed. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel */}
            <div className={`hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white transition-colors duration-500 ${isDoctor ? "bg-gradient-to-br from-blue-900 to-blue-700" : "bg-gradient-to-br from-teal-600 to-cyan-500"}`}>
                <div className="text-center max-w-sm">
                    <div className="text-7xl mb-6">{isDoctor ? "🩺" : "❤️‍🩹"}</div>
                    <h2 className="text-3xl font-bold mb-4">
                        {isDoctor ? "Join as Doctor" : "Join as User"}
                    </h2>
                    <p className="text-white/80 text-lg">
                        {isDoctor
                            ? "Register your practice and start accepting appointments from patients across your region."
                            : "Create your account and connect with top doctors near you in minutes."}
                    </p>
                    <div className="mt-10 space-y-3 text-sm">
                        {isDoctor ? (
                            <>
                                <div className="bg-white/10 rounded-lg px-4 py-3">✅ Free to register</div>
                                <div className="bg-white/10 rounded-lg px-4 py-3">📋 Manage appointments from your dashboard</div>
                                <div className="bg-white/10 rounded-lg px-4 py-3">🔒 Verified doctor badge</div>
                            </>
                        ) : (
                            <>
                                <div className="bg-white/10 rounded-lg px-4 py-3">🆓 Free to join</div>
                                <div className="bg-white/10 rounded-lg px-4 py-3">💳 Ayushman Bharat card support</div>
                                <div className="bg-white/10 rounded-lg px-4 py-3">📱 Book in under 2 minutes</div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel – Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 overflow-y-auto">
                <div className="w-full max-w-md py-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            Neuro<span className={isDoctor ? "text-blue-600" : "text-teal-600"}>Health</span>
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">Create your account</p>
                    </div>

                    {/* Role Toggle */}
                    <div className="flex bg-gray-200 rounded-xl p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => { setRole("user"); setError(""); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "user" ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            ❤️‍🩹 User
                        </button>
                        <button
                            type="button"
                            onClick={() => { setRole("doctor"); setError(""); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "doctor" ? "bg-white text-blue-700 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                        >
                            🩺 Doctor
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h1 className="text-xl font-bold text-gray-900 mb-6">
                            {isDoctor ? "Doctor Registration" : "User Registration"}
                        </h1>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSignup} className="space-y-4">
                            {/* Common Fields */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input name="name" type="text" required placeholder={isDoctor ? "Dr. Full Name" : "Your Full Name"}
                                    value={formData.name} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input name="email" type="email" required placeholder={isDoctor ? "doctor@hospital.com" : "you@email.com"}
                                    value={formData.email} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input name="password" type="password" required placeholder="Create a strong password"
                                    value={formData.password} onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white" />
                            </div>

                            {/* Doctor-specific Fields */}
                            {isDoctor && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                        <select name="specialization" required value={formData.specialization} onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                                            <option value="">Select specialization</option>
                                            {["General Physician", "Cardiologist", "Dermatologist", "Gynecologist", "Pediatrician", "Orthopedist", "Neurologist", "Psychiatrist", "Dentist", "Ophthalmologist", "ENT Specialist", "Urologist"].map(s =>
                                                <option key={s} value={s}>{s}</option>
                                            )}
                                        </select>
                                    </div>
                                </>
                            )}

                            {/* Patient-specific Fields */}
                            {!isDoctor && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ayushman Bharat Card <span className="text-gray-400 font-normal">(optional)</span>
                                    </label>
                                    <input name="ayushmanCardNumber" type="text" placeholder="Card number for 60% discount on labs"
                                        value={formData.ayushmanCardNumber} onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 text-sm bg-white" />
                                </div>
                            )}

                            <button type="submit" disabled={isLoading}
                                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors mt-2 ${isDoctor ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300" : "bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300"
                                    }`}
                            >
                                {isDoctor ? "Create Doctor Account" : "Create User Account"}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Already have an account?{" "}
                            <Link href={`/login?role=${role}`} className={`font-semibold ${isDoctor ? "text-blue-600 hover:text-blue-700" : "text-teal-600 hover:text-teal-700"}`}>
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}>
            <SignupForm />
        </Suspense>
    );
}
