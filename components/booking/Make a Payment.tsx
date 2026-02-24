"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Upload, ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { userService } from "@/api/user.service";

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
];

export function RentPropertyModal({
  onBack,
  propertyTitle,
  propertyId,
  landlord,
  amount,
}: RentPropertyModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uaePassConnected, setUaePassConnected] = useState(false);
  const [loadingUaePass, setLoadingUaePass] = useState(false);
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
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    const checkUaePassStatus = async () => {
      try {
        setLoadingUaePass(true);
        const status = await userService.getUAEPassStatus();
        setUaePassConnected(status.connected);
      } catch (error) {
        console.error("Failed to check UAE Pass status:", error);
        setUaePassConnected(false);
      } finally {
        setLoadingUaePass(false);
      }
    };
    checkUaePassStatus();
  }, []);

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
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-8 ">
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
                    } ${index + 1 < currentStep ? "" : "grayscale opacity-40"}`}
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
            <div className="w-full mx-auto space-y-6 bg-gray-200 p-8 pb-32">
              <div className="max-w-7xl bg-card   mt-4 mx-auto space-y-6 pb-16">
                {/* Header Info Bar */}
                <div className="flex items-center justify-center gap-8 text-xs text-gray-600  bg-card p-4 border-b ">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Customer location</span>
                    <select className="text-blue-600 font-medium bg-transparent border-none outline-none cursor-pointer">
                      <option value="US">🇺🇸 United States (USD)</option>
                      <option value="AE">🇦🇪 United Arab Emirates (AED)</option>
                      <option value="GB">🇬🇧 United Kingdom (GBP)</option>
                      <option value="EU">🇪🇺 European Union (EUR)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Size</span>
                    <select className="text-gray-900 font-medium bg-transparent border-none outline-none cursor-pointer">
                      <option value="desktop">💻 Desktop</option>
                      <option value="tablet">📱 Tablet</option>
                      <option value="mobile">📱 Mobile</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Theme</span>
                    <select className="text-gray-900 font-medium bg-transparent border-none outline-none cursor-pointer">
                      <option value="default">Default</option>
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                </div>

                <div className="max-w-3xl  mx-auto ">
                  {/* Payment Method Tabs */}
                  <div className="flex gap-3  mx-32 my-6">
                    <button className="flex flex-col  gap-2  pl-2 w-1/3 py-4 border-2 text-left border-blue-500 bg-blue-50 text-blue-600 rounded font-medium text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect
                          x="2"
                          y="5"
                          width="20"
                          height="14"
                          rx="2"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                        />
                        <path
                          d="M2 10h20"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Card
                    </button>
                    <button className="flex  flex-col w-1/3 gap-2 py-2 border border-gray-300 bg-white  text-left  pl-3 text-gray-500 rounded font-medium text-sm">
                      <span className="text-lg">G</span>
                      Google Pay
                    </button>
                    <button className="flex flex-col gap-2 w-1/3 pl-3 text-left py-2 border border-gray-300 bg-white text-gray-500 rounded font-medium text-sm">
                      <span className="text-lg">...</span>
                      Us bank account
                    </button>
                    <button className="flex flex-col gap-2 w-auto px-3 text-left py-2 border border-gray-300 bg-white text-gray-500 rounded font-medium text-sm">
                      ...
                    </button>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 mb-2 mx-32 bg-white p-6 rounded-lg border border-gray-200">
                    <div>
                      <Label
                        htmlFor="cardNumber"
                        className="text-sm font-medium text-gray-700"
                      >
                        Card number
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="cardNumber"
                          placeholder="1234 1234 1234 1234"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
                          className="pr-24 rounded border-gray-300"
                          autoComplete="off"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <img
                            src="/mastercard.svg"
                            alt="Mastercard"
                            className="h-5"
                          />
                          <img src="/visa.svg" alt="Visa" className="h-5" />
                          <img src="/amex.svg" alt="Amex" className="h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="expiryDate"
                          className="text-sm font-medium text-gray-700"
                        >
                          Expiration
                        </Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM / YY"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          className="mt-1 rounded border-gray-300"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="cvv"
                          className="text-sm font-medium text-gray-700"
                        >
                          CVC
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="cvv"
                            placeholder="CVC"
                            value={formData.cvv}
                            onChange={(e) =>
                              handleInputChange("cvv", e.target.value)
                            }
                            className="pr-8 rounded border-gray-300"
                            autoComplete="off"
                          />
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <path d="M2 10h20" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="country"
                        className="text-sm font-medium text-gray-700"
                      >
                        Country
                      </Label>
                      <select
                        id="country"
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleNext}
                      className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded"
                      disabled={
                        !formData.cardNumber ||
                        !formData.cvv ||
                        !formData.expiryDate
                      }
                    >
                      Pay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Agreement E-Sign */}
          {currentStep === 2 && (
            <>
              <div className="flex flex-col gap-6 max-w-xl mx-auto">
                {/* Booking Summary */}
                <div className="border-0 shadow-lg bg-white rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-4">Booking summary</h4>
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

                {/* Contract */}
                <div className="border-0 shadow-lg rounded-lg bg-white p-6">
                  <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h4 className="font-bold text-lg">Contract</h4>
                    <button className="text-sm font-bold text-green-500 underline hover:text-green-600">
                      Download contract
                    </button>
                  </div>
                  <div className="border rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src="/contract.png"
                      alt="Contract"
                      width={800}
                      height={600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Sign with UAE PASS Button */}
              <div className="flex justify-center mt-8 mb-8">
                <Button
                  onClick={handleNext}
                  disabled={uaePassConnected}
                  className="bg-black hover:bg-gray-900 text-white font-semibold py-4 px-12 rounded-lg flex items-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <img
                    src="/UAEPASS_Logo.png"
                    alt="UAE PASS Icon"
                    className="w-6 h-6 mr-2"
                  />
                  Sign with UAE PASS
                </Button>
              </div>
            </>
          )}
          {/* Step 3: Platform Fee */}
          {currentStep === 3 && (
            <div className="w-full mx-auto space-y-6 bg-gray-200 p-8 pb-32">
              <div className="max-w-7xl bg-card mt-4 mx-auto space-y-6 pb-16">
                {/* Header Info Bar */}
                <div className="flex items-center justify-center gap-8 text-xs text-gray-600 bg-card p-4 border-b">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Customer location</span>
                    <select className="text-blue-600 font-medium bg-transparent border-none outline-none cursor-pointer">
                      <option value="US">🇺🇸 United States (USD)</option>
                      <option value="AE">🇦🇪 United Arab Emirates (AED)</option>
                      <option value="GB">🇬🇧 United Kingdom (GBP)</option>
                      <option value="EU">🇪🇺 European Union (EUR)</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Size</span>
                    <select className="text-gray-900 font-medium bg-transparent border-none outline-none cursor-pointer">
                      <option value="desktop">💻 Desktop</option>
                      <option value="tablet">📱 Tablet</option>
                      <option value="mobile">📱 Mobile</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Theme</span>
                    <select className="text-gray-900 font-medium bg-transparent border-none outline-none cursor-pointer">
                      <option value="default">Default</option>
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                </div>

                <div className="max-w-3xl mx-auto">
                  {/* Payment Method Tabs */}
                  <div className="flex gap-3 mx-32 my-6">
                    <button className="flex flex-col gap-2 pl-2 w-1/3 py-4 border-2 text-left border-blue-500 bg-blue-50 text-blue-600 rounded font-medium text-sm">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <rect
                          x="2"
                          y="5"
                          width="20"
                          height="14"
                          rx="2"
                          stroke="currentColor"
                          fill="none"
                          strokeWidth="2"
                        />
                        <path
                          d="M2 10h20"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                      Card
                    </button>
                    <button className="flex flex-col w-1/3 gap-2 py-2 border border-gray-300 bg-white text-left pl-3 text-gray-500 rounded font-medium text-sm">
                      <span className="text-lg">G</span>
                      Google Pay
                    </button>
                    <button className="flex flex-col gap-2 w-1/3 pl-3 text-left py-2 border border-gray-300 bg-white text-gray-500 rounded font-medium text-sm">
                      <span className="text-lg">...</span>
                      Us bank account
                    </button>
                    <button className="flex flex-col gap-2 w-auto px-3 text-left py-2 border border-gray-300 bg-white text-gray-500 rounded font-medium text-sm">
                      ...
                    </button>
                  </div>

                  {/* Card Form */}
                  <div className="space-y-4 mb-2 mx-32 bg-white p-6 rounded-lg border border-gray-200">
                    <div>
                      <Label
                        htmlFor="cardNumber3"
                        className="text-sm font-medium text-gray-700"
                      >
                        Card number
                      </Label>
                      <div className="relative mt-1">
                        <Input
                          id="cardNumber3"
                          placeholder="1234 1234 1234 1234"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            handleInputChange("cardNumber", e.target.value)
                          }
                          className="pr-24 rounded border-gray-300"
                          autoComplete="off"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <img
                            src="/mastercard.svg"
                            alt="Mastercard"
                            className="h-5"
                          />
                          <img src="/visa.svg" alt="Visa" className="h-5" />
                          <img src="/amex.svg" alt="Amex" className="h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="expiryDate3"
                          className="text-sm font-medium text-gray-700"
                        >
                          Expiration
                        </Label>
                        <Input
                          id="expiryDate3"
                          placeholder="MM / YY"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange("expiryDate", e.target.value)
                          }
                          className="mt-1 rounded border-gray-300"
                          autoComplete="off"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="cvv3"
                          className="text-sm font-medium text-gray-700"
                        >
                          CVC
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="cvv3"
                            placeholder="CVC"
                            value={formData.cvv}
                            onChange={(e) =>
                              handleInputChange("cvv", e.target.value)
                            }
                            className="pr-8 rounded border-gray-300"
                            autoComplete="off"
                          />
                          <svg
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect x="2" y="5" width="20" height="14" rx="2" />
                            <path d="M2 10h20" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="country3"
                        className="text-sm font-medium text-gray-700"
                      >
                        Country
                      </Label>
                      <select
                        id="country3"
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="US">United States</option>
                        <option value="UK">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={handleNext}
                      className="w-1/2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded"
                      disabled={
                        !formData.cardNumber ||
                        !formData.cvv ||
                        !formData.expiryDate
                      }
                    >
                      Pay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Submit Cheque */}
          {currentStep === 4 && (
            <div className=" flex  flex-col max-w-xl mx-auto">
              <div className="max-w-xl border-0 bg-white rounded-lg shadow-lg p-8 mx-auto space-y-6">
                <h3 className="text-xl font-bold mb-4">Submit cheque</h3>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="chequeUpload"
                  />
                  <label
                    htmlFor="chequeUpload"
                    className="cursor-pointer block"
                  >
                    <Image
                      src="/upload.png"
                      alt="Upload"
                      width={64}
                      height={64}
                      className="w-16 h-16 mx-auto mb-4"
                    />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Upload cheque image
                    </p>
                    <p className="text-xs text-red-500">
                      Show you upload the correct cheque? It will confirm your
                      property allocation! You can share later
                    </p>
                  </label>
                  {formData.chequeImage && (
                    <p className="text-sm text-green-600 mt-4 font-medium">
                      ✓ {formData.chequeImage.name}
                    </p>
                  )}
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Image
                      src="/avatar.png"
                      alt="User"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="text-sm font-bold">Muhammad Bilal</h4>
                      <p className="text-xs text-gray-500">Letting Agent</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      <button className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                      <button className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-auto">
                <Button
                  onClick={handleNext}
                  className="w-36 mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-sm"
                  disabled={!formData.chequeImage}
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </>
      </div>
      <Footer />
    </div>
  );
}
