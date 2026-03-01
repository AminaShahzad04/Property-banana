import { Button } from "@/components/ui/Button";

interface StepSevenProps {
  description: string;
  setDescription: (value: string) => void;
}

export default function StepSeven({
  description,
  setDescription,
}: StepSevenProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Add Description
      </h2>

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Write description<span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[200px] resize-none"
          />
        </div>

        <div className="flex justify-center">
          <Button className="bg-[#0891B2] hover:bg-[#0e7490] text-white font-medium px-8 py-3 rounded-[1px]">
            Write Description With AI
          </Button>
        </div>
      </div>
    </div>
  );
}
