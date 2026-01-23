import { Button } from "@/components/ui/Button";
import { Compass, Calendar, House, CircleUser, LogOut } from "lucide-react";

const menuItems = [
  { icon: Compass, label: "Dashboard", href: "/Dash/dashboard" },
  { icon: Calendar, label: "Calendar", href: "#" },
];

const manageListings = [
  {
    icon: House,
    label: "My Offers",
    href: "#",
    variant: "default" as const,
  },
];

const manageAccount = [
  { icon: CircleUser, label: "My Profile", href: "#" },
  { icon: LogOut, label: "Logout", href: "#" },
];

export function Sidebar() {
  return (
    <aside className="w-54 flex flex-col gap-8 bg-card p-6">
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
          Main
        </p>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 rounded-lg border-0"
              asChild
            >
              <a href={item.href}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
          Manage Listings
        </p>
        <div className="space-y-2">
          {manageListings.map((item) => (
            <Button
              key={item.label}
              variant={item.variant}
              className="w-full justify-start gap-3 rounded-lg border-0"
              asChild
            >
              <a href={item.href}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            </Button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">
          Manage Account
        </p>
        <div className="space-y-2">
          {manageAccount.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 rounded-lg border-0"
              asChild
            >
              <a href={item.href}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
