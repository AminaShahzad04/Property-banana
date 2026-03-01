"use client";

import { useState, useEffect, useRef } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { MoreVertical } from "lucide-react";

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  actionType: string;
  entity: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Create",
    entity: "Property",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Pending",
  },
  {
    id: "2",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Approve",
    entity: "Property",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Pending",
  },
  {
    id: "3",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Update",
    entity: "Property",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Approved",
  },
  {
    id: "4",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Reschedule",
    entity: "Tour",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Approved",
  },
  {
    id: "5",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Reject",
    entity: "Bid",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Rejected",
  },
  {
    id: "6",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Update",
    entity: "Lock Box",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Pending",
  },
  {
    id: "7",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Approve",
    entity: "Tour",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Rejected",
  },
  {
    id: "8",
    timestamp: "25-01-15 10:30 AM",
    user: "John Albert(agent)",
    actionType: "Create",
    entity: "Property",
    description: "Updated rental price from AED 80k to AED 85k",
    status: "Approved",
  },
];

export function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const rowsPerPage = 8;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = mockLogs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      accessor: "timestamp" as const,
      render: (log: ActivityLog) => (
        <span className="text-xs text-gray-600">{log.timestamp}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      accessor: "user" as const,
      render: (log: ActivityLog) => (
        <span className="text-xs text-gray-900">{log.user}</span>
      ),
    },
    {
      key: "actionType",
      header: "Action Type",
      accessor: "actionType" as const,
      render: (log: ActivityLog) => (
        <span className="text-xs text-gray-900">{log.actionType}</span>
      ),
    },
    {
      key: "entity",
      header: "Entity",
      accessor: "entity" as const,
      render: (log: ActivityLog) => (
        <span className="text-xs text-gray-900">{log.entity}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      accessor: "description" as const,
      render: (log: ActivityLog) => (
        <span className="text-xs text-gray-600">{log.description}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      accessor: "status" as const,
      render: (log: ActivityLog) => {
        const statusColors = {
          Pending: "bg-yellow-100 text-yellow-700",
          Approved: "bg-green-100 text-green-700",
          Rejected: "bg-red-100 text-red-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${statusColors[log.status]}`}
          >
            {log.status}
          </span>
        );
      },
    },
    {
      key: "action",
      header: "Action",
      accessor: "id" as const,
      render: (log: ActivityLog) => (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() =>
              setOpenDropdown(openDropdown === log.id ? null : log.id)
            }
            className="p-1 hover:bg-gray-100 rounded"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          {openDropdown === log.id && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                View Details
              </button>
              <button className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100">
                Export
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col  px-6 w-full max-w-7xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold mb-1">Active Logs</h1>
          <p className="text-gray-500 text-xs">
            View all system activity and changes
          </p>
        </div>
        <button className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md text-sm">
          Export Logs
        </button>
      </div>

      <div className="mb-4">
        <SearchBar
          placeholder="Search Approval"
          value={searchTerm}
          onChange={setSearchTerm}
          className="max-w-sm"
        />
      </div>

      <div className="bg-white  p-6 rounded-lg shadow">
        <Table columns={columns} data={paginatedData} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Showing data {startIndex + 1} to{" "}
          {Math.min(startIndex + rowsPerPage, filteredData.length)} of{" "}
          {filteredData.length > 1000
            ? `${Math.floor(filteredData.length / 1000)}K`
            : filteredData.length}{" "}
          entries
        </p>
        <Pagination
          totalRows={filteredData.length}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
