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

        {/* Vision & Features Section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Why choose us</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need for your health, integrated into one place</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We're eliminating the friction between you and top-tier healthcare providers. Say goodbye to guesswork and hello to informed health decisions.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all overflow-hidden group">
                  <div className="h-48 overflow-hidden bg-blue-50">
                    <img src="/images/doctors.png" alt="Curated Network of Doctors" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-600/10 text-blue-600">
                        🩺
                      </div>
                      Curated Network of Doctors
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">Book in-clinic or video consultations with verified, highly-rated specialists. Filter by location and area of expertise to find the perfect match.</p>
                    </dd>
                  </div>
                </div>

                <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all overflow-hidden group">
                  <div className="h-48 overflow-hidden bg-indigo-50">
                    <img src="/images/labs.png" alt="Transparent Lab Pricing" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-600">
                        🔬
                      </div>
                      Transparent Lab Pricing
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">Search for individual diagnostic tests like CBC or MRI and immediately compare upfront pricing from accredited local laboratories.</p>
                    </dd>
                  </div>
                </div>

                <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 shadow-sm">Featured</span>
                  </div>
                  <div className="h-48 overflow-hidden bg-green-50">
                    <img src="/images/ayushman.png" alt="Ayushman Bharat Integrated" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                      <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-600/10 text-green-600">
                        💳
                      </div>
                      Ayushman Bharat Integrated
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">If you hold a valid Ayushman Bharat health card, our smart dynamic pricing engine automatically applies a 60% standard discount across all participating labs and clinics.</p>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="relative isolate overflow-hidden bg-blue-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to take control of your health?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-200">
                Join thousands of users who are already experiencing the most advanced and transparent healthcare platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/doctor" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform hover:scale-105">
                  Find Doctors Now
                </Link>
                <Link href="/signup" className="text-sm font-semibold leading-6 text-white hover:text-blue-200 transition-colors">
                  Register as a User <span aria-hidden="true">→</span>
                </Link>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
