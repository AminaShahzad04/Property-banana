"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { MoreVertical, Check, X, Edit, Eye } from "lucide-react";

interface Property {
  id: string;
  image: string;
  title: string;
  location: string;
  landlord: string;
  agentManaging: string;
  status: "Active" | "Pending" | "Rejected" | "Draft";
  lastUpdated: string;
  pendingCharges: "Yes" | "NO";
}

const mockProperties: Property[] = [
  {
    id: "1",
    image: "/places/image1.jpg",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "2",
    image: "/places/image2.jpg",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "3",
    image: "/places/image3.jpg",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Pending",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "Yes",
  },
  {
    id: "4",
    image: "/places/image4.jpg",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "5",
    image: "/places/image5.jpg",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Rejected",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "Yes",
  },
  {
    id: "6",
    image: "/places/image6.png",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Active",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "NO",
  },
  {
    id: "7",
    image: "/places/image7.png",
    title: "Luxury Morter Apartment",
    location: "Dubai Marina - Dubai",
    landlord: "John Albert",
    agentManaging: "John Albert",
    status: "Draft",
    lastUpdated: "25-01-10 10:30 AM",
    pendingCharges: "Yes",
  },
];

export function PropertiesManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  // Filter data based on search term and filters
  const filteredData = mockProperties
    .filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.landlord.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        property.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by date/newest first or oldest first
      if (sortOrder === "newest") {
        return b.lastUpdated.localeCompare(a.lastUpdated);
      } else if (sortOrder === "oldest") {
        return a.lastUpdated.localeCompare(b.lastUpdated);
      }
      return 0;
    });

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (property: Property) => (
        <div className="flex items-center gap-3">
          <Image
            src={property.image}
            alt={property.title}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/house.png";
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{property.title}</span>
            <span className="text-xs text-gray-500">{property.location}</span>
          </div>
        </div>
      ),
    },
    {
      key: "landlord",
      header: "Landlord",
      render: (property: Property) => (
        <span className="text-gray-700">{property.landlord}</span>
      ),
    },
    {
      key: "agentManaging",
      header: "Agent Managing",
      render: (property: Property) => (
        <span className="text-gray-700">{property.agentManaging}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (property: Property) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            property.status === "Active"
              ? "bg-green-100 text-green-700"
              : property.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : property.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
          }`}
        >
          {property.status}
        </span>
      ),
    },
    {
      key: "lastUpdated",
      header: "last Updated",
      render: (property: Property) => (
        <span className="text-gray-600 text-sm">{property.lastUpdated}</span>
      ),
    },
    {
      key: "pendingCharges",
      header: "Pending charges",
      render: (property: Property) => (
        <span
          className={`font-semibold ${
            property.pendingCharges === "Yes" ? "text-red-600" : "text-gray-900"
          }`}
        >
          {property.pendingCharges}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (property: Property) => (
        <div className="relative">
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() =>
              setOpenActionMenu(
                openActionMenu === property.id ? null : property.id,
              )
            }
          >
            <MoreVertical className="w-5 h-5" />
          </button>
          {openActionMenu === property.id && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button className="w-full px-4 py-2 text-left  border-b text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Image
                  src="/accept.png"
                  alt="Accept"
                  width={24}
                  height={24}
                  className="w-5 h-5"
                />
                Accept
              </button>
              <button className="w-full px-4 py-2 text-left border-b  text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Image
                  src="/decline.png"
                  alt="Decline"
                  width={24}
                  height={24}
                  className="w-7 h-7"
                />
                Reject
              </button>
              <button className="w-full px-4 py-2 text-left text-sm border-b hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Edit className="w-4 h-4 text-black" />
                Edit
              </button>
              <button className="w-full px-4 py-2 text-left text-sm  hover:bg-gray-50 flex items-center gap-2 text-gray-600">
                <Eye className="w-4 h-4 text-black" />
                <span>View</span>
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Properties</h1>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Property"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="all">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
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
