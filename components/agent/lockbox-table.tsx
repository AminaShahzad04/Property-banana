"use client";

import { useState } from "react";
import { Table as ReusableTable } from "@/components/ui/Table";
import { MoreVertical } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";

const lockBoxes = [
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    lockBoxId: "LB-2024-001",
    addressCode: "*******",
    lastUpdated: "25-01-15 10:30 AM",
    status: { label: "Active", color: "text-green-700 bg-green-100" },
    action: "",
    note: "main entrance lock",
  },
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    lockBoxId: "LB-2024-001",
    addressCode: "*******",
    lastUpdated: "25-01-15 10:30 AM",
    status: { label: "Expire Soon", color: "text-blue-700 bg-blue-100" },
    action: "",
    note: "main entrance lock",
  },
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    lockBoxId: "LB-2024-001",
    addressCode: "*******",
    lastUpdated: "25-01-15 10:30 AM",
    status: { label: "Active", color: "text-green-700 bg-green-100" },
    action: "",
    note: "main entrance lock",
  },
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    lockBoxId: "LB-2024-001",
    addressCode: "*******",
    lastUpdated: "25-01-15 10:30 AM",
    status: { label: "Active", color: "text-green-700 bg-green-100" },
    action: "",
    note: "main entrance lock",
  },
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    lockBoxId: "LB-2024-001",
    addressCode: "*******",
    lastUpdated: "25-01-15 10:30 AM",
    status: { label: "Expired", color: "text-red-700 bg-red-100" },
    action: "",
    note: "main entrance lock",
  },
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    lockBoxId: "LB-2024-001",
    addressCode: "*******",
    lastUpdated: "25-01-15 10:30 AM",
    status: { label: "Expire Soon", color: "text-blue-700 bg-blue-100" },
    action: "",
    note: "main entrance lock",
  },
];

export function LockBoxTable() {
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("All property");
  const [status, setStatus] = useState("All status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  let filteredData = lockBoxes.filter(
    (row) =>
      row.property.name.toLowerCase().includes(search.toLowerCase()) ||
      row.landlord.name.toLowerCase().includes(search.toLowerCase()),
  );
  if (property !== "All property") {
    filteredData = filteredData.filter((row) => row.property.name === property);
  }
  if (status !== "All status") {
    filteredData = filteredData.filter((row) => row.status.label === status);
  }
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.property.image}
            alt="property"
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <div className="font-semibold text-sm">{row.property.name}</div>
            <div className="text-xs text-gray-500">{row.property.location}</div>
          </div>
        </div>
      ),
      className: "px-6 py-4",
    },
    {
      key: "landlord",
      header: "Landlord",
      render: (row: any) => (
        <>
          <div className="font-semibold text-sm">{row.landlord.name}</div>
          <div className="text-xs text-[#018FBD] cursor-pointer">
            You represent this landlord
          </div>
        </>
      ),
      className: "px-6 py-4",
    },
    {
      key: "lockBoxId",
      header: "Lock Box Id / Name",
      render: (row: any) => (
        <>
          <div>{row.lockBoxId}</div>
          <div className="text-xs text-gray-400">{row.note}</div>
        </>
      ),
      className: "px-6 py-4",
    },
    {
      key: "addressCode",
      header: "Address Code",
      className: "px-6 py-4",
    },
    {
      key: "lastUpdated",
      header: "last Updated",
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span
          className={`px-3 py-1 rounded-none font-semibold text-xs ${row.status.color}`}
        >
          {row.status.label}
        </span>
      ),
      className: "px-6 py-4",
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

  // Calculate summary values
  const activeCount = lockBoxes.filter(
    (l) => l.status.label === "Active",
  ).length;
  const expireSoonCount = lockBoxes.filter(
    (l) => l.status.label === "Expire Soon",
  ).length;
  const notConfiguredCount = lockBoxes.filter(
    (l) => l.status.label !== "Active" && l.status.label !== "Expire Soon",
  ).length;

  return (
    <div className="bg-card rounded-lg">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold mb-1">Lock Boxes</h1>
          <p className="text-gray-500 mb-6">
            Manage lockbox access of your landlord properties
          </p>
          <div className="my-4  ">
            <div className="bg-[#FFF3F0] text-[#FF3B00] rounded-full px-4 py-2 flex items-center gap-2 mb-4 w-fit mx-auto">
              <span className=" text-xl">&#9432;</span>
              <span>
                Changes you make will be sent to your brokerage manager for
                approval before going to live
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1 min-w-[220px] bg-white rounded border border-gray-200 p-6 flex flex-col justify-center">
                <div className="text-2xl font-bold">
                  {String(activeCount).padStart(2, "0")}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Active lock boxes
                </div>
              </div>
              <div className="flex-1 min-w-[220px] bg-white rounded border border-gray-200 p-6 flex flex-col justify-center">
                <div className="text-2xl font-bold">
                  {String(expireSoonCount).padStart(2, "0")}
                </div>
                <div className="text-gray-500 text-sm mt-1">
                  Expire in 7 days
                </div>
              </div>
              <div className="flex-1 min-w-[220px] bg-white rounded border border-gray-200 p-6 flex flex-col justify-center">
                <div className="text-2xl font-bold">{notConfiguredCount}</div>
                <div className="text-gray-500 text-sm mt-1">
                  no lock box configured
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, email, or phone number"
            />
            <div className="flex items-center gap-4 ml-6 w-full justify-end">
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              >
                <option>All property</option>
                {Array.from(new Set(lockBoxes.map((l) => l.property.name))).map(
                  (name) => (
                    <option key={name}>{name}</option>
                  ),
                )}
              </select>
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All status</option>
                <option>Active</option>
                <option>Expire Soon</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          <ReusableTable columns={columns} data={paginatedData} />
          <Pagination
            totalRows={filteredData.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
