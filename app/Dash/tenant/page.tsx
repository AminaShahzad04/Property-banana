"use client";

import { useState, useEffect } from "react";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { UpcomingTours } from "@/components/dashboard/upcoming-tours";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { userService } from "@/api/user.service";

export default function TenantDashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await userService.getMyProfile();
        setUserData(profile);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
        <p className="text-muted-foreground pt-2">
          Welcome Back {loading ? "..." : userData?.user?.full_name || "Tenant"}
        </p>
      </div>

      <StatsGrid />

      <div className="mt-8 mb-8">
        <UpcomingTours />
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2">
          <h2 className="text-xl font-bold m-2">Property Views</h2>
          <RevenueChart />
        </div>
        <div>
          <h2 className="text-xl font-bold m-2">Recent Activities</h2>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
