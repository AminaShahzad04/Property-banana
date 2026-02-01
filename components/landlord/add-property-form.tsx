"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import PermitValidationModal from "./permit-validation-modal";

interface StepIconProps {
  icon: string;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const StepIcon = ({ icon, label, isActive, isCompleted }: StepIconProps) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all `}
    >
      <img src={icon} alt={label} className="w-16 h-16 object-contain" />
    </div>
    <span className="text-xs font-medium text-black">{label}</span>
  </div>
);

export default function AddPropertyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [permitNumber, setPermitNumber] = useState("");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("immediate");
  const [titleDeedFile, setTitleDeedFile] = useState<File | null>(null);
  const [validatedData, setValidatedData] = useState<any>(null);

  // Step 3 form fields
  const [room, setRoom] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [developer, setDeveloper] = useState("");
  const [unitNo, setUnitNo] = useState("");
  const [parkingSpaces, setParkingSpaces] = useState("");
  const [furnishingType, setFurnishingType] = useState("unfurnished");
  const [propertyAge, setPropertyAge] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [ownerName, setOwnerName] = useState("");

  // Step 4 form fields
  const [titleImage, setTitleImage] = useState<File | null>(null);
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [showImageValidation, setShowImageValidation] = useState(false);

  // Step 5 form fields
  const [rentAmount, setRentAmount] = useState("");
  const [rentFrequency, setRentFrequency] = useState("");
  const [noCheques, setNoCheques] = useState("");
  const [minContractPeriod, setMinContractPeriod] = useState("");
  const [vacatingNoticePeriod, setVacatingNoticePeriod] = useState("");
  const [maintenanceFees, setMaintenanceFees] = useState("");
  const [paidBy, setPaidBy] = useState("");

  // Step 6 - Amenities
  const [amenities, setAmenities] = useState({
    bathtub: false,
    shampoo: false,
    hotWater: false,
    dryer: false,
    hairDryer: false,
    conditioner: false,
    showerGel: false,
    smokeAlarm: false,
    cleaningProducts: false,
    bodySoap: false,
    tv: false,
    boardGames: false,
    airConditioner: false,
    hangers: false,
    iron: false,
    bedLinens: false,
    extraPillows: false,
    dryingRack: false,
    essentials: false,
    firePit: false,
    portableFans: false,
    heating: false,
    shades: false,
    clothingStorage: false,
    toaster: false,
    indoorFireplace: false,
    washer: false,
    ironBoard: false,
    laundryService: false,
    freePaidServices: false,
    airStreamComfort: false,
    heatFreeInnovations: false,
  });

  // Step 7 - Description
  const [description, setDescription] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    { id: 1, icon: "/approve.png", label: "Verify Search" },
    { id: 2, icon: "/file.png", label: "Upload Document" },
    { id: 3, icon: "/property-papers.png", label: "Add Property Detail" },
    { id: 4, icon: "/image-upload.png", label: "Upload Image" },
    { id: 5, icon: "/price.png", label: "Price" },
    { id: 6, icon: "/amenities.png", label: "Add Amenities" },
    { id: 7, icon: "/property-contract.png", label: "Add Description" },
  ];

  const handleValidate = () => {
    // Simulate API validation
    setValidatedData({
      offeringType: "Rent",
      price: "75000",
      propertyType:
        "Apartment / Studio / Flat / Hut / Flat / Flat / Penthouse / Hotel apartment / Office space / Business Center / Duplex / Warehouse",
      bedrooms: "Studio",
    });
    setShowValidationModal(true);
  };

  const handleValidationConfirm = () => {
    setShowValidationModal(false);
    setCurrentStep(2);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTitleDeedFile(e.target.files[0]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      handleValidate();
    } else if (currentStep === 4 && !showImageValidation) {
      setShowImageValidation(true);
    } else if (currentStep === 4 && showImageValidation) {
      setShowImageValidation(false);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 7) {
      setShowSuccess(true);
    } else if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCancel = () => {
    // Reset or go back
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-8 ">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-1 bg-gray-200 rounded-full">
          <div
            className="h-1 bg-[#4EC57D] rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Icons */}
      {/* Step Indicators */}
      <div className="flex items-end justify-center mb-8 gap-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-end">
            <div className="flex flex-col items-center">
              <div className="relative flex items-end justify-center h-[70px] w-[70px]">
                <img
                  src={step.icon}
                  alt={step.label}
                  width={70}
                  height={70}
                  className="object-contain h-[70px] w-[70px]"
                  style={{ display: "block" }}
                />
              </div>
              <span
                className={`text-xs font-semibold  text-center max-w-[100px] ${
                  index + 1 <= currentStep ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex items-end mb-6">
                <img
                  src="/arrow.svg"
                  alt="Arrow"
                  className={`object-contain w-[320px] h-[80px] aspect-[4/1] ${
                    index + 1 < currentStep ? "" : "grayscale opacity-40"
                  } ${(index + 1) % 2 === 0 ? "rotate-180 scale-x-[-1]" : ""}`}
                  style={{ display: "block" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div
        className={`bg-white shadow-lg rounded-xl p-6 pt-10 min-h-[400px] mx-auto ${
          currentStep === 4 && showImageValidation ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Add Details
            </h2>

            <div className="max-w-lg mx-auto space-y-6">
              {/* BARR Permit No */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  RARE Permit No<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <Input
                    value={permitNumber}
                    onChange={(e) => setPermitNumber(e.target.value)}
                    placeholder="Enter License"
                    className="flex-1 rounded-[1px]"
                  />
                  <Button
                    onClick={handleValidate}
                    className="bg-[#12A94E] hover:bg-[#12A94E] text-white px-6"
                  >
                    Validate
                  </Button>
                </div>
              </div>

              {/* Property Location */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Property Location<span className="text-red-500">*</span>
                </label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Property Location"
                  className="flex-1 rounded-[1px]"
                />
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Available
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAvailability("immediate")}
                    className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                      availability === "immediate"
                        ? "bg-yellow-400 text-black"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Immediate
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvailability("fromDate")}
                    className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                      availability === "fromDate"
                        ? "bg-[#FBDE02] text-black"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    From Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Upload Document
            </h2>

            <div className="max-w-lg mx-auto">
              <label className="block text-medium font-semibold mb-4">
                Title Deed Document
              </label>

              <div className="border-2 border-1 border-gray-300 rounded-lg p-12 text-center bg-white hover:border-teal-400 transition-colors">
                <input
                  type="file"
                  id="titleDeed"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="titleDeed" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-30 h-15 flex items-center justify-center">
                      <img
                        src="/upload.png"
                        alt="Upload"
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        {titleDeedFile
                          ? titleDeedFile.name
                          : "Title Deed Document"}
                      </p>
                      {!titleDeedFile && (
                        <p className="text-xs text-gray-500 mt-1">
                          Click to upload or drag and drop
                        </p>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Add Property Details
            </h2>

            <div className="max-w-xl mx-auto space-y-4 p-8">
              {/* Room */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Room<span className="text-red-500">*</span>
                </label>
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Studio</option>
                  <option value="studio">Studio</option>
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4+ Rooms</option>
                </select>
              </div>

              {/* Bedroom */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Bedroom<span className="text-red-500">*</span>
                </label>
                <select
                  value={bedroom}
                  onChange={(e) => setBedroom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value=""></option>
                  <option value="studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Property Size */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Property Size<span className="text-red-500">*</span>
                </label>
                <Input
                  value={propertySize}
                  onChange={(e) => setPropertySize(e.target.value)}
                  placeholder="Property Size"
                  className="rounded-[1px]"
                />
              </div>

              {/* Developer */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Developer<span className="text-red-500">*</span>
                </label>
                <Input
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  placeholder="Developer"
                  className="rounded-[1px]"
                />
              </div>

              {/* Unit No */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Unit No<span className="text-red-500">*</span>
                </label>
                <Input
                  value={unitNo}
                  onChange={(e) => setUnitNo(e.target.value)}
                  placeholder="Unit no"
                  className="rounded-[1px]"
                />
              </div>

              {/* No of Parking Space */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  No of Parking Space<span className="text-red-500">*</span>
                </label>
                <select
                  value={parkingSpaces}
                  onChange={(e) => setParkingSpaces(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">1</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Furnishing Type */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Furnishing Type<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setFurnishingType("unfurnished")}
                    className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                      furnishingType === "unfurnished"
                        ? "bg-[#FBDE02] text-black"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Unfurnished
                  </button>
                  <button
                    type="button"
                    onClick={() => setFurnishingType("furnished")}
                    className={`flex-1 py-3 px-6 rounded-[1px] font-medium transition-all ${
                      furnishingType === "furnished"
                        ? "bg-[#FBDE02] text-black"
                        : "bg-white text-gray-700 border border-gray-300"
                    }`}
                  >
                    Furnished
                  </button>
                </div>
              </div>

              {/* Property Age */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Property Age<span className="text-red-500">*</span>
                </label>
                <Input
                  value={propertyAge}
                  onChange={(e) => setPropertyAge(e.target.value)}
                  placeholder="Property Age"
                  className="rounded-[1px]"
                />
              </div>

              {/* Floor No */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Floor No<span className="text-red-500">*</span>
                </label>
                <select
                  value={floorNo}
                  onChange={(e) => setFloorNo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">1</option>
                  <option value="ground">Ground</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Owner Name<span className="text-red-500">*</span>
                </label>
                <Input
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="Owner Name"
                  className="rounded-[1px]"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && !showImageValidation && (
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Upload Images
            </h2>

            <div className="max-w-lg mx-auto space-y-6">
              {/* Upload Title Image */}
              <div>
                <label className="block text-sm font-semibold mb-4">
                  Upload Title Image
                </label>
                <div className="border-2 border-1 border-gray-300 rounded-lg p-12 text-center bg-white hover:border-teal-400 transition-colors">
                  <input
                    type="file"
                    id="titleImage"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setTitleImage(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="titleImage" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 flex items-center justify-center">
                        <img
                          src="/upload.png"
                          alt="Upload"
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">
                          {titleImage ? titleImage.name : "Upload Title image"}
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Upload All property Image */}
              <div>
                <label className="block text-sm font-semibold mb-4">
                  Upload All property Image
                </label>
                <div className="border-2 border-1 border-gray-300 rounded-lg p-12 text-center bg-white hover:border-teal-400 transition-colors">
                  <input
                    type="file"
                    id="propertyImages"
                    accept=".jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        setPropertyImages(Array.from(e.target.files));
                      }
                    }}
                    className="hidden"
                  />
                  <label htmlFor="propertyImages" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-20 h-20 flex items-center justify-center">
                        <img
                          src="/upload.png"
                          alt="Upload"
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">
                          {propertyImages.length > 0
                            ? `${propertyImages.length} images selected`
                            : "Upload property image"}
                        </p>
                        <p className="text-xs text-[#008BBC] mt-1">
                          Up to 5 images upload at once
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && showImageValidation && (
          <div className="space-y-6 px-12">
            <div className="flex flex-col items-center  mb-8">
              <h2 className="text-3xl font-semibold mb-4">
                Image Quality Validation
              </h2>
              <Button className="bg-[#FBDE02] hover:bg-yellow-500  text-black font-medium px-6 py-2 rounded-[1px]">
                Reupload Images
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload Title Image</h3>

              {/* Sample validation cards - replace with actual uploaded images */}
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-3"
                  >
                    <div className="relative mb-2">
                      <img
                        src="/house.png"
                        alt="Property"
                        className="w-full h-32 object-cover rounded"
                      />
                      <span
                        className={`absolute top-2 right-2 px-3 py-1 text-sm font-semibold rounded-full ${
                          index === 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {index === 0 ? "Approved" : "Rejected"}
                      </span>
                    </div>
                    <p className="text-sm font-semibold mb-2">photo_001.jpg</p>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resolution</span>
                        <span
                          className={
                            index === 0
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          {index === 0 ? "1980× 1080" : "198× 108"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">File size</span>
                        <span
                          className={
                            index === 0
                              ? "text-green-600 font-medium"
                              : "text-red-600 font-medium"
                          }
                        >
                          2.4 Mb
                        </span>
                      </div>
                      {index === 0 ? (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quality</span>
                          <span className="text-green-600 font-medium">
                            Excellent
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-gray-600">Issue</span>
                          <p className="text-red-600 text-sm mt-1">
                            Image quality below threshold. Please upload a
                            higher resolution, focused image.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Guidelines */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Photo Guidelines</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-green-600 font-semibold mb-3">
                    Requirements
                  </h4>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Minimum resolution: 1280×720 pixels</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Maximum file size: 5 MB per image</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Supported formats: JPG, PNG, WebP</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Professional, well-lit photography</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Clear focus and proper framing</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-red-600 font-semibold mb-3">
                    Not Allowed
                  </h4>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Blurry or out-of-focus images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Watermarks or logos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Low resolution photos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Heavily filtered or edited images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Stock photos or renderings</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Add Price Details
            </h2>

            <div className="max-w-lg mx-auto space-y-4">
              {/* Rent AED */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rent AED<span className="text-red-500">*</span>
                </label>
                <Input
                  value={rentAmount}
                  onChange={(e) => setRentAmount(e.target.value)}
                  placeholder="55,5"
                  type="number"
                  className="rounded-[1px]"
                />
              </div>

              {/* Rent Frequency */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rent Frequency<span className="text-red-500">*</span>
                </label>
                <select
                  value={rentFrequency}
                  onChange={(e) => setRentFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">1</option>
                  <option value="yearly">Yearly</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              {/* No Cheques */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  No Cheques<span className="text-red-500">*</span>
                </label>
                <select
                  value={noCheques}
                  onChange={(e) => setNoCheques(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">1</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="12">12</option>
                </select>
              </div>

              {/* Minimum contract Period */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Minimum contract Period<span className="text-red-500">*</span>
                </label>
                <select
                  value={minContractPeriod}
                  onChange={(e) => setMinContractPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">1</option>
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">1 Year</option>
                </select>
              </div>

              {/* Vacating Notice Period */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Vacating Notice Period<span className="text-red-500">*</span>
                </label>
                <select
                  value={vacatingNoticePeriod}
                  onChange={(e) => setVacatingNoticePeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">1</option>
                  <option value="30">30 Days</option>
                  <option value="60">60 Days</option>
                  <option value="90">90 Days</option>
                </select>
              </div>

              {/* Maintenance Fees(AED) */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Maintenance Fees(AED)<span className="text-red-500">*</span>
                </label>
                <Input
                  value={maintenanceFees}
                  onChange={(e) => setMaintenanceFees(e.target.value)}
                  placeholder="Enter Email Address"
                  className="rounded-[1px]"
                />
              </div>

              {/* Paid By */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Paid By<span className="text-red-500">*</span>
                </label>
                <select
                  value={paidBy}
                  onChange={(e) => setPaidBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[1px] focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-400"
                >
                  <option value="">Paid By</option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Add Amenities Details
            </h2>

            <div className="space-y-8">
              {/* Bathroom */}
              <div>
                <h3 className="text-base font-semibold mb-4">Bathroom</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: "bathtub", label: "Bathtub", icon: "🛁" },
                    { key: "hairDryer", label: "Hair dryer", icon: "💨" },
                    {
                      key: "cleaningProducts",
                      label: "Cleaning products",
                      icon: "🧴",
                    },
                    { key: "shampoo", label: "Shampoo", icon: "🧴" },
                    { key: "conditioner", label: "Conditioner", icon: "🧴" },
                    { key: "bodySoap", label: "Body soap", icon: "🧼" },
                    { key: "hotWater", label: "Hot water", icon: "💧" },
                    { key: "showerGel", label: "Shower gel", icon: "🚿" },
                    { key: "tv", label: "TV", icon: "📺" },
                    { key: "dryer", label: "Dryer", icon: "🌀" },
                    { key: "smokeAlarm", label: "Smoke alarm", icon: "🔔" },
                    { key: "boardGames", label: "Board games", icon: "🎲" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        amenities[item.key as keyof typeof amenities]
                          ? "bg-yellow-50 border-yellow-400"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={amenities[item.key as keyof typeof amenities]}
                        onChange={(e) =>
                          setAmenities({
                            ...amenities,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedroom */}
              <div>
                <h3 className="text-base font-semibold mb-4">Bedroom</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      key: "airConditioner",
                      label: "Air Conditioner",
                      icon: "❄️",
                    },
                    { key: "hangers", label: "Hangers", icon: "👔" },
                    { key: "iron", label: "Iron", icon: "🔥" },
                    { key: "bedLinens", label: "Bed linens", icon: "🛏️" },
                    {
                      key: "extraPillows",
                      label: "Extra pillows and blankets",
                      icon: "🛌",
                    },
                    { key: "shades", label: "shades", icon: "🪟" },
                    {
                      key: "dryingRack",
                      label: "Drying rack for clothing",
                      icon: "🧺",
                    },
                    { key: "firePit", label: "Fire Pit", icon: "🔥" },
                    {
                      key: "clothingStorage",
                      label: "Clothing storage",
                      icon: "🗄️",
                    },
                    { key: "essentials", label: "Essentials", icon: "⭐" },
                    { key: "heating", label: "Heating", icon: "🔥" },
                    { key: "toaster", label: "Toaster", icon: "🍞" },
                    { key: "portableFans", label: "Portable fans", icon: "💨" },
                    {
                      key: "indoorFireplace",
                      label: "Indoor Fireplace",
                      icon: "🔥",
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        amenities[item.key as keyof typeof amenities]
                          ? "bg-yellow-50 border-yellow-400"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={amenities[item.key as keyof typeof amenities]}
                        onChange={(e) =>
                          setAmenities({
                            ...amenities,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Laundry */}
              <div>
                <h3 className="text-base font-semibold mb-4">Laundry</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: "washer", label: "Washer", icon: "🧺" },
                    {
                      key: "ironBoard",
                      label: "Iron/Ironing board",
                      icon: "👔",
                    },
                    {
                      key: "laundryService",
                      label: "Wash/fold Laundry",
                      icon: "🧼",
                    },
                    {
                      key: "freePaidServices",
                      label: "Free/Paid Services",
                      icon: "💵",
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        amenities[item.key as keyof typeof amenities]
                          ? "bg-yellow-50 border-yellow-400"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={amenities[item.key as keyof typeof amenities]}
                        onChange={(e) =>
                          setAmenities({
                            ...amenities,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Heating and Cooling */}
              <div>
                <h3 className="text-base font-semibold mb-4">
                  Heating and Cooling
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      key: "airConditioner",
                      label: "Air Conditioner",
                      icon: "❄️",
                    },
                    {
                      key: "airStreamComfort",
                      label: "Air Stream Comfort",
                      icon: "💨",
                    },
                    {
                      key: "heatFreeInnovations",
                      label: "Heat/Free Innovations",
                      icon: "🔥",
                    },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        amenities[item.key as keyof typeof amenities]
                          ? "bg-yellow-50 border-yellow-400"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={amenities[item.key as keyof typeof amenities]}
                        onChange={(e) =>
                          setAmenities({
                            ...amenities,
                            [item.key]: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 7 && !showSuccess && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Add Description
            </h2>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Write description<span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[200px] resize-none"
                />
              </div>

              <div className="flex justify-center">
                <Button className="bg-[#0891B2] hover:bg-[#0e7490] text-white font-medium px-8 py-3 rounded-[1px]">
                  Write Description With AI
                </Button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="space-y-6 max-w-3xl mx-auto py-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="text-7xl">🎉</div>
              </div>
              <h2 className="text-3xl font-bold">Property Add successfully</h2>
              <p className="text-gray-600">
                Your property has been added successfully completed.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              <h3 className="text-xl font-semibold text-center">
                Listing Quality Score
              </h3>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Overall Quality Score
                    </p>
                    <p className="text-4xl font-bold text-green-600">
                      87<span className="text-2xl">/100</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Excellent quality listing
                    </p>
                  </div>
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="#fbbf24"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.87)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">87%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Image Quality",
                    score: 92,
                    message:
                      "All images meet resolution standards. High-quality, professional photos detected.",
                  },
                  {
                    title: "Description Quality",
                    score: 95,
                    message:
                      "Comprehensive, accurate with good keyword density and detail level.",
                  },
                  {
                    title: "Amenities Completeness",
                    score: 65,
                    message:
                      "Most amenities listed. Consider adding pool and security details.",
                  },
                  {
                    title: "Permit Validation",
                    score: 100,
                    message:
                      "Valid permit number confirmed. All regulatory requirements met.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-semibold">{item.title}</h4>
                      <span
                        className={`text-sm font-bold ${
                          item.score >= 90
                            ? "text-green-600"
                            : item.score >= 70
                              ? "text-yellow-600"
                              : "text-orange-600"
                        }`}
                      >
                        {item.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.score >= 90
                            ? "bg-green-500"
                            : item.score >= 70
                              ? "bg-yellow-500"
                              : "bg-orange-500"
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600">{item.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep > 7 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {steps[currentStep - 1]?.label || "Complete"}
              </h2>
              <p className="text-gray-600">This step is coming soon...</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!showSuccess && (
        <div className="flex justify-end gap-4 max-w-3xl mx-auto pr-12">
          <Button
            onClick={handleCancel}
            className="px-12 py-3 bg-[#0891B2] hover:bg-[#0e7490] text-white font-medium rounded-[1px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleNext}
            className="px-12 py-3 bg-[#FBDE02] hover:bg-yellow-500 text-black font-medium rounded-[1px]"
          >
            Next
          </Button>
        </div>
      )}

      {showSuccess && (
        <div className="flex justify-center gap-4 max-w-3xl mx-auto">
          <Button
            onClick={() => setShowSuccess(false)}
            className="px-12 py-3 bg-[#0891B2] hover:bg-[#0e7490] text-white font-medium rounded-[1px]"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              /* Handle update */
            }}
            className="px-12 py-3 bg-[#FBDE02] hover:bg-yellow-500 text-black font-medium rounded-[1px]"
          >
            Update
          </Button>
        </div>
      )}

      {/* Validation Modal */}
      {showValidationModal && validatedData && (
        <PermitValidationModal
          data={validatedData}
          onConfirm={handleValidationConfirm}
          onCancel={() => setShowValidationModal(false)}
        />
      )}
    </div>
  );
}
