"use client";

import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data: any[] = []; // Empty - property views data will come from analytics API

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-6 py-3 rounded-lg shadow-md border border-gray-200">
        <p className="text-blue-500 text-xs font-medium">This Month</p>
        <h3 className="text-2xl font-bold text-gray-900">
          {payload[0].value}M
        </h3>
        <p className="text-blue-500 text-xs font-medium">May</p>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  if (data.length === 0) {
    return (
      <Card className="p-6 mt-8">
        <div className="text-center py-24">
          <p className="text-gray-500 mb-2">No property view data available</p>
          <p className="text-sm text-gray-400">
            View statistics will appear here once you interact with properties
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 mt-8 relative">
      <ResponsiveContainer width="100%" height={295}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD700" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFACD" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e5e5"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#999", fontSize: 12 }}
            padding={{ left: 20, right: 20 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#999", fontSize: 12 }}
            domain={[140, 260]}
            ticks={[140, 180, 220, 260]}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#d0d0d0", strokeDasharray: "5 5" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#FFD700"
            strokeWidth={4}
            fill="url(#colorValue)"
            isAnimationActive={false}
            activeDot={{
              r: 7,
              fill: "#FFD700",
              stroke: "#FFD700",
              strokeWidth: 3,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
