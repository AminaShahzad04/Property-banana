import { Card } from "@/components/ui/card";

const activities: any[] = []; // Empty - activities will come from backend notifications API

export function ActivityFeed() {
  return (
    <Card className="p-6 mt-8">
      {activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">No recent activities</p>
          <p className="text-sm text-gray-400">
            Your recent actions will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 pb-3 last:pb-0">
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
      )}
    </Card>
  );
}
