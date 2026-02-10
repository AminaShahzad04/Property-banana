interface StepSixProps {
  amenities: {
    bathtub: boolean;
    shampoo: boolean;
    hotWater: boolean;
    dryer: boolean;
    hairDryer: boolean;
    conditioner: boolean;
    showerGel: boolean;
    smokeAlarm: boolean;
    cleaningProducts: boolean;
    bodySoap: boolean;
    tv: boolean;
    boardGames: boolean;
    airConditioner: boolean;
    hangers: boolean;
    iron: boolean;
    bedLinens: boolean;
    extraPillows: boolean;
    dryingRack: boolean;
    essentials: boolean;
    firePit: boolean;
    portableFans: boolean;
    heating: boolean;
    shades: boolean;
    clothingStorage: boolean;
    toaster: boolean;
    indoorFireplace: boolean;
    washer: boolean;
    ironBoard: boolean;
    laundryService: boolean;
    freePaidServices: boolean;
    airStreamComfort: boolean;
    heatFreeInnovations: boolean;
  };
  setAmenities: (amenities: any) => void;
}

export default function StepSix({ amenities, setAmenities }: StepSixProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Add Amenities Details
      </h2>

      <div className="space-y-8">
        {/* Bathroom */}
        <div>
          <h3 className="text-base font-semibold mb-4">Bathroom</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "bathtub", label: "Bathtub", icon: "🛁" },
              { key: "hairDryer", label: "Hair dryer", icon: "💨" },
              {
                key: "cleaningProducts",
                label: "Cleaning products",
                icon: "🧴",
              },
              { key: "shampoo", label: "Shampoo", icon: "🧴" },
              { key: "conditioner", label: "Conditioner", icon: "🧴" },
              { key: "bodySoap", label: "Body soap", icon: "🧼" },
              { key: "hotWater", label: "Hot water", icon: "💧" },
              { key: "showerGel", label: "Shower gel", icon: "🚿" },
              { key: "tv", label: "TV", icon: "📺" },
              { key: "dryer", label: "Dryer", icon: "🌀" },
              { key: "smokeAlarm", label: "Smoke alarm", icon: "🔔" },
              { key: "boardGames", label: "Board games", icon: "🎲" },
            ].map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  amenities[item.key as keyof typeof amenities]
                    ? "bg-yellow-50 border-yellow-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={amenities[item.key as keyof typeof amenities]}
                  onChange={(e) =>
                    setAmenities({
                      ...amenities,
                      [item.key]: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Bedroom */}
        <div>
          <h3 className="text-base font-semibold mb-4">Bedroom</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                key: "airConditioner",
                label: "Air Conditioner",
                icon: "❄️",
              },
              { key: "hangers", label: "Hangers", icon: "👔" },
              { key: "iron", label: "Iron", icon: "🔥" },
              { key: "bedLinens", label: "Bed linens", icon: "🛏️" },
              {
                key: "extraPillows",
                label: "Extra pillows and blankets",
                icon: "🛌",
              },
              { key: "shades", label: "shades", icon: "🪟" },
              {
                key: "dryingRack",
                label: "Drying rack for clothing",
                icon: "🧺",
              },
              { key: "firePit", label: "Fire Pit", icon: "🔥" },
              {
                key: "clothingStorage",
                label: "Clothing storage",
                icon: "🗄️",
              },
              { key: "essentials", label: "Essentials", icon: "⭐" },
              { key: "heating", label: "Heating", icon: "🔥" },
              { key: "toaster", label: "Toaster", icon: "🍞" },
              { key: "portableFans", label: "Portable fans", icon: "💨" },
              {
                key: "indoorFireplace",
                label: "Indoor Fireplace",
                icon: "🔥",
              },
            ].map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  amenities[item.key as keyof typeof amenities]
                    ? "bg-yellow-50 border-yellow-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={amenities[item.key as keyof typeof amenities]}
                  onChange={(e) =>
                    setAmenities({
                      ...amenities,
                      [item.key]: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Laundry */}
        <div>
          <h3 className="text-base font-semibold mb-4">Laundry</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "washer", label: "Washer", icon: "🧺" },
              {
                key: "ironBoard",
                label: "Iron/Ironing board",
                icon: "👔",
              },
              {
                key: "laundryService",
                label: "Wash/fold Laundry",
                icon: "🧼",
              },
              {
                key: "freePaidServices",
                label: "Free/Paid Services",
                icon: "💵",
              },
            ].map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  amenities[item.key as keyof typeof amenities]
                    ? "bg-yellow-50 border-yellow-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={amenities[item.key as keyof typeof amenities]}
                  onChange={(e) =>
                    setAmenities({
                      ...amenities,
                      [item.key]: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Heating and Cooling */}
        <div>
          <h3 className="text-base font-semibold mb-4">Heating and Cooling</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                key: "airConditioner",
                label: "Air Conditioner",
                icon: "❄️",
              },
              {
                key: "airStreamComfort",
                label: "Air Stream Comfort",
                icon: "💨",
              },
              {
                key: "heatFreeInnovations",
                label: "Heat/Free Innovations",
                icon: "🔥",
              },
            ].map((item) => (
              <label
                key={item.key}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  amenities[item.key as keyof typeof amenities]
                    ? "bg-yellow-50 border-yellow-400"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={amenities[item.key as keyof typeof amenities]}
                  onChange={(e) =>
                    setAmenities({
                      ...amenities,
                      [item.key]: e.target.checked,
                    })
                  }
                  className="w-4 h-4"
                />
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
