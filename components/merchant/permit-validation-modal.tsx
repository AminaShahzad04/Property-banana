"use client";

import { Button } from "@/components/ui/Button";

interface PermitValidationModalProps {
  data: {
    offeringType: string;
    price: string;
    propertyType: string;
    bedrooms: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PermitValidationModal({
  data,
  onConfirm,
  onCancel,
}: PermitValidationModalProps) {
  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-8 space-y-5 shadow-2xl">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">
          Permit Number Validation
        </h1>

        <div className="border-t border-gray-200"></div>

        {/* Success Message */}
        <div className="flex items-center gap-2">
          <svg
            className="w-6 h-6 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-base text-[#4EC57D]">
            The Permit Number is valid!
          </p>
        </div>

        <p className="text-sm text-gray-600">
          We have received the Following data from DLD of this property
        </p>

        {/* Property Details */}
        <div className="bg-gray-100 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-[140px_1fr] gap-x-8 gap-y-4">
            <p className="text-sm font-semibold text-gray-900">Offering type</p>
            <p className="text-sm text-gray-700">{data.offeringType}</p>

            <p className="text-sm font-semibold text-gray-900">Price</p>
            <p className="text-sm text-gray-700">{data.price}</p>

            <p className="text-sm font-semibold text-gray-900">Property Type</p>
            <p className="text-sm text-gray-700">{data.propertyType}</p>

            <p className="text-sm font-semibold text-gray-900">Bedrooms</p>
            <p className="text-sm text-gray-700">{data.bedrooms}</p>
          </div>
        </div>

        {/* Information Text */}
        <p className="text-xs text-gray-600">
          As the information from the LD must legally match the information in
          the listing, we will substitute this data into the listing form. For
          multiple values, you can select the correct one.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={onCancel}
            className="py-3 px-10 w-48 bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 font-medium rounded-[1px]"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="py-3 px-10 w-48 bg-[#FBDE02] hover:bg-yellow-500 text-black font-semibold rounded-[1px]"
          >
            That's Correct, Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
