"use client";

import { useState } from "react";

export function SearchForm() {
  const [location, setLocation] = useState("Dubai");
  const [beds, setBeds] = useState("Beds");
  const [price, setPrice] = useState("Price (AED)");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(500000);

  const handleSearch = () => {
    console.log({
      searchType: "rent",
      location,
      contractType: "Yearly",
      propertyType: "Residential",
      beds,
      priceRange: `0 - ${maxPrice}`,
    });
  };

  const bedOptions = ["Studio", "1", "2", "3", "4", "5", "6", "7+"];

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* Search Form */}
      <div className="bg-white rounded-sm shadow-lg p-6">
        {/* Top Row - Rent (constant), Location, Search Button */}
        <div className="flex gap-4 mb-6">
          {/* Rent Label - Static */}
          <div
            className="px-8 py-3 rounded-[2px] font-semibold text-sm flex items-center justify-center"
            style={{
              backgroundColor: "#FFF9E6",
              color: "#FBDE02",
            }}
          >
            Rent
          </div>

          {/* Location Input */}
          <div className="flex-1 flex items-center border border-gray-200 rounded-sm px-5 py-3 bg-white">
            <svg
              className="w-5 h-5 text-gray-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1 outline-none text-gray-700 text-base bg-transparent"
              placeholder="Enter location"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="px-12 py-3 rounded-sm font-semibold text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#FBDE02", color: "#000" }}
          >
            Search
          </button>
        </div>

        {/* Bottom Row - Filter Dropdowns */}
        <div className="grid grid-cols-4 gap-4 relative">
          {/* Yearly - Static */}
          <div className="px-5 py-3 border border-gray-200 rounded-2xl text-gray-700 text-base bg-white flex items-center">
            Yearly
          </div>

          {/* Residential - Static */}
          <div className="px-5 py-3 border border-gray-200 rounded-2xl text-gray-700 text-base bg-white flex items-center">
            Residential
          </div>

          {/* Beds Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "beds" ? null : "beds")
              }
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl cursor-pointer outline-none text-gray-700 text-base bg-white flex items-center justify-between"
            >
              <span>{beds}</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === "beds" && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-4 z-50 grid grid-cols-4 gap-3 w-[350px]">
                {bedOptions.map((bed) => (
                  <button
                    key={bed}
                    onClick={() => {
                      setBeds(bed);
                      setOpenDropdown(null);
                    }}
                    className="px-4 py-2.5 border border-gray-200 rounded-2xl text-sm hover:border-gray-400 transition-colors text-gray-700"
                  >
                    {bed}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "price" ? null : "price")
              }
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl cursor-pointer outline-none text-gray-700 text-base bg-white flex items-center justify-between"
            >
              <span>Range</span>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openDropdown === "price" && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl p-5 z-50 w-[320px]">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-700">
                      AED 0
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      AED {maxPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="relative pt-2 pb-4">
                    <div className="relative h-2 bg-gray-200 rounded-lg">
                      <div
                        className="absolute h-2 rounded-lg"
                        style={{
                          backgroundColor: "#FBDE02",
                          left: "0%",
                          right: `${100 - (maxPrice / 500000) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500000"
                      step="5000"
                      value={maxPrice}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        setMaxPrice(value);
                      }}
                      className="absolute w-full h-2 top-2 bg-transparent appearance-none cursor-pointer pointer-events-auto"
                      style={{
                        zIndex: 4,
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMaxPrice(500000);
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setPrice(`0 - ${maxPrice.toLocaleString()}`);
                      setOpenDropdown(null);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "#FBDE02", color: "#000" }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
