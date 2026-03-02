"use client";
import BookingModal from "./BookingModal";
import { useState } from "react";
import { useLanguage } from "../ui/LanguageProvider";

export default function DoctorCard({ doctor }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    const primaryEstimate = doctor.treatmentEstimates?.[0];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden">
            {doctor.acceptsGovtSchemes && (
                <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {t("ayushman_eligible")}
                </div>
            )}

            <div className="flex items-center gap-4 mb-4 mt-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl uppercase shrink-0">
                    {doctor.user?.name ? doctor.user.name.charAt(0) : "Dr"}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{doctor.user?.name || "Anonymous Doctor"}</h3>
                    <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                    {doctor.verificationLevel === "FULL_CLINIC_VISIT" && (
                        <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            {t("locally_verified")}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("experience")}:</span>
                    <span className="font-medium text-gray-900">{doctor.experienceYears} {t("years")}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("consultation_fee")}:</span>
                    <span className="font-medium text-gray-900">₹{doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("location")}:</span>
                    <span className="font-medium text-gray-900">{doctor.location}{doctor.city ? `, ${doctor.city}` : ''}</span>
                </div>
            </div>

            {primaryEstimate && (
                <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm">
                    <p className="font-semibold text-gray-700 mb-2">{t("treatment_estimate")} ({primaryEstimate.procedureName})</p>
                    <div className="space-y-1 text-gray-600">
                        <div className="flex justify-between"><span>{t("consultation")}:</span> <span>₹{primaryEstimate.consultationFee}</span></div>
                        <div className="flex justify-between"><span>{t("approx_tests")}:</span> <span>₹{primaryEstimate.approxTestCost || 0}</span></div>
                        <div className="flex justify-between"><span>{t("approx_medicines")}:</span> <span>₹{primaryEstimate.approxMedCost || 0}</span></div>
                        <div className="flex justify-between font-bold text-gray-800 mt-1 pt-1 border-t"><span>{t("total_approx")}:</span> <span>₹{primaryEstimate.totalEstimate}</span></div>
                    </div>
                </div>
            )}

            <div className="mt-auto space-y-2">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 py-2 rounded-md font-semibold"
                >
                    {t("book_appointment")}
                </button>
                <button
                    onClick={() => alert("Calling clinic...")}
                    className="w-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200 py-2 rounded-md font-semibold flex items-center justify-center"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    {t("call_to_book")}
                </button>
            </div>

            {isModalOpen && (
                <BookingModal doctor={doctor} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}
