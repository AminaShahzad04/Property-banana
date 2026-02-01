import { StatsGrid } from "@/components/dashboard/stats-grid";
import { QuickAction } from "@/components/dashboard/quick-action";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export const metadata = {
  title: "Agent Dashboard - Property Banana",
  description: "Agent property management dashboard",
};

export default function AgentDashboardPage() {
  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <p className="text-muted-foreground pt-2">Welcome Back Albert</p>
      </div>

      <StatsGrid />

      <div className="mt-8 mb-8">
        <QuickAction />
      </div>

      <div className="grid grid-cols-3 gap-6 items-start">
        <div className="col-span-2">
          <h2 className="text-xl font-bold mb-4">Property Views</h2>
          <RevenueChart />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
