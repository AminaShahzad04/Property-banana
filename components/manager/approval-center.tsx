"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface Approval {
  id: string;
  type: string;
  agent: string;
  propertyImage: string;
  propertyTitle: string;
  propertyLocation: string;
  summary: string;
  submittedOn: string;
}

const mockApprovals: Approval[] = [
  {
    id: "1",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image1.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
  {
    id: "2",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image2.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
  {
    id: "3",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image3.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
  {
    id: "4",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image4.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
  {
    id: "5",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image5.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
  {
    id: "6",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image6.png",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
  {
    id: "7",
    type: "Property Edit",
    agent: "John Albert",
    propertyImage: "/places/image7.png",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    summary: "Updated rental price from AED 80k to AED 85k",
    submittedOn: "2026-9-23",
  },
];

export function ApprovalCenter() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockApprovals.filter((approval) => {
    const matchesSearch =
      approval.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.summary.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const columns = [
    {
      key: "type",
      header: "Type",
      render: (approval: Approval) => (
        <span className="text-gray-900">{approval.type}</span>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      render: (approval: Approval) => (
        <span className="text-gray-700">{approval.agent}</span>
      ),
    },
    {
      key: "property",
      header: "Property",
      render: (approval: Approval) => (
        <div className="flex items-center gap-3">
          <Image
            src={approval.propertyImage}
            alt={approval.propertyTitle}
            width={48}
            height={48}
            className="rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/house.png";
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {approval.propertyTitle}
            </span>
            <span className="text-xs text-gray-500">
              {approval.propertyLocation}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "summary",
      header: "Summary",
      render: (approval: Approval) => (
        <span className="text-gray-700 text-sm">{approval.summary}</span>
      ),
    },
    {
      key: "submittedOn",
      header: "Submitted On",
      render: (approval: Approval) => (
        <span className="text-gray-700">{approval.submittedOn}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (approval: Approval) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-3">Approval Center</h1>
        <p className="text-gray-500 text-sm">
          Review and approve pending submission form agent
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Approval"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
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
