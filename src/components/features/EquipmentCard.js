"use client";

const categoryIcons = {
    "Mobility": "🦽",
    "Respiratory": "💨",
    "Hospital Beds": "🛏️",
    "Diagnostic": "🩺",
};

const categoryColors = {
    "Mobility": "bg-blue-100 text-blue-700",
    "Respiratory": "bg-cyan-100 text-cyan-700",
    "Hospital Beds": "bg-purple-100 text-purple-700",
    "Diagnostic": "bg-orange-100 text-orange-700",
};

export default function EquipmentCard({ item }) {
    const icon = categoryIcons[item.category] || "🏥";
    const colorClass = categoryColors[item.category] || "bg-gray-100 text-gray-700";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden hover:shadow-lg transition-shadow">
            {/* Category Header */}
            <div className={`px-4 py-3 flex items-center gap-2 ${colorClass} bg-opacity-30`}>
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-bold uppercase tracking-wide">{item.category}</span>
                {item.isVerified && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Verified Vendor
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-1">
                {/* Title & Vendor */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{item.equipmentName}</h3>
                    <p className="text-sm text-gray-500">🏪 {item.vendorName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">📍 {item.city} — {item.address}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-gray-100">
                    <span className="text-yellow-400">★</span>
                    <span className="font-bold text-gray-900">{item.rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({item.reviewCount} reviews)</span>
                    {item.isAvailable ? (
                        <span className="ml-auto text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✓ Available</span>
                    ) : (
                        <span className="ml-auto text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Unavailable</span>
                    )}
                </div>

                {/* Description */}
                {item.description && (
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                )}

                {/* Pricing Grid */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-center text-sm">
                    <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-xs text-gray-400 font-medium">Daily</p>
                        <p className="font-bold text-gray-900">₹{item.dailyRate}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 ring-1 ring-blue-200">
                        <p className="text-xs text-blue-500 font-medium">Weekly</p>
                        <p className="font-bold text-blue-700">₹{item.weeklyRate}</p>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-2">
                        <p className="text-xs text-indigo-400 font-medium">Monthly</p>
                        <p className="font-bold text-indigo-700">₹{item.monthlyRate}</p>
                    </div>
                </div>

                <p className="text-xs text-gray-400 mb-3">
                    🔒 Refundable Deposit: <span className="font-medium text-gray-600">₹{item.depositAmount}</span>
                </p>

                {item.acceptsGovtSchemes && (
                    <div className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md mb-3">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Accepts Govt. Schemes (Ayushman Bharat)
                    </div>
                )}

                {/* Actions */}
                <div className="mt-auto space-y-2">
                    <button
                        onClick={() => alert(`Renting ${item.equipmentName} from ${item.vendorName} – booking feature coming soon!`)}
                        disabled={!item.isAvailable}
                        className={`w-full py-2 rounded-md font-semibold transition-colors duration-200 ${item.isAvailable
                            ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                    >
                        {item.isAvailable ? "Rent Equipment" : "Currently Unavailable"}
                    </button>
                    <button
                        onClick={() => alert("Calling vendor...")}
                        className="w-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200 py-2 rounded-md font-semibold flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        Call Vendor
                    </button>
                </div>
            </div>
        </div>
    );
}
