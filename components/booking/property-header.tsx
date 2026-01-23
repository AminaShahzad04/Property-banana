import { Star, MapPin, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PropertyHeaderProps {
  name: string;
  location: string;
  rating: number;
  reviews: number;
  onPlaceBid: () => void;
  onBookTour: () => void;
  bidApproved?: boolean;
}

export function PropertyHeader({
  name,
  location,
  rating,
  reviews,
  onPlaceBid,
  onBookTour,
  bidApproved = false,
}: PropertyHeaderProps) {
  return (
    <div className="bg-white border-0">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-start justify-between mb-3">
          {/* Left - Property Name */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={onPlaceBid}
              variant="outline"
              className="bg-[#008BBC] text-white border-[#008BBC] hover:bg-[#008BBC]/90 px-6"
            >
              {bidApproved ? "Rent A Property" : "Place a Bid"}
            </Button>
            <Button
              onClick={onBookTour}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-6"
            >
              Book A Tour
            </Button>
          </div>
        </div>

        {/* Bottom Row - Rating, Location, Share, Save */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{rating}</span>
              <span className="text-sm text-gray-600 underline cursor-pointer">
                {reviews} reviews
              </span>
            </div>
            <span className="text-gray-400">·</span>
            <div className="text-sm text-gray-900 underline cursor-pointer">
              {location}
            </div>
          </div>

          {/* Share and Save */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 underline">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 underline">
              <Heart className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
