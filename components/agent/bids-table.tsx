"use client";

import { useState } from "react";
import { Table as ReusableTable } from "@/components/ui/Table";
import { MoreVertical } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";

const bids = [
  {
    property: {
      name: "Luxury Marian Apartment",
      location: "Dubai Marina , Dubai",
      image: "/jumeirah.png",
    },
    landlord: {
      name: "Rober Chen",
    },
    tenant: {
      email: "abc@gmail.com",
      phone: "023-33234324-4433",
    },
    offerAmount: "ADE 12,000/year Rent",
    type: "Rent",
    submitted: "25-01-15",
    status: { label: "New", color: "bg-green-100 text-green-700" },
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
    tenant: {
      email: "abc@gmail.com",
      phone: "023-33234324-4433",
    },
    offerAmount: "ADE 12,000/year Rent",
    type: "Rent",
    submitted: "25-01-15",
    status: { label: "Under Review", color: "bg-blue-100 text-blue-700" },
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
    tenant: {
      email: "abc@gmail.com",
      phone: "023-33234324-4433",
    },
    offerAmount: "ADE 12,000/year Rent",
    type: "Rent",
    submitted: "25-01-15",
    status: { label: "Countered", color: "bg-purple-100 text-purple-700" },
  },
  // ... more rows as needed
];

export function BidsTable() {
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("All property");
  const [status, setStatus] = useState("All status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  let filteredData = bids.filter(
    (row) =>
      row.property.name.toLowerCase().includes(search.toLowerCase()) ||
      row.landlord.name.toLowerCase().includes(search.toLowerCase()) ||
      row.tenant.email.toLowerCase().includes(search.toLowerCase()) ||
      row.tenant.phone.toLowerCase().includes(search.toLowerCase())
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
          <Image src={row.property.image} alt="property" width={40} height={40} className="rounded" />
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
          <div className="text-xs text-[#018FBD] cursor-pointer">You represent this landlord</div>
        </>
      ),
      className: "px-6 py-4",
    },
    {
      key: "tenant",
      header: "Tenant offer side",
      render: (row: any) => (
        <>
          <div className="font-semibold text-sm">{row.tenant.email}</div>
          <div className="text-xs text-gray-500">{row.tenant.phone}</div>
        </>
      ),
      className: "px-6 py-4",
    },
    {
      key: "offerAmount",
      header: "Offer Amount",
      className: "px-6 py-4",
    },
    {
      key: "type",
      header: "Type",
      className: "px-6 py-4",
    },
    {
      key: "submitted",
      header: "Submitted",
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span className={`px-3 py-1 rounded-none font-semibold text-xs whitespace-nowrap ${row.status.color}`}>{row.status.label}</span>
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

  return (
    <div className="bg-card rounded-lg">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold mb-1">Bids</h1>
          <p className="text-gray-500 mb-6">Manage offers from tenants for your landlord clients</p>
          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search Bids"
            />
            <div className="flex items-center gap-4 ml-6 w-full justify-end">
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={property}
                onChange={e => setProperty(e.target.value)}
              >
                <option>All property</option>
                {Array.from(new Set(bids.map(l => l.property.name))).map(name => (
                  <option key={name}>{name}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option>All status</option>
                <option>New</option>
                <option>Under Review</option>
                <option>Countered</option>
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
