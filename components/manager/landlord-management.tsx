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

const mockLandlords: Landlord[] = [
  {
    id: "1",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 5,
    priceRange: "ADE 12,000/year",
    totalSchedule: 3,
    assignedAgent: "John Albert",
  },
  {
    id: "2",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 6,
    priceRange: "ADE 12,000/year",
    totalSchedule: 4,
    assignedAgent: "John Albert",
  },
  {
    id: "3",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 8,
    priceRange: "ADE 12,000/year",
    totalSchedule: 9,
    assignedAgent: "John Albert",
  },
  {
    id: "4",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 7,
    priceRange: "ADE 12,000/year",
    totalSchedule: 0,
    assignedAgent: "John Albert",
  },
  {
    id: "5",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 89,
    priceRange: "ADE 12,000/year",
    totalSchedule: 7,
    assignedAgent: "John Albert",
  },
  {
    id: "6",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 5,
    priceRange: "ADE 12,000/year",
    totalSchedule: 3,
    assignedAgent: "John Albert",
  },
  {
    id: "7",
    landlordName: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324324-4433",
    noOfProperties: 3,
    priceRange: "ADE 12,000/year",
    totalSchedule: 6,
    assignedAgent: "John Albert",
  },
];

export function LandlordManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [portfolioType, setPortfolioType] = useState("high");

  // Filter data based on search term
  const filteredData = mockLandlords.filter((landlord) => {
    const matchesSearch =
      landlord.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landlord.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landlord.phone.includes(searchTerm);
    return matchesSearch;
  });

  const columns = [
    {
      key: "landlordName",
      header: "Landlord Name",
      render: (landlord: Landlord) => (
        <span className="font-medium">{landlord.landlordName}</span>
      ),
    },
    {
      key: "contactInfo",
      header: "Contact Info",
      render: (landlord: Landlord) => (
        <div className="flex flex-col">
          <span className="text-gray-900">{landlord.email}</span>
          <span className="text-gray-400 text-xs">{landlord.phone}</span>
        </div>
      ),
    },
    {
      key: "noOfProperties",
      header: "No of Properties",
      render: (landlord: Landlord) => (
        <span className="text-cyan-600 font-semibold">
          {landlord.noOfProperties}
        </span>
      ),
    },
    {
      key: "priceRange",
      header: "Price Range",
      render: (landlord: Landlord) => (
        <span className="text-gray-900">{landlord.priceRange}</span>
      ),
    },
    {
      key: "totalSchedule",
      header: "Total Schedule",
      render: (landlord: Landlord) => (
        <span className="text-cyan-600 font-semibold">
          {landlord.totalSchedule}
        </span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (landlord: Landlord) => (
        <span className="text-gray-600">{landlord.assignedAgent}</span>
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
        <p className="text-sm text-gray-500 mt-4">
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
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All landlord</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="mixed">Mixed Use</option>
          </select>
          <select
            value={portfolioType}
            onChange={(e) => setPortfolioType(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="high">High value portfolio</option>
            <option value="medium">Medium value portfolio</option>
            <option value="low">Low value portfolio</option>
          </select>
        </div>
      </div>
      <div className="bg-white p-6  rounded-lg shadow">
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
