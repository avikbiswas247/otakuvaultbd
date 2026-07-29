import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#F8F7F4] dark:bg-black transition-colors duration-300">
      {/* Hero Banner */}
      <header className="relative min-h-[350px] md:min-h-[450px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/about_store_showcase.png"
          alt="OtakuVaultBD Store Showcase"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,15,15,0.7)] via-[rgba(15,15,15,0.6)] to-[rgba(15,15,15,0.9)] dark:from-[rgba(0,0,0,0.7)] dark:via-[rgba(0,0,0,0.6)] dark:to-[rgba(0,0,0,0.9)]" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-md">
            About <span className="text-[#8B5CF6]">OTAKU VAULTBD</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium tracking-wide max-w-2xl mx-auto drop-shadow-sm">
            Bangladesh&apos;s Premier Authentic Anime Figure &amp; Premium Collectibles Store
          </p>
          <div className="w-20 h-1 bg-[#8B5CF6] mx-auto mt-6 rounded-full" />
        </div>
      </header>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-[#18191D] transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#C1A68A]/10 text-[#C1A68A] dark:text-[#C1A68A] font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded-full">
              Est. 2023
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171717] dark:text-[#FAFAFA]">
              Our Story
            </h2>
            <div className="w-12 h-1 bg-[#8B5CF6] rounded-full" />
            <p className="text-[#5F5F5F] dark:text-[#B0B0B0] leading-relaxed">
              Founded by passionate collectors for the anime community in Bangladesh,{" "}
              <strong>OtakuVaultBD</strong> started with a simple mission: to bridge the gap
              between premium Japanese figures and local fans. For years, collectors in Bangladesh
              struggled with high shipping costs, shipping damage, and the constant fear of
              counterfeit goods.
            </p>
            <p className="text-[#5F5F5F] dark:text-[#B0B0B0] leading-relaxed">
              We set out to change that by curating only 100% authentic, licensed figures directly
              from manufacturers in Japan. From high-fidelity PVC scale statues to poseable Figmas
              and cute Nendoroids, we stock Bangladesh&apos;s widest catalogue under one roof.
            </p>
            <p className="text-[#5F5F5F] dark:text-[#B0B0B0] leading-relaxed font-semibold text-[#171717] dark:text-[#FAFAFA]">
              Whether you are an experienced collector or starting your very first display,
              OtakuVaultBD is committed to bringing you the gold standard of collectibles,
              delivered securely to your doorstep.
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#8B5CF6]/5 rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-300" />
            <div className="relative rounded-3xl overflow-hidden border border-[#E6E3DE] dark:border-gray-700 shadow-xl aspect-square lg:aspect-auto lg:h-[500px]">
              <Image
                src="/images/about_store_showcase.png"
                alt="OtakuVaultBD Premium Showroom Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#F2EFEA] dark:bg-black border-t border-b border-[#E6E3DE] dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-[#171717] dark:text-[#FAFAFA]">
              Why Choose Us
            </h2>
            <p className="text-[#5F5F5F] dark:text-[#B0B0B0] text-sm">
              We provide an unmatched premium shopping experience for all anime enthusiasts in Bangladesh.
            </p>
            <div className="w-16 h-1 bg-[#8B5CF6] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "100% Authentic Only",
                desc: "Zero bootlegs. We source directly from official Japanese distributors (Good Smile Company, Kotobukiya, MegaHouse, Bandai).",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
              },
              {
                title: "Nationwide Delivery",
                desc: "Extra bubble-wrapped triple box packaging to guarantee your figure box arrives in mint collectors condition.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
              {
                title: "Best Price Guarantee",
                desc: "Fair pricing without hidden markups. We match global exchange rates to provide the most competitive prices in BD.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                ),
              },
              {
                title: "Secure Payments",
                desc: "Seamless instant checkouts using bKash, Nagad, SSLCommerz, Card Payments, and Cash on Delivery option.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-[#18191D] p-8 rounded-3xl border border-[#E6E3DE] dark:border-gray-700 shadow-sm transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1 hover:shadow-lg hover:border-[#8B5CF6]"
              >
                <div className="w-14 h-14 bg-[#F7F5FF] dark:bg-violet-900/20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#8B5CF6]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    {card.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#171717] dark:text-[#FAFAFA]">{card.title}</h3>
                <p className="text-[#5F5F5F] dark:text-[#B0B0B0] text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="py-20 bg-white dark:bg-[#18191D] transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-[#171717] dark:text-[#FAFAFA]">
                  Get In Touch
                </h2>
                <p className="text-[#5F5F5F] dark:text-[#B0B0B0] text-sm">
                  Have any queries about pre-orders, custom orders, or stock? Contact us!
                </p>
                <div className="w-12 h-1 bg-[#8B5CF6] rounded-full" />
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F5FF] dark:bg-violet-900/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#171717] dark:text-[#FAFAFA] text-sm">Official Support Email</h4>
                    <p className="text-[#5F5F5F] dark:text-[#B0B0B0] text-sm mt-0.5">support@otakuvaultbd.com</p>
                    <p className="text-[#9CA3AF] dark:text-[#6B7280] text-xs">Response within 12-24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F5FF] dark:bg-violet-900/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#171717] dark:text-[#FAFAFA] text-sm">Call or WhatsApp Support</h4>
                    <p className="text-[#5F5F5F] dark:text-[#B0B0B0] text-sm mt-0.5">+880 1712-345678</p>
                    <p className="text-[#9CA3AF] dark:text-[#6B7280] text-xs">Sat - Thu: 10:00 AM - 8:00 PM (GMT+6)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#F7F5FF] dark:bg-violet-900/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                    <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#171717] dark:text-[#FAFAFA] text-sm">Store Showroom Location</h4>
                    <p className="text-[#5F5F5F] dark:text-[#B0B0B0] text-sm mt-0.5">Plot 12, Road 4, Sector 4, Uttara</p>
                    <p className="text-[#9CA3AF] dark:text-[#6B7280] text-xs">Dhaka 1230, Bangladesh</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-[#E6E3DE] dark:border-gray-700">
                <h4 className="text-xs font-bold text-[#171717] dark:text-[#FAFAFA] uppercase tracking-widest mb-3">Accepted Payments</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 bg-[#e2136e]/10 text-[#e2136e] font-bold text-xs px-4 py-2 rounded-xl border border-[#e2136e]/20">
                    <span className="w-2.5 h-2.5 bg-[#e2136e] rounded-full" />
                    bKash Merchant
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#f64a1a]/10 text-[#f64a1a] font-bold text-xs px-4 py-2 rounded-xl border border-[#f64a1a]/20">
                    <span className="w-2.5 h-2.5 bg-[#f64a1a] rounded-full" />
                    Nagad
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#171717]/5 dark:bg-[#FAFAFA]/5 text-[#171717] dark:text-[#FAFAFA] font-bold text-xs px-4 py-2 rounded-xl border border-[#E6E3DE] dark:border-gray-600">
                    Visa / MasterCard
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-4 bg-[#8B5CF6]/5 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform duration-300" />
              <div className="relative bg-[#1a1a1a] dark:bg-black border border-[#E6E3DE] dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden min-h-[280px] md:h-[450px]">
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8 text-[#8B5CF6]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-white text-xl font-bold">Interactive Showroom Map</h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto">
                      Plot 12, Road 4, Sector 4, Uttara, Dhaka 1230. Drop in to witness our premium live collectibles glass vault showcase!
                    </p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
                  >
                    Open in Google Maps
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-[#1a1a1a] dark:bg-black border-t border-[#E6E3DE] dark:border-gray-700 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
          <h3 className="text-xl font-bold tracking-wide">Connect With Our Otaku Community</h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Join our communities on social channels to get instant update alerts on stock drops, pre-orders, and mega sales!
          </p>
          <div className="flex justify-center gap-6 pt-2">
            {[
              { href: "#", label: "Facebook", color: "hover:bg-[#1877f2]" },
              { href: "#", label: "Instagram", color: "hover:bg-[#e1306c]" },
              { href: "#", label: "YouTube", color: "hover:bg-[#ff0000]" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg text-white ${s.color}`}
                title={s.label}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {s.label === "Facebook" && (
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  )}
                  {s.label === "Instagram" && (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 6.333 0 6.741 0 12c0 5.259.014 5.668.072 6.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  )}
                  {s.label === "YouTube" && (
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}