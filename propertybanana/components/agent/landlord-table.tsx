"use client";

import { Button } from "@/components/ui/Button";
import { MoreVertical, Search } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import { Pagination } from "@/components/ui/Pagination";
import { Table } from "@/components/ui/Table";
import { useState, useEffect } from "react";
import { agentService, type Client } from "@/api/agent.service";

export function LandlordTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await agentService.getClients();
        setClients(response.clients);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch clients",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Filter only landlords
  const landlords = clients.filter((client) => client.type === "Landlord");

  const filteredData = landlords.filter(
    (landlord) =>
      landlord.fullName.toLowerCase().includes(search.toLowerCase()) ||
      landlord.email.toLowerCase().includes(search.toLowerCase()) ||
      landlord.phone.toLowerCase().includes(search.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-yellow-400 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-800">{error}</p>
      </div>
    );
  }
  const columns = [
    {
      key: "fullName",
      header: "Landlord Name",
      className: "px-6 py-4 font-semibold text-sm",
    },
    {
      key: "contact",
      header: "Contact Info",
      render: (row: Client) => (
        <>
          <div className="font-semibold">{row.email}</div>
          <div className="text-xs text-gray-500">{row.phone}</div>
        </>
      ),
      className: "px-6 py-4 text-sm",
    },
    {
      key: "propertiesCount",
      header: "No of Properties",
      className: "px-6 py-4 text-blue-600 font-semibold text-sm cursor-pointer",
    },
    {
      key: "toursCount",
      header: "Total Tours",
      className:
        "px-6 py-4 text-green-600 font-semibold text-sm cursor-pointer",
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

  const tableData = paginatedData.map((l) => ({
    ...l,
    contact: l.email,
    action: "",
  }));

  return (
    <div className="bg-card rounded-lg ">
      <div className="bg-gray-50 rounded-lg">
        <div>
          <h1 className="text-2xl font-bold mb-1">Landlord</h1>
          <p className="text-gray-500 mb-6">
            Manage your landlord relationship and their relationship
          </p>
          <div className="flex items-center mb-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, email, or phone number"
            />
          </div>
        </div>
        <div className="bg-card rounded-lg p-6">
          <Table columns={columns} data={tableData} />
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
