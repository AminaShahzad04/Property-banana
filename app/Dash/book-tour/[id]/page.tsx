"use client";

import { useState } from "react";
import { PropertyHeader } from "@/components/booking/property-header";
import { PropertyGallery } from "@/components/booking/property-gallery";
import { PropertyInfo } from "@/components/booking/property-info";
import { PropertyAmenities } from "@/components/booking/property-amenities";
import { PropertyLocation } from "@/components/booking/property-location";
import { BookTourModal } from "@/components/dashboard/book-tour-modal";
import { PlaceBidModal } from "@/components/booking/place-bid-modal";
import { RentPropertyModal } from "@/components/booking/rent-property-modal";
import { Footer } from "@/components/layout/footer";

// Mock data - replace with actual data fetching
const propertyData = {
  id: "1",
  name: "Bordeaux Getaway",
  location: "Dubai",
  rating: 4.8,
  reviews: 24,
  images: [
    "/jumeirah.png",
    "/jumeirah.png",
    "/jumeirah.png",
    "/jumeirah.png",
    "/jumeirah.png",
  ],
  host: {
    name: "Ghazal",
    image: "/Avatar.png",
  },
  guests: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 2,
  description:
    "Come and stay at this superb duplex T2 in the heart of the historic center of Bordeaux.Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of the city thanks to its ideal location. Close to many shops, bars and restaurants, you can access the apartment by tram and it's less than 10 min walk to the train station.",
  amenities: [
    { icon: "Leaf", label: "Garden view", available: true },
    { icon: "UtensilsCrossed", label: "Kitchen", available: true },
    { icon: "Wifi", label: "Wifi", available: true },
    { icon: "Dog", label: "Pets allowed", available: true },
    { icon: "CircleDot", label: "Free washer - in building", available: true },
    { icon: "Flame", label: "Dryer", available: true },
    { icon: "Wind", label: "Central air conditioning", available: true },
    { icon: "Video", label: "Security cameras on property", available: true },
    { icon: "Refrigerator", label: "Refrigerator", available: true },
    { icon: "Bike", label: "Bicycles", available: true },
  ],
};

export default function BookTourPage() {
  const [showBookTourModal, setShowBookTourModal] = useState(false);
  const [showPlaceBidModal, setShowPlaceBidModal] = useState(false);
  const [showRentPropertyPage, setShowRentPropertyPage] = useState(false);
  const [bidApproved, setBidApproved] = useState(false); // Track if bid is approved

  // If showing rent property page, render it instead
  if (showRentPropertyPage) {
    return (
      <RentPropertyModal
        onBack={() => setShowRentPropertyPage(false)}
        propertyTitle={propertyData.name}
        propertyId={propertyData.id}
        landlord="Abc"
        amount=":DHs34k"
      />
    );
  }

  return (
    <div className="min-h-screen bg-card p-32 pt-8 pl-24 ">
      {/* Bid Approval Banner */}
      {bidApproved && (
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <svg
              className="w-6 h-6 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-700 font-medium">
              A bid has been successfully approved
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <PropertyHeader
        name={propertyData.name}
        location={propertyData.location}
        rating={propertyData.rating}
        reviews={propertyData.reviews}
        onPlaceBid={() => {
          if (bidApproved) {
            setShowRentPropertyPage(true);
          } else {
            setShowPlaceBidModal(true);
          }
        }}
        onBookTour={() => setShowBookTourModal(true)}
        bidApproved={bidApproved}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Image Gallery */}
        <PropertyGallery images={propertyData.images} />

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          {/* Left Column - Property Info */}
          <div className="col-span-2 space-y-6">
            <PropertyInfo
              host={propertyData.host}
              guests={propertyData.guests}
              bedrooms={propertyData.bedrooms}
              beds={propertyData.beds}
              bathrooms={propertyData.bathrooms}
              description={propertyData.description}
            />

            {/* Amenities */}
            <PropertyAmenities amenities={propertyData.amenities} />
          </div>

          {/* Right Column - Location */}
          <div className="col-span-1">
            <PropertyLocation location={propertyData.location} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Book Tour Modal */}
      <BookTourModal
        isOpen={showBookTourModal}
        onOpenChange={setShowBookTourModal}
        propertyTitle={propertyData.name}
      />

      {/* Place Bid Modal */}
      <PlaceBidModal
        isOpen={showPlaceBidModal}
        onClose={() => setShowPlaceBidModal(false)}
        propertyTitle={propertyData.name}
        onBidSuccess={() => {
          setShowPlaceBidModal(false);
          setBidApproved(true);
        }}
      />
    </div>
  );
}
