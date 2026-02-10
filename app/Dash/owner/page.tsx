import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { AgentProductivityChart } from "@/components/dashboard/agent-productivity-chart";
import { PropertiesByStatusChart } from "@/components/dashboard/properties-by-status-chart";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { BidsFunnel } from "@/components/dashboard/bids-funnel";

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
  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Brokerage Dashboard</h1>
        <p className="text-gray-500">Welcome Back Albert</p>
      </div>

      <DashboardStats stats={ownerStats} columns={4} />

      <div className="grid grid-cols-2 gap-6 mt-8 p-6">
        <div>
          <AgentProductivityChart />
        </div>
        <div>
          <PropertiesByStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6  p-6">
        <div className="col-span-2">
          <RevenueChart />
        </div>
        <div className="col-span-1">
          <BidsFunnel />
        </div>
      </div>
    </div>
  );
}
