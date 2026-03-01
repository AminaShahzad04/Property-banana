"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  Calendar,
  House,
  CircleUser,
  Users,
  KeyRound,
  Gavel,
  BarChart3,
  FileText,
} from "lucide-react";

// Tenant sidebar items
const tenantMenuItems = [
  { icon: Compass, label: "Dashboard", href: "/Dash/tenant" },
  { icon: Calendar, label: "My Viewings", href: "/Dash/tours" },
  { icon: Calendar, label: "Calendar", href: "/Dash/tenant/calendar" },
];

const tenantManageListings = [{ icon: House, label: "My Offers", href: "#" }];

const tenantManageAccount = [
  { icon: CircleUser, label: "My Profile", href: "#" },
];

// Landlord sidebar items
const landlordMenuItems = [
  { icon: Compass, label: "Dashboard", href: "/Dash/landlord" },
  { icon: Calendar, label: "Calendar", href: "#" },
];

const landlordManageListings = [
  { icon: House, label: "My Properties", href: "/landlord/add-property" },
];

const landlordManageAccount = [
  { icon: CircleUser, label: "My Profile", href: "#" },
];

// Agent sidebar items
const agentMenuItems = [
  { icon: Compass, label: "Dashboard", href: "/Dash/agent" },
];

const agentManageListings = [
  { icon: House, label: "Properties", href: "/Dash/agent/properties" },
  { icon: Users, label: "Landlord", href: "/Dash/agent/landlord" },
  { icon: Calendar, label: "Tours", href: "/Dash/agent/tours" },
  { icon: KeyRound, label: "Lock Boxes", href: "/Dash/agent/lockboxes" },
  { icon: Gavel, label: "Bids", href: "/Dash/agent/bids" },
];

const agentManageAccount = [
  { icon: CircleUser, label: "Agent Details", href: "/Dash/agent/details" },
];

// Manager sidebar items
const managerMenuItems = [
  { icon: Compass, label: "Dashboard", href: "/Dash/manager" },
];

const managerManageListings = [
  { icon: Users, label: "Brokerage Settings", href: "/Dash/manager/brokerage" },
  { icon: CircleUser, label: "Agent", href: "/Dash/manager/agent" },
  { icon: Users, label: "Landlord", href: "/Dash/manager/landlord" },
  { icon: House, label: "Properties", href: "/Dash/manager/properties" },
  { icon: Calendar, label: "Tours", href: "/Dash/manager/tours" },
  { icon: KeyRound, label: "Lock Boxes", href: "/Dash/manager/lockboxes" },
  { icon: Gavel, label: "Bids", href: "/Dash/manager/bids" },
  { icon: BarChart3, label: "BRN & Expiry", href: "/Dash/manager/brn-expiry" },
  { icon: FileText, label: "Approval Center", href: "/Dash/manager/approval" },
  {
    icon: FileText,
    label: "Activity logs",
    href: "/Dash/manager/activity",
  },
];

const managerManageAccount = [
  { icon: CircleUser, label: "My Profile", href: "#" },
];

// Owner sidebar items
const ownerMenuItems = [
  { icon: Compass, label: "Dashboard", href: "/Dash/owner" },
];

const ownerManageListings = [
  { icon: Users, label: "Brokerage Settings", href: "/Dash/owner/brokerage" },
  { icon: CircleUser, label: "Managers", href: "/Dash/owner/managers" },
  { icon: CircleUser, label: "Agent", href: "/Dash/owner/agent" },
  { icon: Users, label: "Landlord", href: "/Dash/owner/landlord" },
  { icon: House, label: "Properties", href: "/Dash/owner/properties" },
  { icon: Calendar, label: "Tours", href: "/Dash/owner/tours" },
  { icon: KeyRound, label: "Lock Boxes", href: "/Dash/owner/lockboxes" },
  { icon: Gavel, label: "Bids", href: "/Dash/owner/bids" },
  { icon: BarChart3, label: "BRN & Expiry", href: "/Dash/owner/brn-expiry" },
  { icon: FileText, label: "Approval Center", href: "/Dash/owner/approval" },
  {
    icon: FileText,
    label: "Activity logs",
    href: "/Dash/owner/activity-logs",
  },
];

const ownerManageAccount = [
  { icon: CircleUser, label: "My Profile", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  // Determine role from pathname (strict match for dashboard sections)
  let role: "agent" | "landlord" | "tenant" | "manager" | "owner" = "tenant";
  if (pathname?.startsWith("/Dash/agent")) {
    role = "agent";
  } else if (pathname?.startsWith("/Dash/landlord")) {
    role = "landlord";
  } else if (pathname?.startsWith("/Dash/tenant")) {
    role = "tenant";
  } else if (pathname?.startsWith("/Dash/manager")) {
    role = "manager";
  } else if (pathname?.startsWith("/Dash/owner")) {
    role = "owner";
  }

  // Select appropriate items based on role
  const menuItems =
    role === "agent"
      ? agentMenuItems
      : role === "landlord"
        ? landlordMenuItems
        : role === "manager"
          ? managerMenuItems
          : role === "owner"
            ? ownerMenuItems
            : tenantMenuItems;

  const manageListings =
    role === "agent"
      ? agentManageListings
      : role === "landlord"
        ? landlordManageListings
        : role === "manager"
          ? managerManageListings
          : role === "owner"
            ? ownerManageListings
            : tenantManageListings;

  const manageAccount =
    role === "agent"
      ? agentManageAccount
      : role === "landlord"
        ? landlordManageAccount
        : role === "manager"
          ? managerManageAccount
          : role === "owner"
            ? ownerManageAccount
            : tenantManageAccount;

  return (
    <aside className="w-54 flex flex-col gap-8 bg-card p-6">
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
          Main
        </p>
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3 rounded-lg border-0"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
          Manage Listings
        </p>
        <div className="space-y-2">
          {manageListings.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3 rounded-lg border-0"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
          Manage Account
        </p>
        <div className="space-y-2">
          {manageAccount.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Button
                key={item.label}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start gap-3 rounded-lg border-0"
                asChild
              >
                <a href={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
