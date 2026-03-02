"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical, Pencil } from "lucide-react";

// Base interface with common fields
interface BRNRecordBase {
  id: string;
  agent: string;
  brnNumber: string;
  expiryDate: string;
  daysUntilExpiry: string;
  status: "Active" | "Exp" | "Expired";
}

// Owner-specific BRN record interface
interface OwnerBRNRecord extends BRNRecordBase {
  manager: string;
}

// Manager uses base interface
type ManagerBRNRecord = BRNRecordBase;

type BRNRecord = OwnerBRNRecord | ManagerBRNRecord;

interface BRNManagementProps {
  role: "owner" | "manager";
}

// Mock data for owner
const mockOwnerBRNRecords: OwnerBRNRecord[] = [
  {
    id: "1",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "2",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Expired",
  },
  {
    id: "3",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Expired",
  },
  {
    id: "4",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "5",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "6",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
  {
    id: "7",
    agent: "John Albert",
    manager: "John Albert",
    brnNumber: "BRN- 65543",
    expiryDate: "2026-9-23",
    daysUntilExpiry: "2 days ago",
    status: "Active",
  },
];

// Mock data for manager
const mockManagerBRNRecords: ManagerBRNRecord[] = [
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

export function BRNManagement({ role }: BRNManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState(
    role === "owner" ? "All property" : "all",
  );
  const [statusFilter, setStatusFilter] = useState(
    role === "owner" ? "All status" : "all",
  );
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use role-specific mock data
  const mockBRNRecords =
    role === "owner" ? mockOwnerBRNRecords : mockManagerBRNRecords;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, propertyFilter, statusFilter]);

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
    let matchesSearch = false;
    if (role === "owner") {
      const ownerRecord = record as OwnerBRNRecord;
      matchesSearch =
        ownerRecord.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ownerRecord.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ownerRecord.brnNumber.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      matchesSearch =
        record.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.brnNumber.toLowerCase().includes(searchTerm.toLowerCase());
    }

    let matchesStatus = false;
    if (role === "owner") {
      matchesStatus =
        statusFilter === "All status" || record.status === statusFilter;
    } else {
      matchesStatus =
        statusFilter === "all" || record.status.toLowerCase() === statusFilter;
    }

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: BRNRecord["status"]) => {
    if (role === "owner") {
      switch (status) {
        case "Active":
          return "bg-green-100 text-green-700";
        case "Exp":
        case "Expired":
          return "bg-cyan-100 text-cyan-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    } else {
      return status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
    }
  };

  // Base columns
  const baseColumns = [
    {
      key: "agent",
      header: "Agent",
      render: (record: BRNRecord) => (
        <span className="text-gray-900">{record.agent}</span>
      ),
    },
  ];

  // Manager column (only for owner)
  const managerColumn =
    role === "owner"
      ? {
          key: "manager",
          header: "Manager",
          render: (record: BRNRecord) => (
            <span className="text-gray-900">
              {(record as OwnerBRNRecord).manager}
            </span>
          ),
        }
      : null;

  // Common columns
  const commonColumns = [
    {
      key: "brnNumber",
      header: "BRN Number",
      render: (record: BRNRecord) => (
        <span className={role === "owner" ? "text-gray-500" : "text-gray-700"}>
          {record.brnNumber}
        </span>
      ),
    },
    {
      key: "expiryDate",
      header: "Expiry date",
      render: (record: BRNRecord) => (
        <span className={role === "owner" ? "text-gray-900" : "text-gray-700"}>
          {record.expiryDate}
        </span>
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
            <div
              className={`absolute right-0 ${role === "owner" ? "top-8" : ""} mt-${role === "owner" ? "1" : "2"} w-${role === "owner" ? "40" : "36"} bg-white rounded-${role === "owner" ? "md" : "lg"} shadow-lg border border-gray-200 ${role === "manager" ? "py-1" : ""} z-10`}
            >
              {role === "owner" ? (
                <>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setOpenDropdown(null);
                    }}
                  >
                    <span className="text-xl">🔔</span>
                    <span className="text-orange-500">Reminder</span>
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => {
                      setOpenDropdown(null);
                    }}
                  >
                    <Pencil className="w-4 h-4 fill-red-600 text-red-600" />
                    <span className="text-red-600">Suspend</span>
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  // Combine all columns
  const columns = [
    ...baseColumns,
    ...(managerColumn ? [managerColumn] : []),
    ...commonColumns,
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl mb-2 font-bold">BRN Management</h1>
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
            className={`${role === "owner" ? "w-48" : ""} px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {role === "owner" ? (
              <>
                <option value="All property">All property</option>
                <option value="Property 1">Property 1</option>
                <option value="Property 2">Property 2</option>
              </>
            ) : (
              <>
                <option value="all">All property</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
              </>
            )}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${role === "owner" ? "w-48" : ""} px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {role === "owner" ? (
              <>
                <option value="All status">All status</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </>
            ) : (
              <>
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </>
            )}
          </select>
        </div>
      </div>

      {role === "owner" && (
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
              <p className="px-3 py-1 rounded inline-block text-xs font-medium bg-[#25D3663D] text-[#45835C]">
                Active
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} data={filteredData} />
        <Pagination
          totalRows={filteredData.length}
          rowsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
