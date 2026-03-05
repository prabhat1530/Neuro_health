import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50 text-gray-900 font-sans min-h-screen">
      <main>
        {/* Modern Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100/20 pt-14">
          <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-50 sm:-mr-80 lg:-mr-96" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">
                Next Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Healthcare</span> Delivery.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  Nuero Health unifies doctors, labs, and patients into a seamless digital ecosystem. Experience transparent pricing, verified professionals, and instant bookings—all powered by an intelligent platform designed for modern India.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href="/doctor" className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all hover:scale-105">
                    Start Exploring
                  </Link>
                  <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-2 hover:text-blue-600 group">
                    Create your account <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl overflow-hidden sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36 shadow-2xl ring-1 ring-gray-900/10">
                <img src="/images/hero.png" alt="Modern healthcare consultation" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-slate-50 sm:h-32" />
        </div>

        {/* Premium Services Grid */}
        <div className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm">Our Integrated Ecosystem</h2>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">Comprehensive Solutions</p>
              <p className="mt-4 text-lg text-gray-500">Everything you need, from diagnosis to care, in one premium platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Find Doctors", desc: "Top specialists for every health concern.", icon: "🩺", link: "/doctor", color: "blue" },
                { title: "Lab Tests", desc: "Compare and book tests with home collection.", icon: "🔬", link: "/labs", color: "indigo" },
                { title: "Caretakers", desc: "Verified professional care at your doorstep.", icon: "🏠", link: "/caretakers", color: "teal" },
                { title: "Rent Equipment", desc: "Hospital-grade medical equipment for home.", icon: "♿", link: "/equipment", color: "purple" }
              ].map((service) => (
                <Link
                  key={service.title}
                  href={service.link}
                  className="group relative bg-slate-50 p-8 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${service.color}-100 flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Now <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Features Section */}
        <div className="py-24 sm:py-32 bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase tracking-wider">The Future of Health</h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Smart Healthcare for Modern India</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're eliminating the friction between you and top-tier healthcare providers. Say goodbye to guesswork and hello to informed health decisions.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="flex justify-center">
                <div className="flex flex-col bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 hover:shadow-2xl transition-all relative overflow-hidden group max-w-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100%] z-0 group-hover:w-40 group-hover:h-40 transition-all"></div>
                  <div className="absolute top-6 right-6 z-10">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">Digital India</span>
                  </div>
                  <dt className="relative z-10 flex items-center gap-x-4 text-xl font-bold leading-7 text-gray-900">
                    <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-200">
                      💳
                    </div>
                    Ayushman Smart Savings
                  </dt>
                  <dd className="relative z-10 mt-6 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">Integrated with PM-JAY. Hold a valid Ayushman card? Our system automatically deducts 60% of the cost at billing.</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-24 text-center shadow-2xl sm:rounded-[3rem] sm:px-16">
              <h2 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Experience Healthcare, Reimagined.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100 opacity-80">
                Join Nuero Health today and transform how you manage your family's health.
              </p>
              <div className="mt-12 flex items-center justify-center gap-x-8">
                <Link href="/signup" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-blue-900 shadow-xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-95">
                  Get Started Free
                </Link>
                <Link href="/provider" className="text-sm font-bold leading-6 text-white hover:text-blue-200 flex items-center gap-2">
                  Partner with us <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" aria-hidden="true">
          <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#3b82f6" />
              <stop offset={1} stopColor="#1e3a8a" />
            </radialGradient>
          </defs>
        </svg>
      </main>
    </div>
  );
}
