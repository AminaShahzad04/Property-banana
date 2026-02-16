"use client";

import { useState } from "react";
import Image from "next/image";
import { PropertyHeader } from "@/components/booking/property-header";
import { PropertyGallery } from "@/components/booking/property-gallery";
import { PropertyInfo } from "@/components/booking/property-info";
import { PropertyAmenities } from "@/components/booking/property-amenities";
import { PropertyLocation } from "@/components/booking/property-location";
import { BookTourModal } from "@/components/dashboard/book-tour-modal";
import { PlaceBidModal } from "@/components/booking/place-bid-modal";
import { RentPropertyModal } from "@/components/booking/Make a Payment";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

// Mock data - replace with actual data fetching
const propertyData = {
  id: "1",
  name: "Aura, Tilal Al Ghaf, Dubai",
  location: "Dubai",
  price: "AED 350,000 Yearly",
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
  beds: 2,
  bathrooms: 6,
  sqft: "3,411 sqft",
  propertyType: "Apartment",
  description:
    "Come and stay at this superb duplex T2 in the heart of the historic center of Bordeaux. Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of the city thanks to its ideal location. Close to many shops, bars and restaurants, you can access the apartment by tram and it's less than 10 min walk to the train station.and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of the city thanks to its ideal location. Close to many shops, bars and restaurants, and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of the city thanks to its ideal location. Close to many shops, bars and restaurants, ",
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
  const [bidAmount, setBidAmount] = useState(612000); // Bid amount state
  const [showMore, setShowMore] = useState(false); // Track description expand/collapse
  const minBid = 100000;
  const maxBid = 700000;

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
    <div className="min-h-screen  mt-16 bg-card p-32 pt-8 pl-24 ">
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

      <Header />
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
        <div className="grid grid-cols-3 gap-16 mt-8">
          {/* Left Column - Property Info */}
          <div className="col-span-2 space-y-6">
            {/* Price and Title Section */}
            <div className="bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {propertyData.price}
              </h2>
              <h3 className="text-xl pb-4 border-b  font-semibold text-gray-800 mb-4">
                {propertyData.name}
              </h3>

              {/* Property Specs */}
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span>{propertyData.beds} Beds</span>
                <span>{propertyData.bathrooms} Baths</span>
                <span>{propertyData.sqft}</span>
                <span>{propertyData.propertyType}</span>
              </div>

              {/* Description */}
              <div className={showMore ? "" : "line-clamp-5"}>
                <p className="text-gray-700 leading-relaxed">
                  {propertyData.description}
                </p>
              </div>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-gray-900 font-medium mt-2 inline-block"
              >
                <span className="underline">
                  {showMore ? "Show less" : "Show more"}
                </span>{" "}
                {">"}
              </button>
            </div>

            {/* Amenities */}
            <PropertyAmenities amenities={propertyData.amenities} />
          </div>

          {/* Right Column - Location */}
          <div className="col-span-1 space-y-6">
            {/* Book a Tour Card */}
            <div className="bg-white rounded-xl  shadow-xl p-6">
              <div className="flex items-start gap-4">
                {/* Left - Destination Image */}
                <div className=" mt-4 flex-shrink-0">
                  <Image
                    src="/destination.png"
                    alt="Destination"
                    width={68}
                    height={68}
                    className="object-contain"
                  />
                </div>

                {/* Right - Title and Process Flow */}
                <div className="flex-1 ml-6">
                  <h3 className="text-2xl ml-8 font-bold mb-4">Book a Tour</h3>
                  <div className="flex items-center justify-center ">
                    {/* Step 1 - Calendar */}
                    <div className="flex items-center justify-center">
                      <Image
                        src="/calender.png"
                        alt="Calendar"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>

                    {/* Arrow 1 */}
                    <div className="opacity-60">
                      <Image
                        src="/arrow.svg"
                        alt="Arrow"
                        width={80}
                        height={60}
                        className="object-contain"
                      />
                    </div>

                    {/* Step 2 - Time */}
                    <div className="flex items-center justify-center">
                      <Image
                        src="/time.png"
                        alt="Time"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>

                    {/* Arrow 2 */}
                    <div className="opacity-60  scale-y-[-1]">
                      <Image
                        src="/arrow.svg"
                        alt="Arrow"
                        width={80}
                        height={60}
                        className="object-contain"
                      />
                    </div>

                    {/* Step 3 - Check Mail */}
                    <div className="flex items-center justify-center">
                      <Image
                        src="/checkmail.png"
                        alt="Check Mail"
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Place a Bid Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl  font-bold text-center mb-6">
                Place a Bid
              </h3>
              <div className="flex items-center gap-4 px-2">
                {/* Left - Hand with Money */}
                <div className="flex-shrink-0">
                  <Image
                    src="/bid.png"
                    alt="Bid"
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>

                {/* Middle - Slider */}
                <div className="flex-1">
                  <div className="relative ">
                    {/* Current bid bubble */}
                    <div
                      className="absolute -top-12 transform -translate-x-1/2 bg-yellow-600 text-white px-3 rounded-full text-xs font-bold whitespace-nowrap shadow-md"
                      style={{
                        left: `${((bidAmount - minBid) / (maxBid - minBid)) * 100}%`,
                      }}
                    >
                      {bidAmount.toLocaleString()} AED
                    </div>
                    {/* Slider track and input */}
                    <div className="relative h-3 bg-yellow-400 rounded-full">
                      <input
                        type="range"
                        min={minBid}
                        max={maxBid}
                        step={1000}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {/* Slider thumb */}
                      <div
                        className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg pointer-events-none"
                        style={{
                          left: `${((bidAmount - minBid) / (maxBid - minBid)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* Min/Max Labels */}
                  <div className="flex justify-between text-xs text-gray-600 font-medium">
                    <span>100,000 AED</span>
                    <span>700,000 AED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
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
        propertyId={Number(propertyData.id)}
      />

      {/* Place Bid Modal */}
      <PlaceBidModal
        isOpen={showPlaceBidModal}
        onClose={() => setShowPlaceBidModal(false)}
        propertyTitle={propertyData.name}
        listingId={Number(propertyData.id)}
        onBidSuccess={() => {
          setShowPlaceBidModal(false);
          setBidApproved(true);
        }}
      />
    </div>
  );
}
