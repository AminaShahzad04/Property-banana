import { Card } from "@/components/ui/card";

const activities = [
  {
    id: "1",
    type: "Bid Approved",
    description: "Your listing House on the Beverly Hills has been approved",
    image: "/jumeirah.png",
  },
  {
    id: "2",
    type: "Review Completed",
    description: "Dollie Horton left a review on House on the Northridge",
    image: "/jumeirah.png",
  },
  {
    id: "3",
    type: "House Approved",
    description: "Your listing House on the Beverly Hills has been approved",
    image: "/jumeirah.png",
  },
  {
    id: "4",
    type: "Review",
    description: "Your listing House on the Beverly Hills has been approved",
    image: "/jumeirah.png",
  },
];

export function ActivityFeed() {
  return (
    <Card className="p-6 mt-16">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-3 pb-3 last:pb-0"
          >
            <img
              src={activity.image || "/placeholder.svg"}
              alt={activity.type}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{activity.type}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
