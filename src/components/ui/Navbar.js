"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    const isDoctor = session?.user?.role === "DOCTOR";

    return (
        <header className="bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] sticky top-0 z-50 border-b border-gray-100/50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex items-center gap-12 lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2.5 group">
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-2 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                            <span className="font-black text-xl">NH</span>
                        </div>
                        <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300">Nuero Health</span>
                    </Link>

                    <div className="hidden md:flex gap-x-8 text-[12px] font-bold uppercase tracking-widest text-slate-500">
                        <Link href="/" className="hover:text-blue-600 transition-all relative group py-2">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/doctor" className="hover:text-blue-600 transition-all relative group py-2">
                            Doctors
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/labs" className="hover:text-blue-600 transition-all relative group py-2">
                            Labs
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/caretakers" className="hover:text-blue-600 transition-all relative group py-2">
                            Caretakers
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                        <Link href="/equipment" className="hover:text-blue-600 transition-all relative group py-2">
                            Rentals
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-1 justify-end items-center gap-5">
                    {isDoctor && (
                        <Link href="/doctor/dashboard" className="hidden lg:flex items-center gap-2 text-[11px] font-black uppercase tracking-tighter rounded-full px-5 py-2.5 bg-slate-900 text-white hover:bg-black transition-all shadow-xl shadow-slate-200">
                            📊 My Dashboard
                        </Link>
                    )}

                    {session ? (
                        <Link href="/user/profile" className="flex items-center gap-2 text-sm font-bold rounded-full px-7 py-2.5 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95 shadow-lg shadow-blue-500/10">
                            Profile
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link href="/signup" className="hidden sm:block text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors">
                                Sign up
                            </Link>
                            <Link href="/login" className="text-sm font-bold rounded-full px-7 py-2.5 bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
