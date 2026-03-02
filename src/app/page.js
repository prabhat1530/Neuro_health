import Link from "next/link";
import { LanguageToggle } from "../components/ui/LanguageToggle"; // Actually we can just show in the header

export default function Home() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-lg p-2 font-bold text-xl">NH</span>
              <span className="text-xl font-bold tracking-tight text-gray-900">Nuero Health</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
                Affordable, Local, Subsidy-Aware Healthcare.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Connect deeply with top local doctors in your area. Compare treatment costs transparently, apply government schemes like Ayushman Bharat instantly, and book physical consultations with confidence.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/patient"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Find Local Doctors
                </Link>
                <Link href="/admin" className="text-sm font-semibold leading-6 text-gray-900">
                  Admin Verification Portal <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
