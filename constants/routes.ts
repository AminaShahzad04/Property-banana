// Application route constants
export const ROUTES = {
  HOME: "/",

  // Auth routes
  LOGIN: "/login",
  REGISTER: "/sign-up",
  LOGIN_UAE_PASS: "/login-uae-pass",
  FORGOT_PASSWORD: "/forgot-password",

  // Apartment routes
  APARTMENTS: "/apartments",
  APARTMENT_DETAILS: (id: string) => `/apartments/${id}`,

  // Dashboard routes
  DASHBOARD: "/Dash/dashboard",
  DASHBOARD_BOOKINGS: "/Dash/bookings",
  DASHBOARD_BIDS: "/Dash/bids",
  DASHBOARD_VISITS: "/Dash/visits",
  DASHBOARD_PROFILE: "/Dash/profile",
  // Tour routes
  TOUR: "/tour",
} as const;

export type RouteKeys = keyof typeof ROUTES;
