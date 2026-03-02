"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { FilterSidebar } from "@/components/listings/filter-sidebar";
import { PropertyCard } from "@/components/listings/property-card";
import { WhatsAppButton } from "@/components/general-dashboard/whatsapp-button";
import { Pagination } from "@/components/ui/Pagination";
import { listingService, type Listing } from "@/api/listing.service";
import { tenantService } from "@/api/tenant.service";
import { useAuth } from "@/hooks/useAuth";

// Extract numeric ID from strings like 'prop_2' ->'2'
const extractNumericId = (id: string): string => {
  const match = id.match(/\d+$/);
  return match ? match[0] : id;
};

export default function ListingsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;
  const { isAuthenticated } = useAuth();

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    fetchListings();
  }, [filters, currentPage, isAuthenticated]);

  const fetchListings = async () => {
    try {
      setLoading(true);

      // Map filters to the API query params
      const mappedFilters: any = {
        page: currentPage,
        limit: itemsPerPage,
      };

      if (filters) {
        if (filters.location) mappedFilters.location = filters.location;
        if (filters.property_type)
          mappedFilters.propertyType = filters.property_type;
        if (filters.bedrooms) mappedFilters.beds = filters.bedrooms;
        if (filters.bathrooms) mappedFilters.baths = filters.bathrooms;
        if (filters.price_min) mappedFilters.minPrice = filters.price_min;
        if (filters.price_max) mappedFilters.maxPrice = filters.price_max;
        if (filters.area_min) mappedFilters.minArea = filters.area_min;
        if (filters.area_max) mappedFilters.maxArea = filters.area_max;
      }

      // Use tenant endpoint if authenticated, public endpoint otherwise
      let response;
      if (isAuthenticated) {
        // Authenticated users: use tenant endpoint
        console.log("🔐 Using authenticated tenant endpoint");
        const tenantResponse =
          await tenantService.searchListings(mappedFilters);
        // Normalize tenant response to match public API structure
        response = {
          listings: tenantResponse.listings || [],
          total: tenantResponse.listings?.length || 0,
          page: currentPage,
          totalPages: Math.ceil(
            (tenantResponse.listings?.length || 0) / itemsPerPage,
          ),
        };
      } else {
        // Non-authenticated users: use public endpoint
        console.log("🌐 Using public listing endpoint");
        response = await listingService.searchListings(mappedFilters);
      }

      setListings(response.listings || []);
      setTotalResults(response.total || 0);
      setTotalPages(response.totalPages || 0);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setListings([]);
      setTotalResults(0);
      setTotalPages(0);
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
                Showing{" "}
                {totalResults > 0
                  ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalResults)}`
                  : "0"}{" "}
                of {totalResults} results
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
                  <a
                    href={`/book-tour/${extractNumericId(listing.listing_id.toString())}`}
                    style={{ textDecoration: "none" }}
                  >
                    <PropertyCard
                      key={listing.listing_id}
                      id={listing.listing_id.toString()}
                      title={
                        listing.description ||
                        `${listing.property_type} Property`
                      }
                      location={listing.location}
                      price={listing.price_annual.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      beds={listing.beds}
                      baths={listing.baths}
                      sqft={listing.property_size}
                      type={listing.property_type}
                      image={listing.image || ""}
                      layout={viewMode}
                    />
                  </a>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalResults > 0 && (
              <Pagination
                totalRows={totalResults}
                rowsPerPage={itemsPerPage}
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
