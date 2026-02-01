import { Button } from "@/components/ui/Button";

const quickActions = [
  {
    title: "Add new Property",
    description: "Create a new property listing",
    buttonText: "Add Property",
    buttonVariant: "default" as const,
  },
  {
    title: "Schedule tour",
    description: "Book a property visit",
    buttonText: "Schedule Tour",
    buttonVariant: "default" as const,
  },
  {
    title: "Submit Bid",
    description: "Place an offer on a listing",
    buttonText: "Submit Bid",
    buttonVariant: "default" as const,
  },
];

export function QuickAction() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Quick Action</h2>
      <div className="grid grid-cols-3 gap-6">
        {quickActions.map((action) => (
          <div
            key={action.title}
            className="bg-white rounded-lg p-6 border shadow-sm flex flex-col justify-between"
          >
            <div>
              <h3 className="text-base font-bold mb-2">{action.title}</h3>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-gray-600">{action.description}</p>
                <Button
                  variant={action.buttonVariant}
                  className="text-black font-semibold whitespace-nowrap"
                  style={{ backgroundColor: "#FBDE02" }}
                >
                  {action.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
