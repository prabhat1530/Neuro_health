"use client";

export default function CaretakerCard({ caretaker }) {
    const specialtyColors = {
        "Elderly Care": "bg-orange-100 text-orange-700",
        "Post-Surgery Care": "bg-blue-100 text-blue-700",
        "Child Care": "bg-pink-100 text-pink-700",
        "Palliative Care": "bg-purple-100 text-purple-700",
        "Dementia Care": "bg-teal-100 text-teal-700",
    };
    const colorClass = specialtyColors[caretaker.specialization] || "bg-gray-100 text-gray-700";

    const availabilityBadge = {
        "Full-time": "bg-green-100 text-green-700",
        "Part-time": "bg-yellow-100 text-yellow-700",
        "On-call": "bg-red-100 text-red-700",
    };
    const availBadge = availabilityBadge[caretaker.availability] || "bg-gray-100 text-gray-700";

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col h-full relative overflow-hidden hover:shadow-lg transition-shadow">
            {caretaker.isVerified && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    Verified
                </div>
            )}

            <div className="flex items-center gap-4 mb-4 mt-2">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-2xl uppercase shrink-0">
                    {caretaker.name.charAt(0)}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{caretaker.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
                        {caretaker.specialization}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">📍 {caretaker.city}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-bold text-gray-900">{caretaker.rating?.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({caretaker.reviewCount} reviews)</span>
                <span className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${availBadge}`}>
                    {caretaker.availability}
                </span>
            </div>

            <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Experience:</span>
                    <span className="font-medium text-gray-900">{caretaker.experienceYears} years</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Hourly Rate:</span>
                    <span className="font-medium text-gray-900">₹{caretaker.hourlyRate} / hr</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Daily Rate:</span>
                    <span className="font-bold text-blue-700">₹{caretaker.dailyRate} / day</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Languages:</span>
                    <span className="font-medium text-gray-900 text-right max-w-[60%]">{caretaker.languages}</span>
                </div>
                {caretaker.acceptsGovtSchemes && (
                    <div className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-md">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Accepts Govt. Schemes (Ayushman Bharat)
                    </div>
                )}
            </div>

            {caretaker.bio && (
                <p className="text-xs text-gray-500 italic mb-4 border-t pt-3 border-gray-100 line-clamp-3">
                    "{caretaker.bio}"
                </p>
            )}

            <div className="mt-auto space-y-2">
                <button
                    onClick={() => alert(`Booking ${caretaker.name} – feature coming soon!`)}
                    className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors duration-200 py-2 rounded-md font-semibold"
                >
                    Book Caretaker
                </button>
                <button
                    onClick={() => alert("Calling caretaker...")}
                    className="w-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200 py-2 rounded-md font-semibold flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call to Enquire
                </button>
            </div>
        </div>
    );
}
