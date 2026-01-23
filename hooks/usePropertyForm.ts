import { useReducer } from "react";
import type {
  PropertyFormState,
  PropertyFormAction,
} from "@/types/add-property-form";
import { INITIAL_AMENITIES } from "@/constants/add-property-form";

export const initialFormState: PropertyFormState = {
  currentStep: 1,
  propertyName: "",
  propertyType: "",
  description: "",
  bedrooms: "",
  beds: "",
  bathrooms: "",
  guests: "",
  size: "",
  amenities: INITIAL_AMENITIES,
  country: "",
  city: "",
  emirate: "",
  street: "",
  buildingName: "",
  floor: "",
  unitNumber: "",
  latitude: "",
  longitude: "",
  images: [],
  imagePreviews: [],
  titleDeed: null,
  titleDeedPreview: "",
  ownershipCertificate: null,
  ownershipCertificatePreview: "",
  nokCertificate: null,
  nokCertificatePreview: "",
  utilityBills: null,
  utilityBillsPreview: "",
  maintenanceRecords: null,
  maintenanceRecordsPreview: "",
  availableFrom: "",
  availableTo: "",
  minimumStay: "",
  maximumStay: "",
  pricePerMonth: "",
  securityDeposit: "",
  cleaningFee: "",
  additionalFees: "",
};

export function formReducer(
  state: PropertyFormState,
  action: PropertyFormAction
): PropertyFormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_AMENITY":
      return {
        ...state,
        amenities: { ...state.amenities, [action.amenity]: action.value },
      };
    case "RESET_FORM":
      return initialFormState;
    default:
      return state;
  }
}

export function usePropertyForm() {
  return useReducer(formReducer, initialFormState);
}
