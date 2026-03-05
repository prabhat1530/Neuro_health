"use client";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState("user"); // "user" | "doctor"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password. Please try again.");
            setIsLoading(false);
            return;
        }

        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        const dbRole = session?.user?.role;

        const wantsDoctor = role === "doctor";
        const isActuallyDoctor = dbRole === "DOCTOR";

        if (wantsDoctor && !isActuallyDoctor) {
            await signOut({ redirect: false });
            setError("This is not a doctor account. Please use the 'I'm a User' tab or sign up as a doctor.");
            setIsLoading(false);
            return;
        }

        if (!wantsDoctor && isActuallyDoctor) {
            await signOut({ redirect: false });
            setError("This is a doctor account. Please switch to the 'I'm a Doctor' tab.");
            setIsLoading(false);
            return;
        }

        if (isActuallyDoctor) {
            router.push("/doctor/dashboard");
        } else {
            router.push("/");
        }
        router.refresh();
    };

    const isDoctor = role === "doctor";

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Decorative */}
            <div className={`hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 text-white transition-colors duration-500 ${isDoctor ? "bg-gradient-to-br from-blue-900 to-blue-700" : "bg-gradient-to-br from-teal-600 to-cyan-500"}`}>
                <div className="text-center max-w-sm">
                    <div className="text-7xl mb-6">{isDoctor ? "🩺" : "❤️‍🩹"}</div>
                    <h2 className="text-3xl font-bold mb-4">
                        {isDoctor ? "Doctor Portal" : "User Portal"}
                    </h2>
                    <p className="text-white/80 text-lg">
                        {isDoctor
                            ? "Manage your appointments, patients, and practice – all in one place."
                            : "Find top doctors, book appointments, and manage your health journey."}
                    </p>
                    <div className="mt-10 space-y-3 text-left">
                        {isDoctor ? (
                            <>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 text-sm">✅ View and manage appointment requests</div>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 text-sm">📊 Track your monthly earnings</div>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 text-sm">⏰ Set your availability</div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 text-sm">🔍 Find verified doctors near you</div>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 text-sm">📅 Book appointments instantly</div>
                                <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3 text-sm">💊 Manage your health records</div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/" className="text-2xl font-bold text-gray-900">
                            Neuro<span className={isDoctor ? "text-blue-600" : "text-teal-600"}>Health</span>
                        </Link>
                        <p className="text-gray-400 text-sm mt-1">Welcome back</p>
                    </div>

                    {/* Role Toggle */}
                    <div className="flex bg-gray-200 rounded-xl p-1 mb-8">
                        <button
                            type="button"
                            onClick={() => { setRole("user"); setError(""); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "user"
                                ? "bg-white text-teal-700 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            ❤️‍🩹 I&apos;m a User
                        </button>
                        <button
                            type="button"
                            onClick={() => { setRole("doctor"); setError(""); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === "doctor"
                                ? "bg-white text-blue-700 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            🩺 I&apos;m a Doctor
                        </button>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h1 className="text-xl font-bold text-gray-900 mb-6">
                            {isDoctor ? "Doctor Login" : "User Login"}
                        </h1>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder={isDoctor ? "doctor@hospital.com" : "user@email.com"}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 focus:ring-2 focus:border-transparent focus:ring-blue-500 bg-white text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-4 text-gray-900 focus:ring-2 focus:border-transparent focus:ring-blue-500 bg-white text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors mt-2 ${isDoctor
                                    ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                                    : "bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300"
                                    }`}
                            >
                                {isLoading ? "Signing in..." : `Sign in as ${isDoctor ? "Doctor" : "User"}`}
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-6">
                            Don&apos;t have an account?{" "}
                            <Link
                                href={`/signup?role=${role}`}
                                className={`font-semibold ${isDoctor ? "text-blue-600 hover:text-blue-700" : "text-teal-600 hover:text-teal-700"}`}
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
