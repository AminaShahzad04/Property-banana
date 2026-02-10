"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { MoreVertical, Pencil } from "lucide-react";

interface BRNRecord {
  id: string;
  agent: string;
  brnNumber: string;
  expiryDate: string;
  daysUntilExpiry: string;
  status: "Active" | "Expired";
}

const mockBRNRecords: BRNRecord[] = [
  {
    id: "1",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "2",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "3",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Expired",
  },
  {
    id: "4",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "5",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "6",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "7",
    agent: "John Albert",
    brnNumber: "BRN-85543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
];

export function BRNManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const filteredData = mockBRNRecords.filter((record) => {
    const matchesSearch =
      record.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.brnNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || record.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "agent",
      header: "Agent",
      render: (record: BRNRecord) => (
        <span className="text-gray-900">{record.agent}</span>
      ),
    },
    {
      key: "brnNumber",
      header: "BRN Number",
      render: (record: BRNRecord) => (
        <span className="text-gray-700">{record.brnNumber}</span>
      ),
    },
    {
      key: "expiryDate",
      header: "Expiry date",
      render: (record: BRNRecord) => (
        <span className="text-gray-700">{record.expiryDate}</span>
      ),
    },
    {
      key: "daysUntilExpiry",
      header: "Day Until Expiry",
      render: (record: BRNRecord) => (
        <span className="text-gray-600 text-sm">{record.daysUntilExpiry}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (record: BRNRecord) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            record.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {record.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (record: BRNRecord) => (
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() =>
              setOpenActionMenu(openActionMenu === record.id ? null : record.id)
            }
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {openActionMenu === record.id && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full px-4 py-2 text-left border-b text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Image
                  src="/reminder.png"
                  alt="Reminder"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Reminder
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Pencil className="w-4 h-4 text-black fill-black" />
                Edit
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
        <h1 className="text-2xl font-bold">BRN Management</h1>
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
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All property</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
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
