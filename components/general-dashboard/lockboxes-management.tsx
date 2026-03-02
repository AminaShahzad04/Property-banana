"use client";

import { useState, useEffect, useRef } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical, Pencil } from "lucide-react";

// Base interface with common fields
interface LockboxBase {
  id: string;
  propertyName: string;
  propertyLocation: string;
  lockBoxId: string;
  lockBoxName: string;
  status: "Active" | "Expire Soon" | "Expired";
}

// Owner-specific lockbox interface
interface OwnerLockbox extends LockboxBase {
  agent: string;
  manager: string;
  Code: string;
  expiry: string;
}

// Manager-specific lockbox interface
interface ManagerLockbox extends LockboxBase {
  landlord: string;
  landlordSubtext: string;
  addressCode: string;
  lastUpdated: string;
}

type Lockbox = OwnerLockbox | ManagerLockbox;

interface LockboxesManagementProps {
  role: "owner" | "manager";
}

// Mock data for owner
const mockOwnerLockboxes: OwnerLockbox[] = [
  {
    id: "1",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Active",
  },
  {
    id: "2",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Expire Soon",
  },
  {
    id: "3",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Active",
  },
  {
    id: "4",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Expired",
  },
  {
    id: "5",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Expire Soon",
  },
  {
    id: "6",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Expire Soon",
  },
  {
    id: "7",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    Code: "******",
    expiry: "25-01-15",
    status: "Active",
  },
];

// Mock data for manager
const mockManagerLockboxes: ManagerLockbox[] = [
  {
    id: "1",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Active",
  },
  {
    id: "2",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expire Soon",
  },
  {
    id: "3",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Active",
  },
  {
    id: "4",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Active",
  },
  {
    id: "5",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expired",
  },
  {
    id: "6",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expire Soon",
  },
  {
    id: "7",
    propertyName: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expire Soon",
  },
];

export function LockboxesManagement({ role }: LockboxesManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use role-specific mock data
  const mockLockboxes =
    role === "owner" ? mockOwnerLockboxes : mockManagerLockboxes;

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const filteredData = mockLockboxes.filter((lockbox) => {
    if (role === "manager") {
      const managerLockbox = lockbox as ManagerLockbox;
      return (
        managerLockbox.propertyName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        managerLockbox.propertyLocation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        managerLockbox.landlord
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        managerLockbox.lockBoxId
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }
    return true; // Owner doesn't have search functionality
  });

  const getStatusColor = (status: Lockbox["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Expire Soon":
        return role === "manager"
          ? "bg-blue-100 text-[#018FBD]"
          : "bg-cyan-100 text-cyan-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Base columns shared by both roles
  const baseColumns = [
    {
      key: "property",
      header: "Property",
      render: (lockbox: Lockbox) => (
        <div className="flex flex-col">
          <span
            className={`font-medium ${role === "owner" ? "text-xs" : ""} text-gray-900`}
          >
            {lockbox.propertyName}
          </span>
          <span
            className={`${role === "owner" ? "text-[10px]" : "text-xs"} text-gray-500`}
          >
            {lockbox.propertyLocation}
          </span>
        </div>
      ),
    },
  ];

  // Role-specific columns
  const roleSpecificColumns =
    role === "owner"
      ? [
          {
            key: "agent",
            header: "Agent",
            render: (lockbox: Lockbox) => (
              <span className="text-gray-700 text-xs">
                {(lockbox as OwnerLockbox).agent}
              </span>
            ),
          },
          {
            key: "manager",
            header: "Manager",
            render: (lockbox: Lockbox) => (
              <span className="text-gray-700 text-xs">
                {(lockbox as OwnerLockbox).manager}
              </span>
            ),
          },
        ]
      : [
          {
            key: "landlord",
            header: "Landlord",
            render: (lockbox: Lockbox) => {
              const managerLockbox = lockbox as ManagerLockbox;
              return (
                <div className="flex flex-col">
                  <span className="text-gray-900">
                    {managerLockbox.landlord}
                  </span>
                  <span className="text-xs text-[#018FBD]">
                    {managerLockbox.landlordSubtext}
                  </span>
                </div>
              );
            },
          },
        ];

  // Lockbox ID column (shared but with different rendering)
  const lockboxIdColumn = {
    key: "lockBox",
    header: role === "owner" ? "Lock Box Id" : "Lock Box Id / Name",
    render: (lockbox: Lockbox) => (
      <div className="flex flex-col">
        <span
          className={`${role === "owner" ? "text-xs font-medium" : ""} text-gray-900`}
        >
          {lockbox.lockBoxId}
        </span>
        <span
          className={`${role === "owner" ? "text-[10px]" : "text-xs"} text-gray-500`}
        >
          {lockbox.lockBoxName}
        </span>
      </div>
    ),
  };

  // Code/Address columns
  const codeColumn =
    role === "owner"
      ? {
          key: "Code",
          header: "Code",
          render: (lockbox: Lockbox) => (
            <span className="text-gray-900 text-xs">
              {(lockbox as OwnerLockbox).Code}
            </span>
          ),
        }
      : {
          key: "addressCode",
          header: "Address Code",
          render: (lockbox: Lockbox) => (
            <span className="text-gray-700">
              {(lockbox as ManagerLockbox).addressCode}
            </span>
          ),
        };

  // Expiry/Last Updated columns
  const timeColumn =
    role === "owner"
      ? {
          key: "expiry",
          header: "Expiry",
          render: (lockbox: Lockbox) => (
            <span className="text-gray-600 text-xs">
              {(lockbox as OwnerLockbox).expiry}
            </span>
          ),
        }
      : {
          key: "lastUpdated",
          header: "last Updated",
          render: (lockbox: Lockbox) => (
            <span className="text-gray-600 text-sm">
              {(lockbox as ManagerLockbox).lastUpdated}
            </span>
          ),
        };

  // Common ending columns
  const endColumns = [
    {
      key: "status",
      header: "Status",
      render: (lockbox: Lockbox) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
            lockbox.status,
          )}`}
        >
          {lockbox.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (lockbox: Lockbox) =>
        role === "owner" ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() =>
                setOpenDropdown(openDropdown === lockbox.id ? null : lockbox.id)
              }
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {openDropdown === lockbox.id && (
              <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => {
                    setOpenDropdown(null);
                    // Handle edit lockbox
                  }}
                >
                  <Pencil className="w-4 h-4" />
                  Add Lockbox
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        ),
    },
  ];

  // Combine all columns
  const columns = [
    ...baseColumns,
    ...roleSpecificColumns,
    lockboxIdColumn,
    codeColumn,
    timeColumn,
    ...endColumns,
  ];

  return (
    <div
      className={`min-h-[80vh] flex flex-col w-full ${role === "owner" ? "max-w-7xl" : ""}`}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lock Boxes</h1>
        <p className="text-gray-500 text-sm">
          Manage property lockbox and Access Code
        </p>
      </div>

      {role === "manager" && (
        <div className="flex items-center justify-between gap-4 mb-6">
          <SearchBar
            placeholder="Search"
            value={searchTerm}
            onChange={setSearchTerm}
            className="flex-1 max-w-xs"
          />
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
