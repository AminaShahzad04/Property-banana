"use client";

import { useState, useEffect } from "react";
import { TourCard } from "./tour-card";
import Link from "next/link";
import { tenantService, Tour } from "@/api/tenant.service";

export function UpcomingTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await tenantService.getMyTours("SCHEDULED");
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Upcoming Tours</h2>
        <Link
          href="/Dash/tours"
          className="text-sm font-medium underline"
          style={{ color: "#018FBD" }}
        >
          View All
        </Link>
      </div>
      {tours.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-2">No upcoming tours</p>
          <p className="text-sm text-gray-400">Book a tour to view property</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {tours.slice(0, 2).map((tour) => (
            <TourCard
              key={tour.tour_id}
              id={tour.tour_id.toString()}
              title={`Property #${tour.property_id}`}
              image="/jumeirah.png"
              date={new Date(tour.tour_date).toLocaleDateString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              time={tour.time_slot}
              timer="00:00:00"
              badge={tour.status}
              badgeColor="blue"
              status="upcoming"
            />
          ))}
        </div>
      )}
    </div>
  );
}
