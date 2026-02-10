"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
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

const mockActivityLogs: ActivityLog[] = [
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
];

export function ActivityLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockActivityLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log: ActivityLog) => (
        <span className="text-gray-700 text-sm">{log.timestamp}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (log: ActivityLog) => (
        <span className="text-gray-900">{log.user}</span>
      ),
    },
    {
      key: "actionType",
      header: "Action Type",
      render: (log: ActivityLog) => (
        <span className="text-gray-700">{log.actionType}</span>
      ),
    },
    {
      key: "entity",
      header: "Entity",
      render: (log: ActivityLog) => (
        <span className="text-gray-700">{log.entity}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (log: ActivityLog) => (
        <span className="text-gray-600 text-sm">{log.description}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (log: ActivityLog) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            log.status === "Approved"
              ? "bg-green-100 text-green-700"
              : log.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {log.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (log: ActivityLog) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Active Logs</h1>
          <p className="text-gray-500 text-sm">
            View all system activity and changes
          </p>
        </div>
        <button className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md">
          Export Logs
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Approval"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
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
