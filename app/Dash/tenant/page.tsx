import { StatsGrid } from "@/components/dashboard/stats-grid";
import { UpcomingTours } from "@/components/dashboard/upcoming-tours";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export const metadata = {
  title: "Property Banana - Dashboard",
  description: "Property management dashboard",
};

export default function TenantDashboardPage() {
  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Talent Dashboard</h1>
        <p className="text-muted-foreground pt-2">Welcome Back Albert</p>
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
