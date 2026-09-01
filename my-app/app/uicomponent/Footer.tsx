"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with your newsletter service
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#F8F7F4] dark:bg-[#18191D] border-t border-[#E6E3DE] dark:border-gray-700 transition-colors duration-300 mt-[9vh] z-20">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 bg-[#8B5CF6] text-white rounded-full shadow-lg hover:bg-[#7C3AED] transition-all duration-300 hover:-translate-y-1 active:scale-95"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl font-bold text-[#171717] dark:text-[#FAFAFA] tracking-tight">
                Otaku<span className="text-[#8B5CF6]">Vault</span>
              </div>
            </div>
            <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] max-w-xs md:max-w-md leading-relaxed mb-6">
              Premium anime figures &amp; collectibles. Authentic imports for the true collector.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a
                href="https://web.facebook.com/otakuvaultbd01"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E6E3DE] dark:border-gray-600 text-[#5F5F5F] dark:text-[#B0B0B0] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/otakuvaultbd/?hl=en"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E6E3DE] dark:border-gray-600 text-[#5F5F5F] dark:text-[#B0B0B0] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#E6E3DE] dark:border-gray-600 text-[#5F5F5F] dark:text-[#B0B0B0] hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#F7F5FF] dark:hover:bg-violet-900/20 transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-semibold text-[#171717] dark:text-[#FAFAFA] mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Figures", href: "/products" },
                { label: "Scale Figures", href: "/products?type=scale" },
                { label: "Nendoroids", href: "/products?type=nendoroid" },
                { label: "Figmas", href: "/products?type=figma" },
                { label: "Statues", href: "/products?type=statue" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold text-[#171717] dark:text-[#FAFAFA] mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/about" },
                { label: "Blog", href: "/about" },
                { label: "Careers", href: "/about" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] hover:text-[#8B5CF6] dark:hover:text-[#8B5CF6] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="font-semibold text-[#171717] dark:text-[#FAFAFA] mb-4">
              Join the Vault
            </h4>
            <p className="text-sm text-[#5F5F5F] dark:text-[#B0B0B0] mb-4">
              Get early access to limited drops and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-[#E6E3DE] dark:border-gray-600 bg-white dark:bg-black text-[#171717] dark:text-[#FAFAFA] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-shadow"
              />
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#8B5CF6] rounded-lg hover:bg-[#7C3AED] shadow-md shadow-violet-200/30 dark:shadow-violet-900/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E6E3DE] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9CA3AF] dark:text-[#6B7280] text-center sm:text-left">
            © {currentYear} OtakuVault. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-xs text-[#9CA3AF] dark:text-[#6B7280] hover:text-[#8B5CF6] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs text-[#9CA3AF] dark:text-[#6B7280] hover:text-[#8B5CF6] transition-colors"
            >
              Terms of Service
            </a>
          </div>
          {/* Premium badge — subtle bronze accent */}
          <div className="flex items-center gap-2 text-xs font-medium text-[#C1A68A] dark:text-[#C1A68A]">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Premium Quality
          </div>
        </div>
      </div>
    </footer>
  );
}