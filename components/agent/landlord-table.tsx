"use client";

import { Button } from "@/components/ui/Button";
import { MoreVertical, Search } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { Table } from "@/components/ui/Table";
import { useState } from "react";

const landlords = [
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 5,
    price: "ADE 12,000/year",
    schedule: 3,
    last: "2 days ago",
  },
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 6,
    price: "ADE 12,000/year",
    schedule: 4,
    last: "2 days ago",
  },
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 8,
    price: "ADE 12,000/year",
    schedule: 9,
    last: "2 days ago",
  },
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 7,
    price: "ADE 12,000/year",
    schedule: 0,
    last: "2 days ago",
  },
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 89,
    price: "ADE 12,000/year",
    schedule: 7,
    last: "2 days ago",
  },
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 5,
    price: "ADE 12,000/year",
    schedule: 3,
    last: "2 days ago",
  },
  {
    name: "Almed Al Maktoon",
    email: "abc@gmail.com",
    phone: "023-3342342-4433",
    properties: 3,
    price: "ADE 12,000/year",
    schedule: 6,
    last: "2 days ago",
  },
];

export function LandlordTable() {
  const columns = [
    {
      key: "name",
      header: "Landlord Name",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "contact",
      header: "Contact Info",
      render: (row: any) => (
        <>
          <div className="font-semibold">{row.email}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </>
      ),
      className: "px-6 py-4 text-sm",
    },
    {
      key: "properties",
      header: "No of Properties",
      className: "px-6 py-4 text-blue-600 font-semibold text-sm cursor-pointer",
    },
    {
      key: "price",
      header: "Price Range",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "schedule",
      header: "Total Schedule",
      className:
        "px-6 py-4 text-green-600 font-semibold text-sm cursor-pointer",
    },
    {
      key: "last",
      header: "Last Activity",
      className: "px-6 py-4 text-gray-500 text-sm",
    },
    {
      key: "action",
      header: "Action",
      render: () => (
        <button className="text-gray-600 hover:text-gray-900">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
      className: "px-6 py-4",
    },
  ];

  // Search and Pagination state
  const [search, setSearch] = useState("");
  const [portfolioType, setPortfolioType] = useState("All landlord");
  const [portfolioValue, setPortfolioValue] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const tableData = landlords.map((l) => ({
    ...l,
    contact: l.email,
    action: "",
  }));
  let filteredData = tableData.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.toLowerCase().includes(search.toLowerCase()),
  );
  // Portfolio type filter (example: could be extended with a real field)
  if (portfolioType !== "All landlord") {
    filteredData = filteredData.filter((l) => l.name === portfolioType);
  }
  // Portfolio value filter (example: could be extended with a real field)
  if (portfolioValue !== "All") {
    filteredData = filteredData.filter((l) => l.properties > 10); // Example logic
  }
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-card rounded-lg ">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold mb-1">Landlord</h1>
          <p className="text-gray-500 mb-6">
            Manage your landlord relationship and their relationship
          </p>
          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, email, or phone number"
            />
            <div className="flex items-center gap-4 ml-6 w-full justify-end">
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={portfolioType}
                onChange={(e) => setPortfolioType(e.target.value)}
              >
                <option>All landlord</option>
                <option>Almed Al Maktoon</option>
              </select>
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={portfolioValue}
                onChange={(e) => setPortfolioValue(e.target.value)}
              >
                <option>All</option>
                <option>High value portfolio</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          <Table columns={columns} data={paginatedData} />
          <Pagination
            totalRows={tableData.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
