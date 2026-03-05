"use client";

const cards = [
    { key: "totalPatients", label: "Total Patients", icon: "👥", color: "from-blue-500 to-blue-700", sub: "All time" },
    { key: "todayCount", label: "Today's Appointments", icon: "📅", color: "from-green-500 to-green-700", sub: "Today" },
    { key: "upcomingCount", label: "Upcoming", icon: "🔔", color: "from-orange-500 to-orange-700", sub: "Scheduled" },
    { key: "monthlyEarnings", label: "Monthly Earnings", icon: "💰", color: "from-purple-500 to-purple-700", sub: "This month", prefix: "₹" },
];

export default function DashboardCards({ stats = {} }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            {cards.map((card) => (
                <div
                    key={card.key}
                    className={`bg-gradient-to-br ${card.color} rounded-2xl text-white p-5 shadow-lg flex flex-col gap-3 hover:scale-[1.02] transition-transform`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-3xl">{card.icon}</span>
                        <span className="text-xs bg-white/20 rounded-full px-2 py-1">{card.sub}</span>
                    </div>
                    <div>
                        <p className="text-3xl font-bold">
                            {card.prefix || ""}{stats[card.key] !== undefined ? stats[card.key].toLocaleString() : "—"}
                        </p>
                        <p className="text-sm text-white/80 mt-1">{card.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
