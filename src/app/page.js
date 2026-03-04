"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "../components/features/SearchBar";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import HealthConcernsLinks from "../components/features/HealthConcernsLinks";
import SpecialtyLinks from "../components/features/SpecialtyLinks";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-white text-gray-900 font-sans">


      <main>
        {/* Search Hero Section */}
        <div className="bg-[#f0f4f7] py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance mb-6">
                Your home for health
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Find and Book Appointments with top doctors, clinic visits, and more.
              </p>

              {/* Client Component SearchBar */}
              <SearchBar />
            </div>

            <div className="w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-end">
              {/* Illustration placeholder */}
              <div className="bg-blue-100 rounded-2xl w-full max-w-lg aspect-auto relative overflow-hidden flex items-end justify-center">
                <img src="https://www.practostatic.com/consumer-home/desktop/images/1597423628/dweb_hero_banner.png" alt="Doctor Illustration" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Consult top doctors online for any health concern</h2>
          <p className="text-gray-600 mb-8">Private online consultations with verified doctors in all specialists</p>

          <HealthConcernsLinks categories={[
            { name: "Period doubts or Pregnancy", icon: "👩‍⚕️", q: "Gynecologist" },
            { name: "Acne, pimple or skin issues", icon: "🧴", q: "Dermatologist" },
            { name: "Performance issues in bed", icon: "💊", q: "General Physician" },
            { name: "Cold, cough or fever", icon: "🤧", q: "General Physician" },
            { name: "Child not feeling well", icon: "👶", q: "Pediatrician" },
            { name: "Depression or anxiety", icon: "🧠", q: "Psychiatrist" }
          ]} />
        </div>

        {/* Features / Value Prop */}
        <div className="bg-white border-t border-gray-100 py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Book an appointment for an in-clinic consultation</h2>
            <p className="text-gray-600 mb-8">Find experienced doctors across all specialties</p>

            <SpecialtyLinks specialties={[
              { title: "Dentist", desc: "Teething troubles? Schedule a dental checkup", img: "🦷", q: "Dentist" },
              { title: "Gynecologist/Obstetrician", desc: "Explore for women's health, pregnancy", img: "🤰", q: "Gynecologist" },
              { title: "Dietitian/Nutrition", desc: "Get guidance on eating right, weight management", img: "🥗", q: "Dietitian" },
              { title: "Physiotherapist", desc: "Pulled a muscle? Get it treated by a trained physiotherapist", img: "🏃‍♂️", q: "Physiotherapist" }
            ]} />
          </div>
        </div>
      </main>
    </div>
  );
}
