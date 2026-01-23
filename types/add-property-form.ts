export interface PropertyFormState {
  currentStep: number;
  propertyName: string;
  propertyType: string;
  description: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  guests: string;
  size: string;
  amenities: Amenities;
  country: string;
  city: string;
  emirate: string;
  street: string;
  buildingName: string;
  floor: string;
  unitNumber: string;
  latitude: string;
  longitude: string;
  images: File[];
  imagePreviews: string[];
  titleDeed: File | null;
  titleDeedPreview: string;
  ownershipCertificate: File | null;
  ownershipCertificatePreview: string;
  nokCertificate: File | null;
  nokCertificatePreview: string;
  utilityBills: File | null;
  utilityBillsPreview: string;
  maintenanceRecords: File | null;
  maintenanceRecordsPreview: string;
  availableFrom: string;
  availableTo: string;
  minimumStay: string;
  maximumStay: string;
  pricePerMonth: string;
  securityDeposit: string;
  cleaningFee: string;
  additionalFees: string;
}

export interface Amenities {
  bathtub: boolean;
  hairDryer: boolean;
  cleaningProducts: boolean;
  shampoo: boolean;
  conditioner: boolean;
  bodyWash: boolean;
  bidet: boolean;
  hotWater: boolean;
  washer: boolean;
  dryer: boolean;
  shower: boolean;
  outdoorShower: boolean;
  hangers: boolean;
  bedLinens: boolean;
  extraPillows: boolean;
  iron: boolean;
  clothingStorage: boolean;
  mosquitoNet: boolean;
  roomDarkeningShades: boolean;
  safe: boolean;
  desk: boolean;
  privateEntrance: boolean;
  tv: boolean;
  gamingConsole: boolean;
  soundSystem: boolean;
  fireplace: boolean;
  washerInUnit: boolean;
  dryerInUnit: boolean;
  washingMachine: boolean;
  paidWasher: boolean;
  airConditioning: boolean;
  heating: boolean;
  portableHeating: boolean;
}

export type PropertyFormAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_FIELD"; field: keyof PropertyFormState; value: any }
  | { type: "SET_AMENITY"; amenity: keyof Amenities; value: boolean }
  | { type: "RESET_FORM" };

export interface ImageValidationCardProps {
  title: string;
  imageCount: number;
  isValid: boolean;
  validationMessage: string;
}
