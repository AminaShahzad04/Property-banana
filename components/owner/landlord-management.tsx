"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Landlord {
  id: string;
  landlordName: string;
  email: string;
  phone: string;
  noOfProperties: number;
  priceRange: string;
  totalSchedule: number;
  assignedAgent: string;
}

// Note: API endpoint /dashboard/brokerage/landlords does not exist in openapi.yaml
// Using mock data until backend implements the endpoint
const mockLandlords: Landlord[] = [
  {
    id: "1",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 5,
    priceRange: "AED 12,000/year",
    totalSchedule: 3,
    assignedAgent: "John Albert",
  },
  {
    id: "2",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 6,
    priceRange: "AED 12,000/year",
    totalSchedule: 4,
    assignedAgent: "John Albert",
  },
  {
    id: "3",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 8,
    priceRange: "AED 12,000/year",
    totalSchedule: 9,
    assignedAgent: "John Albert",
  },
  {
    id: "4",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 7,
    priceRange: "AED 12,000/year",
    totalSchedule: 0,
    assignedAgent: "John Albert",
  },
  {
    id: "5",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 89,
    priceRange: "AED 12,000/year",
    totalSchedule: 7,
    assignedAgent: "John Albert",
  },
  {
    id: "6",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 5,
    priceRange: "AED 12,000/year",
    totalSchedule: 3,
    assignedAgent: "John Albert",
  },
  {
    id: "7",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 3,
    priceRange: "AED 12,000/year",
    totalSchedule: 6,
    assignedAgent: "John Albert",
  },
];

export function LandlordManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlordFilter, setLandlordFilter] = useState("All landlord");
  const [portfolioFilter, setPortfolioFilter] = useState(
    "High value portfolio",
  );

  const filteredData = mockLandlords.filter((landlord) => {
    const matchesSearch =
      landlord.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landlord.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landlord.phone.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by portfolio based on number of properties
    let matchesPortfolioFilter = true;
    if (portfolioFilter === "High value portfolio") {
      matchesPortfolioFilter = landlord.noOfProperties >= 20;
    } else if (portfolioFilter === "Medium value") {
      matchesPortfolioFilter =
        landlord.noOfProperties >= 7 && landlord.noOfProperties < 20;
    } else if (portfolioFilter === "Low value") {
      matchesPortfolioFilter = landlord.noOfProperties < 7;
    }

    return matchesSearch && matchesPortfolioFilter;
  });

  const columns = [
    {
      key: "landlordName",
      header: "Landlord Name",
      render: (landlord: Landlord) => (
        <span className="text-gray-900">{landlord.landlordName}</span>
      ),
    },
    {
      key: "contactInfo",
      header: "Contact Info",
      render: (landlord: Landlord) => (
        <div className="flex flex-col">
          <span className="text-gray-900 text-sm">{landlord.email}</span>
          <span className="text-xs text-gray-500">{landlord.phone}</span>
        </div>
      ),
    },
    {
      key: "noOfProperties",
      header: "No of Properties",
      render: (landlord: Landlord) => (
        <span className="text-cyan-600 font-medium">
          {landlord.noOfProperties}
        </span>
      ),
    },
    {
      key: "priceRange",
      header: "Price Range",
      render: (landlord: Landlord) => (
        <span className="text-gray-700">{landlord.priceRange}</span>
      ),
    },
    {
      key: "totalSchedule",
      header: "Total Schedule",
      render: (landlord: Landlord) => (
        <span className="text-cyan-600 font-medium">
          {landlord.totalSchedule}
        </span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (landlord: Landlord) => (
        <span className="text-gray-500">{landlord.assignedAgent}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (landlord: Landlord) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Landlord</h1>
        <p className="text-gray-500 text-sm">Manage property landlords</p>
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
