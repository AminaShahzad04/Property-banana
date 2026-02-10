"use client";

import { Card } from "@/components/ui/card";

const propertyData = [
  {
    label: "Active Property",
    percentage: 52.1,
    color: "#facc15",
    dotColor: "bg-yellow-400",
  },
  {
    label: "Pending propert",
    percentage: 22.8,
    color: "#06b6d4",
    dotColor: "bg-cyan-500",
  },
  {
    label: "Rejected Property",
    percentage: 13.9,
    color: "#f87171",
    dotColor: "bg-red-400",
  },
  {
    label: "Draft",
    percentage: 11.2,
    color: "#16a34a",
    dotColor: "bg-green-600",
  },
];

export function PropertiesByStatusChart() {
  return (
    <div>
      {" "}
      <h1 className="text-base font-semibold mb-3">Properties By Status</h1>
      <Card className="p-4 rounded-lg border shadow-sm h-[280px] flex flex-col">
        <div className="flex-1 flex items-center justify-center gap-8">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <div
              className="relative"
              style={{ width: "180px", height: "180px" }}
            >
              <svg className="w-full h-full transform -rotate-90">
                {(() => {
                  let offset = 0;
                  const circumference = 2 * Math.PI * 68;
                  return propertyData.map((item, index) => {
                    const dashArray = (item.percentage / 100) * circumference;
                    const dashOffset = -offset;
                    offset += dashArray;

                    return (
                      <circle
                        key={index}
                        cx="90"
                        cy="90"
                        r="68"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="28"
                        strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                        strokeDashoffset={dashOffset}
                      />
                    );
                  });
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full" />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col space-y-3 min-w-[220px]">
            {propertyData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-3 h-3 rounded-full ${item.dotColor}`} />
                  <span className="text-md text-gray-700 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                <span className="text-md font-semibold ml-4">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
