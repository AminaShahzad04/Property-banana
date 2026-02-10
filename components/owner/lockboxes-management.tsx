"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { MoreVertical, Pencil } from "lucide-react";

interface Lockbox {
  id: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  agent: string;
  manager: string;
  lockBoxId: string;
  lockBoxName: string;
  addressCode: string;
  expiry: string;
  status: "Active" | "Expire Soon" | "Expired";
}

const mockLockboxes: Lockbox[] = [
  {
    id: "1",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    expiry: "25-01-15",
    status: "Active",
  },
  {
    id: "2",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image2.jpg",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    expiry: "25-01-15",
    status: "Expire Soon",
  },
  {
    id: "3",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image3.jpg",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    expiry: "25-01-15",
    status: "Active",
  },
  {
    id: "4",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image5.jpg",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    expiry: "25-01-15",
    status: "Expired",
  },
  {
    id: "6",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image6.jpg",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    expiry: "25-01-15",
    status: "Expire Soon",
  },
  {
    id: "7",
    propertyName: "Luxury Marian Apartment",
    propertyLocation: "Dubai Marina , Dubai",
    propertyImage: "/places/image1.jpg",
    agent: "Rober Chen",
    manager: "Rober Chen",
    lockBoxId: "LB-2024-001",
    lockBoxName: "main entrance lock",
    addressCode: "******",
    expiry: "25-01-15",
    status: "Expire Soon",
  },
];

export function LockboxesManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusColor = (status: Lockbox["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Expire Soon":
        return "bg-cyan-100 text-cyan-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (lockbox: Lockbox) => (
        <div className="flex items-center gap-2">
          <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
            <Image
              src={lockbox.propertyImage}
              alt={lockbox.propertyName}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/places/image1.jpg";
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-medium text-xs">
              {lockbox.propertyName}
            </span>
            <span className="text-[10px] text-gray-500">
              {lockbox.propertyLocation}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "agent",
      header: "Agent",
      render: (lockbox: Lockbox) => (
        <span className="text-gray-700 text-xs">{lockbox.agent}</span>
      ),
    },
    {
      key: "manager",
      header: "Manager",
      render: (lockbox: Lockbox) => (
        <span className="text-gray-700 text-xs">{lockbox.manager}</span>
      ),
    },
    {
      key: "lockBoxId",
      header: "Lock Box Is / Name",
      render: (lockbox: Lockbox) => (
        <div className="flex flex-col">
          <span className="text-gray-900 text-xs font-medium">
            {lockbox.lockBoxId}
          </span>
          <span className="text-[10px] text-gray-500">
            {lockbox.lockBoxName}
          </span>
        </div>
      ),
    },
    {
      key: "addressCode",
      header: "Address Code",
      render: (lockbox: Lockbox) => (
        <span className="text-gray-900 text-xs">{lockbox.addressCode}</span>
      ),
    },
    {
      key: "expiry",
      header: "Expiry",
      render: (lockbox: Lockbox) => (
        <span className="text-gray-600 text-xs">{lockbox.expiry}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (lockbox: Lockbox) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor(
            lockbox.status,
          )}`}
        >
          {lockbox.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (lockbox: Lockbox) => (
        <div className="relative" ref={dropdownRef}>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() =>
              setOpenDropdown(openDropdown === lockbox.id ? null : lockbox.id)
            }
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {openDropdown === lockbox.id && (
            <div className="absolute right-0 top-8 mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                onClick={() => {
                  setOpenDropdown(null);
                  // Handle edit lockbox
                }}
              >
                <Pencil className="w-4 h-4" />
                Add Lockbox
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full  max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Lock Boxes</h1>
        <p className="text-gray-500 text-sm">
          Manage property lockbox and Access Code
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} data={mockLockboxes} />
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
