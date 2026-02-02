"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { FilterSidebar } from "@/components/listings/filter-sidebar";
import { PropertyCard } from "@/components/listings/property-card";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";
import { Pagination } from "@/components/ui/Pagination";

export default function ListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-6 py-8 mt-20">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <FilterSidebar />

          {/* Right Content - Property Listings */}
          <div className="flex-1">
            {/* Header with count and sorting */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-700 text-base">
                Showing 1-3 of 3 results
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by</span>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold bg-gray-900 text-white">
                    Grid
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <PropertyCard
                id="1"
                title="Building 1"
                location="DHA2, Dubai, 00000"
                price="225,000.00"
                beds={4}
                baths={3}
                sqft={4000}
                type="APARTMENT"
                image="/jumeirah.png"
              />
              <PropertyCard
                id="2"
                title="Building1"
                location="DHA, Dubai, 00000"
                price="255,000.00"
                beds={4}
                baths={3}
                sqft={2000}
                type="APARTMENT"
                image="/jumeirah.png"
              />
              <PropertyCard
                id="3"
                title="Mosela Waterside Residences - The Views"
                location="Greens, Dubai, 00000"
                price="85,000.00"
                beds={1}
                baths={2}
                sqft={800}
                type="FLAT"
                image="/jumeirah.png"
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
