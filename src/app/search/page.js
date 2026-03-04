import { prisma } from "../../lib/prisma";
import Link from "next/link";
import SearchBar from "../../components/features/SearchBar";

export default async function SearchPage(props) {
    const searchParams = await props.searchParams;
    const location = searchParams?.location || "";
    const query = searchParams?.q || "";

    const buildSearchORs = (fieldPath, val) => {
        if (!val) return [];
        const lower = val.toLowerCase();
        const title = val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();

        if (fieldPath.includes('.')) {
            const [rel, field] = fieldPath.split('.');
            return [
                { [rel]: { [field]: { contains: val } } },
                { [rel]: { [field]: { contains: lower } } },
                { [rel]: { [field]: { contains: title } } }
            ];
        }

        return [
            { [fieldPath]: { contains: val } },
            { [fieldPath]: { contains: lower } },
            { [fieldPath]: { contains: title } }
        ];
    };

    const whereClause = { AND: [] };

    if (location) {
        whereClause.AND.push({ OR: buildSearchORs('city', location) });
    }

    if (query) {
        const { getSpecialtiesForQuery } = require("../../lib/symptomMapper");
        const mappedSpecialties = getSpecialtiesForQuery(query);
        const mappedORs = mappedSpecialties.flatMap(spec => buildSearchORs('specialization', spec));

        whereClause.AND.push({
            OR: [
                ...buildSearchORs('specialization', query),
                ...buildSearchORs('user.name', query),
                ...buildSearchORs('city', query),
                ...mappedORs
            ]
        });
    }

    // Prisma query
    const doctors = await prisma.doctor.findMany({
        where: whereClause.AND.length > 0 ? whereClause : {},
        include: {
            user: true
        }
    });

    return (
        <div className="bg-gray-50 min-h-screen text-gray-900 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                    <div className="flex items-center gap-8 lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <span className="bg-blue-600 text-white rounded p-2 font-bold text-xl">NH</span>
                            <span className="text-2xl font-bold tracking-tight text-blue-900">Nuero Health</span>
                        </Link>
                    </div>
                    <div className="flex-1 max-w-xl mx-4">
                        <SearchBar />
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <Link href="/login" className="text-sm font-semibold rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-500">
                            Login / Signup
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="mx-auto max-w-7xl p-4 lg:px-8 py-8">
                <h1 className="text-2xl font-bold mb-6">
                    {doctors.length} Doctors found for {query ? `"${query}"` : "any specialty"} in {location ? `"${location}"` : "any location"}
                </h1>

                <div className="flex flex-col gap-6 w-full lg:w-2/3">
                    {doctors.map(doctor => (
                        <div key={doctor.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">

                            {/* Doctor Image / Avatar */}
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                                <span className="text-blue-500 text-3xl font-bold">
                                    {doctor.user.name ? doctor.user.name.charAt(4) : "D"}
                                </span>
                            </div>

                            {/* Doctor Details */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-blue-600 mb-1">{doctor.user.name}</h2>
                                <p className="text-gray-600 text-sm mb-1">{doctor.specialization}</p>
                                <p className="text-gray-500 text-sm mb-3">{doctor.experienceYears} years experience overall</p>

                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800"><span className="text-xl inline-block mr-1">📍</span>{doctor.clinicAddress}, {doctor.city}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">₹{doctor.consultationFee}</p>
                                        <p className="text-xs text-gray-500">Consultation fee at clinic</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Verified</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:w-48 justify-end">
                                <p className="text-sm text-center text-green-600 font-semibold mb-2">Available Today</p>
                                <button className="w-full text-center text-blue-600 font-bold border border-blue-600 rounded py-2 hover:bg-blue-50 transition-colors text-sm">
                                    Video Consult
                                </button>
                                <button className="w-full text-center bg-blue-600 text-white font-bold rounded py-2 hover:bg-blue-500 transition-colors text-sm">
                                    Book Clinic Visit
                                </button>
                            </div>
                        </div>
                    ))}

                    {doctors.length === 0 && (
                        <div className="text-center bg-white rounded-lg p-12 border border-gray-100">
                            <span className="text-4xl mb-4 block">😔</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No doctors found</h3>
                            <p className="text-gray-600">Try changing your location or relaxing your search query.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
