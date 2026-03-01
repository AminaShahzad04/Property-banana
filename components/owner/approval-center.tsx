"use client";

import { useState } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Eye } from "lucide-react";

interface ApprovalRequest {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  agent: string;
  manager: string;
  time: string;
}

const mockApprovals: ApprovalRequest[] = [
  {
    id: "1",
    category: "Property Edit",
    categoryColor: "bg-cyan-500",
    title: "Update property price from 115,000 to 120,000AED",
    agent: "Sarah Johnson",
    manager: "John Smith",
    time: "2 hours ago",
  },
  {
    id: "2",
    category: "New Property",
    categoryColor: "bg-green-500",
    title: "Update property price from 115,000 to 120,000AED",
    agent: "Sarah Johnson",
    manager: "John Smith",
    time: "2 hours ago",
  },
  {
    id: "3",
    category: "Tour Reschedule",
    categoryColor: "bg-purple-500",
    title: "Update property price from 115,000 to 120,000AED",
    agent: "Sarah Johnson",
    manager: "John Smith",
    time: "2 hours ago",
  },
  {
    id: "4",
    category: "Lock Box Code",
    categoryColor: "bg-yellow-500",
    title: "Update property price from 115,000 to 120,000AED",
    agent: "Sarah Johnson",
    manager: "John Smith",
    time: "2 hours ago",
  },
  {
    id: "5",
    category: "BRN Certificate",
    categoryColor: "bg-blue-400",
    title: "Update property price from 115,000 to 120,000AED",
    agent: "Sarah Johnson",
    manager: "John Smith",
    time: "2 hours ago",
  },
];

export function ApprovalCenter() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = mockApprovals.filter((approval) =>
    approval.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-[80vh] flex pl-4 flex-col w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl  mb-2 font-bold">Approval Center</h1>
          <p className="text-gray-500 text-xs">
            Review and approve pending Request
          </p>
        </div>
        <button className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-4 py-1.5 rounded-md text-sm">
          6 Pending Request
        </button>
      </div>

      <div className="mb-4">
        <SearchBar
          placeholder="Search Approval"
          value={searchTerm}
          onChange={setSearchTerm}
          className="max-w-sm"
        />
      </div>

      <div className="space-y-3 bg-white">
        {filteredData.map((approval) => (
          <div
            key={approval.id}
            className="bg-white border-b p-4 m-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="mb-2">
                <span
                  className={`${approval.categoryColor} text-white text-[10px] font-medium px-2 py-0.5 rounded`}
                >
                  {approval.category}
                </span>
              </div>
              <h3 className="text-gray-900 font-semibold text-sm mb-1.5">
                {approval.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>Agent: {approval.agent}</span>
                <span>Manager: {approval.manager}</span>
                <span>{approval.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded-md border border-gray-300">
                <Eye className="w-3.5 h-3.5" />
                <span className="text-xs">View</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-green-700 bg-green-50 hover:bg-green-100 rounded-md border border-green-200">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-xs font-medium">Accept</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-red-700 bg-red-50 hover:bg-red-100 rounded-md border border-red-200">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="text-xs font-medium">Reject</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
