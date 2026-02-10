"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { FilterSidebar } from "@/components/listings/filter-sidebar";
import { PropertyCard } from "@/components/listings/property-card";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";
import { Pagination } from "@/components/ui/Pagination";

export default function ListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto  bg-gray-50 px-6 py-8 mt-20">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-lg font-bold text-center mb-2">Homes for Rent</h1>
          <p className="text-gray-600 ">Home / For Rent</p>
        </div>

        <div className="flex gap-6 mt-30">
          {/* Left Sidebar - Filters */}
          <FilterSidebar />

          {/* Right Content - Property Listings */}
          <div className="flex-1">
            {/* Header with count and sorting */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-700 text-base">
                Showing 1-3 of 3 results
              </p>

              <div className="flex items-center gap-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by</span>
                  <div className="relative">
                    <select className="pl-2  py-2 border-none text-sm  appearance-none bg-transparent cursor-pointer focus:outline-none">
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                    <svg
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
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

                <div className="h-6 w-px bg-gray-300 "></div>

                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${viewMode === "grid" ? "text-yellow-400" : "text-black"}`}
                >
                  Grid
                </button>
                <div className="h-6 w-px bg-gray-300 "></div>

                <button
                  onClick={() => setViewMode("list")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${viewMode === "list" ? "text-yellow-400" : "text-black"}`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Property Grid */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-6"
                  : "flex flex-col gap-6"
              } mb-8`}
            >
              <PropertyCard
                id="1"
                title="Peninsula One"
                location="Business Bay, Dubai, 00000"
                price="115,000.00"
                beds={1}
                baths={1}
                sqft={576}
                type="APARTMENT"
                image="/jumeirah.png"
                layout={viewMode}
              />
              <PropertyCard
                id="2"
                title="Expo Golf Villas"
                location="Emaar South, Dubai, 00000"
                price="120,000.00"
                beds={3}
                baths={4}
                sqft={1483}
                type="VILLA"
                image="/jumeirah.png"
                layout={viewMode}
              />
              <PropertyCard
                id="3"
                title="Mudon Al Ranim"
                location="Mudon, Dubai, 00000"
                price="280,000.00"
                beds={4}
                baths={4}
                sqft={5086}
                type="VILLA"
                image="/jumeirah.png"
                layout={viewMode}
              />
            </div>

            {/* Pagination */}
            <Pagination
              totalRows={3}
              rowsPerPage={3}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
