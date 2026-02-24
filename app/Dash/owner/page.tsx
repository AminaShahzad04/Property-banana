"use client";

import { useState, useEffect } from "react";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { userService } from "@/api/user.service";

const ownerStats = [
  {
    label: "Total Manager",
    value: "12",
    subtext: "+2 this month",
    icon: "/team.png",
  },
  {
    label: "Total Agent",
    value: "12",
    subtext: "+4 this month",
    icon: "/management.png",
  },
  {
    label: "Total Landlord",
    value: "05",
    subtext: "+4 this month",
    icon: "/landlord.png",
  },
  {
    label: "Active Property",
    value: "586",
    subtext: "+3 this week",
    icon: "/house.png",
  },
  {
    label: "Pending Tour today",
    value: "5",
    subtext: "Next at 2:00 PM",
    icon: "/destination.png",
  },
  {
    label: "Pending Approval",
    value: "12k",
    subtext: "2 urgent approval",
    icon: "/analysis.png",
  },
  {
    label: "Expired Lock Boxes",
    value: "05",
    subtext: "5 this month",
    icon: "/lock.png",
  },
  {
    label: "BRN Expiring",
    value: "3",
    subtext: "3 this month",
    icon: "/destination.png",
  },
];

export default function OwnerDashboard() {
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
    <div className="min-h-screen flex flex-col w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Brokerage Dashboard</h1>
        <p className="text-gray-500">
          Welcome {loading ? "..." : userData?.full_name || "Owner"}
        </p>
      </div>

      <DashboardStats stats={ownerStats} columns={4} />
    </div>
  );
}
