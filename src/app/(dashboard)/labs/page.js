"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LabCard from "../../../components/features/LabCard";
import { useLanguage } from "../../../components/ui/LanguageProvider";
import LanguageToggle from "../../../components/ui/LanguageToggle";

export default function LabsDashboard() {
    const { data: session } = useSession();
    const hasAyushmanCard = !!session?.user?.ayushmanCardNumber;

    const [labs, setLabs] = useState([]);
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();

    const fetchResults = async () => {
        setIsLoading(true);

        const effectiveMaxPrice = hasAyushmanCard ? maxPrice / 0.4 : maxPrice;

        let url = "/api/labs";
        const params = new URLSearchParams();
        if (specialty) params.append("query", specialty);
        if (location) params.append("location", location);
        if (minRating > 0) params.append("minRating", minRating);
        if (maxPrice < 2000) params.append("maxPrice", effectiveMaxPrice);
        if (params.toString()) url += `?${params.toString()}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (Array.isArray(data)) {
                setLabs(data);
            }
        } catch (error) {
            console.error("Failed to fetch labs", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Find a Lab</h1>
                    <LanguageToggle />
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            list="locations"
                            placeholder={t("location_placeholder")}
                            className="flex-1 rounded-md border border-gray-300 py-2 px-4 text-gray-900 focus:ring-blue-500 focus:border-blue-500 bg-white"
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

                        <div className="flex flex-1 rounded-md border border-gray-300 overflow-hidden bg-white">
                            <div className="bg-gray-100 border-r border-gray-300 px-4 py-2 text-gray-700 font-medium whitespace-nowrap">
                                Search Labs & Tests
                            </div>
                            <input
                                type="text"
                                list="lab-search-options"
                                placeholder="e.g., CBC, MRI Scan, Dengue..."
                                className={`flex-1 py-2 px-4 outline-none transition-colors ${!location ? "bg-gray-100 cursor-not-allowed text-gray-400 placeholder-gray-400" : "bg-white text-gray-900"}`}
                                value={specialty}
                                onChange={(e) => setSpecialty(e.target.value)}
                                disabled={!location}
                                title={!location ? "Please select a location first" : ""}
                            />
                        </div>

                        <datalist id="lab-search-options">
                            <option value="Complete Blood Count (CBC)" />
                            <option value="Blood Sugar (Fasting)" />
                            <option value="HbA1c (Glycated Hemoglobin)" />
                            <option value="Lipid Profile" />
                            <option value="Liver Function Test (LFT)" />
                            <option value="Kidney Function Test (KFT)" />
                            <option value="Thyroid Stimulating Hormone (TSH)" />
                            <option value="Vitamin D Test" />
                            <option value="Vitamin B12 Test" />
                            <option value="Urine Routine Examination" />
                            <option value="Dengue Test" />
                            <option value="Malaria Test" />
                            <option value="Typhoid Test (Widal Test)" />
                            <option value="COVID-19 RT-PCR Test" />
                            <option value="X-Ray Chest" />
                            <option value="Ultrasound Abdomen" />
                            <option value="CT Scan" />
                            <option value="MRI Scan" />
                            <option value="ECG (Electrocardiogram)" />
                            <option value="C-Reactive Protein (CRP)" />
                            <option value="Prostate Specific Antigen (PSA)" />
                            <option value="D-Dimer" />
                            <option value="Biopsy" />
                        </datalist>

                        <button
                            onClick={() => {
                                if (!location) {
                                    alert("Please select a location first!");
                                    document.getElementById("location-search-input")?.focus();
                                    return;
                                }
                                fetchResults();
                            }}
                            className={`px-6 py-2 rounded-md font-medium text-white transition-colors ${!location ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {t("search")}
                        </button>
                    </div>

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
                            <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Max Price: ₹{maxPrice === 2000 ? "Any" : maxPrice}</label>
                            <input
                                type="range"
                                min="200"
                                max="2000"
                                step="100"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-blue-600"
                            />
                        </div>
                    </div>
                </div>

                {/* List View */}
                {isLoading ? (
                    <p className="text-gray-500">{t("loading")}</p>
                ) : labs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {labs.map(lab => (
                            <LabCard key={lab.id} lab={lab} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No labs found.</p>
                )}
            </div>
        </div>
    );
}
