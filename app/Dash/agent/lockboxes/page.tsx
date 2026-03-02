import { LockBoxTable } from "@/components/agent/lockbox-table";

export const metadata = {
  title: "Lockboxes - Property Banana",
  description: "Manage your lockboxes and view their status",
};

export default function AgentLockboxesPage() {
  return (
    <div className="p-2">
      <LockBoxTable />
    </div>
  );
}
