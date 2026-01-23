export interface Tour {
  id: string;
  apartmentId: string;
  userId: string;
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // in minutes
  type: "in-person" | "virtual";
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  agentId?: string;
  meetingLink?: string; // for virtual tours
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TourRequest {
  apartmentId: string;
  scheduledDate: Date;
  scheduledTime: string;
  type: "in-person" | "virtual";
  notes?: string;
}

export interface TourAvailability {
  date: Date;
  availableSlots: string[];
}
