"use client";

import { useState } from "react";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Bid {
  id: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  landlord: string;
  agent: string;
  manager: string;
  offerAmount: string;
  type: string;
  lastActivity: string;
  status: "Accepted" | "Under Review" | "Countered" | "Accepted";
}

const mockBids: Bid[] = [
  {
    id: "1",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "2",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image2.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Under Review",
  },
  {
    id: "3",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image3.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Countered",
  },
  {
    id: "4",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image4.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "5",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image5.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "6",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image6.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "7",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    landlord: "John Albert",
    agent: "John Albert",
    manager: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
];

export function BidsManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("All property");
  const [statusFilter, setStatusFilter] = useState("All status");

  const filteredData = mockBids.filter((bid) => {
    const matchesSearch = bid.propertyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All status" || bid.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Bid["status"]) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Under Review":
        return "bg-cyan-100 text-cyan-700";
      case "Countered":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (bid: Bid) => (
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
            <Image
              src={bid.propertyImage}
              alt={bid.propertyName}
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
              {bid.propertyName}
            </span>
            <span className="text-xs text-gray-500">
              {bid.propertyLocation}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "landlord",
      header: "Landlord",
      render: (bid: Bid) => (
        <span className="text-gray-900">{bid.landlord}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      render: (bid: Bid) => <span className="text-gray-900">{bid.agent}</span>,
    },
    {
      key: "manager",
      header: "Managger",
      render: (bid: Bid) => (
        <span className="text-gray-900">{bid.manager}</span>
      ),
    },
    {
      key: "offerAmount",
      header: "Offer Amount",
      render: (bid: Bid) => (
        <span className="text-gray-900">{bid.offerAmount}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (bid: Bid) => <span className="text-gray-900">{bid.type}</span>,
    },
    {
      key: "lastActivity",
      header: "Last Activity",
      render: (bid: Bid) => (
        <span className="text-gray-600 text-sm">{bid.lastActivity}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (bid: Bid) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusColor(
            bid.status,
          )}`}
        >
          {bid.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (bid: Bid) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Bids</h1>
        <p className="text-gray-500 text-sm">
          Manage offers from Tenant for your landlord clients
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Bids"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-4">
          <select
            value={propertyFilter}
            onChange={(e) => setPropertyFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All property">All property</option>
            <option value="Property 1">Property 1</option>
            <option value="Property 2">Property 2</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="All status">All status</option>
            <option value="Accepted">Accepted</option>
            <option value="Under Review">Under Review</option>
            <option value="Countered">Countered</option>
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
