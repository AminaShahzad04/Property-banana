import { PropertiesTable } from "@/components/agent/properties-table";

export const metadata = {
  title: "My Properties - Property Banana",
  description: "Manage your property listings",
};

export default function AgentPropertiesPage() {
  return (
    <div className="p-2">
      <PropertiesTable />
    </div>
  );
}
