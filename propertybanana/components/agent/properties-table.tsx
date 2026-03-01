"use client";

import { Button } from "@/components/ui/Button";
import { MoreVertical, Search } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function PropertiesTable() {
  const router = useRouter();
  const properties: any[] = [];
  const columns = [
    {
      key: "property",
      header: "Property",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.image}
            alt={row.name}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
          <div>
            <div className="font-semibold text-sm">{row.name}</div>
            <div className="text-xs text-gray-500">{row.location}</div>
          </div>
        </div>
      ),
      className: "px-6 py-4",
    },
    {
      key: "type",
      header: "Type",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "price",
      header: "Price",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span
          className={`inline-block px-3 py-1 rounded-none text-xs font-semibold ${row.statusColor}`}
        >
          {row.status}
        </span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
      className: "px-6 py-4 text-gray-500 text-sm",
    },
    {
      key: "pendingChanges",
      header: "Pending changes",
      render: (row: any) => (
        <span
          className={`font-semibold ${row.pendingChanges === "Yes" ? "text-red-600" : "text-black"}`}
        >
          {row.pendingChanges}
        </span>
      ),
      className: "px-6 py-4 text-sm",
    },
    {
      key: "action",
      header: "Action",
      render: () => (
        <button className="text-gray-60 hover:text-gray-900">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
      className: "px-6 py-4",
    },
  ];

  // Search and Pagination state
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [type, setType] = useState("All Types");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const tableData = properties.map((p) => ({
    ...p,
    property: p.name,
    action: "",
  }));
  let filteredData = tableData.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.type.toLowerCase().includes(search.toLowerCase()),
  );
  if (status !== "All Statuses") {
    filteredData = filteredData.filter((p) => p.status === status);
  }
  if (type !== "All Types") {
    filteredData = filteredData.filter((p) => p.type === type);
  }
  if (sortOrder === "Newest First") {
    filteredData = filteredData.sort((a, b) => b.id - a.id);
  } else {
    filteredData = filteredData.sort((a, b) => a.id - b.id);
  }
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-gray-40 rounded-lg">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">My Properties</h1>
          <Button
            className="text-black font-semibold"
            style={{ backgroundColor: "#FBDE02" }}
            onClick={() => router.push("/Dash/agent/properties/add-property")}
          >
            + Add Property
          </Button>
        </div>
        <div className="flex justify-center gap-2 text-sm text-red-600">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            All changes are sent to your manager for approval before going live
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between py-6 gap-6">
        <div className="relative w-[320px] flex-shrink-0">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, email, or phone number"
          />
        </div>
        <div className="flex items-center gap-4 ml-6 w-full justify-end">
          <select
            className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Rejected</option>
            <option>Draft</option>
          </select>
          <select
            className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>All Types</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Townhouse</option>
          </select>
          <select
            className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        {/* Table */}
        <Table columns={columns} data={paginatedData} />
        <Pagination
          totalRows={tableData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
