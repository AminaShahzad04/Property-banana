"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";
import { brokerageService } from "@/api/brokerage.service";
import { agentService } from "@/api/agent.service";

interface Manager {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  agents: number;
  noOfProperties: number;
  status: "Active" | "Suspended";
  lastActivity: string;
}

export function ManagersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      // Note: Backend doesn't have a "list managers" endpoint yet
      // Using agent clients as a demonstration of fetching real data
      // You'll need a proper /dashboard/brokerage/managers or /dashboard/owner/managers endpoint
      const response = await agentService.getClients();

      // Transform the data to match our Manager interface
      const transformedManagers: Manager[] = response.clients
        .filter((client) => client.type === "Landlord") // Filter for managers/landlords
        .map((client) => ({
          id: client.id,
          name: client.fullName,
          email: client.email,
          contactNumber: client.phone,
          agents: 0, // Backend doesn't provide agent count yet
          noOfProperties: client.propertiesCount,
          status: "Active" as const,
          lastActivity: "N/A", // Backend doesn't provide last activity yet
        }));

      setManagers(transformedManagers);
    } catch (error) {
      console.error("Failed to fetch managers:", error);
      // Keep empty array on error
      setManagers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddManager = async () => {
    // This would open a modal/form to collect manager details
    // For now, showing the API structure
    const managerData = {
      fullName: "Manager Name",
      email: "manager@example.com",
      phoneNumber: "+971501234567",
    };

    try {
      await brokerageService.createManager(managerData);
      alert("Manager created successfully!");
      // Refresh manager list
      fetchManagers();
    } catch (error) {
      console.error("Failed to create manager:", error);
      alert("Failed to create manager. Please try again.");
    }
  };

  const filteredData = managers.filter((manager) => {
    const matchesSearch =
      manager.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manager.contactNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const columns = [
    {
      key: "managerName",
      header: "Manager Name",
      render: (manager: Manager) => (
        <div className="flex flex-col">
          <span className="text-gray-900 font-medium">{manager.name}</span>
          <span className="text-xs text-gray-500">{manager.email}</span>
        </div>
      ),
    },
    {
      key: "contactNumber",
      header: "Contact Number",
      render: (manager: Manager) => (
        <span className="text-gray-700">{manager.contactNumber}</span>
      ),
    },
    {
      key: "agents",
      header: "Agents",
      render: (manager: Manager) => (
        <span className="text-cyan-600 font-medium">{manager.agents}</span>
      ),
    },
    {
      key: "noOfProperties",
      header: "No of Properties",
      render: (manager: Manager) => (
        <span className="text-cyan-600 font-medium">
          {manager.noOfProperties}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (manager: Manager) => (
        <span
          className={`px-3 py-1 rounded text-xs font-medium ${
            manager.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {manager.status}
        </span>
      ),
    },
    {
      key: "lastActivity",
      header: "Last Activity",
      render: (manager: Manager) => (
        <span className="text-gray-600 text-sm">{manager.lastActivity}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (manager: Manager) => (
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
          <h1 className="text-2xl mb-2 font-bold">Managers</h1>
          <p className="text-gray-500 text-sm">Manage your brokerage manager</p>
        </div>
        <button
          onClick={handleAddManager}
          className="bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md flex items-center gap-2"
        >
          + Add Manager
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mb-6">
        <SearchBar
          placeholder="Search Manager"
          value={searchTerm}
          onChange={setSearchTerm}
          className="flex-1 max-w-xs"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading managers...</p>
          </div>
        ) : managers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No managers found. Add your first manager to get started.
            </p>
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
