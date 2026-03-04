"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SpecialtyLinks({ specialties }) {
    const searchParams = useSearchParams();
    const [locationUrlStr, setLocationUrlStr] = useState("");

    useEffect(() => {
        if (searchParams) {
            const loc = searchParams.get("location");
            if (loc) {
                setLocationUrlStr(`&location=${encodeURIComponent(loc)}`);
            } else {
                setLocationUrlStr("");
            }
        }

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {specialties.map((card, idx) => (
                <Link
                    href={`/search?q=${encodeURIComponent(card.q)}${locationUrlStr}`}
                    key={idx}
                    onClick={handleLinkClick}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer block"
                >
                    <div className="h-40 bg-gray-100 flex items-center justify-center text-6xl">
                        {card.img}
                    </div>
                    <div className="p-5">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{card.title}</h3>
                        <p className="text-sm text-gray-500">{card.desc}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
