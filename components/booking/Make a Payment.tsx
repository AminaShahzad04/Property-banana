"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Upload, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/footer";

interface RentPropertyModalProps {
  onBack: () => void;
  propertyTitle: string;
  propertyId: string;
  landlord: string;
  amount: string;
}

const steps = [
  {
    id: 1,
    label: "Security Deposit",
    icon: "/deposit.png",
    price: "STEP No 1",
  },
  {
    id: 2,
    label: "Agreement E-Sign",
    icon: "/agreement.png",
    price: "STEP No 2",
  },
  {
    id: 3,
    label: "Platform fees",
    icon: "/platformfees.png",
    price: "STEP No 3",
  },
  {
    id: 4,
    label: "Submit Cheque",
    icon: "/submitcheque.png",
    price: "STEP No 4",
  },
  { id: 5, label: "Deal Completed", icon: "/dealing.png", price: "STEP No 5" },
];

export function RentPropertyModal({
  onBack,
  propertyTitle,
  propertyId,
  landlord,
  amount,
}: RentPropertyModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    address: "",
    selectedDate: "1",
    selectedTime: "",
    chequeImage: null as File | null,
  });

  const timeSlots = [
    { time: "10:00 AM - 11:00 AM", available: true },
    { time: "11:00 AM - 12:00 PM", available: true },
    { time: "12:00 PM - 01:00 PM", available: true },
    { time: "01:00 PM - 02:00 PM", available: false },
    { time: "02:00 PM - 03:00 PM", available: true },
    { time: "03:00 PM - 04:00 PM", available: true },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackButton = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, chequeImage: e.target.files![0] }));
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const currentDate = new Date(2026, 1); // February 2026
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="min-h-screen bg-card py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackButton}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-lg font-semibold">Make a Payment</span>
          </button>
        </div>

        {/* Step Indicators */}

        <div className="flex items-start justify-center mb-8 gap-1">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Image
                    src={step.icon}
                    alt={step.label}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`text-xs font-semibold mt-2 ${
                    index + 1 <= currentStep ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  {step.price}
                </span>
                <span
                  className={`text-xs font-semibold mt-1 text-center max-w-[100px] ${
                    index + 1 <= currentStep ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center mt-8 mx-2">
                  <img
                    src="/arrow.svg"
                    alt="Arrow"
                    width="80"
                    height="20"
                    className={`object-contain ${
                      index % 2 === 1 ? "scale-y-[-1]" : ""
                    } ${
                      index + 1 < currentStep ? "" : "grayscale opacity-40"
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Card */}
        <>
          {/* Step 1: Security Deposit */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto space-y-6 border-0 bg-white p-36 mt-10 pt-8 pb-16 rounded-lg shadow-xl">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-500 mb-2">
                  Amount {amount}
                </h3>
                <h4 className="text-xl font-bold mb-2">
                  Property Reserved for{" "}
                  <span className="text-yellow-500">00:23:55</span>
                </h4>
                <p className="text-sm text-gray-600 mb-6">
                  Complete the{" "}
                  <span className="text-[#008BBC] font-bold cursor-pointer">
                    5% security deposit
                  </span>{" "}
                  to secure this property.
                </p>
              </div>

              <div className="space-y-4 ">
                <div>
                  <Label
                    htmlFor="cardHolderName"
                    className="text-sm font-medium"
                  >
                    Card Holder Name<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="cardHolderName"
                    placeholder="Enter card full Name"
                    value={formData.cardHolderName}
                    onChange={(e) =>
                      handleInputChange("cardHolderName", e.target.value)
                    }
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium">
                    Card number<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="cardNumber"
                    placeholder="Enter card number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className=" mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <Label htmlFor="cvv" className="text-sm font-medium">
                    CVV<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="cvv"
                    placeholder="Enter CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate" className="text-sm font-medium">
                    Expiry Date<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    placeholder="Enter expiry date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleNext}
                  className="w-1/3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                  disabled={
                    !formData.cardHolderName ||
                    !formData.cardNumber ||
                    !formData.cvv ||
                    !formData.expiryDate
                  }
                >
                  Pay
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Agreement E-Sign */}
          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className=" border-0  shadow-lg bg-white rounded-lg p-4">
                  <h4 className="font-bold text-lg mb-4">Booking Summary</h4>
                  <div className="space-y-3 text-base">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Property</span>
                      <span className="font-semibold text-right">
                        {propertyTitle}, {propertyId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Landlord</span>
                      <span className="font-semibold">{landlord}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">lease period</span>
                      <span className="font-semibold">12 Months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Start date</span>
                      <span className="font-semibold">Feb 15, 2026</span>
                    </div>
                  </div>
                </div>

                <div className="border-0  shadow-lg bg-white rounded-lg p-4">
                  <h4 className="font-bold text-sm mb-4">Sign with UAE Pass</h4>

                  <div className="bg-white rounded-lg p-3 mb-4 flex items-start gap-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M12 2L3 7V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V7L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 12L11 14L15 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-xs text-gray-900">
                        Secure Digital Signature
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        Powered by UAE Pass
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      <span className="text-gray-700">
                        Secure Digital Signature
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      <span className="text-gray-700">
                        Secure Digital Signature
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      <span className="text-gray-700">
                        Secure Digital Signature
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleNext}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 text-sm rounded-md"
                  >
                    Sign with UAE pass
                  </Button>
                </div>
              </div>

              <div className="border-0 shadow-lg  rounded-lg mt-6 p-6 bg-white w-1/2">
                <h4 className="font-bold border-b pb-4 text-sm ">Contract</h4>
                <div className="border-0 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src="/contract.png"
                    alt="Contract"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 3: Platform Fee */}
          {currentStep === 3 && (
            <div className="max-w-x2 w-10/12 mx-auto space-y-6  border-0 bg-white shadow-lg  p-36 pt-10 pb-16 rounded-lg">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#4CC576] mb-2">
                  Amount {amount}
                </h3>
                <h4 className="text-xl font-bold mb-6">Platform Fee</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Please submit the platform fee to proceed
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="cardHolderName2"
                    className="text-sm font-medium"
                  >
                    Card Holder Name<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="cardHolderName2"
                    placeholder="Enter card Full Name"
                    value={formData.cardHolderName}
                    onChange={(e) =>
                      handleInputChange("cardHolderName", e.target.value)
                    }
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <Label htmlFor="cardNumber2" className="text-sm font-medium">
                    Card number<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="cardNumber2"
                    placeholder="Enter card number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      handleInputChange("cardNumber", e.target.value)
                    }
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <Label htmlFor="cvv2" className="text-sm font-medium">
                    CVV<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="cvv2"
                    placeholder="Enter CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value)}
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate2" className="text-sm font-medium">
                    Expiry Date<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="expiryDate2"
                    type="date"
                    placeholder="Enter expiry date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange("expiryDate", e.target.value)
                    }
                    className="mt-2 rounded-[1px]"
                    autoComplete="off"
                  />
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
              >
                Pay
              </Button>
            </div>
          )}

          {/* Step 4: Submit Cheque */}
          {currentStep === 4 && (
            <div className="max-w-xl border-0 bg-white rounded-lg p-6 mx-auto space-y-4">
              <h3 className="text-base  pb-2 border-b font-bold mb-4">
                Submit Cheque
              </h3>

              <div className="border border-gray-300 rounded-none p-8 text-center bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="chequeUpload"
                />
                <label htmlFor="chequeUpload" className="cursor-pointer block">
                  <Image
                    src="/upload.png"
                    alt="Upload"
                    width={48}
                    height={48}
                    className="w-12 h-12 mx-auto mb-2"
                  />
                  <p className="text-xs text-gray-600">Upload cheque image</p>
                </label>
                {formData.chequeImage && (
                  <p className="text-xs text-green-600 mt-2 font-medium">
                    ✓ {formData.chequeImage.name}
                  </p>
                )}
              </div>

              <div className="max-w-xs">
                <h4 className="text-sm font-bold mb-2">Book Shipment</h4>
                <div>
                  <Label
                    htmlFor="address"
                    className="text-xs font-medium text-gray-700"
                  >
                    Address<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="address"
                    placeholder="Enter Address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="mt-1 text-sm rounded-none "
                  />
                </div>
              </div>

              <div className="max-w-xs ">
                <h4 className="text-sm font-bold mb-2">Select Date</h4>
                <div className="border-0 p-3 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <span className="font-medium text-xs">February 2025</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ArrowLeft className="w-3 h-3 rotate-180" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-5 text-center text-[13px]">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div key={day} className="text-gray-500 font-medium py-1">
                        {day}
                      </div>
                    ))}
                    {emptyDays.map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() =>
                          handleInputChange("selectedDate", day.toString())
                        }
                        className={`py-1 text-[13px] rounded-full hover:bg-gray-100 ${
                          formData.selectedDate === day.toString()
                            ? "bg-yellow-400 font-semibold"
                            : day === 1
                              ? "bg-yellow-400 font-semibold"
                              : ""
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="max-w-xs">
                <h4 className="text-sm font-bold mb-2">Select Time</h4>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        slot.available &&
                        handleInputChange("selectedTime", slot.time)
                      }
                      disabled={!slot.available}
                      className={`p-2 text-[10px] border rounded ${
                        formData.selectedTime === slot.time
                          ? "bg-yellow-400 border-yellow-400 font-semibold"
                          : slot.available
                            ? "border-gray-300 hover:border-gray-400 bg-white"
                            : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-1/3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 text-sm mt-4"
                disabled={
                  !formData.chequeImage ||
                  !formData.address ||
                  !formData.selectedDate ||
                  !formData.selectedTime
                }
              >
                Done
              </Button>
            </div>
          )}

          {/* Step 5: Rental Confirmed */}
          {currentStep === 5 && (
            <div className="text-center py-16 max-w-xl mx-auto shadow-lg p-8  rounded-lg">
              <div className="w-32 h-32 mx-auto mb-8">
                <Image
                  src="/confirmedRental.png"
                  alt="Success"
                  width={128}
                  height={128}
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-3xl font-bold mb-6">Rental Confirmed!</h3>
              <p className="text-gray-600 text-lg mb-10">
                Your rental application has been successfully completed.
              </p>
            </div>
          )}
        </>
      </div>
      <Footer />
    </div>
  );
}
