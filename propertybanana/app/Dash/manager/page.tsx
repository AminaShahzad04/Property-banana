import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

const managerStats = [
  {
    label: "Upcoming Tour today",
    value: "5",
    subtext: "Next at 2:00 PM",
    icon: "/destination.png",
  },
  {
    label: "Open Bids",
    value: "12",
    subtext: "+4 new today",
    icon: "/bid.png",
  },
  {
    label: "Expired Lock Boxes",
    value: "05",
    subtext: "+4 new today",
    icon: "/lock.png",
  },
];

export const metadata = {
  title: "Manager Dashboard - Property Banana",
  description: "Manager property management dashboard",
};

export default function ManagerDashboardPage() {
  return (
    <>
      <div className="mb-8 p-2">
        <h1 className="text-3xl font-bold">Manager Dashboard</h1>
        <p className="text-muted-foreground pt-2">Welcome Albert</p>
      </div>

      <DashboardStats stats={managerStats} columns={3} />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <ActivityFeed />
      </div>
    </>
  );
}
