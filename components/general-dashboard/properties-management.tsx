"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical, Edit, Eye } from "lucide-react";

// Base interface with common fields
interface PropertyBase {
  id: string;
  propertyName: string;
  propertyLocation: string;
  landlord: string;
  status: "Active" | "Pending" | "Rejected" | "Draft";
  lastUpdated: string;
}

// Owner-specific property interface
interface OwnerProperty extends PropertyBase {
  agent: string;
  manager: string;
}

// Manager-specific property interface
interface ManagerProperty extends PropertyBase {
  agentManaging: string;
  pendingCharges: "Yes" | "NO";
}

type Property = OwnerProperty | ManagerProperty;

interface PropertiesManagementProps {
  role: "owner" | "manager";
}

// Mock data for owner
const mockOwnerProperties: OwnerProperty[] = [
  {
    id: "1",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "2",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "3",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Pending",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "4",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "5",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Rejected",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "6",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "7",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Draft",
    lastUpdated: "25-01-15 10:30 AM",
  },
];

// Mock data for manager
const mockManagerProperties: ManagerProperty[] = [
  {
    id: "1",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "2",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "3",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Pending",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "Yes",
  },
  {
    id: "4",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "5",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Rejected",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "Yes",
  },
  {
    id: "6",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "7",
    propertyName: "Luxury Morter Apartment",
    propertyLocation: "Dubai Marina, Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Draft",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "Yes",
  },
];

export function PropertiesManagement({ role }: PropertiesManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    role === "owner" ? "All Statuses" : "all",
  );
  const [typeFilter, setTypeFilter] = useState(
    role === "owner" ? "All Types" : "all",
  );
  const [sortFilter, setSortFilter] = useState(
    role === "owner" ? "Newest First" : "newest",
  );
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  // Use role-specific mock data
  const mockProperties =
    role === "owner" ? mockOwnerProperties : mockManagerProperties;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter, sortFilter]);

  const filteredData = mockProperties
    .filter((property) => {
      const matchesSearch = property.propertyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filter by status
      let matchesStatus = false;
      if (role === "owner") {
        matchesStatus =
          statusFilter === "All Statuses" || property.status === statusFilter;
      } else {
        matchesStatus =
          statusFilter === "all" ||
          property.status.toLowerCase() === statusFilter;
      }

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortFilter === "Newest First" || sortFilter === "newest") {
        return b.lastUpdated.localeCompare(a.lastUpdated);
      } else if (sortFilter === "Oldest First" || sortFilter === "oldest") {
        return a.lastUpdated.localeCompare(b.lastUpdated);
      }
      return 0;
    });

  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Draft":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Base columns shared by both roles
  const baseColumns = [
    {
      key: "property",
      header: "Property",
      render: (property: Property) => (
        <div className="flex flex-col">
          <span
            className={`${role === "owner" ? "text-sm" : ""} text-gray-900 font-medium`}
          >
            {property.propertyName}
          </span>
          <span className="text-xs text-gray-500">
            {property.propertyLocation}
          </span>
        </div>
      ),
    },
    {
      key: "landlord",
      header: "Landlord",
      render: (property: Property) => (
        <span className={role === "owner" ? "text-gray-500" : "text-gray-700"}>
          {property.landlord}
        </span>
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
            render: (property: Property) => (
              <span className="text-gray-500">
                {(property as OwnerProperty).agent}
              </span>
            ),
          },
          {
            key: "manager",
            header: "Manager",
            render: (property: Property) => (
              <span className="text-gray-500">
                {(property as OwnerProperty).manager}
              </span>
            ),
          },
        ]
      : [
          {
            key: "agentManaging",
            header: "Agent Managing",
            render: (property: Property) => (
              <span className="text-gray-700">
                {(property as ManagerProperty).agentManaging}
              </span>
            ),
          },
        ];

  // Common ending columns
  const endColumns = [
    {
      key: "status",
      header: "Status",
      render: (property: Property) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
            property.status,
          )}`}
        >
          {property.status}
        </span>
      ),
    },
    {
      key: "lastUpdated",
      header: "last Updated",
      render: (property: Property) => (
        <span className="text-gray-600 text-sm">{property.lastUpdated}</span>
      ),
    },
  ];

  // Manager-specific pending charges column
  const pendingChargesColumn =
    role === "manager"
      ? {
          key: "pendingCharges",
          header: "Pending charges",
          render: (property: Property) => {
            const managerProperty = property as ManagerProperty;
            return (
              <span
                className={`font-semibold ${
                  managerProperty.pendingCharges === "Yes"
                    ? "text-red-600"
                    : "text-gray-900"
                }`}
              >
                {managerProperty.pendingCharges}
              </span>
            );
          },
        }
      : null;

  // Action column
  const actionColumn = {
    key: "action",
    header: "Action",
    render: (property: Property) =>
      role === "owner" ? (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ) : (
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() =>
              setOpenActionMenu(
                openActionMenu === property.id ? null : property.id,
              )
            }
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {openActionMenu === property.id && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full px-4 py-2 text-left border-b text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Image
                  src="/accept.png"
                  alt="Accept"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
                Accept
              </button>
              <button className="w-full px-4 py-2 text-left border-b text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Image
                  src="/decline.png"
                  alt="Decline"
                  width={24}
                  height={24}
                  className="w-7 h-7"
                />
                Reject
              </button>
              <button className="w-full px-4 py-2 text-left text-sm border-b hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Edit className="w-4 h-4 text-black" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4 text-black" />
                <span>View</span>
              </button>
            </div>
          )}
        </div>
      ),
  };

  // Combine all columns
  const columns = [
    ...baseColumns,
    ...roleSpecificColumns,
    ...endColumns,
    ...(pendingChargesColumn ? [pendingChargesColumn] : []),
    actionColumn,
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Properties</h1>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Property"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`${role === "owner" ? "w-48" : ""} px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {role === "owner" ? (
              <>
                <option value="All Statuses">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Draft">Draft</option>
              </>
            ) : (
              <>
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="draft">Draft</option>
              </>
            )}
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className={`${role === "owner" ? "w-48" : ""} px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {role === "owner" ? (
              <>
                <option value="All Types">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
              </>
            ) : (
              <>
                <option value="all">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
              </>
            )}
          </select>
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className={`${role === "owner" ? "w-48" : ""} px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400`}
          >
            {role === "owner" ? (
              <>
                <option value="Newest First">Newest First</option>
                <option value="Oldest First">Oldest First</option>
              </>
            ) : (
              <>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </>
            )}
          </select>
        </div>
      </div>

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
