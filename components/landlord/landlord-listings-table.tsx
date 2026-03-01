"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { landlordService, Listing } from "@/api/landlord.service";

export function LandlordListingsTable() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await landlordService.getListings();
        setListings(data.listings);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
        setError("Failed to load listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Filter listings
  let filteredListings = listings.filter(
    (listing) =>
      listing.location.toLowerCase().includes(search.toLowerCase()) ||
      listing.property_type.toLowerCase().includes(search.toLowerCase()),
  );

  if (statusFilter !== "ALL") {
    filteredListings = filteredListings.filter(
      (listing) => listing.status === statusFilter,
    );
  }

  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const getStatusColor = (status: Listing["status"]) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "DRAFT":
        return "bg-gray-100 text-gray-700";
      case "PENDING_VERIFICATION":
        return "bg-yellow-100 text-yellow-700";
      case "RENTED":
        return "bg-blue-100 text-blue-700";
      case "INACTIVE":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "listing_id",
      header: "Listing ID",
      render: (row: Listing) => (
        <span className="font-semibold">#{row.listing_id}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "property_type",
      header: "Property Type",
      render: (row: Listing) => (
        <span className="text-gray-600 capitalize">{row.property_type}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "location",
      header: "Location",
      render: (row: Listing) => (
        <span className="text-gray-600">{row.location}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "details",
      header: "Details",
      render: (row: Listing) => (
        <div className="text-sm text-gray-600">
          {row.bedrooms} Bed • {row.bathrooms} Bath • {row.area_sqft} sqft
        </div>
      ),
      className: "px-6 py-4",
    },
    {
      key: "price",
      header: "Price",
      render: (row: Listing) => (
        <span className="font-semibold">AED {row.price.toLocaleString()}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: Listing) => (
        <span
          className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(row.status)}`}
        >
          {row.status.replace("_", " ")}
        </span>
      ),
      className: "px-6 py-4",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
          Add New Property
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by location or property type..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="ALL">All Statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="DRAFT">Draft</option>
          <option value="PENDING_VERIFICATION">Pending Verification</option>
          <option value="RENTED">Rented</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Empty State */}
      {listings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No listings found</p>
          <p className="text-sm text-gray-400">
            Add your first property to get started
          </p>
        </div>
      ) : (
        <>
          <Table columns={columns} data={paginatedListings} />
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalRows={filteredListings.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
