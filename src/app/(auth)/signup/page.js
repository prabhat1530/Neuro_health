"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER", // "USER" or "DOCTOR"
        ayushmanCardNumber: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // Auto login after successful signup
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (!result.error) {
                    router.push(formData.role === "DOCTOR" ? "/doctor" : "/patient");
                    router.refresh();
                } else {
                    alert("Signed up, but login failed. Please go to login page.");
                }
            } else {
                alert(data.error || "Signup failed");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input id="name" name="name" type="text" required className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" required className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Email address" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" required className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="role" className="sr-only">Role</label>
                            <select id="role" name="role" className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" value={formData.role} onChange={handleChange}>
                                <option value="USER">Patient</option>
                                <option value="DOCTOR">Doctor</option>
                            </select>
                        </div>
                        {formData.role === "USER" && (
                            <div>
                                <label htmlFor="ayushmanCardNumber" className="sr-only">Ayushman Bharat Card Number (Optional)</label>
                                <input id="ayushmanCardNumber" name="ayushmanCardNumber" type="text" className="relative block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" placeholder="Ayushman Bharat Card Number (Optional for 60% off)" value={formData.ayushmanCardNumber || ""} onChange={handleChange} />
                            </div>
                        )}
                    </div>
                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign up</button>
                    </div>
                    <div className="text-sm text-center">
                        <span className="text-gray-500">Already have an account? </span>
                        <a href="/login" className="font-semibold text-green-600 hover:text-green-500">Log in</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
