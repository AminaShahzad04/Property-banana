"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

interface LockBox {
  id: string;
  propertyImage: string;
  propertyTitle: string;
  propertyLocation: string;
  landlord: string;
  landlordSubtext: string;
  lockBoxId: string;
  lockBoxName: string;
  addressCode: string;
  lastUpdated: string;
  status: "Active" | "Expire Soon" | "Expired";
}

const mockLockBoxes: LockBox[] = [
  {
    id: "1",
    propertyImage: "/places/image1.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Active",
  },
  {
    id: "2",
    propertyImage: "/places/image2.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expire Soon",
  },
  {
    id: "3",
    propertyImage: "/places/image3.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Active",
  },
  {
    id: "4",
    propertyImage: "/places/image4.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Active",
  },
  {
    id: "5",
    propertyImage: "/places/image5.jpg",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expired",
  },
  {
    id: "6",
    propertyImage: "/places/image6.png",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expire Soon",
  },
  {
    id: "7",
    propertyImage: "/places/image7.png",
    propertyTitle: "Luxury Marlon Apartment",
    propertyLocation: "Dubai Marina - Dubai",
    landlord: "Rober Chen",
    landlordSubtext: "You represent this landlord",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    lastUpdated: "25-01-15 10:30 AM",
    status: "Expire Soon",
  },
];

export function LockBoxesManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockLockBoxes.filter((lockbox) => {
    const matchesSearch =
      lockbox.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lockbox.propertyLocation
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lockbox.landlord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lockbox.lockBoxId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (lockbox: LockBox) => (
        <div className="flex items-center gap-3">
          <Image
            src={lockbox.propertyImage}
            alt={lockbox.propertyTitle}
            width={60}
            height={60}
            className="rounded-lg object-cover"
            onError={(e) => {
              e.currentTarget.src = "/house.png";
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {lockbox.propertyTitle}
            </span>
            <span className="text-xs text-gray-500">
              {lockbox.propertyLocation}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "landlord",
      header: "Landlord",
      render: (lockbox: LockBox) => (
        <div className="flex flex-col">
          <span className="text-gray-900">{lockbox.landlord}</span>
          <span className="text-xs text-[#018FBD]">
            {lockbox.landlordSubtext}
          </span>
        </div>
      ),
    },
    {
      key: "lockBox",
      header: "Lock Box Id / Name",
      render: (lockbox: LockBox) => (
        <div className="flex flex-col">
          <span className="text-gray-900">{lockbox.lockBoxId}</span>
          <span className="text-xs text-gray-500">{lockbox.lockBoxName}</span>
        </div>
      ),
    },
    {
      key: "addressCode",
      header: "Address Code",
      render: (lockbox: LockBox) => (
        <span className="text-gray-700">{lockbox.addressCode}</span>
      ),
    },
    {
      key: "lastUpdated",
      header: "last Updated",
      render: (lockbox: LockBox) => (
        <span className="text-gray-600 text-sm">{lockbox.lastUpdated}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (lockbox: LockBox) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            lockbox.status === "Active"
              ? "bg-green-100 text-green-700"
              : lockbox.status === "Expire Soon"
                ? "bg-blue-100 text-[#018FBD]"
                : "bg-red-100 text-red-700"
          }`}
        >
          {lockbox.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (lockbox: LockBox) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lock Boxes</h1>
        <p className="text-gray-500 text-sm">
          Manage property lockbox and Access Code
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search"
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
