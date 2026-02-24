"use client";

import { useEffect, useState } from "react";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { QuickAction } from "@/components/dashboard/quick-action";
import { agentService, type AgentPerformance } from "@/api/agent.service";
import { userService } from "@/api/user.service";

export default function AgentDashboardPage() {
  const [performance, setPerformance] = useState<AgentPerformance | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [perfData, profile] = await Promise.all([
          agentService.getPerformance(),
          userService.getMyProfile(),
        ]);
        setPerformance(perfData);
        setUserData(profile);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-muted-foreground pt-2">
          Welcome {loading ? "..." : userData?.full_name || "Agent"}!
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
        </div>
      ) : performance ? (
        <>
          {/* Performance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Total Listings</p>
              <p className="text-3xl font-bold">{performance.totalListings}</p>
              <p className="text-xs text-green-600 mt-1">
                {performance.activeListings} active
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Total Tours</p>
              <p className="text-3xl font-bold">{performance.totalTours}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Bids</p>
              <p className="text-3xl font-bold">{performance.totalBids}</p>
              <p className="text-xs text-green-600 mt-1">
                {performance.approvedBids} approved
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-sm text-gray-600 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold">{performance.conversionRate}</p>
              {performance.averageRating && (
                <p className="text-xs text-gray-600 mt-1">
                  ★ {performance.averageRating.toFixed(1)} rating
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 mb-8">
            <QuickAction />
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            Unable to load performance data
          </p>
        </div>
      )}
    </>
  );
}
