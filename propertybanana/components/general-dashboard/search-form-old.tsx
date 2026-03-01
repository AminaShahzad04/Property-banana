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

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* Tabs - Properties/Transactions */}
      <div className="bg-white rounded-2xl shadow-md px-1 py-1 inline-flex gap-0 mb-4">
        <button
          onClick={() => setActiveTab("properties")}
          className={`px-7 py-2.5 font-semibold text-sm transition-colors rounded-lg ${
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
          className={`px-7 py-2.5 font-semibold text-sm transition-colors rounded-lg ${
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
        <div className="grid grid-cols-4 gap-4">
          {/* Contract Type Dropdown */}
          <div className="relative">
            <select
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl appearance-none cursor-pointer outline-none text-gray-700 text-base bg-white"
            >
              <option>Contract Type</option>
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl appearance-none cursor-pointer outline-none text-gray-700 text-base bg-white"
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Land</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
            </div>
          </div>

          {/* Beds Dropdown */}
          <div className="relative">
            <select
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl appearance-none cursor-pointer outline-none text-gray-700 text-base bg-white"
            >
              <option>Beds</option>
              <option>1 Bed</option>
              <option>2 Beds</option>
              <option>3 Beds</option>
              <option>4+ Beds</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
            </div>
          </div>

          {/* Price Dropdown */}
          <div className="relative">
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-5 py-3 border border-gray-200 rounded-2xl appearance-none cursor-pointer outline-none text-gray-700 text-base bg-white"
            >
              <option>Price (AED)</option>
              <option>0 - 50,000</option>
              <option>50,000 - 100,000</option>
              <option>100,000 - 200,000</option>
              <option>200,000+</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
