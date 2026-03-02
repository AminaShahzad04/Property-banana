import { ToursTable } from "@/components/agent/tours-table";

export const metadata = {
  title: "Viewings - Property Banana",
  description: "Manage your viewings and view their status",
};

export default function AgentToursPage() {
  return (
    <div className="p-2">
      <ToursTable />
    </div>
  );
}
