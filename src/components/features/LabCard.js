"use client";
import { useState } from "react";
import { useLanguage } from "../ui/LanguageProvider";
import { useSession } from "next-auth/react";

export default function LabCard({ lab }) {
    const { t } = useLanguage();
    const { data: session } = useSession();

    const hasAyushmanCard = !!session?.user?.ayushmanCardNumber;
    const discountRate = hasAyushmanCard ? 0.4 : 1;

    const specificTest = lab.tests && lab.tests.length > 0 ? lab.tests[0] : null;
    const displayPrice = specificTest ? specificTest.price : lab.basePrice;
    const displayTestName = specificTest ? specificTest.testName : "Base Price";

    const displayFee = (displayPrice * discountRate).toFixed(0);

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden">
            {hasAyushmanCard && (
                <div className="absolute top-0 right-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Ayushman Active (60% OFF)
                </div>
            )}

            <div className="flex items-center gap-4 mb-4 mt-2">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl uppercase shrink-0">
                    🔬
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{lab.labName}</h3>
                    <p className="text-xs text-green-600 font-medium flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        NABL Accredited
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1 mb-4 pb-2 border-b border-gray-100">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-bold text-gray-900">{lab.rating?.toFixed(1) || "New"}</span>
                <span className="text-gray-500 text-sm ml-1">({lab.reviewCount || 0} reviews)</span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex text-sm w-full">
                    <span className="text-gray-500 w-1/3 pr-2 break-words">{displayTestName}:</span>
                    <span className="font-medium text-gray-900 w-2/3 text-right">
                        {hasAyushmanCard ? (
                            <div className="flex flex-col items-end">
                                <span className="line-through text-gray-400 text-xs">₹{displayPrice}</span>
                                <span className="text-green-600 font-bold">₹{displayFee} <span className="text-[10px] ml-1 px-1 bg-green-100 rounded-sm w-max">60% OFF</span></span>
                            </div>
                        ) : (
                            <span>₹{displayPrice}</span>
                        )}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t("location")}:</span>
                    <span className="font-medium text-gray-900">{lab.city}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Address:</span>
                    <span className="font-medium text-gray-900 text-right w-2/3 truncate">{lab.address}</span>
                </div>
            </div>

            <div className="mt-auto space-y-2">
                <button
                    onClick={() => alert("Booking Test...")}
                    className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 py-2 rounded-md font-semibold"
                >
                    Book Test
                </button>
            </div>
        </div>
    );
}
