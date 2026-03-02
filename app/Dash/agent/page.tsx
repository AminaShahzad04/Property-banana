"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { userService } from "@/api/user.service";
import { agentService } from "@/api/agent.service";
import Image from "next/image";

const mockActivities = [
  {
    id: 1,
    type: "Bid approved",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "/places/image1.jpg",
  },
  {
    id: 2,
    type: "Review completed",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "/places/image2.jpg",
  },
  {
    id: 3,
    type: "House viewing completed",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "/places/image3.jpg",
  },
  {
    id: 4,
    type: "Review completed",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    image: "/places/image4.jpg",
  },
];

export default function AgentDashboardPage() {
  const [userData, setUserData] = useState<any>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profile, performanceData] = await Promise.all([
          userService.getMyProfile(),
          agentService.getPerformance().catch(() => null),
        ]);
        setUserData(profile);
        setPerformance(performanceData);
      } catch (error) {
        console.error("Failed to fetch agent data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      image: "/house.png",
      label: "Active property",
      value: performance?.activeListings?.toString() || "20",
    },
    {
      image: "/Analysis.png",
      label: "Pending approval",
      value: "10",
    },
    {
      image: "/rating.png",
      label: "Viewing schedule",
      value: performance?.totalTours?.toString() || "5",
    },
    {
      image: "/favourite.png",
      label: "Open bids",
      value: performance?.totalBids?.toString() || "04",
    },
  ];

  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Agent dashboard</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Recent Activities */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recent activities</h2>
            <Card className="p-6">
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <Image
                      src={activity.image}
                      alt={activity.type}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-1">
                        {activity.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
