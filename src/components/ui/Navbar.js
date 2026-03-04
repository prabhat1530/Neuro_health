"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex items-center gap-8 lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                        <span className="bg-blue-600 text-white rounded p-2 font-bold text-xl">NH</span>
                        <span className="text-2xl font-bold tracking-tight text-blue-900">Nuero Health</span>
                    </Link>

                    <div className="flex gap-x-6 text-sm font-semibold leading-6 text-gray-700">
                        <Link href="/doctor" className="hover:text-blue-600">Find Doctors</Link>
                        <Link href="/labs" className="hover:text-blue-600">Lab Tests</Link>
                    </div>
                </div>

                <div className="flex flex-1 justify-end items-center gap-4">
                    <Link href="/admin" className="hidden lg:block text-sm font-semibold border border-gray-300 rounded px-4 py-2 hover:bg-gray-50">
                        For Providers
                    </Link>
                    {session ? (
                        <div className="flex gap-2">
                            <Link href="/user/profile" className="text-sm font-semibold rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                My Profile
                            </Link>
                        </div>
                    ) : (
                        <Link href="/login" className="text-sm font-semibold rounded px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
                            Login / Signup
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}
