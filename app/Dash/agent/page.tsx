"use client";

import { useEffect, useState } from "react";
import { QuickAction } from "@/components/dashboard/quick-action";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { userService } from "@/api/user.service";

export default function AgentDashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("🔍 [AGENT DASHBOARD] Fetching user profile...");
        const profile = await userService.getMyProfile();
        console.log("✅ [AGENT DASHBOARD] Profile data:", profile);
        setUserData(profile);
      } catch (error) {
        console.error("❌ [AGENT DASHBOARD] Failed to fetch profile:", error);
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
          Welcome {loading ? "..." : userData?.user?.full_name || "Agent"}!
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
        </div>
      ) : userData ? (
        <>
          {/* Agent Profile Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">
                  {userData.user?.full_name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{userData.user?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">
                  {userData.user?.phone_no || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-medium">
                  {userData.roles && userData.roles.length > 0
                    ? userData.roles[0].role_name
                    : "Agent"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-medium capitalize">
                  {userData.user?.status || "Active"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Member Since</p>
                <p className="font-medium">
                  {userData.user?.created_at
                    ? new Date(userData.user.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-blue-600 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 mb-1">
                  Welcome to Your Agent Dashboard
                </p>
                <p className="text-xs text-blue-700">
                  To access full agent features like property management,
                  performance metrics, and client management, please complete
                  your brokerage registration or contact your brokerage
                  administrator.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <QuickAction />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <ActivityFeed />
          </div>
        </>
      ) : (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">
            Unable to load profile data. Please try refreshing the page.
          </p>
        </div>
      )}
    </>
  );
}
