"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { tenantService, Bid } from "@/api/tenant.service";

export function TenantBidsTable() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const data = await tenantService.getMyBids();
        setBids(data.bids);
      } catch (error) {
        console.error("Failed to fetch bids:", error);
        setError("Failed to load bids");
      } finally {
        setLoading(false);
      }
    };
    fetchBids();
  }, []);

  // Filter bids
  let filteredBids = bids.filter((bid) =>
    bid.listing_id.toString().includes(search.toLowerCase()),
  );

  if (statusFilter !== "All") {
    filteredBids = filteredBids.filter((bid) => bid.status === statusFilter);
  }

  const paginatedBids = filteredBids.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const getStatusColor = (status: Bid["status"]) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-100 text-blue-700";
      case "COUNTER_OFFER":
        return "bg-purple-100 text-purple-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "WITHDRAWN":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: Bid["status"]) => {
    switch (status) {
      case "OPEN":
        return "Open";
      case "COUNTER_OFFER":
        return "Counter Offer";
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Rejected";
      case "WITHDRAWN":
        return "Withdrawn";
      default:
        return status;
    }
  };

  const columns = [
    {
      key: "bid_thread_id",
      header: "Bid ID",
      render: (row: Bid) => (
        <span className="font-semibold">#{row.bid_thread_id}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "listing_id",
      header: "Listing ID",
      render: (row: Bid) => (
        <span className="text-gray-600">#{row.listing_id}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "amount",
      header: "Bid Amount",
      render: (row: Bid) => (
        <div>
          <div className="font-semibold">AED {row.amount.toLocaleString()}</div>
          <div className="text-xs text-gray-500 capitalize">
            {row.frequency.toLowerCase()}
          </div>
        </div>
      ),
      className: "px-6 py-4",
    },
    {
      key: "installments",
      header: "Installments",
      render: (row: Bid) => (
        <span className="text-gray-600">{row.installments}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "created_at",
      header: "Date Submitted",
      render: (row: Bid) => (
        <span className="text-gray-600">
          {new Date(row.created_at).toLocaleDateString()}
        </span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: Bid) => (
        <span
          className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(row.status)}`}
        >
          {getStatusLabel(row.status)}
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">My Bids</h1>
        <p className="text-gray-600">Track all your property bids and offers</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by listing ID..."
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="All">All Statuses</option>
          <option value="OPEN">Open</option>
          <option value="COUNTER_OFFER">Counter Offer</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </select>
      </div>

      {/* Empty State */}
      {bids.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No bids found</p>
          <p className="text-sm text-gray-400">
            Place a bid on a property to see it here
          </p>
        </div>
      ) : (
        <>
          <Table columns={columns} data={paginatedBids} />
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalRows={filteredBids.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
