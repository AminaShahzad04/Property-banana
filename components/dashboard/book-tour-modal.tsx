"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";

interface BookTourModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle: string;
}

export function BookTourModal({
  isOpen,
  onOpenChange,
  propertyTitle,
}: BookTourModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2 && selectedTime) {
      setStep(3);
    }
  };

  const handleCancel = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    onOpenChange(false);
  };

  const handleClear = () => {
    if (step === 1) {
      setSelectedDate(null);
    } else if (step === 2) {
      setSelectedTime(null);
    }
  };

  const stepIndicators = [
    { step: 1, label: "Select Date", icon: Calendar },
    { step: 2, label: "Select Time slot", icon: Clock },
    { step: 3, label: "Confirmation", icon: CheckCircle },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {step < 3 && (
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-bold border-b pb-4">
              Book A Tour
            </DialogTitle>
          </DialogHeader>
        )}

        {/* Step 1: Select Date */}
        {step === 1 && (
          <div className="py-4">
            <h3 className="font-semibold text-base mb-4">Select Date</h3>
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <p className="font-medium text-base">{monthName}</p>
              <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs text-gray-600 font-medium py-2"
                >
                  {day}
                </div>
              ))}
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const isSelected = selectedDate === day;
                const isPastDate =
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    day
                  ) < new Date(new Date().setHours(0, 0, 0, 0));

                return (
                  <button
                    key={day}
                    onClick={() => !isPastDate && setSelectedDate(day)}
                    disabled={isPastDate}
                    className={`p-2 text-sm rounded transition-colors ${
                      isSelected
                        ? "bg-black text-white font-semibold"
                        : isPastDate
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Select Time */}
        {step === 2 && (
          <div className="py-4">
            <h3 className="font-semibold text-base mb-4">Select time</h3>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {timeSlots.map((slot, index) => {
                const isSelected = selectedTime === index;
                const isAvailable = slot.available;

                return (
                  <button
                    key={index}
                    onClick={() => isAvailable && setSelectedTime(index)}
                    disabled={!isAvailable}
                    className={`p-3 border-2 transition-colors text-sm font-semibold rounded ${
                      isSelected
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : !isAvailable
                        ? "border-red-500 text-red-500 bg-white cursor-not-allowed"
                        : "border-gray-300 text-gray-700 bg-white hover:border-gray-400"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center  px-4">
            <div className="w-24 h-24 mx-auto mb-6">
              <Image
                src="/checked.png"
                alt="Success"
                width={96}
                height={96}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-bold text-2xl mb-6">
              Tour Booked Successfully
            </h3>
            <div className="flex items-center justify-center gap-6 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>
                  {currentMonth.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-500" />
                <span>
                  {selectedTime !== null ? timeSlots[selectedTime].time : ""}
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-base">
              Your tour has been successfully booked
            </p>
          </div>
        )}

        {/* Footer Buttons */}
        <div
          className={`flex items-center justify-between mt-2 pt-4 ${
            step < 3 ? "border-t" : ""
          }`}
        >
          {step < 3 ? (
            <>
              <button
                className="text-sm text-gray-700 hover:text-gray-900 underline"
                onClick={handleClear}
              >
                Clear
              </button>
              <Button
                className="px-8 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleNext}
                disabled={
                  step === 1 ? selectedDate === null : selectedTime === null
                }
              >
                {step === 2 ? "Confirm Booking" : "Next"}
              </Button>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <Button
                className="px-16 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-base"
                onClick={handleCancel}
              >
                Ok
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
