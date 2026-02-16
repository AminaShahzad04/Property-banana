"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";
import { brokerageService } from "@/api/brokerage.service";
import { agentService } from "@/api/agent.service";

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

export function AgentManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      // Note: Backend doesn't have a "list agents" endpoint yet
      // Using agent clients as a demonstration of fetching real data
      // You'll need a proper /dashboard/brokerage/agents or /dashboard/owner/agents endpoint
      const response = await agentService.getClients();
      
      // Transform the data to match our Agent interface
      const transformedAgents: Agent[] = response.clients.map((client, index) => ({
        id: client.id,
        agent: client.fullName,
        manager: "N/A", // Backend doesn't provide manager info yet
        brnNumber: "N/A", // Backend doesn't provide BRN number yet
        noOfProperties: client.propertiesCount,
        noOfTours: client.toursCount,
        status: "Active" as const,
        lastActivity: "N/A", // Backend doesn't provide last activity yet
      }));
      
      setAgents(transformedAgents);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
      // Keep empty array on error
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

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
      // Refresh agent list
      fetchAgents();
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
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading agents...</p>
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No agents found. Add your first agent to get started.</p>
          </div>
        ) : (
          <>
            <Table columns={columns} data={filteredData} />
            <Pagination
              totalRows={filteredData.length}
              rowsPerPage={8}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
