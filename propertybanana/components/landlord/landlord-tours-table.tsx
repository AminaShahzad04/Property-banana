"use client";

import { useState, useEffect } from "react";
import { Table } from "@/components/ui/Table";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { landlordService, Tour } from "@/api/landlord.service";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LandlordToursTable() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tour["status"] | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await landlordService.getTours();
        setTours(data.tours);
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  // Filter tours
  let filteredTours = tours.filter((tour) =>
    tour.property_id.toString().includes(search.toLowerCase()),
  );

  if (activeTab !== "ALL") {
    filteredTours = filteredTours.filter((tour) => tour.status === activeTab);
  }

  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const getStatusColor = (status: Tour["status"]) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "RESCHEDULED":
        return "bg-yellow-100 text-yellow-700";
      case "NO_SHOW":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "tour_id",
      header: "Tour ID",
      render: (row: Tour) => (
        <span className="font-semibold">#{row.tour_id}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "property_id",
      header: "Property ID",
      render: (row: Tour) => (
        <span className="text-gray-600">#{row.property_id}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "tenant_user_id",
      header: "Tenant ID",
      render: (row: Tour) => (
        <span className="text-gray-600">#{row.tenant_user_id}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "tour_date",
      header: "Date",
      render: (row: Tour) => (
        <span className="text-gray-600">
          {new Date(row.tour_date).toLocaleDateString()}
        </span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "time_slot",
      header: "Time",
      render: (row: Tour) => (
        <span className="text-gray-600">{row.time_slot}</span>
      ),
      className: "px-6 py-4",
    },
    {
      key: "status",
      header: "Status",
      render: (row: Tour) => (
        <span
          className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(row.status)}`}
        >
          {row.status}
        </span>
      ),
      className: "px-6 py-4",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Property Tours</h1>
        <p className="text-gray-600">
          View tours scheduled for your properties
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as any)}
        className="mb-6"
      >
        <TabsList className="flex w-fit gap-2 bg-transparent p-0">
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="SCHEDULED">Scheduled</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
          <TabsTrigger value="RESCHEDULED">Rescheduled</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by property ID..."
        />
      </div>

      {/* Empty State */}
      {tours.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No tours found</p>
          <p className="text-sm text-gray-400">
            Tours will appear here when tenants book viewings
          </p>
        </div>
      ) : (
        <>
          <Table columns={columns} data={paginatedTours} />
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalRows={filteredTours.length}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
