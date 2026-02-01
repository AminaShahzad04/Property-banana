import { LandlordTable } from "@/components/agent/landlord-table";

export const metadata = {
  title: "Landlord - Property Banana",
  description: "Manage your landlord relationship and their relationship",
};

export default function AgentLandlordPage() {
  return (
    <div className="p-2">
      <LandlordTable />
    </div>
  );
}
