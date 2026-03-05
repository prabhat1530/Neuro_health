"use client";
import { useState, useEffect } from "react";
import EquipmentCard from "../../../components/features/EquipmentCard";

const CATEGORIES = ["All", "Mobility", "Respiratory", "Hospital Beds", "Diagnostic"];

const categoryIcons = {
    "All": "🏥",
    "Mobility": "🦽",
    "Respiratory": "💨",
    "Hospital Beds": "🛏️",
    "Diagnostic": "🩺",
};

export default function EquipmentDashboard() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(15000);
    const [availableOnly, setAvailableOnly] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchResults = async () => {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (location) params.append("location", location);
        if (searchQuery) params.append("query", searchQuery);
        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (minRating > 0) params.append("minRating", minRating);
        if (maxPrice < 15000) params.append("maxPrice", maxPrice);
        if (availableOnly) params.append("availableOnly", "true");

        try {
            const res = await fetch(`/api/equipment?${params.toString()}`);
            const data = await res.json();
            if (data.success) setItems(data.data);
        } catch (error) {
            console.error("Failed to fetch equipment", error);
        }
        setIsLoading(false);
    };

    useEffect(() => { fetchResults(); }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Rent Medical Equipment</h1>
                    <p className="text-gray-500 mt-1">Hire verified medical equipment like wheelchairs, oxygen concentrators, hospital beds & more — near you, at transparent rates.</p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border ${selectedCategory === cat
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-white text-gray-600 border-gray-300 hover:border-indigo-400"}`}
                        >
                            <span>{categoryIcons[cat]}</span> {cat}
                        </button>
                    ))}
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            list="locations"
                            placeholder="City (e.g. Delhi, Noida...)"
                            className="flex-1 rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <datalist id="locations">
                            {["Delhi", "Gurugram", "Noida", "Sonipat", "Panipat", "Faridabad", "Rohtak"].map(c => <option key={c} value={c} />)}
                        </datalist>

                        <input
                            type="text"
                            placeholder="Search equipment (e.g. Wheelchair, BiPAP...)"
                            className="flex-1 rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <button
                            onClick={fetchResults}
                            className="px-6 py-2 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        >
                            Search
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-gray-100 items-center">
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
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Max Monthly Rate: ₹{maxPrice === 15000 ? "Any" : maxPrice}</label>
                            <input type="range" min="500" max="15000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-indigo-600" />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
                            <span className="text-sm font-medium text-gray-700">Available only</span>
                        </label>
                    </div>
                </div>

                {/* Results */}
                {isLoading ? (
                    <p className="text-gray-500 text-center py-12">Loading equipment listings...</p>
                ) : items.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(item => <EquipmentCard key={item.id} item={item} />)}
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-5xl mb-4">🔍</p>
                        <p className="text-lg font-medium">No equipment found</p>
                        <p className="text-sm mt-1">Try adjusting your filters or category</p>
                    </div>
                )}
            </div>
        </div>
    );
}
