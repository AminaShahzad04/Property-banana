"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Image from "next/image";
import { tenantService } from "@/api/tenant.service";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function PlaceBidPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyTitle = searchParams.get("title") || "Property";
  const listingId = params.id ? Number(params.id) : 0;

  const [bidAmount, setBidAmount] = useState("444,000");
  const [selectedInstallments, setSelectedInstallments] = useState(2);
  const [bidsLeft, setBidsLeft] = useState(3);
  const [loading, setLoading] = useState(false);

  const suggestedMin = 430000;
  const suggestedMax = 460000;
  const bidValue = parseInt(bidAmount.replace(/,/g, ""));

  const getBidStrength = () => {
    const midPoint = (suggestedMin + suggestedMax) / 2;

    if (bidValue < suggestedMin) {
      const percentage = Math.max(10, (bidValue / suggestedMin) * 35);
      return { text: "Weak", color: "red", percentage };
    } else if (bidValue < midPoint) {
      const range = midPoint - suggestedMin;
      const progress = (bidValue - suggestedMin) / range;
      const percentage = 35 + progress * 30;
      return {
        text: bidValue < suggestedMin + 8000 ? "Weak" : "Good",
        color: bidValue < suggestedMin + 8000 ? "red" : "orange",
        percentage,
      };
    } else {
      const range = suggestedMax - midPoint;
      const progress = Math.min(1, (bidValue - midPoint) / range);
      const percentage = 65 + progress * 35;
      return { text: "Good", color: "green", percentage };
    }
  };

  const strength = getBidStrength();
  const increaseNeeded = Math.max(0, suggestedMin + 8000 - bidValue);

  const getBidsLeftColor = () => {
    if (bidsLeft === 3) return "text-green-500";
    if (bidsLeft === 2) return "text-yellow-500";
    return "text-red-500";
  };

  const handleSubmit = async () => {
    if (bidsLeft === 0) {
      alert("You have no bids left!");
      return;
    }

    try {
      setLoading(true);
      await tenantService.placeBid({
        listing_id: listingId,
        amount: bidValue,
        frequency: "YEARLY",
        installments: selectedInstallments as 2 | 4 | 8 | 10 | 12,
      });

      const newBidsCount = bidsLeft - 1;
      setBidsLeft(newBidsCount);

      router.push(`/book-tour/${listingId}?bidSuccess=true`);
    } catch (error) {
      console.error("Failed to place bid:", error);
      alert("Failed to place bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const getGradientColor = () => {
    if (strength.color === "red")
      return "from-red-500 via-orange-500 to-yellow-500";
    if (strength.color === "orange")
      return "from-orange-500 via-yellow-500 to-green-500";
    return "from-yellow-500 via-green-400 to-green-500";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 p-12 mt-16">
        <div className="w-full max-w-2xl  shadow-xl  px-8 pb-8">
          {/* Bid Amount + Installments Form */}
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{ width: `${(bidsLeft / 3) * 100}%` }}
                />
              </div>
              <span
                className={`text-sm  pt-4  flex justify-end ${getBidsLeftColor()}`}
              >
                {bidsLeft}/3 Bids
              </span>
            </div>

            {/* Illustration */}
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-32">
                <Image
                  src="/bid.png"
                  alt="Place bid illustration"
                  width={160}
                  height={128}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900  py-4 mb-2">
                Place your winning bid!
              </h2>
              <p className="text-sm text-gray-600">
                You have {bidsLeft} bids. Choose wisely
              </p>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  100,000 AED
                </span>
                <span className="text-sm font-medium text-gray-600">
                  700,000 AED
                </span>
              </div>
              <div className="relative">
                {/* Background - lighter yellow for uncovered area */}
                <div className="w-full h-2 bg-yellow-200 rounded-full"></div>
                {/* Brighter yellow for covered portion */}
                <div
                  className="absolute top-0 left-0 h-2 bg-yellow-400 rounded-full"
                  style={{
                    width: `${Math.min(((bidValue - 100000) / (700000 - 100000)) * 100, 100)}%`,
                  }}
                ></div>
                <input
                  type="range"
                  min="100000"
                  max="700000"
                  step="1000"
                  value={Math.min(bidValue, 700000)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const formatted = parseInt(value).toLocaleString();
                    setBidAmount(formatted);
                  }}
                  className="absolute top-0 w-full h-2 bg-transparent appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: "none",
                  }}
                />
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                  input[type="range"]::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                `}</style>
              </div>
            </div>

            {/* Bid Input */}
            <div className="space-y-2">
              <div className="relative border-2 border-gray-300 overflow-hidden bg-white flex items-center  justify-center h-16">
                <span className="text-lg font-medium text-gray-900">Dhs</span>
                <input
                  id="bid-amount"
                  type="text"
                  value={bidAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = value.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ",",
                    );
                    setBidAmount(formatted);
                  }}
                  className="text-center text-3xl font-bold border-0 focus:ring-0 text-gray-900 bg-transparent outline-none w-auto"
                  style={{ minWidth: "120px" }}
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                Suggested range: Dhs {suggestedMin.toLocaleString()} -{" "}
                {suggestedMax.toLocaleString()}
              </p>
            </div>

            {/* Strength Bar */}
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500 via-orange-500 via-yellow-400 to-green-500"></div>
                <div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{
                    width: `${100 - strength.percentage}%`,
                    marginLeft: `${strength.percentage}%`,
                  }}
                />
              </div>
              <p
                className={`text-center text-sm font-semibold ${
                  strength.color === "red"
                    ? "text-red-500"
                    : strength.color === "orange"
                      ? "text-orange-500"
                      : "text-green-500"
                }`}
              >
                {strength.text} offer
              </p>
            </div>

            {/* Suggestion Message */}
            {increaseNeeded > 0 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <Lightbulb className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <span className="font-medium">
                    Increase your offer by Dhs {increaseNeeded.toLocaleString()}{" "}
                    to reach{" "}
                  </span>
                  <span className="font-bold">stronger</span>
                </p>
              </div>
            )}
            {/* Installments Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">
                Select number of installments
              </h3>
              <p className="text-sm text-gray-600">
                In how many installments do you want to pay?
              </p>

              <div className="flex gap-4 justify-center pt-2">
                {[2, 4, 6, 8, 10, 12].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSelectedInstallments(num)}
                    className={`w-14 h-14 rounded-full font-bold  mx-4 transition-all text-lg flex items-center justify-center ${
                      selectedInstallments === num
                        ? "bg-yellow-400 text-black shadow-md"
                        : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 justify-center mt-10">
              <button
                onClick={handleCancel}
                className="w-40 py-3 text-white font-medium transition-colors"
                style={{ backgroundColor: "#008BBC" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={bidsLeft === 0 || loading}
                className="w-40 py-3 text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#FBDE02" }}
              >
                {loading ? "Submitting..." : "Submit bid"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
