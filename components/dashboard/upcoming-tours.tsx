import { TourCard } from "./tour-card";
import Link from "next/link";

const sampleTours = [
  {
    id: "1",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    timer: "00:22:00",
    badge: "XXXXXX",
    badgeColor: "yellow" as const,
    status: "upcoming" as const,
  },
  {
    id: "2",
    title: "Palm Jumeirah, Dubai",
    image: "/jumeirah.png",
    date: "Friday, 19 April",
    time: "11:00 AM – 11:30 AM",
    timer: "00:22:00",
    badge: "d4r4fgg",
    badgeColor: "blue" as const,
    status: "upcoming" as const,
  },
];

export function UpcomingTours() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Upcoming Tours</h2>
        <Link
          href="/Dash/tours"
          className="text-sm font-medium underline"
          style={{ color: "#018FBD" }}
        >
          View All Tours
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {sampleTours.map((tour) => (
          <TourCard key={tour.id} {...tour} />
        ))}
      </div>
    </div>
  );
}
