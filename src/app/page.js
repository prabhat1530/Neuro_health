import Link from "next/link";
import SearchBar from "../components/features/SearchBar";
import { LanguageToggle } from "../components/ui/LanguageToggle";
import HealthConcernsLinks from "../components/features/HealthConcernsLinks";
import SpecialtyLinks from "../components/features/SpecialtyLinks";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex items-center gap-8 lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded p-2 font-bold text-xl">NH</span>
              <span className="text-2xl font-bold tracking-tight text-blue-900">Nuero Health</span>
            </a>

            <div className="hidden lg:flex lg:gap-x-6 text-sm font-semibold leading-6 text-gray-700">
              <Link href="/patient" className="hover:text-blue-600">Find Doctors</Link>
              <a href="#" className="hover:text-blue-600">Video Consult</a>
              <a href="#" className="hover:text-blue-600">Medicines</a>
              <Link href="/patient/labs" className="hover:text-blue-600">Lab Tests</Link>
              <a href="#" className="hover:text-blue-600">Surgeries</a>
            </div>
          </div>

          <div className="flex flex-1 justify-end items-center gap-4">
            <Link href="/admin" className="hidden lg:block text-sm font-semibold border border-gray-300 rounded px-4 py-2 hover:bg-gray-50">
              For Providers
            </Link>
            <Link href="/login" className="text-sm font-semibold rounded px-4 py-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50">
              Login / Signup
            </Link>
          </div>
        </nav>
      </header>

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
