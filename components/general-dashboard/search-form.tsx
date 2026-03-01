"use client";

import { useState } from "react";

export function SearchForm() {
  const [activeTab, setActiveTab] = useState<"properties" | "transactions">(
    "properties",
  );
  const [searchType, setSearchType] = useState<"rent" | "buy">("rent");
  const [location, setLocation] = useState("Dubai");
  const [contractType, setContractType] = useState("Contract Type");
  const [propertyType, setPropertyType] = useState("Residential");
  const [beds, setBeds] = useState("Beds");
  const [price, setPrice] = useState("Price (AED)");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("Any");

  const handleSearch = () => {
    console.log({
      activeTab,
      searchType,
      location,
      contractType,
      propertyType,
      beds,
      price,
    });
  };

  const propertyTypes = [
    "Apartment",
    "Villa",
    "Townhouse",
    "Penthouse",
    "Villa Compound",
    "Residential Plot",
    "Residential Floor",
    "Residential Building",
    "Hotel Apartment",
  ];

  const bedOptions = ["Studio", "1", "2", "3", "4", "5", "6", "7+"];

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* Tabs - Properties/Transactions */}
      <div className="bg-white rounded-2xl shadow-md px-1 py-1 inline-flex gap-0 mb-4">
        <button
          onClick={() => setActiveTab("properties")}
          className={`px-5 py-1.5 font-semibold text-sm transition-colors rounded-lg ${
            activeTab === "properties" ? "text-gray-900" : "text-gray-400"
          }`}
          style={{
            backgroundColor:
              activeTab === "properties" ? "#FBDE02" : "transparent",
          }}
        >
          Properties
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-5 py-1.5 font-semibold text-sm transition-colors rounded-lg ${
            activeTab === "transactions" ? "text-gray-900" : "text-gray-400"
          }`}
          style={{
            backgroundColor:
              activeTab === "transactions" ? "#FBDE02" : "transparent",
          }}
        >
          Transactions
        </button>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Top Row - Rented, Location, Search Button */}
        <div className="flex gap-4 mb-6">
          {/* Rented Button */}
          <button
            className="px-8 py-3 rounded-2xl font-semibold text-sm transition-colors"
            style={{
              backgroundColor: "#FFF9E6",
              color: "#FBDE02",
            }}
            onClick={() => setSearchType("rent")}
          >
            Rented
          </button>

          {/* Location Input */}
          <div className="flex-1 flex items-center border border-gray-200 rounded-2xl px-5 py-3 bg-white">
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
            className="px-12 py-3 rounded-2xl font-semibold text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#FBDE02", color: "#000" }}
          >
            Search
          </button>
        </div>

        {/* Bottom Row - Filter Dropdowns */}
        <div className="grid grid-cols-4 gap-4 relative">
          {/* Contract Type Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "contract" ? null : "contract")
              }
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl cursor-pointer outline-none text-gray-700 text-base bg-white flex items-center justify-between"
            >
              <span>{contractType}</span>
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
          </div>

          {/* Property Type Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "property" ? null : "property")
              }
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl cursor-pointer outline-none text-gray-700 text-base bg-white flex items-center justify-between"
            >
              <span>{propertyType}</span>
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

            {openDropdown === "property" && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl p-4 z-50 grid grid-cols-3 gap-3 w-[520px]">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setPropertyType(type);
                      setOpenDropdown(null);
                    }}
                    className="px-4 py-2.5 border border-gray-200 rounded-2xl text-sm hover:border-gray-400 transition-colors text-gray-700"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
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
              <span>{price}</span>
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
              <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl p-5 z-50 w-[250px]">
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Minimum
                  </label>
                  <input
                    type="text"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl outline-none text-gray-700"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-2">
                    Maximum
                  </label>
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl outline-none text-gray-700"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setMinPrice("0");
                      setMaxPrice("Any");
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-2xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => {
                      setPrice(`${minPrice} - ${maxPrice}`);
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
