"use client";

import { useState } from "react";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Tour {
  id: string;
  dateTime: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  landlordName: string;
  tenant: string;
  assignedAgent: string;
  status: "Scheduled" | "Pending Schedule" | "Completed" | "Cancel scheduled";
}

const mockTours: Tour[] = [
  {
    id: "1",
    dateTime: "25-01-15 10:30 AM",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlordName: "Aimed Al Maktoon",
    tenant: "John Albert",
    assignedAgent: "John Albert",
    status: "Scheduled",
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
    status: "Pending Schedule",
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
    status: "Scheduled",
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
    status: "Scheduled",
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
    status: "Scheduled",
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
    status: "Completed",
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
    status: "Cancel scheduled",
  },
];

export function ToursManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlordFilter, setLandlordFilter] = useState("All landlord");
  const [portfolioFilter, setPortfolioFilter] = useState(
    "High value portfolio",
  );

  const filteredData = mockTours.filter((tour) => {
    const matchesSearch =
      tour.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.tenant.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const getStatusColor = (status: Tour["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-green-100 text-green-700";
      case "Pending Schedule":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancel scheduled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "dateTime",
      header: "Date & Time",
      render: (tour: Tour) => (
        <span className="text-gray-700 text-sm">{tour.dateTime}</span>
      ),
    },
    {
      key: "property",
      header: "Property",
      render: (tour: Tour) => (
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
            <Image
              src={tour.propertyImage}
              alt={tour.propertyName}
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
              {tour.propertyName}
            </span>
            <span className="text-xs text-gray-500">
              {tour.propertyLocation}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "landlordName",
      header: "Landlord Name",
      render: (tour: Tour) => (
        <span className="text-gray-700">{tour.landlordName}</span>
      ),
    },
    {
      key: "tenant",
      header: "Tenant",
      render: (tour: Tour) => (
        <span className="text-gray-500">{tour.tenant}</span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (tour: Tour) => (
        <span className="text-gray-500">{tour.assignedAgent}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (tour: Tour) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
            tour.status,
          )}`}
        >
          {tour.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (tour: Tour) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Tour</h1>
        <p className="text-gray-500 text-sm">
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
          totalRows={256000}
          rowsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
