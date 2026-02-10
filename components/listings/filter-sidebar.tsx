"use client";

import { useState } from "react";

export function FilterSidebar() {
  const [propertyTypes, setPropertyTypes] = useState({
    all: true,
    house: false,
    flat: false,
    building: false,
    villa: false,
  });

  const [bedrooms, setBedrooms] = useState("any");
  const [bathrooms, setBathrooms] = useState("any");
  const [showOtherFeatures, setShowOtherFeatures] = useState(false);

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24 overflow-hidden">
      <h2 className="text-lg font-semibold mb-6 break-words">Find your home</h2>

      {/* Search Input */}

      <div className="flex items-center border border-black rounded-sm mb-6 px-4 py-3">
        <svg
          className="w-5 h-5 text-black mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="What are you looking for?"
          className="flex-1 min-w-0 outline-none text-black"
        />
      </div>

      {/* Property Type */}
      <div className="mb-6 pb-6">
        <h3 className="font-semibold text-md mb-3">Property Type</h3>
        <div className="space-y-3">
          {[
            { key: "all", label: "All" },
            { key: "house", label: "House" },
            { key: "flat", label: "Flat" },
            { key: "building", label: "Building" },
            { key: "villa", label: "Villa" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex text-black items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={propertyTypes[key as keyof typeof propertyTypes]}
                onChange={(e) =>
                  setPropertyTypes({
                    ...propertyTypes,
                    [key]: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded-lg border-black mr-3 accent-black"
              />
              <span className="text-black text-base break-words">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 ">
        <h3 className="font-semibold text-base mb-3">Price Range</h3>
        <div className="mb-4">
          <input type="range" className="w-full h-1.5 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Dhs 0"
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg text-base"
          />
          <span className="text-gray-500 flex-shrink-0 text-base">-</span>
          <input
            type="text"
            placeholder="Dhs 5,000,000"
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg text-base"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg mb-3">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {["any", "1", "2", "3", "4", "5+"].map((num) => (
            <button
              key={num}
              onClick={() => setBedrooms(num)}
              className={`px-3 py-2 border rounded-lg text-sm font-medium flex-shrink-0 ${
                bedrooms === num
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg mb-3">Bathrooms</h3>
        <div className="flex flex-wrap gap-2">
          {["any", "1", "2", "3", "4", "5"].map((num) => (
            <button
              key={num}
              onClick={() => setBathrooms(num)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium flex-shrink-0 ${
                bathrooms === num
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Square Feet */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg mb-3">Square Feet</h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Min."
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <span className="text-gray-500 flex-shrink-0">-</span>
          <input
            type="text"
            placeholder="Max"
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Year Built */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3">Year Built</h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="2019"
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <span className="text-gray-500 flex-shrink-0">-</span>
          <input
            type="text"
            placeholder="2022"
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Other Features */}
      <button
        onClick={() => setShowOtherFeatures(!showOtherFeatures)}
        className="flex items-center gap-2 mb-6 text-gray-700"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
        <span className="font-semibold">Other Features</span>
      </button>

      {/* Search Button */}
      <button
        className="w-full py-3 rounded-xl font-semibold text-base mb-4 flex items-center justify-center gap-2"
        style={{ backgroundColor: "#FBDE02" }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>

      {/* Footer Links */}
      <div className="flex items-center justify-between text-sm flex-wrap gap-2">
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="whitespace-nowrap">Reset all filters</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <span className="whitespace-nowrap">Save Search</span>
        </button>
      </div>
    </div>
  );
}
