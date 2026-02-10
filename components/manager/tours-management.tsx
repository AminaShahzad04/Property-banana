"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface Tour {
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

const mockTours: Tour[] = [
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

  // Filter data based on search term
  const filteredData = mockTours.filter((tour) => {
    const matchesSearch =
      tour.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.propertyLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.tenant.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
          <Image
            src={tour.propertyImage}
            alt={tour.propertyTitle}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/house.png";
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {tour.propertyTitle}
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
        <span className="text-gray-600">{tour.tenant}</span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (tour: Tour) => (
        <span className="text-gray-600">{tour.assignedAgent}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (tour: Tour) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            tour.status === "Completed"
              ? "bg-green-100 text-green-700"
              : tour.status === "Pending Landlord"
                ? "bg-yellow-100 text-yellow-700"
                : tour.status === "Scheduled"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
          }`}
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
        <h1 className="text-2xl font-bold">Tour</h1>
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
          totalRows={256000}
          rowsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
