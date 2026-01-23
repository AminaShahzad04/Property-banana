// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  // UAE phone number format: +971 XX XXX XXXX or 05X XXX XXXX
  const phoneRegex = /^(\+971|971|0)?5[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ""));
}

export function isValidPrice(price: number | string): boolean {
  const numPrice = typeof price === "string" ? Number.parseFloat(price) : price;
  return !Number.isNaN(numPrice) && numPrice > 0;
}

export function isValidArea(area: number | string): boolean {
  const numArea = typeof area === "string" ? Number.parseFloat(area) : area;
  return !Number.isNaN(numArea) && numArea > 0;
}

export function validateBidAmount(
  bidAmount: number,
  askingPrice: number,
  minPercentage: number = 0.7,
  maxPercentage: number = 1.0
): { isValid: boolean; error?: string } {
  const minBid = askingPrice * minPercentage;
  const maxBid = askingPrice * maxPercentage;

  if (bidAmount < minBid) {
    return {
      isValid: false,
      error: `Bid must be at least ${minPercentage * 100}% of asking price`,
    };
  }

  if (bidAmount > maxBid) {
    return {
      isValid: false,
      error: `Bid cannot exceed asking price`,
    };
  }

  return { isValid: true };
}
