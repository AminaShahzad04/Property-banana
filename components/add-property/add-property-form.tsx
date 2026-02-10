"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import PermitValidationModal from "./permit-validation-modal";
import StepIndicator from "./step-indicator";
import StepOne from "./verify-permit";
import StepTwo from "./upload-document";
import StepThree from "./add-property-details";
import StepFour from "./image-quality-verification";
import StepFive from "./add-price-detail";
import StepSix from "./add-amenities";
import StepSeven from "./add-description";
import SuccessScreen from "./success-screen";

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
    <div className="space-y-8  bg-card">
      {/* Progress Bar */}
      <div className="relative ">
        <div className="h-1  rounded-full">
          <div
            className="h-1 bg-[#4EC57D] rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <StepIndicator currentStep={currentStep} />

      {/* Step Content */}
      <div
        className={` p-6 pt-10 min-h-[400px] mx-auto ${
          currentStep === 4 && showImageValidation ? "max-w-4xl" : "max-w-2xl"
        }`}
      >
        {currentStep === 1 && (
          <StepOne
            permitNumber={permitNumber}
            setPermitNumber={setPermitNumber}
            location={location}
            setLocation={setLocation}
            availability={availability}
            setAvailability={setAvailability}
            handleValidate={handleValidate}
          />
        )}

        {currentStep === 2 && (
          <StepTwo
            titleDeedFile={titleDeedFile}
            handleFileUpload={handleFileUpload}
          />
        )}

        {currentStep === 3 && (
          <StepThree
            room={room}
            setRoom={setRoom}
            bedroom={bedroom}
            setBedroom={setBedroom}
            propertySize={propertySize}
            setPropertySize={setPropertySize}
            developer={developer}
            setDeveloper={setDeveloper}
            unitNo={unitNo}
            setUnitNo={setUnitNo}
            parkingSpaces={parkingSpaces}
            setParkingSpaces={setParkingSpaces}
            furnishingType={furnishingType}
            setFurnishingType={setFurnishingType}
            propertyAge={propertyAge}
            setPropertyAge={setPropertyAge}
            floorNo={floorNo}
            setFloorNo={setFloorNo}
            ownerName={ownerName}
            setOwnerName={setOwnerName}
          />
        )}

        {currentStep === 4 && (
          <StepFour
            showImageValidation={showImageValidation}
            titleImage={titleImage}
            setTitleImage={setTitleImage}
            propertyImages={propertyImages}
            setPropertyImages={setPropertyImages}
          />
        )}

        {currentStep === 5 && (
          <StepFive
            rentAmount={rentAmount}
            setRentAmount={setRentAmount}
            rentFrequency={rentFrequency}
            setRentFrequency={setRentFrequency}
            noCheques={noCheques}
            setNoCheques={setNoCheques}
            minContractPeriod={minContractPeriod}
            setMinContractPeriod={setMinContractPeriod}
            vacatingNoticePeriod={vacatingNoticePeriod}
            setVacatingNoticePeriod={setVacatingNoticePeriod}
            maintenanceFees={maintenanceFees}
            setMaintenanceFees={setMaintenanceFees}
            paidBy={paidBy}
            setPaidBy={setPaidBy}
          />
        )}

        {currentStep === 6 && (
          <StepSix amenities={amenities} setAmenities={setAmenities} />
        )}

        {currentStep === 7 && !showSuccess && (
          <StepSeven
            description={description}
            setDescription={setDescription}
          />
        )}

        {showSuccess && <SuccessScreen />}

        {currentStep > 7 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Complete</h2>
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
