import { StatCard } from "./stat-card"

const stats = [
  { image: "/house.png", label: "All property", value: "586" },
  { image: "/Analysis.png", label: "Total views", value: "12k" },
  { image: "/rating.png", label: "Total visitor reviews", value: "438" },
  { image: "/favourite.png", label: "Total favorite", value: "438" },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  )
}
