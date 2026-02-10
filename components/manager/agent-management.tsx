"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";

interface Agent {
  id: string;
  agentName: string;
  brnNumber: string;
  lastUpdated: string;
  noOfProperties: number;
  status: "Active" | "Deactivated";
  lastActivity: string;
}

const mockAgents: Agent[] = [
  {
    id: "1",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-325435",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 5,
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: "2",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-142343",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 6,
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: "3",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-323423",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 5,
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: "4",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-323423",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 7,
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: "5",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-323423",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 60,
    status: "Deactivated",
    lastActivity: "3 days ago",
  },
  {
    id: "6",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-323410",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 5,
    status: "Active",
    lastActivity: "2 days ago",
  },
  {
    id: "7",
    agentName: "Amad Al-Maktum",
    brnNumber: "BRN-323423",
    lastUpdated: "20-01-10 10:30 AM",
    noOfProperties: 2,
    status: "Active",
    lastActivity: "2 days ago",
  },
];

export function AgentManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter data based on search term
  const filteredData = mockAgents.filter((agent) => {
    const matchesSearch =
      agent.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.brnNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const columns = [
    {
      key: "agentName",
      header: "Agent Name",
      render: (agent: Agent) => (
        <span className="font-medium">{agent.agentName}</span>
      ),
    },
    {
      key: "brnNumber",
      header: "BRN Number",
      render: (agent: Agent) => (
        <span className="text-gray-600">{agent.brnNumber}</span>
      ),
    },
    {
      key: "lastUpdated",
      header: "last Updated",
      render: (agent: Agent) => (
        <span className="text-gray-600">{agent.lastUpdated}</span>
      ),
    },
    {
      key: "noOfProperties",
      header: "No of Properties",
      render: (agent: Agent) => (
        <span className="text-cyan-600 font-semibold">
          {agent.noOfProperties}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (agent: Agent) => (
        <span
          className={`px-3 py-1  text-xs font-medium ${
            agent.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {agent.status}
        </span>
      ),
    },
    {
      key: "lastActivity",
      header: "Last Activity",
      render: (agent: Agent) => (
        <span className="text-gray-600">{agent.lastActivity}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (agent: Agent) => (
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Agent</h1>
          <p className="text-sm  mt-2 text-gray-500">
            Manage your brokerage agents
          </p>
        </div>
        <Button className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md">
          + Add Agent
        </Button>
      </div>

      <div className="mb-6">
        <SearchBar
          placeholder="Search Agent"
          value={searchTerm}
          onChange={setSearchTerm}
          className="max-w-xs"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} data={filteredData} />
        <Pagination
          totalRows={2500}
          rowsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
