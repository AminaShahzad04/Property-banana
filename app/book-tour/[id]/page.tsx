"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { tenantService } from "@/api/tenant.service";
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

export default function BookTourPage() {
  // ...existing code...
  const [showBookTourModal, setShowBookTourModal] = useState(false);
  const [showPlaceBidModal, setShowPlaceBidModal] = useState(false);
  const [showRentPropertyPage, setShowRentPropertyPage] = useState(false);
  const [bidApproved, setBidApproved] = useState(false); // Track if bid is approved
  const [bidAmount, setBidAmount] = useState(612000); // Bid amount state
  const [bidInput, setBidInput] = useState("612000"); // For input field
  const [installments, setInstallments] = useState(2);
  const [bidLoading, setBidLoading] = useState(false);
  const [bidError, setBidError] = useState("");
  const [showMore, setShowMore] = useState(false); // Track description expand/collapse
  const minBid = 100000;
  const maxBid = 700000;
  const params = useParams();
  const [propertyData, setPropertyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const id = params.id ? Number(params.id) : null;
        if (!id) return;
        const data = await tenantService.getListingDetails(id);
        // Defensive mapping for all fields
        setPropertyData({
          id: data.listing_id,
          name: data.description || data.property_type || "Property",
          location: data.location || "Unknown",
          price:
            typeof data.price === "number"
              ? `AED ${data.price.toLocaleString()} Yearly`
              : "AED 0 Yearly",
          rating: typeof data.rating === "number" ? data.rating : 0,
          reviews: typeof data.reviews === "number" ? data.reviews : 0,
          images: data.image ? [data.image] : ["/placeholder.jpg"],
          bedrooms: typeof data.bedrooms === "number" ? data.bedrooms : 0,
          beds: typeof data.bedrooms === "number" ? data.bedrooms : 0,
          bathrooms: typeof data.bathrooms === "number" ? data.bathrooms : 0,
          sqft:
            typeof data.area_sqft === "number"
              ? `${data.area_sqft} sqft`
              : "0 sqft",
          propertyType: data.property_type || "",
          description: data.description || "No description available.",
          amenities: [], // fallback, since not in Listing
        });
      } catch (e) {
        setPropertyData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [params.id]);

  // If showing rent property page, render it instead
  if (showRentPropertyPage && propertyData) {
    return (
      <RentPropertyModal
        onBack={() => setShowRentPropertyPage(false)}
        propertyTitle={propertyData.name}
        propertyId={propertyData.id}
        landlord={""}
        amount={propertyData.price || ""}
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
      {!loading && propertyData && (
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
      )}

      {/* Main Content */}
      {!loading && propertyData && (
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
                    <h3 className="text-2xl ml-8 font-bold mb-4">Self view</h3>
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

              {/* Place a Bid Card - Styled to match rough page */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-center mb-6">
                  Place a bid
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
                  {/* Middle - Slider and Input */}
                  <div className="flex-1">
                    <div className="relative w-full" style={{ height: "48px" }}>
                      {/* Thin slider track */}
                      <div
                        className="absolute left-0 right-0 top-1/2"
                        style={{ height: "8px", transform: "translateY(-50%)" }}
                      >
                        {/* Uncovered track */}
                        <div className="w-full h-full rounded-full bg-yellow-100" />
                        {/* Covered track */}
                        <div
                          className="absolute left-0 top-0 h-full bg-yellow-400 rounded-full"
                          style={{
                            width: `${((bidAmount - minBid) / (maxBid - minBid)) * 100}%`,
                          }}
                        ></div>
                      </div>
                      {/* Slider input (transparent, overlays the track) */}
                      <input
                        type="range"
                        min={minBid}
                        max={maxBid}
                        step={1000}
                        value={bidAmount}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setBidAmount(val);
                          setBidInput(val.toString());
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        style={{ WebkitAppearance: "none", appearance: "none" }}
                      />
                      {/* Thumb on the track, with a little green */}
                      <div
                        className="absolute z-30"
                        style={{
                          left: `calc(${((bidAmount - minBid) / (maxBid - minBid)) * 100}% )`,
                          top: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="w-10 h-10 rounded-full border-4 border-yellow-200 bg-gradient-to-br from-yellow-200 via-yellow-300 to-green-400 shadow-lg" />
                      </div>
                    </div>
                    {/* Min/Max Labels */}
                    <div className="flex justify-between text-xs text-gray-600 font-medium mt-1">
                      <span>100,000 AED</span>
                      <span>700,000 AED</span>
                    </div>
                    {/* Input field */}
                    <input
                      type="number"
                      min={minBid}
                      max={maxBid}
                      step={1000}
                      value={bidInput}
                      onChange={(e) => {
                        let val = e.target.value.replace(/[^0-9]/g, "");
                        if (val === "") val = minBid.toString();
                        let num = Math.max(
                          minBid,
                          Math.min(maxBid, Number(val)),
                        );
                        setBidInput(num.toString());
                        setBidAmount(num);
                      }}
                      className="mt-4 w-full border border-gray-300 rounded px-3 py-2 text-lg font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      placeholder="AED"
                    />
                  </div>
                </div>
                {/* Installments selection */}
                <div className="mt-6">
                  <div className="font-semibold text-center">
                    Select number of installments
                  </div>
                  <div className="text-center text-gray-500 text-sm mb-2">
                    In how many installments do you want to pay?
                  </div>
                  <div className="grid grid-cols-3 gap-4 justify-items-center max-w-xs mx-auto mb-2">
                    {[2, 4, 6, 8, 10, 12].map((num, idx) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setInstallments(num)}
                        className={`w-16 h-16 rounded-full border flex items-center justify-center text-lg font-bold transition-all duration-150 ${installments === num ? "bg-yellow-300 border-yellow-400 text-black shadow-md" : "bg-white border-gray-300 text-gray-700"}`}
                        style={{ marginBottom: idx < 3 ? "0.5rem" : undefined }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Submit button */}
                <button
                  className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded transition-all disabled:opacity-60"
                  disabled={bidLoading}
                  onClick={async () => {
                    if (!propertyData?.id) return;
                    setBidLoading(true);
                    setBidError("");
                    try {
                      await tenantService.placeBid({
                        listing_id: Number(propertyData.id),
                        amount: bidAmount,
                        frequency: "YEARLY",
                        installments: installments as 2 | 4 | 8 | 10 | 12,
                      });
                      setBidApproved(true);
                    } catch (e: any) {
                      setBidError(e.message || "Failed to place bid");
                    } finally {
                      setBidLoading(false);
                    }
                  }}
                >
                  {bidLoading ? "Submitting..." : "Submit bid"}
                </button>
                {bidError && (
                  <div className="text-red-600 text-center mt-2">
                    {bidError}
                  </div>
                )}
              </div>

              {/* Location Card */}
              <PropertyLocation location={propertyData.location} />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Book Tour Modal */}
      {!loading && propertyData && (
        <BookTourModal
          isOpen={showBookTourModal}
          onOpenChange={setShowBookTourModal}
          propertyTitle={propertyData.name}
          propertyId={Number(propertyData.id)}
        />
      )}

      {/* Place Bid Modal */}
      {!loading && propertyData && (
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
      )}
    </div>
  );
}
