import type { Amenities } from "@/types/add-property-form";

export const STEPS = [
  { number: 1, title: "Property Description" },
  { number: 2, title: "Property Details" },
  { number: 3, title: "Amenities" },
  { number: 4, title: "Location & Images" },
  { number: 5, title: "Document" },
  { number: 6, title: "Availability" },
  { number: 7, title: "Pricing" },
];

export const BATHROOM_AMENITIES = [
  { id: "bathtub", label: "Bathtub", icon: "Bath" },
  { id: "hairDryer", label: "Hair dryer", icon: "Wind" },
  { id: "cleaningProducts", label: "Cleaning products", icon: "Sparkles" },
  { id: "shampoo", label: "Shampoo", icon: "Droplets" },
  { id: "conditioner", label: "Conditioner", icon: "Droplets" },
  { id: "bodyWash", label: "Body wash", icon: "Droplets" },
  { id: "bidet", label: "Bidet", icon: "Droplets" },
  { id: "hotWater", label: "Hot water", icon: "Flame" },
  { id: "washer", label: "Washer", icon: "WashingMachine" },
  { id: "dryer", label: "Dryer", icon: "Wind" },
  { id: "shower", label: "Shower", icon: "ShowerHead" },
  { id: "outdoorShower", label: "Outdoor shower", icon: "ShowerHead" },
];

export const BEDROOM_AMENITIES = [
  { id: "hangers", label: "Hangers", icon: "Hanger" },
  { id: "bedLinens", label: "Bed linens", icon: "Sheet" },
  { id: "extraPillows", label: "Extra pillows and blankets", icon: "Package" },
  { id: "iron", label: "Iron", icon: "Wind" },
  { id: "clothingStorage", label: "Clothing storage", icon: "Package" },
  {
    id: "mosquitoNet",
    label: "Mosquito net",
    icon: "Bug",
  },
  {
    id: "roomDarkeningShades",
    label: "Room-darkening shades",
    icon: "Moon",
  },
  { id: "safe", label: "Safe", icon: "Lock" },
  { id: "desk", label: "Desk", icon: "Monitor" },
  {
    id: "privateEntrance",
    label: "Private entrance",
    icon: "DoorOpen",
  },
  { id: "tv", label: "TV", icon: "Tv" },
  {
    id: "gamingConsole",
    label: "Gaming console",
    icon: "Gamepad2",
  },
  {
    id: "soundSystem",
    label: "Sound system",
    icon: "Volume2",
  },
  {
    id: "fireplace",
    label: "Fireplace",
    icon: "Flame",
  },
];

export const LAUNDRY_AMENITIES = [
  { id: "washerInUnit", label: "Washer", icon: "WashingMachine" },
  { id: "dryerInUnit", label: "Dryer", icon: "Wind" },
  {
    id: "washingMachine",
    label: "Free washer - in building",
    icon: "Building",
  },
  {
    id: "paidWasher",
    label: "Paid washer - in building",
    icon: "DollarSign",
  },
];

export const HEATING_COOLING_AMENITIES = [
  {
    id: "airConditioning",
    label: "Central air conditioning",
    icon: "Wind",
  },
  {
    id: "heating",
    label: "Central heating",
    icon: "Flame",
  },
  {
    id: "portableHeating",
    label: "Portable heating",
    icon: "Fan",
  },
];

export const INITIAL_AMENITIES: Amenities = {
  bathtub: false,
  hairDryer: false,
  cleaningProducts: false,
  shampoo: false,
  conditioner: false,
  bodyWash: false,
  bidet: false,
  hotWater: false,
  washer: false,
  dryer: false,
  shower: false,
  outdoorShower: false,
  hangers: false,
  bedLinens: false,
  extraPillows: false,
  iron: false,
  clothingStorage: false,
  mosquitoNet: false,
  roomDarkeningShades: false,
  safe: false,
  desk: false,
  privateEntrance: false,
  tv: false,
  gamingConsole: false,
  soundSystem: false,
  fireplace: false,
  washerInUnit: false,
  dryerInUnit: false,
  washingMachine: false,
  paidWasher: false,
  airConditioning: false,
  heating: false,
  portableHeating: false,
};

export const QUALITY_METRICS = [
  {
    title: "Security",
    description: "Ensure robust security measures.",
    icon: "/checked.png",
  },
  {
    title: "Management",
    description: "Ensure the asset is managed efficiently.",
    icon: "/Analysis.png",
  },
  {
    title: "Finishes",
    description: "High-quality finishes and materials.",
    icon: "/rating.png",
  },
];
