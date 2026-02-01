"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex" style={{ backgroundColor: "#F9F9F9" }}>
        <Sidebar />
        <main className="flex-1  m-8">{children}</main>
      </div>
    </div>
  );
}
