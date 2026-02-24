"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tenantService } from "@/api/tenant.service";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyTitle = searchParams.get("title") || "Property";
  const propertyId = params.id ? Number(params.id) : 0;

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [bookedTour, setBookedTour] = useState<any>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const timeSlots = [
    { time: "09:00 AM - 09:30 AM", available: false },
    { time: "09:30 AM - 10:00 AM", available: true },
    { time: "10:00 AM - 10:30 AM", available: true },
    { time: "10:30 AM - 11:00 AM", available: true },
    { time: "11:00 AM - 11:30 AM", available: true },
    { time: "11:30 AM - 12:00 PM", available: true },
    { time: "12:00 PM - 12:30 PM", available: true },
    { time: "12:30 PM - 01:00 PM", available: true },
    { time: "01:00 PM - 01:30 PM", available: false },
    { time: "01:30 PM - 02:00 PM", available: true },
    { time: "02:00 PM - 02:30 PM", available: true },
    { time: "02:30 PM - 03:00 PM", available: true },
  ];

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handleNext = async () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2 && selectedTime !== null) {
      try {
        setLoading(true);
        const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`;
        const timeSlot = timeSlots[selectedTime].time;

        const response = await tenantService.bookTour({
          propertyId,
          date: dateStr,
          timeSlot,
        });

        // Store the booked tour details from backend
        setBookedTour(response.tour);
        console.log("🎫 Booked tour details:", response.tour);

        setStep(3);
      } catch (error) {
        console.error("Failed to book tour:", error);
        alert("Failed to book tour. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    const dateToCheck = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    today.setHours(0, 0, 0, 0);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  const getSelectedDateString = () => {
    if (!selectedDate) return "";
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      selectedDate,
    );
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getSelectedTimeString = () => {
    if (selectedTime === null) return "";
    return timeSlots[selectedTime].time;
  };

  const handleCancel = () => {
    if (step === 1) {
      router.back();
    } else if (step === 2) {
      setStep(1);
      setSelectedTime(null);
    } else if (step === 3) {
      router.push(`/book-tour/${propertyId}`);
    }
  };

  const isStepActive = (stepNumber: number) => {
    return step >= stepNumber;
  };

  const isStepComplete = (stepNumber: number) => {
    if (stepNumber === 1) return selectedDate !== null && step > 1;
    if (stepNumber === 2) return selectedTime !== null && step > 2;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 mt-16">
        <div className="w-full max-w-4xl  p-8 md:p-12">
          {/* 3-Step Process Header */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {/* Step 1 - Select Date */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-3 transition-all">
                  <Image
                    src="/calender.png"
                    alt="Calendar"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`text-sm font-medium ${isStepActive(1) ? "text-gray-900" : "text-gray-400"}`}
                >
                  Select date
                </span>
              </div>

              {/* Arrow 1 */}
              <div
                className={`w-12 h-8 md:w-24 md:h-12 mb-12 ${
                  isStepComplete(1) ? "opacity-100" : "opacity-30"
                }`}
              >
                <Image
                  src="/arrow.svg"
                  alt="Arrow"
                  width={104}
                  height={52}
                  className="object-contain"
                />
              </div>

              {/* Step 2 - Select Time Slot */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-3 transition-all">
                  <Image
                    src="/time.png"
                    alt="Time"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`text-sm font-medium ${isStepActive(2) ? "text-gray-900" : "text-gray-400"}`}
                >
                  Select time slot
                </span>
              </div>

              {/* Arrow 2 */}
              <div
                className={`w-12 h-8 md:w-24 md:h-12 mb-12 ${
                  isStepComplete(2) ? "opacity-100" : "opacity-30"
                }`}
              >
                <Image
                  src="/arrow.svg"
                  alt="Arrow"
                  width={104}
                  height={52}
                  className="object-contain scale-y-[-1]"
                />
              </div>

              {/* Step 3 - Confirmation */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mb-3 transition-all">
                  <Image
                    src="/checkmail.png"
                    alt="Confirmation"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span
                  className={`text-sm font-medium ${isStepActive(3) ? "text-gray-900" : "text-gray-400"}`}
                >
                  Confirmation
                </span>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Select a date
              </h2>

              {/* Calendar */}
              <div className="max-w-lg mx-auto">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {monthName}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Day Headers */}
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}

                  {/* Empty Days */}
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} />
                  ))}

                  {/* Calendar Days */}
                  {days.map((day) => {
                    const isToday =
                      day === new Date().getDate() &&
                      currentMonth.getMonth() === new Date().getMonth() &&
                      currentMonth.getFullYear() === new Date().getFullYear();
                    const isSelected = selectedDate === day;
                    const isPast = isPastDate(day);

                    return (
                      <button
                        key={day}
                        onClick={() => !isPast && setSelectedDate(day)}
                        disabled={isPast}
                        className={`
                          aspect-square rounded-full flex items-center justify-center
                          text-sm font-medium transition-all
                          ${
                            isPast
                              ? "text-gray-300 cursor-not-allowed"
                              : isSelected
                                ? "bg-yellow-400 text-black font-bold shadow-md scale-110"
                                : isToday
                                  ? "bg-blue-100 text-blue-600"
                                  : "hover:bg-gray-100 text-gray-700"
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-10">
                <button
                  onClick={handleCancel}
                  className="w-40 py-3 text-white font-medium transition-colors"
                  style={{ backgroundColor: "#008BBC" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  disabled={!selectedDate}
                  className="w-40 py-3 text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#FBDE02" }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Select time slot
              </h2>

              {/* Time Slots Grid */}
              <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-2 gap-4">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => slot.available && setSelectedTime(index)}
                    disabled={!slot.available}
                    className={`
                      p-4 rounded-full font-medium transition-all
                      ${
                        selectedTime === index
                          ? "bg-yellow-400 text-black shadow-md "
                          : slot.available
                            ? "bg-white border-2 border-gray-200 hover:border-yellow-400 text-gray-700"
                            : "bg-gray-100 text-gray-400  border-2 border-gray-200 cursor-not-allowed"
                      }
                    `}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center mt-10">
                <button
                  onClick={handleCancel}
                  className="w-40 py-3 text-white font-medium transition-colors"
                  style={{ backgroundColor: "#008BBC" }}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedTime === null || loading}
                  className="w-40 py-3 text-black font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#FBDE02" }}
                >
                  {loading ? "Booking..." : "Confirm"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && bookedTour && (
            <div className="text-center py-4 bg-card shadow-lg rounded-xl">
              <h2 className="text-3xl font-bold text-gray-900 p-8">
                Booking confirmed
              </h2>

              {/* Date and Time Info from Backend */}
              <div className="max-w-lg mx-auto bg-white">
                <div className="space-y-6 flex justify-between">
                  {/* Date */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                        📅
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        Date
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(bookedTour.tour_date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                        ⏰
                      </div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        Time
                      </div>
                      <div className="text-sm text-gray-600">
                        {bookedTour.time_slot}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tour ID and Status */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>
                      Tour ID:{" "}
                      <span className="font-semibold">
                        #{bookedTour.tour_id}
                      </span>
                    </div>
                    <div>
                      Status:{" "}
                      <span className="font-semibold text-green-600">
                        {bookedTour.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => router.push("/Dash/tenant/tours")}
                  className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors"
                >
                  View My Tours
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
