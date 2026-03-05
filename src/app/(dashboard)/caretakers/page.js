"use client";
import { useState, useEffect } from "react";
import CaretakerCard from "../../../components/features/CaretakerCard";

const SPECIALIZATIONS = ["All", "Elderly Care", "Post-Surgery Care", "Child Care", "Palliative Care", "Dementia Care"];
const AVAILABILITIES = ["All", "Full-time", "Part-time", "On-call"];

export default function CaretakersDashboard() {
    const [caretakers, setCaretakers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");
    const [selectedAvailability, setSelectedAvailability] = useState("All");
    const [isLoading, setIsLoading] = useState(false);

    const fetchResults = async () => {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (location) params.append("location", location);
        if (searchQuery) params.append("query", searchQuery);
        if (selectedSpecialty !== "All") params.append("query", selectedSpecialty);
        if (minRating > 0) params.append("minRating", minRating);
        if (maxPrice < 2000) params.append("maxPrice", maxPrice);
        if (selectedAvailability !== "All") params.append("availability", selectedAvailability);

        try {
            const res = await fetch(`/api/caretakers?${params.toString()}`);
            const data = await res.json();
            if (data.success) {
                setCaretakers(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch caretakers", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Find a Verified Caretaker</h1>
                    <p className="text-gray-500 mt-1">Hire trusted, background-verified caretakers for elderly, post-surgery, or child care within your region.</p>
                </div>

                {/* Specialty Filter Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {SPECIALIZATIONS.map(spec => (
                        <button
                            key={spec}
                            onClick={() => setSelectedSpecialty(spec)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${selectedSpecialty === spec
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
                        >
                            {spec}
                        </button>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            list="locations"
                            placeholder="City (e.g. Delhi, Gurugram...)"
                            className="flex-1 rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            id="location-search-input"
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

                        <input
                            type="text"
                            placeholder="Search by name, specialization..."
                            className="flex-1 rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <select
                            className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 bg-white"
                            value={selectedAvailability}
                            onChange={(e) => setSelectedAvailability(e.target.value)}
                        >
                            {AVAILABILITIES.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>

                        <button
                            onClick={fetchResults}
                            className="px-6 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    {/* Sliders */}
                    <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Min Rating:</label>
                            <select
                                className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-900 bg-white"
                                value={minRating}
                                onChange={(e) => setMinRating(Number(e.target.value))}
                            >
                                <option value={0}>Any Rating</option>
                                <option value={3.5}>3.5+ Stars</option>
                                <option value={4.0}>4.0+ Stars</option>
                                <option value={4.5}>4.5+ Stars</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3 flex-1 max-w-sm">
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Max Daily Rate: ₹{maxPrice === 2000 ? "Any" : maxPrice}</label>
                            <input
                                type="range"
                                min="200"
                                max="2000"
                                step="100"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-indigo-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Results */}
                {isLoading ? (
                    <p className="text-gray-500 text-center py-12">Loading caretakers...</p>
                ) : caretakers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {caretakers.map(ct => (
                            <CaretakerCard key={ct.id} caretaker={ct} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-5xl mb-4">🔍</p>
                        <p className="text-lg font-medium">No caretakers found</p>
                        <p className="text-sm mt-1">Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>
        </div>
    );
}
