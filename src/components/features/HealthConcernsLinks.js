"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function HealthConcernsLinks({ categories }) {
    const searchParams = useSearchParams();
    const [locationUrlStr, setLocationUrlStr] = useState("");

    useEffect(() => {
        // Init from URL
        if (searchParams) {
            const loc = searchParams.get("location");
            if (loc) {
                setLocationUrlStr(`&location=${encodeURIComponent(loc)}`);
            } else {
                setLocationUrlStr("");
            }
        }

        // Listen for live typing from SearchBar
        const handleLocationChange = (e) => {
            const loc = e.detail;
            if (loc) {
                setLocationUrlStr(`&location=${encodeURIComponent(loc)}`);
            } else {
                setLocationUrlStr("");
            }
        };

        window.addEventListener("locationChanged", handleLocationChange);
        return () => window.removeEventListener("locationChanged", handleLocationChange);
    }, [searchParams]);

    const handleLinkClick = (e) => {
        if (!locationUrlStr) {
            e.preventDefault();
            alert("Please select a region (Location) from the search bar first before consulting a specialist!");

            // Highlight the location search bar to draw user attention
            const locationInput = document.querySelector('input[list="locations"]');
            if (locationInput) {
                locationInput.focus();
                locationInput.classList.add('ring-2', 'ring-red-500', 'transition-all');
                setTimeout(() => {
                    locationInput.classList.remove('ring-2', 'ring-red-500');
                }, 1500);
            }
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, idx) => (
                <Link
                    href={`/search?q=${encodeURIComponent(category.q)}${locationUrlStr}`}
                    key={idx}
                    onClick={handleLinkClick}
                    className="flex flex-col items-center p-4 rounded-xl cursor-pointer group hover:bg-gray-50 transition-colors"
                >
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-4xl mb-4 group-hover:bg-blue-100 transition-colors shadow-sm">
                        {category.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800 text-center">{category.name}</h3>
                    <p className="text-xs text-blue-600 mt-2 font-medium uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">Consult Now</p>
                </Link>
            ))}
        </div>
    );
}
