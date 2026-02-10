import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface StepOneProps {
  permitNumber: string;
  setPermitNumber: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
  handleValidate: () => void;
}

export default function StepOne({
  permitNumber,
  setPermitNumber,
  location,
  setLocation,
  availability,
  setAvailability,
  handleValidate,
}: StepOneProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">Verify Permit</h2>

      <div className="max-w-lg mx-auto space-y-6">
        {/* BARR Permit No */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            RARE Permit No<span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <Input
              value={permitNumber}
              onChange={(e) => setPermitNumber(e.target.value)}
              placeholder="Enter License"
              className="flex-1 rounded-[1px]"
            />
            <Button
              onClick={handleValidate}
              className="bg-[#12A94E] hover:bg-[#12A94E] text-white px-6"
            >
              Validate
            </Button>
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-semibold mb-2">Available</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAvailability("immediate")}
              className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                availability === "immediate"
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Immediate
            </button>
            <button
              type="button"
              onClick={() => setAvailability("fromDate")}
              className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                availability === "fromDate"
                  ? "bg-[#FBDE02] text-black"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              From Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
