"use client";

import AddPropertyForm from "@/components/add-property/add-property-form";
import Link from "next/link";

export default function AddPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/landlord/dashboard" className="text-2xl">
              ←
            </Link>
            <h1 className="text-2xl font-bold">Add Property</h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-8 bg-card">
          <AddPropertyForm />
        </div>
      </div>
    </div>
  );
}
