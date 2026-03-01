"use client";

import { useState, useEffect } from "react";
import { Table as ReusableTable } from "@/components/ui/Table";
import { MoreVertical } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { agentService, type Bid } from "@/api/agent.service";

export function BidsTable() {
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        const response = await agentService.getBids();
        setBids(response.bids);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bids");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  const getStatusDisplay = (status: Bid["status"]) => {
    const statusMap = {
      OPEN: { label: "New", color: "bg-green-100 text-green-700" },
      COUNTER_OFFER: {
        label: "Countered",
        color: "bg-purple-100 text-purple-700",
      },
      ACCEPTED: { label: "Accepted", color: "bg-blue-100 text-blue-700" },
      REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700" },
      WITHDRAWN: { label: "Withdrawn", color: "bg-gray-100 text-gray-700" },
    };
    return (
      statusMap[status] || { label: status, color: "bg-gray-100 text-gray-700" }
    );
  };

  let filteredData = bids.filter(
    (row) =>
      row.bid_thread_id.toString().includes(search.toLowerCase()) ||
      row.listing_id.toString().includes(search.toLowerCase()) ||
      row.amount.toString().includes(search.toLowerCase()),
  );

  if (status !== "All status") {
    filteredData = filteredData.filter(
      (row) => getStatusDisplay(row.status).label === status,
    );
  }

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }

  const columns = [
    {
      key: "bid_thread_id",
      header: "Bid ID",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "listing_id",
      header: "Listing ID",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "amount",
      header: "Offer Amount",
      render: (row: Bid) => (
        <div className="font-semibold">
          AED {row.amount.toLocaleString()}/{row.frequency.toLowerCase()}
        </div>
      ),
      className: "px-6 py-4",
    },
    {
      key: "installments",
      header: "Installments",
      render: (row: Bid) => <span>{row.installments} payments</span>,
      className: "px-6 py-4",
    },
    {
      key: "created_at",
      header: "Submitted",
      render: (row: Bid) => (
        <span>{new Date(row.created_at).toLocaleDateString()}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: Bid) => {
        const statusDisplay = getStatusDisplay(row.status);
        return (
          <span
            className={`px-3 py-1 rounded-full font-semibold text-xs whitespace-nowrap ${statusDisplay.color}`}
          >
            {statusDisplay.label}
          </span>
        );
      },
      className: "px-6 py-4",
    },
    {
      key: "action",
      header: "Action",
      render: () => (
        <button className="text-gray-600 hover:text-gray-900">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
      className: "px-6 py-4",
    },
  ];

  return (
    <div className="bg-card rounded-lg">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold mb-1">Bids</h1>
          <p className="text-gray-500 mb-6">
            Manage offers from tenants for your landlord clients
          </p>
          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search Bids"
            />
            <div className="flex items-center gap-4 ml-6 w-full justify-end">
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All status</option>
                <option>New</option>
                <option>Accepted</option>
                <option>Countered</option>
                <option>Rejected</option>
                <option>Withdrawn</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          <ReusableTable columns={columns} data={paginatedData} />
          <Pagination
            totalRows={filteredData.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
