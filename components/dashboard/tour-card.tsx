"use client";

import { useState } from "react";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WriteReviewModal } from "@/components/dashboard/write-review-modal";

interface TourCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  timer?: string;
  badge?: string;
  badgeColor?: "yellow" | "blue";
  status: "upcoming" | "cancelled" | "rescheduled" | "completed";
  errorMessage?: string;
}

export function TourCard({
  title,
  image,
  date,
  time,
  timer,
  badge,
  badgeColor,
  status,
  errorMessage,
}: TourCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  const badgeStyles = {
    yellow: "bg-yellow-400 text-black",
    blue: "bg-[#008BBC] text-white",
  };

  return (
    <div className="bg-white p-4 rounded-none shadow-sm">
      <div className="flex gap-4">
        <Image
          src={image}
          alt={title}
          width={120}
          height={80}
          className="rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg">{title}</h3>
              {status === "completed" ? (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowReviewModal(true)}
                  className="text-[#008BBC] hover:text-[#008BBC]/80 underline h-auto p-0 font-semibold"
                >
                  Write Review
                </Button>
              ) : timer ? (
                <p className="text-green-600 font-semibold text-sm">{timer}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-pink-500" />
              <span>{date}</span>
              <span className="mx-1">|</span>
              <Clock className="w-4 h-4 text-pink-500" />
              <span>{time} </span>
              {badge && badgeColor && (
                <>
                  <span className="mx-2 ml-10"></span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs font-medium ${badgeStyles[badgeColor]}`}
                  >
                    {badge}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Error message for cancelled tours */}
          {status === "cancelled" && errorMessage && (
            <div className="mt-3 flex items-start gap-2 p-3">
              <p className="text-sm text-[#FF0000]">{errorMessage}</p>
            </div>
          )}

          {/* Action buttons based on status */}
          <div className="mt-4 flex gap-2">
            {status === "upcoming" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-yellow-400 text-black hover:bg-[#008BBC]/10"
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-black text-black hover:bg-[#008BBC]/10"
                >
                  Cancel
                </Button>
              </>
            )}

            {status === "cancelled" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-yellow-400 text-black hover:bg-[#008BBC]/10"
                >
                  Reschedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-black text-black hover:bg-[#008BBC]/10"
                >
                  Book Next Day
                </Button>
              </>
            )}

            {status === "rescheduled" && (
              <Button
                variant="outline"
                size="sm"
                className="w-1/2 bg-yellow-400 text-black hover:bg-[#008BBC]/10"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        tourTitle={title}
      />
    </div>
  );
}
