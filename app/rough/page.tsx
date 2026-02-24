"use client";

import { RentPropertyModal } from "@/components/booking/Make a Payment";

export default function RoughPage() {
  return (
    <RentPropertyModal
      onBack={() => console.log("Back clicked")}
      propertyTitle="Sample Property"
      propertyId="1"
      landlord="John Doe"
      amount="AED 612,000 Yearly"
    />
  );
}
