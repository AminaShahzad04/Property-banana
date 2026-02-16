"use client";

import { useState, useEffect } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import Image from "next/image";
import { tenantService } from "@/api/tenant.service";

interface PlaceBidModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  listingId: number;
  initialBids?: number;
  onBidSubmitted?: (newBidsCount: number) => void;
  onBidSuccess?: () => void;
}

export function PlaceBidModal({
  isOpen,
  onClose,
  propertyTitle,
  listingId,
  initialBids = 3,
  onBidSubmitted,
  onBidSuccess,
}: PlaceBidModalProps) {
  const [step, setStep] = useState(0); // 0: intro, 1: bid, 2: installments, 3: success
  const [bidAmount, setBidAmount] = useState("444,000");
  const [selectedInstallments, setSelectedInstallments] = useState(2);
  const [bidsLeft, setBidsLeft] = useState(initialBids);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{label: string; amount: number}[]>([]);

  useEffect(() => {
    if (isOpen && listingId) {
      fetchBidSuggestions();
    }
  }, [isOpen, listingId]);

  const fetchBidSuggestions = async () => {
    try {
      const response = await tenantService.getBidSuggestions(listingId);
      setSuggestions(response.suggestions);
      if (response.suggestions.length > 0) {
        setBidAmount(response.suggestions[0].amount.toLocaleString());
      }
    } catch (error) {
      console.error("Failed to fetch bid suggestions:", error);
    }
  };

  const suggestedMin = 430000;
  const suggestedMax = 460000;
  const bidValue = parseInt(bidAmount.replace(/,/g, ""));

  const getBidStrength = () => {
    const midPoint = (suggestedMin + suggestedMax) / 2;

    if (bidValue < suggestedMin) {
      // Below minimum: 0-35% - Weak/Red
      const percentage = Math.max(10, (bidValue / suggestedMin) * 35);
      return { text: "Weak", color: "red", percentage };
    } else if (bidValue < midPoint) {
      // Between min and mid: 35-65% - transitioning to Good
      const range = midPoint - suggestedMin;
      const progress = (bidValue - suggestedMin) / range;
      const percentage = 35 + progress * 30;
      return {
        text: bidValue < suggestedMin + 8000 ? "Weak" : "Good",
        color: bidValue < suggestedMin + 8000 ? "red" : "orange",
        percentage,
      };
    } else {
      // Above midpoint: 65-100% - Good/Green
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

  if (!isOpen) return null;

  const handleContinue = () => {
    if (bidsLeft === 0) {
      alert("You have no bids left!");
      return;
    }
    setStep(1);
  };

  const handleNext = () => {
    if (bidsLeft === 0) {
      alert("You have no bids left!");
      return;
    }
    setStep(2);
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

      if (onBidSubmitted) {
        onBidSubmitted(newBidsCount);
      }

      setStep(3);
    } catch (error) {
      console.error("Failed to place bid:", error);
      alert("Failed to place bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (step === 3 && onBidSuccess) {
      onBidSuccess(); // Trigger bid approved state
    }
    setStep(0);
    onClose();
  };

  const getGradientColor = () => {
    if (strength.color === "red")
      return "from-red-500 via-orange-500 to-yellow-500";
    if (strength.color === "orange")
      return "from-orange-500 via-yellow-500 to-green-500";
    return "from-yellow-500 via-green-400 to-green-500";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="p-8">
            {/* Illustration */}
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-32">
                <Image
                  src="/bid.png"
                  alt="Place bid illustration"
                  width={145}
                  height={100}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Place Your Winning Bid!
              </h2>
              <p className="text-sm text-gray-600">
                You have {bidsLeft} bids. Choose wisely!
              </p>
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={bidsLeft === 0}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 h-12 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 1: Bid Amount */}
        {step === 1 && (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="text-gray-700 hover:text-gray-900"
                ></button>
                <span className="font-bold text-lg  pl-36 text-gray-900">
                  Place A Bid
                </span>
              </div>
              <span className={`text-sm font-semibold ${getBidsLeftColor()}`}>
                {bidsLeft}/3 Bids Left
              </span>
            </div>

            <div className="space-y-6">
              {/* Bid Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="bid-amount"
                  className="text-sm font-bold text-gray-900 mb-4"
                >
                  Your offer
                </Label>
                <div className="relative border-1 border-black rounded-none overflow-hidden bg-white">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 font-medium text-lg">
                    Dhs
                  </span>
                  <Input
                    id="bid-amount"
                    type="text"
                    value={bidAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      const formatted = value.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      );
                      setBidAmount(formatted);
                    }}
                    className="pl-16 pr-4 text-2xl font-bold h-16 border-0 focus:ring-0 text-gray-900 rounded-none"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Suggested Range: Dhs {suggestedMin.toLocaleString()} -{" "}
                  {suggestedMax.toLocaleString()}
                </p>
              </div>

              {/* Strength Bar */}
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full bg-gradient-to-r ${getGradientColor()}`}
                    style={{ width: `${strength.percentage}%` }}
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
                  {strength.text} Offer
                </p>
              </div>

              {/* Suggestion Message */}
              {increaseNeeded > 0 && (
                <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <Lightbulb className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">
                      Increase Your Offer By Dhs{" "}
                      {increaseNeeded.toLocaleString()} To Reach{" "}
                    </span>
                    <span className="font-bold">Stronger</span>
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleClose}
                  className="text-gray-900 font-medium underline hover:text-gray-700"
                >
                  Clear
                </button>
                <Button
                  onClick={handleNext}
                  disabled={bidsLeft === 0}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-12 font-semibold disabled:opacity-50 rounded-lg"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Installments */}
        {step === 2 && (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <span className="font-semibold text-lg text-gray-900">
                  Place A Bid
                </span>
              </div>
              <span className={`text-sm font-semibold ${getBidsLeftColor()}`}>
                {bidsLeft}/3 Bids Left
              </span>
            </div>

            <div className="space-y-6">
              {/* Installments Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900">
                  Select no of Installments
                </h3>
                <p className="text-sm text-gray-600">
                  In How Many Installments Do You Want To Pay?
                </p>

                <div className="grid grid-cols-5 gap-3 pt-2">
                  {[2, 4, 6, 10, 12].map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedInstallments(num)}
                      className={`py-3 px-2 rounded-lg font-bold transition-colors text-lg ${
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
              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={handleClose}
                  className="text-gray-900 font-medium underline hover:text-gray-700"
                >
                  Clear
                </button>
                <Button
                  onClick={handleSubmit}
                  disabled={bidsLeft === 0}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 h-12 px-8 font-semibold disabled:opacity-50 rounded-lg"
                >
                  Submit Bid
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="p-8">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <Image src="/checked.png" alt="Success" layout="fill" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Congratulations
              </h2>
              <p className="text-sm text-gray-600">
                You bid has been successfully place...
              </p>
            </div>

            {/* OK Button */}
            <Button
              onClick={handleClose}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 h-12 font-semibold text-base"
            >
              Ok
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
