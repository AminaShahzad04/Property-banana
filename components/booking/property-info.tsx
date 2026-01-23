import Image from "next/image";
import { Home, Sparkles, Key } from "lucide-react";

interface PropertyInfoProps {
  host: {
    name: string;
    image: string;
  };
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
}

export function PropertyInfo({
  host,
  guests,
  bedrooms,
  beds,
  bathrooms,
  description,
}: PropertyInfoProps) {
  return (
    <div className="bg-white rounded-none p-6 pl-0 space-y-6">
      {/* Title and Host */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-bold">
            Entire rental unit hosted by {host.name}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <span>{guests} guests</span>
            <span>·</span>
            <span>{bedrooms} bedroom</span>
            <span>·</span>
            <span>{beds} bed</span>
            <span>·</span>
            <span>{bathrooms} bath</span>
          </div>
        </div>
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={host.image || "/Avatar.png"}
            alt={host.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Extra Details */}
      <div className="space-y-4 border-b pb-6">
        <div className="flex items-start gap-3">
          <Home className="w-6 h-6 text-gray-700 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Entire home</p>
            <p className="text-sm text-gray-600">
              You'll have the apartment to yourself
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-gray-700 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Enhanced Clean</p>
            <p className="text-sm text-gray-600">
              This Host committed to Airbnb's 5-step enhanced cleaning process.{" "}
              <button className="text-gray-900 underline font-semibold">
                Show more
              </button>
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Key className="w-6 h-6 text-gray-700 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Self check-in</p>
            <p className="text-sm text-gray-600">
              Check yourself in with the keypad.
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-gray-700 leading-relaxed">{description}</p>
        <button className="text-[#008BBC] font-semibold text-sm mt-2 hover:underline">
          Show more
        </button>
      </div>
    </div>
  );
}
