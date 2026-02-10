"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Table } from "@/components/ui/Table";
import Image from "next/image";

export function ToursTable() {
  const tours: any[] = []; // Empty - agent tours come from landlord clients

  const [activeTab, setActiveTab] = useState("Past");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Statuses");
  const [property, setProperty] = useState("All Properties");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const columns = [
    {
      key: "dateTime",
      header: "Date & Time",
      render: (row: any) => (
        <div className="font-bold text-black text-sm">
          {row.date}
          <span className="px-2 text-xs text-gray-500 font-normal mt-1">
            {row.time}
          </span>
        </div>
      ),
      className: "px-6 py-4 whitespace-nowrap align-middle",
    },
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
          <div className="font-semibold text-sm">
            {row.landlord?.name || "N/A"}
          </div>
          <div className="text-xs text-[#018FBD] cursor-pointer">
            You represent this landlord
          </div>
        </>
      ),
      className: "px-6 py-4",
    },
    {
      key: "tenant",
      header: "Tenant(for coordination)",
      render: (row: any) => (
        <>
          <div className="font-semibold text-sm">
            {row.tenant?.name || "N/A"}
          </div>
          <div className="text-xs text-[#CAB305]">
            {row.tenant?.phone || "N/A"}
          </div>
        </>
      ),
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span
          className={`px-3 py-1 rounded-none font-semibold text-xs ${row.status?.color || "bg-gray-100 text-gray-700"}`}
        >
          {row.status?.label || "N/A"}
        </span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "lockBox",
      header: "Lock Box",
      render: (row: any) => (
        <span
          className={`px-3 py-1 rounded-none font-semibold text-xs ${row.lockBox?.color || "bg-gray-100 text-gray-700"}`}
        >
          {row.lockBox?.label || "N/A"}
        </span>
      ),
      className: "px-6 py-4",
    },
  ];

  return (
    <div className="bg-card rounded-lg">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Tours</h1>
            <div className="flex gap-6">
              <button
                className={`px-12 py-3 border rounded-none text-base font-medium transition-colors duration-100
                  border-[#008BBC] 
                  ${activeTab === "Upcoming" ? "bg-[#FBDE02] text-black" : "bg-white text-[#008BBC]"}
                `}
                onClick={() => setActiveTab("Upcoming")}
              >
                <span
                  className={
                    activeTab === "Upcoming" ? "font-bold" : "font-medium"
                  }
                >
                  Upcoming
                </span>
              </button>
              <button
                className={`px-12 py-3 border rounded-none text-base font-medium transition-colors duration-100
                  border-[#008BBC] 
                  ${activeTab === "Past" ? "bg-[#FBDE02] text-black" : "bg-white text-[#008BBC]"}
                `}
                onClick={() => setActiveTab("Past")}
              >
                <span
                  className={activeTab === "Past" ? "font-bold" : "font-medium"}
                >
                  Past
                </span>
              </button>
              <button
                className={`px-12 py-3 border rounded-none text-base font-medium transition-colors duration-100
                  border-[#008BBC] 
                  ${activeTab === "All" ? "bg-[#FBDE02] text-black" : "bg-white text-[#008BBC]"}
                `}
                onClick={() => setActiveTab("All")}
              >
                <span
                  className={activeTab === "All" ? "font-bold" : "font-medium"}
                >
                  All
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search tenant, landlord and property"
            />
            <div className="flex items-center gap-4 ml-6 w-full justify-end">
              <select
                className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>All Statuses</option>
                <option>Confirmed</option>
                <option>Scheduled</option>
                <option>No-show</option>
                <option>Cancelled</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          {tours.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No tours found</p>
              <p className="text-sm text-gray-400">
                Tours will appear here once your landlord clients schedule them
              </p>
            </div>
          ) : (
            <>
              <Table columns={columns} data={tours} />
              <div className="flex items-center justify-between p-6">
                <Pagination
                  totalRows={tours.length}
                  rowsPerPage={rowsPerPage}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
