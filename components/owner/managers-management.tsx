"use client";

import { useState } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { MoreVertical } from "lucide-react";
import { brokerageService } from "@/api/brokerage.service";

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

// Note: API endpoint /dashboard/brokerage/managers does not exist in openapi.yaml
// Using mock data until backend implements the endpoint
const mockManagers: Manager[] = [
  {
    id: "1",
    name: "John Manager",
    email: "john.manager@example.com",
    contactNumber: "+971501234567",
    agents: 5,
    noOfProperties: 23,
    status: "Active",
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    contactNumber: "+971507654321",
    agents: 8,
    noOfProperties: 41,
    status: "Active",
    lastActivity: "1 day ago",
  },
];

export function ManagersManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [managers] = useState<Manager[]>(mockManagers);

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
      // Note: No endpoint to refresh manager list, would need to manually update state
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
