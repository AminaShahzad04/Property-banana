"use client";

import { Card } from "@/components/ui/card";

const bidsData = [
  { label: "New", value: 60, color: "bg-cyan-500" },
  { label: "Under Review", value: 48, color: "bg-cyan-500" },
  { label: "Accepted", value: 30, color: "bg-green-500" },
  { label: "Rejected", value: 12, color: "bg-red-500" },
];

export function BidsFunnel() {
  const maxValue = 60;

  return (
    <Card className="p-6 mt-8 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-6">Bids funnel</h3>
      <div className="space-y-4">
        {bidsData.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-sm text-gray-600 w-24">{item.label}</span>
            <div className="flex-1 bg-gray-100 rounded-full h-6 relative">
              <div
                className={`${item.color} h-6 rounded-full transition-all duration-500`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-4 px-24">
        <span>0</span>
        <span>15</span>
        <span>30</span>
        <span>45</span>
        <span>60</span>
      </div>
    </Card>
  );
}
