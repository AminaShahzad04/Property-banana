"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface LandlordBase {
  id: string;
  landlordName: string;
  email: string;
  phone: string;
  noOfProperties: number;
}

interface OwnerLandlord extends LandlordBase {
  viewings: number;
}

interface ManagerLandlord extends LandlordBase {
  priceRange: string;
  totalSchedule: number;
  assignedAgent: string;
}

type Landlord = OwnerLandlord | ManagerLandlord;

interface LandlordManagementProps {
  role: "owner" | "manager";
}

// Mock data for owner
const mockOwnerLandlords: OwnerLandlord[] = [
  {
    id: "1",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 5,
    viewings: 3,
  },
  {
    id: "2",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 6,
    viewings: 4,
  },
  {
    id: "3",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 8,
    viewings: 9,
  },
  {
    id: "4",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 7,
    viewings: 0,
  },
  {
    id: "5",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 89,
    viewings: 7,
  },
  {
    id: "6",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 5,
    viewings: 3,
  },
  {
    id: "7",
    landlordName: "Aimed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3324244-4433",
    noOfProperties: 3,
    viewings: 6,
  },
];

// Mock data for manager
const mockManagerLandlords: ManagerLandlord[] = [
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

export function LandlordManagement({ role }: LandlordManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlordFilter, setLandlordFilter] = useState(
    role === "owner" ? "All landlord" : "all",
  );
  const [portfolioFilter, setPortfolioFilter] = useState(
    role === "owner" ? "High value portfolio" : "high",
  );

  const mockLandlords =
    role === "owner" ? mockOwnerLandlords : mockManagerLandlords;

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, landlordFilter, portfolioFilter]);

  const filteredData = mockLandlords.filter((landlord) => {
    const matchesSearch =
      landlord.landlordName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landlord.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landlord.phone.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by portfolio based on number of properties (only for owner)
    let matchesPortfolioFilter = true;
    if (role === "owner") {
      if (portfolioFilter === "High value portfolio") {
        matchesPortfolioFilter = landlord.noOfProperties >= 20;
      } else if (portfolioFilter === "Medium value") {
        matchesPortfolioFilter =
          landlord.noOfProperties >= 7 && landlord.noOfProperties < 20;
      } else if (portfolioFilter === "Low value") {
        matchesPortfolioFilter = landlord.noOfProperties < 7;
      }
    }

    return matchesSearch && matchesPortfolioFilter;
  });

  // Base columns (common for both roles)
  const baseColumns = [
    {
      key: "landlordName",
      header: "Landlord Name",
      render: (landlord: Landlord) => (
        <span className={role === "owner" ? "text-gray-900" : "font-medium"}>
          {landlord.landlordName}
        </span>
      ),
    },
    {
      key: "contactInfo",
      header: "Contact Info",
      render: (landlord: Landlord) => (
        <div className="flex flex-col">
          <span className="text-gray-900 text-sm">{landlord.email}</span>
          <span
            className={`text-xs ${role === "owner" ? "text-gray-500" : "text-gray-400"}`}
          >
            {landlord.phone}
          </span>
        </div>
      ),
    },
    {
      key: "noOfProperties",
      header: "No of Properties",
      render: (landlord: Landlord) => (
        <span
          className={`text-cyan-600 ${role === "owner" ? "font-medium" : "font-semibold"}`}
        >
          {landlord.noOfProperties}
        </span>
      ),
    },
  ];

  // Role-specific columns
  const roleSpecificColumns =
    role === "owner"
      ? [
          {
            key: "viewings",
            header: "Viewings",
            render: (landlord: Landlord) => (
              <span className="text-cyan-600 font-medium">
                {(landlord as OwnerLandlord).viewings}
              </span>
            ),
          },
        ]
      : [
          {
            key: "priceRange",
            header: "Price Range",
            render: (landlord: Landlord) => (
              <span className="text-gray-900">
                {(landlord as ManagerLandlord).priceRange}
              </span>
            ),
          },
          {
            key: "totalSchedule",
            header: "Total Schedule",
            render: (landlord: Landlord) => (
              <span className="text-cyan-600 font-semibold">
                {(landlord as ManagerLandlord).totalSchedule}
              </span>
            ),
          },
          {
            key: "assignedAgent",
            header: "Assigned Agent",
            render: (landlord: Landlord) => (
              <span className="text-gray-600">
                {(landlord as ManagerLandlord).assignedAgent}
              </span>
            ),
          },
        ];

  // Action column
  const actionColumn = {
    key: "action",
    header: "Action",
    render: (landlord: Landlord) => (
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical className="w-5 h-5" />
      </button>
    ),
  };

  const columns = [...baseColumns, ...roleSpecificColumns, actionColumn];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Landlord</h1>
        <p className="text-gray-500 text-sm">
          {role === "owner"
            ? "Manage property landlords"
            : "Manage your landlord relationship and their relationship"}
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
            {role === "owner" ? (
              <>
                <option value="All landlord">All landlord</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </>
            ) : (
              <>
                <option value="all">All landlord</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="mixed">Mixed Use</option>
              </>
            )}
          </select>
          <select
            value={portfolioFilter}
            onChange={(e) => setPortfolioFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            {role === "owner" ? (
              <>
                <option value="High value portfolio">
                  High value portfolio
                </option>
                <option value="Medium value">Medium value</option>
                <option value="Low value">Low value</option>
              </>
            ) : (
              <>
                <option value="high">High value portfolio</option>
                <option value="medium">Medium value portfolio</option>
                <option value="low">Low value portfolio</option>
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
