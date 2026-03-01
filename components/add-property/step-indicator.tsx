interface Step {
  id: number;
  icon: string;
  label: string;
}

interface StepIndicatorProps {
  currentStep: number;
}

const steps: Step[] = [
  { id: 1, icon: "/approve.png", label: "Verify Permit" },
  { id: 2, icon: "/file.png", label: "Upload Document" },
  { id: 3, icon: "/property-papers.png", label: "Add Property Detail" },
  { id: 4, icon: "/image-upload.png", label: "Upload Image" },
  { id: 5, icon: "/price.png", label: "Price" },
  { id: 6, icon: "/amenities.png", label: "Add Amenities" },
  { id: 7, icon: "/property-contract.png", label: "Add Description" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-end justify-center mb-8 gap-1">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-end">
          <div className="flex flex-col items-center">
            <div className="relative flex items-end justify-center h-[70px] w-[70px]">
              <img
                src={step.icon}
                alt={step.label}
                width={70}
                height={70}
                className="object-contain h-[70px] w-[70px]"
                style={{ display: "block" }}
              />
            </div>
            <span
              className={`text-xs font-semibold  text-center max-w-[100px] ${
                index + 1 <= currentStep ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex items-end mb-6">
              <img
                src="/arrow.svg"
                alt="Arrow"
                className={`object-contain w-[320px] h-[80px] aspect-[4/1] ${
                  index + 1 < currentStep ? "" : "grayscale opacity-40"
                } ${(index + 1) % 2 === 0 ? "rotate-180 scale-x-[-1]" : ""}`}
                style={{ display: "block" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
