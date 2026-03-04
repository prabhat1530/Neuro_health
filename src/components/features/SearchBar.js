"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState("");
    const [query, setQuery] = useState("");

    // Initialize from URL and listen to changes from other SearchBars
    useEffect(() => {
        if (searchParams) {
            setLocation(searchParams.get("location") || "");
            setQuery(searchParams.get("q") || "");
        }

        const handleLocationChange = (e) => {
            setLocation(e.detail || "");
        };

        window.addEventListener('locationChanged', handleLocationChange);
        return () => window.removeEventListener('locationChanged', handleLocationChange);
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?location=${encodeURIComponent(location)}&q=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex w-full max-w-2xl bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden h-14">
            <div className="flex items-center border-r border-gray-200 px-4 w-1/3 min-w-[150px] bg-white">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <input
                    type="text"
                    list="locations"
                    placeholder="Location (e.g. Delhi)"
                    className="w-full outline-none text-gray-800 text-sm bg-transparent"
                    value={location}
                    onChange={(e) => {
                        const val = e.target.value;
                        setLocation(val);
                        if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent('locationChanged', { detail: val }));
                        }
                    }}
                />
                <datalist id="locations">
                    <option value="Delhi" />
                    <option value="Gurugram" />
                    <option value="Noida" />
                    <option value="Sonipat" />
                    <option value="Panipat" />
                    <option value="Faridabad" />
                    <option value="Rohtak" />
                </datalist>
            </div>
            <div className="flex items-center px-4 flex-1 bg-white relative">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                    type="text"
                    placeholder="Search doctors, clinics, hospitals, etc."
                    className="w-full outline-none text-gray-800 text-sm h-full"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="hidden">Search</button>
            </div>
        </form>
    );
}
