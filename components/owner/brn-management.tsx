"use client";

import { useState, useEffect, useRef } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical, Pencil } from "lucide-react";
import Image from "next/image";

interface BRNRecord {
  id: string;
  agent: string;
  manager: string;
  brnNumber: string;
  expiryDate: string;
  dayUntilExpiry: string;
  status: "Active" | "Exp" | "Expired";
}

const mockBRNRecords: BRNRecord[] = [
  {
    id: "1",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "2",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Expired",
  },
  {
    id: "3",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Expired",
  },
  {
    id: "4",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "5",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "6",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "7",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    dayUntilExpiry: "2 days ago",
    status: "Active",
  },
];

export function BRNManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("All property");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredData = mockBRNRecords.filter((record) => {
    const matchesSearch =
      record.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.brnNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All status" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: BRNRecord["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Exp":
        return "bg-cyan-100 text-cyan-700";
      case "Expired":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "agent",
      header: "Agent",
      render: (record: BRNRecord) => (
        <span className="text-gray-900">{record.agent}</span>
      ),
    },
    {
      key: "manager",
      header: "Manager",
      render: (record: BRNRecord) => (
        <span className="text-gray-900">{record.manager}</span>
      ),
    },
    {
      key: "brnNumber",
      header: "BRN Number",
      render: (record: BRNRecord) => (
        <span className="text-gray-500">{record.brnNumber}</span>
      ),
    },
    {
      key: "expiryDate",
      header: "Expiry date",
      render: (record: BRNRecord) => (
        <span className="text-gray-900">{record.expiryDate}</span>
      ),
    },
    {
      key: "dayUntilExpiry",
      header: "Day Until Expiry",
      render: (record: BRNRecord) => (
        <span className="text-gray-600 text-sm">{record.dayUntilExpiry}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (record: BRNRecord) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
            record.status,
          )}`}
        >
          {record.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (record: BRNRecord) => (
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() =>
              setOpenDropdown(openDropdown === record.id ? null : record.id)
            }
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {openDropdown === record.id && (
            <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpenDropdown(null);
                  // Handle reminder
                }}
              >
                <span className="text-xl">🔔</span>
                <span className="text-orange-500">Reminder</span>
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpenDropdown(null);
                  // Handle suspend
                }}
              >
                <Pencil className="w-4 h-4 fill-red-600 text-red-600" />
                <span className="text-red-600">Suspend</span>
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl mb-2  font-bold">BRN Management</h1>
        <p className="text-gray-500 text-sm">
          Track and manage agent BRN registration and renewals
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search agents"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-4">
          <select
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All property">All property</option>
            <option value="Property 1">Property 1</option>
            <option value="Property 2">Property 2</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All status">All status</option>
            <option value="Active">Active</option>

            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="bg-[#f1efef] rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">Brokerage Trade license</h2>
        <div className="grid grid-cols-4 gap-8">
          <div>
            <p className="text-sm text-gray-500 mb-1">License Number</p>
            <p className="text-lg font-bold">TRD-3454-4265</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
            <p className="text-lg font-bold">2026-12-31</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Days Remaining</p>
            <p className="text-lg font-bold">300 Days</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className="px-3 py-1 rounded  inline-block text-xs font-medium  bg-[#25D3663D] text-[#45835C] ">
              Active
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} data={filteredData} />
        <Pagination
          totalRows={256000}
          rowsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
