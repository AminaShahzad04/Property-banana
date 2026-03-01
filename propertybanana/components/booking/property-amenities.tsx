import { Button } from "@/components/ui/Button";
import {
  Leaf,
  Wifi,
  CircleDot,
  Wind,
  Video,
  UtensilsCrossed,
  Flame,
  Bike,
  RefrigeratorIcon,
  Dog,
} from "lucide-react";

interface Amenity {
  icon: string;
  label: string;
  available: boolean;
}

interface PropertyAmenitiesProps {
  amenities: Amenity[];
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Leaf,
      Wifi,
      Dog,
      CircleDot,
      Flame,
      Wind,
      Video,
      UtensilsCrossed,
      Bike,
      Refrigerator: RefrigeratorIcon,
    };
    const Icon = icons[iconName] || Leaf;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="bg-white rounded-none p-6 pl-0 border-b pb-8">
      <h3 className="text-xl font-bold mb-6">What this place offers</h3>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        {amenities.slice(0, 10).map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            {getIcon(amenity.icon)}
            <span className="text-gray-900 text-sm">{amenity.label}</span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="mt-6 border-black text-black hover:bg-gray-50 rounded-lg"
      >
        Show all 37 amenities
      </Button>
    </div>
  );
}
