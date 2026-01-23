// Bid status constants
export const BID_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  COUNTERED: "countered",
  WITHDRAWN: "withdrawn",
} as const;

export const BID_STATUS_LABELS = {
  [BID_STATUS.PENDING]: "Pending",
  [BID_STATUS.ACCEPTED]: "Accepted",
  [BID_STATUS.REJECTED]: "Rejected",
  [BID_STATUS.COUNTERED]: "Countered",
  [BID_STATUS.WITHDRAWN]: "Withdrawn",
} as const;

export const BID_STATUS_COLORS = {
  [BID_STATUS.PENDING]: "text-yellow-600 bg-yellow-50",
  [BID_STATUS.ACCEPTED]: "text-green-600 bg-green-50",
  [BID_STATUS.REJECTED]: "text-red-600 bg-red-50",
  [BID_STATUS.COUNTERED]: "text-[#008BBC] bg-[#008BBC]/10",
  [BID_STATUS.WITHDRAWN]: "text-gray-600 bg-gray-50",
} as const;
