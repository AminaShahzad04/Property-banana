// Booking status constants
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: "Pending",
  [BOOKING_STATUS.CONFIRMED]: "Confirmed",
  [BOOKING_STATUS.COMPLETED]: "Completed",
  [BOOKING_STATUS.CANCELLED]: "Cancelled",
} as const;

export const BOOKING_STATUS_COLORS = {
  [BOOKING_STATUS.PENDING]: "text-yellow-600 bg-yellow-50",
  [BOOKING_STATUS.CONFIRMED]: "text-green-600 bg-green-50",
  [BOOKING_STATUS.COMPLETED]: "text-[#008BBC] bg-[#008BBC]/10",
  [BOOKING_STATUS.CANCELLED]: "text-red-600 bg-red-50",
} as const;

// Tour status constants
export const TOUR_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no-show",
} as const;

export const TOUR_TYPE = {
  IN_PERSON: "in-person",
  VIRTUAL: "virtual",
} as const;
