"use client";

import { useState } from "react";

interface Props {
  search: string;
  setSearch: (v: string) => void;

  series: string;
  setSeries: (v: string) => void;

  type: string;
  setType: (v: string) => void;

  size: string;
  setSize: (v: string) => void;

  price: number;
  setPrice: (v: number) => void;

  seriesList: string[];
  typeList: string[];
  sizeList: string[];
}

export default function FilterSidebar({
  search,
  setSearch,
  series,
  setSeries,
  type,
  setType,
  size,
  setSize,
  price,
  setPrice,
  seriesList,
  typeList,
  sizeList,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Shared filter content
  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="font-semibold text-neutral-900 dark:text-neutral-100">
          Search
        </label>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[#E6E3DE] dark:border-gray-700 bg-white dark:bg-black p-2 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-shadow"
        />
      </div>

      {/* Series */}
      <div>
        <label className="font-semibold text-neutral-900 dark:text-neutral-100">
          Series
        </label>
        <select
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[#E6E3DE] dark:border-gray-700 bg-white dark:bg-black p-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none cursor-pointer"
        >
          {seriesList.map((item) => (
            <option key={item} className="dark:bg-black">
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label className="font-semibold text-neutral-900 dark:text-neutral-100">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[#E6E3DE] dark:border-gray-700 bg-white dark:bg-black p-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none cursor-pointer"
        >
          {typeList.map((item) => (
            <option key={item} className="dark:bg-black">
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div>
        <label className="font-semibold text-neutral-900 dark:text-neutral-100">
          Size
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="mt-2 w-full rounded-lg border border-[#E6E3DE] dark:border-gray-700 bg-white dark:bg-black p-2 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 appearance-none cursor-pointer"
        >
          {sizeList.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="font-semibold text-neutral-900 dark:text-neutral-100">
          Maximum Price
        </label>
        <input
          type="range"
          min={0}
          max={100000}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full mt-3 accent-violet-500 cursor-pointer"
        />
        <div className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          ৳{price.toLocaleString()}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ========== DESKTOP SIDEBAR ========== */}
      <aside className="hidden md:block border border-[#E6E3DE] dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-black shadow-sm h-fit sticky top-[30vh]">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-5 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-violet-500 after:rounded-full pb-1">
          Filters
        </h2>
        {filterContent}
      </aside>

      {/* ========== MOBILE FLOATING BUTTON ========== */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-violet-500 text-white rounded-full shadow-xl hover:bg-violet-600 active:scale-95 transition-all duration-200"
      >
        {/* Filter icon (sliders) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      </button>

      {/* ========== MOBILE BOTTOM SHEET OVERLAY ========== */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Sheet */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-black rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto p-6 transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Close button & title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 relative after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-violet-500 after:rounded-full pb-1">
              Filters
            </h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-neutral-700 dark:text-neutral-300"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {filterContent}
        </div>
      </div>
    </>
  );
}