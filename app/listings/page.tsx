"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { FilterSidebar } from "@/components/listings/filter-sidebar";
import { PropertyCard } from "@/components/listings/property-card";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";
import { Pagination } from "@/components/ui/Pagination";
import { tenantService, type Listing } from "@/api/tenant.service";

export default function ListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await tenantService.searchListings(filters);
      let data: Listing[] = [];
      if (Array.isArray(response.listings)) {
        data = response.listings;
      } else if (Array.isArray((response as any).properties)) {
        // Map backend 'properties' to Listing interface
        data = (response as any).properties.map((p: any) => ({
          listing_id: p.id || p.listing_id || "",
          property_id: "", // Not provided
          landlord_user_id: "", // Not provided
          agent_user_id: null, // Not provided
          price: parseFloat(p.price_annual) || 0,
          status: "ACTIVE", // Default/fallback
          bedrooms: p.beds || 0,
          bathrooms: p.baths || 0,
          area_sqft: parseFloat(p.property_size) || 0,
          property_type: p.name || "",
          location: p.location || "",
          description: p.name || "",
          image: p.image || "",
          rating: p.rating || null,
          reviews: p.reviews || 0,
        }));
      }
      setListings(data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setListings([]); // Ensure it's always an array on error
    } finally {
      setLoading(false);
    }
  };

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
          <FilterSidebar onFilterChange={setFilters} />

          {/* Right Content - Property Listings */}
          <div className="flex-1">
            {/* Header with count and sorting */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-700 text-base">
                Showing {listings.length > 0 ? `1-${listings.length}` : "0"} of{" "}
                {listings.length} results
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
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-200 border-t-yellow-500"></div>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-600 text-lg mb-2">
                  No properties found
                </p>
                <p className="text-sm text-gray-400">
                  Try adjusting your search filters
                </p>
              </div>
            ) : (
              <div
                className={`${
                  viewMode === "grid"
                    ? "grid grid-cols-2 gap-6"
                    : "flex flex-col gap-6"
                } mb-8`}
              >
                {listings.map((listing) => (
                  <PropertyCard
                    key={listing.listing_id}
                    id={listing.listing_id.toString()}
                    title={
                      listing.description || `${listing.property_type} Property`
                    }
                    location={listing.location}
                    price={listing.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    beds={listing.bedrooms}
                    baths={listing.bathrooms}
                    sqft={listing.area_sqft}
                    type={listing.property_type}
                    image={listing.image || ""}
                    layout={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && listings.length > 0 && (
              <Pagination
                totalRows={listings.length}
                rowsPerPage={10}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
