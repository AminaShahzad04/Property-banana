"use client";

import { useState } from "react";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Property {
  id: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  landlord: string;
  agent: string;
  manager: string;
  status: "Active" | "Pending" | "Rejected" | "Draft";
  lastUpdated: string;
}

const mockProperties: Property[] = [
  {
    id: "1",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "2",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image2.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "3",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image3.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Pending",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "4",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image4.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "5",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image5.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Rejected",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "6",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image6.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Active",
    lastUpdated: "25-01-15 10:30 AM",
  },
  {
    id: "7",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    status: "Draft",
    lastUpdated: "25-01-15 10:30 AM",
  },
];

export function PropertiesManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sortFilter, setSortFilter] = useState("Newest First");

  let filteredData = mockProperties.filter((property) => {
    const matchesSearch = property.propertyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "All Statuses" || property.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Apply sorting
  if (sortFilter === "Newest First") {
    filteredData = [...filteredData].reverse();
  } else if (sortFilter === "Oldest First") {
    filteredData = [...filteredData];
  }

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

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (property: Property) => (
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
            <Image
              src={property.propertyImage}
              alt={property.propertyName}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/places/image1.jpg";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-sm">
              {property.propertyName}
            </span>
            <span className="text-xs text-gray-500">
              {property.propertyLocation}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "landlord",
      header: "Landlord",
      render: (property: Property) => (
        <span className="text-gray-500">{property.landlord}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      render: (property: Property) => (
        <span className="text-gray-500">{property.agent}</span>
      ),
    },
    {
      key: "manager",
      header: "Manager",
      render: (property: Property) => (
        <span className="text-gray-500">{property.manager}</span>
      ),
    },
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
    {
      key: "action",
      header: "Action",
      render: (property: Property) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
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
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All Statuses">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Draft">Draft</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All Types">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
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
