// Merchant API Service
// This file handles all merchant-related API calls

export const merchantService = {
  // Get merchant dashboard stats
  async getDashboardStats() {
    // TODO: Implement API call
    return {
      totalProperties: 0,
      activeBookings: 0,
      totalRevenue: 0,
    };
  },

  // Create new property
  async createProperty(propertyData: any) {
    // TODO: Implement API call
    console.log("Creating property:", propertyData);
    return { success: true };
  },

  // Get merchant's properties
  async getProperties() {
    // TODO: Implement API call
    return [];
  },

  // Update property
  async updateProperty(propertyId: string, propertyData: any) {
    // TODO: Implement API call
    console.log("Updating property:", propertyId, propertyData);
    return { success: true };
  },

  // Delete property
  async deleteProperty(propertyId: string) {
    // TODO: Implement API call
    console.log("Deleting property:", propertyId);
    return { success: true };
  },
};
