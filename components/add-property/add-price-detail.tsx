import { Input } from "@/components/ui/Input";

interface StepFiveProps {
  rentAmount: string;
  setRentAmount: (value: string) => void;
  rentFrequency: string;
  setRentFrequency: (value: string) => void;
  noCheques: string;
  setNoCheques: (value: string) => void;
  minContractPeriod: string;
  setMinContractPeriod: (value: string) => void;
  vacatingNoticePeriod: string;
  setVacatingNoticePeriod: (value: string) => void;
  maintenanceFees: string;
  setMaintenanceFees: (value: string) => void;
  paidBy: string;
  setPaidBy: (value: string) => void;
}

export default function StepFive({
  rentAmount,
  setRentAmount,
  rentFrequency,
  setRentFrequency,
  noCheques,
  setNoCheques,
  minContractPeriod,
  setMinContractPeriod,
  vacatingNoticePeriod,
  setVacatingNoticePeriod,
  maintenanceFees,
  setMaintenanceFees,
  paidBy,
  setPaidBy,
}: StepFiveProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Add Price Details
      </h2>

      <div className="max-w-lg mx-auto space-y-4">
        {/* Rent AED */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Rent AED<span className="text-red-500">*</span>
          </label>
          <Input
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            placeholder="55,5"
            type="number"
            className="rounded-[1px]"
          />
        </div>

        {/* Rent Frequency */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Rent Frequency<span className="text-red-500">*</span>
          </label>
          <select
            value={rentFrequency}
            onChange={(e) => setRentFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">1</option>
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>

        {/* No Cheques */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            No Cheques<span className="text-red-500">*</span>
          </label>
          <select
            value={noCheques}
            onChange={(e) => setNoCheques(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">1</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
        </div>

        {/* Minimum contract Period */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Minimum contract Period<span className="text-red-500">*</span>
          </label>
          <select
            value={minContractPeriod}
            onChange={(e) => setMinContractPeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">1</option>
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
          </select>
        </div>

        {/* Vacating Notice Period */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Vacating Notice Period<span className="text-red-500">*</span>
          </label>
          <select
            value={vacatingNoticePeriod}
            onChange={(e) => setVacatingNoticePeriod(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">1</option>
            <option value="30">30 Days</option>
            <option value="60">60 Days</option>
            <option value="90">90 Days</option>
          </select>
        </div>

        {/* Maintenance Fees(AED) */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Maintenance Fees(AED)<span className="text-red-500">*</span>
          </label>
          <Input
            value={maintenanceFees}
            onChange={(e) => setMaintenanceFees(e.target.value)}
            placeholder="Enter Email Address"
            className="rounded-[1px]"
          />
        </div>

        {/* Paid By */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Paid By<span className="text-red-500">*</span>
          </label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-400"
          >
            <option value="">Paid By</option>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
    </div>
  );
}
