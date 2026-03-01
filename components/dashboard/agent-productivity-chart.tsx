"use client";

import { Card } from "@/components/ui/card";

const agentData = [
  { name: "M-chen", tours: 8, color: "#2563eb" },
  { name: "D-Junior", tours: 20, color: "#ef4444" },
  { name: "J-willison", tours: 12, color: "#000000" },
  { name: "John", tours: 18, color: "#93c5fd" },
  { name: "Akeel", tours: 5, color: "#15803d" },
  { name: "Jason", tours: 16, color: "#facc15" },
];

const maxTours = 20;
const yAxisLabels = [20, 10, 0];

export function AgentProductivityChart() {
  return (
    <div>
      {" "}
      <h1 className="text-base font-semibold mb-3">Agent Productivity</h1>
      <Card className="p-3 rounded-lg border shadow-sm h-[280px] flex flex-col">
        <div className="flex-1 flex">
          {/* Y-axis labels */}
          <div className="flex flex-col justify-between pr-2 text-xs text-gray-500 pb-4">
            {yAxisLabels.map((label, idx) => (
              <span key={idx}>{label}</span>
            ))}
          </div>

          {/* Chart bars */}
          <div className="flex-1 flex items-end justify-between gap-1.5 pl-2 pb-2">
            {agentData.map((agent, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full flex items-end justify-center"
                  style={{ height: "150px" }}
                >
                  <div
                    className="rounded-t transition-all"
                    style={{
                      backgroundColor: agent.color,
                      height: `${(agent.tours / maxTours) * 100}%`,
                      width: "32px",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-1.5 text-center">
                  {agent.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
