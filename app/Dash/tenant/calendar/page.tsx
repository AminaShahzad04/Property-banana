"use client";

import { TenantCalendar } from "@/components/tenant/Calendar";
import { Footer } from "@/components/layout/footer";

export default function CalendarPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-8">
        <TenantCalendar />
      </div>
      <Footer />
    </div>
  );
}
