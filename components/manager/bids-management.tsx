"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface Bid {
  id: string;
  propertyImage: string;
  propertyTitle: string;
  propertyLocation: string;
  landlord: string;
  agent: string;
  offerAmount: string;
  type: "Rent";
  lastActivity: string;
  status: "Accepted" | "Under Review" | "Countered";
}

const mockBids: Bid[] = [
  {
    id: "1",
    propertyImage: "/places/image1.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "2",
    propertyImage: "/places/image2.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Under Review",
  },
  {
    id: "3",
    propertyImage: "/places/image3.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Countered",
  },
  {
    id: "4",
    propertyImage: "/places/image4.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "5",
    propertyImage: "/places/image5.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "6",
    propertyImage: "/places/image6.png",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
  {
    id: "7",
    propertyImage: "/places/image7.png",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agent: "John Albert",
    offerAmount: "ADE 12,000/year",
    type: "Rent",
    lastActivity: "2 days ago",
    status: "Accepted",
  },
];

export function BidsManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = mockBids.filter((bid) => {
    const matchesSearch =
      bid.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.propertyLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.landlord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.agent.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || bid.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (bid: Bid) => (
        <div className="flex items-center gap-3">
          <Image
            src={bid.propertyImage}
            alt={bid.propertyTitle}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/house.png";
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {bid.propertyTitle}
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
        <span className="text-gray-700">{bid.landlord}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      render: (bid: Bid) => <span className="text-gray-700">{bid.agent}</span>,
    },
    {
      key: "offerAmount",
      header: "Offer Amount",
      render: (bid: Bid) => (
        <span className="text-gray-900 font-medium">{bid.offerAmount}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (bid: Bid) => <span className="text-gray-700">{bid.type}</span>,
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
          className={`px-3 py-1 rounded text-xs font-medium ${
            bid.status === "Accepted"
              ? "bg-green-100 text-green-700"
              : bid.status === "Under Review"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
          }`}
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
          Manage offers from talent for your landlord clients
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
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All property</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All status</option>
            <option value="accepted">Accepted</option>
            <option value="under review">Under Review</option>
            <option value="countered">Countered</option>
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
