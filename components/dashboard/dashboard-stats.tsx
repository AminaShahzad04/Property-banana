"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface DashboardStat {
  label: string;
  value: string;
  subtext: string;
  icon: string;
}

interface DashboardStatsProps {
  stats: DashboardStat[];
  columns?: 3 | 4;
}

export function DashboardStats({ stats, columns = 3 }: DashboardStatsProps) {
  const gridClass = columns === 4 ? "grid-cols-4" : "grid-cols-3";

  return (
    <div className={`grid ${gridClass} gap-4 mb-8`}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900">
              {stat.value}
            </span>
            <span className="text-sm text-gray-600">{stat.label}</span>
            <span className="text-xs text-cyan-600">{stat.subtext}</span>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={stat.icon}
              alt={stat.label}
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
