"use client";

import { useState } from "react";
import { TourCard } from "@/components/dashboard/tour-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const allTours = [
  {
    id: "1",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    timer: "00:22:00",
    badge: "XXXXXX",
    badgeColor: "yellow" as const,
    status: "upcoming" as const,
  },
  {
    id: "2",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    timer: "00:22:00",
    badge: "d4r4fgg",
    badgeColor: "blue" as const,
    status: "upcoming" as const,
  },
  {
    id: "3",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    status: "cancelled" as const,
    errorMessage: "Cancelled due to maintenance issue at the property.",
  },
  {
    id: "4",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    status: "cancelled" as const,
    errorMessage: "Cancelled due to maintenance issue at the property.",
  },
  {
    id: "5",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    status: "rescheduled" as const,
  },
  {
    id: "6",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    status: "rescheduled" as const,
  },
  {
    id: "7",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    status: "completed" as const,
  },
  {
    id: "8",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    status: "completed" as const,
  },
];

export default function ToursPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredTours = allTours.filter((tour) => tour.status === activeTab);

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
      <h1 className="text-4xl font-bold mb-2">My Tours</h1>

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
            <div className="grid grid-cols-2 gap-6">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} {...tour} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
