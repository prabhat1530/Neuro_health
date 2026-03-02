"use client";
import { useState, useEffect } from "react";
import DoctorCard from "../../../components/features/DoctorCard";
import { useLanguage } from "../../../components/ui/LanguageProvider";
import LanguageToggle from "../../../components/ui/LanguageToggle";

export default function PatientDashboard() {
    const [doctors, setDoctors] = useState([]);
    const [specialty, setSpecialty] = useState("");
    const [location, setLocation] = useState("");
    const [city, setCity] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();

    const fetchDoctors = async () => {
        setIsLoading(true);
        let url = "/api/doctors";
        const params = new URLSearchParams();
        if (specialty) params.append("specialty", specialty);
        if (location) params.append("location", location);
        if (city) params.append("city", city);
        if (params.toString()) url += `?${params.toString()}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.success) {
                setDoctors(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch doctors", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{t("find_doctor")}</h1>
                    <LanguageToggle />
                </div>

                {/* Search & Filter */}
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8 flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder={t("specialty_placeholder")}
                        className="flex-1 rounded-md border border-gray-300 py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={t("city_placeholder")}
                        className="w-48 rounded-md border border-gray-300 py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={t("location_placeholder")}
                        className="flex-1 rounded-md border border-gray-300 py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        onClick={fetchDoctors}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700"
                    >
                        {t("search")}
                    </button>
                </div>

                {/* Doctor List */}
                {isLoading ? (
                    <p className="text-gray-500">{t("loading")}</p>
                ) : doctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map(doctor => (
                            <DoctorCard key={doctor.id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">{t("no_doctors")}</p>
                )}
            </div>
        </div>
    );
}
