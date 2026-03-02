"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Viewing {
  id: string;
  dateTime: string;
  propertyImage: string;
  propertyTitle: string;
  propertyLocation: string;
  landlordName: string;
  tenant: string;
  assignedAgent: string;
  status: "Completed" | "Pending Landlord" | "Scheduled" | "Cancelled Landlord";
}

const mockViewings: Viewing[] = [
  {
    id: "1",
    dateTime: "25-01-15 10:30 AM",
    propertyImage: "/places/image1.jpg",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Completed",
  },
  {
    id: "2",
    dateTime: "27-01-15 10:30 AM",
    propertyImage: "/places/image2.jpg",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Pending Landlord",
  },
  {
    id: "3",
    dateTime: "25-01-15 10:30 AM",
    propertyImage: "/places/image3.jpg",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Scheduled",
  },
  {
    id: "4",
    dateTime: "05-01-15 10:30 AM",
    propertyImage: "/places/image4.jpg",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Scheduled",
  },
  {
    id: "5",
    dateTime: "11-01-15 10:30 AM",
    propertyImage: "/places/image5.jpg",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Scheduled",
  },
  {
    id: "6",
    dateTime: "15-01-15 10:30 AM",
    propertyImage: "/places/image6.png",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Scheduled",
  },
  {
    id: "7",
    dateTime: "29-01-15 10:30 AM",
    propertyImage: "/places/image7.png",
    propertyTitle: "Luxury Martain Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlordName: "Amad Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Cancelled Landlord",
  },
];

export function ToursManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [portfolioType, setPortfolioType] = useState("high");

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType, portfolioType]);

  // Filter data based on search term
  const filteredData = mockViewings.filter((viewing) => {
    const matchesSearch =
      viewing.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viewing.propertyLocation
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      viewing.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      viewing.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const columns = [
    {
      key: "dateTime",
      header: "Date & Time",
      render: (viewing: Viewing) => (
        <span className="text-gray-700 text-sm">{viewing.dateTime}</span>
      ),
    },
    {
      key: "property",
      header: "Property",
      render: (viewing: Viewing) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {viewing.propertyTitle}
          </span>
          <span className="text-xs text-gray-500">
            {viewing.propertyLocation}
          </span>
        </div>
      ),
    },
    {
      key: "landlordName",
      header: "Landlord Name",
      render: (viewing: Viewing) => (
        <span className="text-gray-700">{viewing.landlordName}</span>
      ),
    },
    {
      key: "tenant",
      header: "Tenant",
      render: (viewing: Viewing) => (
        <span className="text-gray-600">{viewing.tenant}</span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (viewing: Viewing) => (
        <span className="text-gray-600">{viewing.assignedAgent}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (viewing: Viewing) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            viewing.status === "Completed"
              ? "bg-green-100 text-green-700"
              : viewing.status === "Pending Landlord"
                ? "bg-yellow-100 text-yellow-700"
                : viewing.status === "Scheduled"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
          }`}
        >
          {viewing.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (viewing: Viewing) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Viewings</h1>
        <p className="text-sm text-gray-500 mt-2">
          Manage your landlord relationship and their relationship
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search by name, email, or phone number"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-md"
        />
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All landlords</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed Use</option>
          </select>
          <select
            value={portfolioType}
            onChange={(e) => setPortfolioType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="high">High value portfolio</option>
            <option value="medium">Medium value portfolio</option>
            <option value="low">Low value portfolio</option>
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
