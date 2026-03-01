"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";

const MapComponent = dynamic(
  () => import("./map-component").then((mod) => mod.MapComponent),
  { ssr: false }
);

interface PropertyLocationProps {
  location: string;
}

export function PropertyLocation({ location }: PropertyLocationProps) {
  return (
    <div className="bg-white rounded-none p-6 sticky top-6">
      <h3 className="text-xl font-bold mb-4">Location</h3>

      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-1">Address</p>
        <p className="text-sm text-gray-600">
          Lorem Ipsum is simply dummy text
        </p>
      </div>

      {/* Map */}
      <div className="relative w-full h-[300px] bg-gray-200 rounded-none overflow-hidden mb-4 border-4 border-[#008BBC]">
        <MapComponent location={location} />
      </div>

      <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
        Get Direction from your current Location
      </Button>
    </div>
  );
}
