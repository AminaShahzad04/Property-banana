import { Input } from "@/components/ui/Input";

interface StepThreeProps {
  room: string;
  setRoom: (value: string) => void;
  bedroom: string;
  setBedroom: (value: string) => void;
  propertySize: string;
  setPropertySize: (value: string) => void;
  developer: string;
  setDeveloper: (value: string) => void;
  unitNo: string;
  setUnitNo: (value: string) => void;
  parkingSpaces: string;
  setParkingSpaces: (value: string) => void;
  furnishingType: string;
  setFurnishingType: (value: string) => void;
  propertyAge: string;
  setPropertyAge: (value: string) => void;
  floorNo: string;
  setFloorNo: (value: string) => void;
  ownerName: string;
  setOwnerName: (value: string) => void;
}

export default function StepThree({
  room,
  setRoom,
  bedroom,
  setBedroom,
  propertySize,
  setPropertySize,
  developer,
  setDeveloper,
  unitNo,
  setUnitNo,
  parkingSpaces,
  setParkingSpaces,
  furnishingType,
  setFurnishingType,
  propertyAge,
  setPropertyAge,
  floorNo,
  setFloorNo,
  ownerName,
  setOwnerName,
}: StepThreeProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Add Property Details
      </h2>

      <div className="max-w-xl mx-auto space-y-4 p-8">
        {/* Room */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Room<span className="text-red-500">*</span>
          </label>
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Studio</option>
            <option value="studio">Studio</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4+ Rooms</option>
          </select>
        </div>

        {/* Bedroom */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Bedroom<span className="text-red-500">*</span>
          </label>
          <select
            value={bedroom}
            onChange={(e) => setBedroom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value=""></option>
            <option value="studio">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>

        {/* Property Size */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Property Size<span className="text-red-500">*</span>
          </label>
          <Input
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
            placeholder="Property Size"
            className="rounded-[1px]"
          />
        </div>

        {/* Developer */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Developer<span className="text-red-500">*</span>
          </label>
          <Input
            value={developer}
            onChange={(e) => setDeveloper(e.target.value)}
            placeholder="Developer"
            className="rounded-[1px]"
          />
        </div>

        {/* Unit No */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Unit No<span className="text-red-500">*</span>
          </label>
          <Input
            value={unitNo}
            onChange={(e) => setUnitNo(e.target.value)}
            placeholder="Unit no"
            className="rounded-[1px]"
          />
        </div>

        {/* No of Parking Space */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            No of Parking Space<span className="text-red-500">*</span>
          </label>
          <select
            value={parkingSpaces}
            onChange={(e) => setParkingSpaces(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">1</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Furnishing Type */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Furnishing Type<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFurnishingType("unfurnished")}
              className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                furnishingType === "unfurnished"
                  ? "bg-[#FBDE02] text-black"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Unfurnished
            </button>
            <button
              type="button"
              onClick={() => setFurnishingType("furnished")}
              className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                furnishingType === "furnished"
                  ? "bg-[#FBDE02] text-black"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Furnished
            </button>
          </div>
        </div>

        {/* Property Age */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Property Age<span className="text-red-500">*</span>
          </label>
          <Input
            value={propertyAge}
            onChange={(e) => setPropertyAge(e.target.value)}
            placeholder="Property Age"
            className="rounded-[1px]"
          />
        </div>

        {/* Floor No */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Floor No<span className="text-red-500">*</span>
          </label>
          <select
            value={floorNo}
            onChange={(e) => setFloorNo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">1</option>
            <option value="ground">Ground</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Owner Name<span className="text-red-500">*</span>
          </label>
          <Input
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="Owner Name"
            className="rounded-[1px]"
          />
        </div>
      </div>
    </div>
  );
}
