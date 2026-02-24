"use client";

import { useState, useEffect } from "react";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { UpcomingTours } from "@/components/dashboard/upcoming-tours";
import { userService } from "@/api/user.service";
import { landlordService } from "@/api/landlord.service";

export default function LandlordDashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [stats, setStats] = useState({ listings: 0, tours: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, listings, tours] = await Promise.all([
          userService.getMyProfile(),
          landlordService.getListings(),
          landlordService.getTours(),
        ]);
        setUserData(profile);
        setStats({
          listings: listings.listings.length,
          tours: tours.tours.length,
        });
      } catch (error) {
        console.error("Failed to fetch landlord data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Property Dashboard</h1>
        <p className="text-muted-foreground pt-2">
          Welcome {loading ? "..." : userData?.full_name || "Landlord"}
        </p>
      </div>

      <StatsGrid />

      <div className="mt-8 mb-8">
        <UpcomingTours />
      </div>
    </>
  );
}
