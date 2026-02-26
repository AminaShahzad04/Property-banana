"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";
import { brokerageService } from "@/api/brokerage.service";

interface Agent {
  id: string;
  agent: string;
  manager: string;
  brnNumber: string;
  noOfProperties: number;
  noOfTours: number;
  status: "Active" | "Suspended";
  lastActivity: string;
}

// Note: API endpoint /dashboard/brokerage/agents does not exist in openapi.yaml
// Using mock data until backend implements the endpoint
const mockAgents: Agent[] = [
  {
    id: "1",
    agent: "Ahmed Ali",
    manager: "John Manager",
    brnNumber: "BRN-2024-001",
    noOfProperties: 12,
    noOfTours: 45,
    status: "Active",
    lastActivity: "1 hour ago",
  },
  {
    id: "2",
    agent: "Mohammed Hassan",
    manager: "Sarah Williams",
    brnNumber: "BRN-2024-002",
    noOfProperties: 18,
    noOfTours: 67,
    status: "Active",
    lastActivity: "3 hours ago",
  },
];

export function AgentManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [agents] = useState<Agent[]>(mockAgents);

  const handleAddAgent = async () => {
    // This would open a modal/form to collect agent details
    // For now, showing the API structure
    const agentData = {
      fullName: "Agent Name",
      email: "agent@example.com",
      phoneNumber: "+971501234567",
      licenseNumber: "BRN123456",
    };

    try {
      await brokerageService.createAgent(agentData);
      alert("Agent created successfully!");
      // Note: No endpoint to refresh agent list, would need to manually update state
    } catch (error) {
      console.error("Failed to create agent:", error);
      alert("Failed to create agent. Please try again.");
    }
  };

  const filteredData = agents.filter((agent) => {
    const matchesSearch =
      agent.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.brnNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const columns = [
    {
      key: "agent",
      header: "Agent",
      render: (agent: Agent) => (
        <span className="text-gray-900">{agent.agent}</span>
      ),
    },
    {
      key: "manager",
      header: "Manager",
      render: (agent: Agent) => (
        <span className="text-gray-900">{agent.manager}</span>
      ),
    },
    {
      key: "brnNumber",
      header: "BRN Number",
      render: (agent: Agent) => (
        <span className="text-gray-500">{agent.brnNumber}</span>
      ),
    },
    {
      key: "noOfProperties",
      header: "No of Properties",
      render: (agent: Agent) => (
        <span className="text-cyan-600 font-medium">
          {agent.noOfProperties}
        </span>
      ),
    },
    {
      key: "noOfTours",
      header: "No of Tours",
      render: (agent: Agent) => (
        <span className="text-cyan-600 font-medium">{agent.noOfTours}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (agent: Agent) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
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
        <span className="text-gray-600 text-sm">{agent.lastActivity}</span>
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agent</h1>
          <p className="text-gray-500  mt-2 text-sm">
            Manage your brokerage agents
          </p>
        </div>
        <button
          onClick={handleAddAgent}
          className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md flex items-center gap-2"
        >
          + Add Agent
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Agent"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <Table columns={columns} data={filteredData} />
        <Pagination
          totalRows={filteredData.length}
          rowsPerPage={8}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
