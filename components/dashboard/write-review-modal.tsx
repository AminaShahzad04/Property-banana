"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourTitle: string;
}

export function WriteReviewModal({
  isOpen,
  onClose,
  tourTitle,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Review submitted:", { tourTitle, rating, review });
    // Handle review submission logic here
    onClose();
    setRating(0);
    setReview("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Close Button */}
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon-sm"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 border-0"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Write a Review
            </h2>
            <p className="text-sm text-gray-600">{tourTitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">
                Rating <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <Label
                htmlFor="review"
                className="text-sm font-medium text-gray-900"
              >
                Your Review <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="review"
                placeholder="Share your experience about this tour..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
                rows={5}
                className="w-full border border-gray-300 px-4 py-3 rounded-none focus:outline-none focus:ring-2 focus:ring-[#008BBC] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={rating === 0 || !review.trim()}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </Button>

            {/* Cancel Button */}
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={onClose}
                className="text-[#008BBC] hover:text-[#008BBC]/80 text-sm font-semibold h-auto p-0"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
