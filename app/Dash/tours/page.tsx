"use client";

import { useState, useEffect } from "react";
import { TourCard } from "@/components/dashboard/tour-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { tenantService, type Tour } from "@/api/tenant.service";

interface TourCardData {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  timer?: string;
  badge?: string;
  badgeColor?: "yellow" | "blue";
  status: "upcoming" | "cancelled" | "rescheduled" | "completed";
  errorMessage?: string;
}

export default function ToursPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [tours, setTours] = useState<TourCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await tenantService.getMyTours();

      // Transform API data to match TourCard component expectations
      const transformedTours: TourCardData[] = response.tours.map((tour) => {
        // Map API status to component status
        const statusMap: Record<Tour["status"], TourCardData["status"]> = {
          SCHEDULED: "upcoming",
          CANCELLED: "cancelled",
          RESCHEDULED: "rescheduled",
          COMPLETED: "completed",
          NO_SHOW: "cancelled",
        };

        // Format date and time
        const tourDate = new Date(tour.tour_date);
        const formattedDate = tourDate.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

        // Generate dummy lockbox codes for upcoming tours
        const dummyLockboxCodes = [
          "XXXXXX",
          "d4r4fgg",
          "a1b2c3",
          "xy9876",
          "lock42",
        ];
        const randomCode =
          dummyLockboxCodes[tour.tour_id % dummyLockboxCodes.length];

        return {
          id: tour.tour_id.toString(),
          title:
            tour.property_title ||
            tour.property_location ||
            `Property #${tour.property_id}`,
          image: tour.property_image || "/jumeirah.png",
          date: formattedDate,
          time: tour.time_slot,
          status: statusMap[tour.status],
          // Add timer for upcoming tours (dummy if not provided)
          timer: statusMap[tour.status] === "upcoming" ? "00:22:00" : undefined,
          // Add lockbox badge for upcoming tours (dummy if not provided)
          badge: statusMap[tour.status] === "upcoming" ? randomCode : undefined,
          badgeColor: (tour.tour_id % 2 === 0 ? "yellow" : "blue") as
            | "yellow"
            | "blue",
          // Add error message for cancelled tours (dummy if not provided)
          errorMessage:
            statusMap[tour.status] === "cancelled"
              ? "Cancelled due to maintenance issue at the property."
              : undefined,
        };
      });

      setTours(transformedTours);
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTours = tours.filter((tour) => tour.status === activeTab);

  const getTabTitle = (status: string) => {
    const titles: Record<string, string> = {
      upcoming: "Upcoming Tour",
      cancelled: "Cancelled by Landlord",
      rescheduled: "Rescheduled Tour",
      completed: "Cancelled by Landlord",
    };
    return titles[status] || status;
  };

  return (
    <div className="min-h-screen bg-card p-8 ">
      <h1 className="text-4xl font-bold mb-2">My viewings</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="flex w-fit gap-2 bg-transparent p-0">
          <TabsTrigger
            value="upcoming"
            className="px-6 py-2 rounded-none border-1 bg-white border-[#008BBC] text-[#008BBC] data-[state=active]:bg-yellow-400 data-[state=active]:border-yellow-400 data-[state=active]:text-black font-medium"
          >
            Upcoming Tours
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="px-6 py-2 rounded-none border-1 bg-white border-[#008BBC] text-[#008BBC] data-[state=active]:bg-yellow-400 data-[state=active]:border-yellow-400 data-[state=active]:text-black font-medium"
          >
            Cancelled
          </TabsTrigger>
          <TabsTrigger
            value="rescheduled"
            className="px-6 py-2 rounded-none border-1 bg-white border-[#008BBC] text-[#008BBC] data-[state=active]:bg-yellow-400 data-[state=active]:border-yellow-400 data-[state=active]:text-black font-medium"
          >
            Rescheduled
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="px-6 py-2 rounded-none border-1 bg-white border-[#008BBC] text-[#008BBC] data-[state=active]:bg-yellow-400 data-[state=active]:border-yellow-400 data-[state=active]:text-black font-medium"
          >
            Completed
          </TabsTrigger>
        </TabsList>

        {["upcoming", "cancelled", "rescheduled", "completed"].map((status) => (
          <TabsContent key={status} value={status} className="mt-6">
            <h2 className="text-xl font-bold mb-8">{getTabTitle(status)}</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-200 border-t-yellow-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading tours...</p>
              </div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No {status} tours found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                {filteredTours.map((tour) => (
                  <TourCard key={tour.id} {...tour} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
