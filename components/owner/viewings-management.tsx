"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Viewing {
  id: string;
  dateTime: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  landlordName: string;
  tenant: string;
  assignedAgent: string;
}

const mockViewings: Viewing[] = [
  {
    id: "1",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
  {
    id: "2",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image2.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
  {
    id: "3",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image3.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
  {
    id: "4",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image4.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
  {
    id: "5",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image5.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
  {
    id: "6",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image6.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
  {
    id: "7",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
  },
];

export function ToursManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlordFilter, setLandlordFilter] = useState("All landlord");
  const [portfolioFilter, setPortfolioFilter] = useState(
    "High value portfolio",
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, landlordFilter, portfolioFilter]);

  const filteredData = mockViewings.filter((viewing) => {
    const matchesSearch =
      viewing.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <span className="text-gray-900 font-medium text-sm">
            {viewing.propertyName}
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
        <span className="text-gray-500">{viewing.tenant}</span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (viewing: Viewing) => (
        <span className="text-gray-500">{viewing.assignedAgent}</span>
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
        <h1 className="text-2xl font-bold mb-2">Viewings</h1>
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
            value={landlordFilter}
            onChange={(e) => setLandlordFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All landlord">All landlord</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select
            value={portfolioFilter}
            onChange={(e) => setPortfolioFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="High value portfolio">High value portfolio</option>
            <option value="Medium value">Medium value</option>
            <option value="Low value">Low value</option>
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
