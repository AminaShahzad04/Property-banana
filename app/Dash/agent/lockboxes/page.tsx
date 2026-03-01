import { LockBoxTable } from "@/components/agent/lockbox-table";

export const metadata = {
  title: "Tours - Property Banana",
  description: "Manage your tours and view their status",
};

export default function AgentLockboxesPage() {
  return (
    <div className="p-2">
      <LockBoxTable />
    </div>
  );
}
