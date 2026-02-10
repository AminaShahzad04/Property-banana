"use client";

import { useState } from "react";
import { Table as ReusableTable } from "@/components/ui/Table";
import { MoreVertical } from "lucide-react";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import Image from "next/image";

export function LockBoxTable() {
  const lockBoxes: any[] = []; // Empty - agent lockboxes come from landlord clients

  const [search, setSearch] = useState("");
  const [property, setProperty] = useState("All Properties");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const columns = [
    {
      key: "property",
      header: "Property",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.property?.image || "/jumeirah.png"}
            alt="property"
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <div className="font-semibold text-sm">
              {row.property?.name || "N/A"}
            </div>
            <div className="text-xs text-gray-500">
              {row.property?.location || "N/A"}
            </div>
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
      key: "lockBoxId",
      header: "LockBox ID",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "addressCode",
      header: "Access Code",
      className: "px-6 py-4 text-sm",
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
      className: "px-6 py-4 text-gray-500 text-sm",
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
      key: "note",
      header: "Note",
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

  return (
    <div className="bg-card rounded-lg">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-1">LockBoxes</h1>
              <p className="text-gray-500">
                Manage lockboxes for your landlord clients' properties
              </p>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <div className="px-6 py-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-700 font-bold text-lg">0</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active LockBoxes</p>
                <p className="text-xl font-bold">0</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-700 font-bold text-lg">0</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expire Soon</p>
                <p className="text-xl font-bold">0</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-white rounded-lg border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-700 font-bold text-lg">0</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Not Configured</p>
                <p className="text-xl font-bold">0</p>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by property, landlord, or lockbox ID"
            />
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          {lockBoxes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-2">No lockboxes found</p>
              <p className="text-sm text-gray-400">
                Lockboxes will appear here once your landlord clients configure
                them
              </p>
            </div>
          ) : (
            <>
              <ReusableTable columns={columns} data={lockBoxes} />
              <Pagination
                totalRows={lockBoxes.length}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
