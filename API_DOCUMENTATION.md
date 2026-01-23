# Property Banana - API Documentation

## Overview
This document contains all backend API endpoints required by the Property Banana frontend application.

---

## Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Dashboard APIs](#dashboard-apis)
3. [Property/Booking APIs](#propertybooking-apis)
4. [Bid APIs](#bid-apis)
5. [Rental/Payment APIs](#rentalpayment-apis)
6. [Review API](#review-api)
7. [User Profile API](#user-profile-api)

---

## Authentication APIs

### 1. Login
**Endpoint:** `POST /api/auth/login`

**Description:** User login with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_123456",
    "fullName": "John Doe",
    "email": "user@example.com",
    "userType": "Tenant"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid credentials
- `400` - Validation error

---

### 2. Register
**Endpoint:** `POST /api/auth/register`

**Description:** Create new user account

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "user@example.com",
  "userType": "Tenant",
  "password": "password123"
}
```

**User Types:**
- `Tenant`
- `Landlord`
- `Agent`

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_123456",
    "fullName": "John Doe",
    "email": "user@example.com",
    "userType": "Tenant"
  }
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `409` - Email already exists

---

### 3. UAE Pass Login
**Endpoint:** `POST /api/auth/uae-pass-login`

**Description:** Login using UAE Pass authentication

**Request Body:**
```json
{
  "uaePassToken": "uae_pass_token_string"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_123456",
    "fullName": "John Doe",
    "email": "user@example.com"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Invalid UAE Pass token

---

### 4. Forgot Password
**Endpoint:** `POST /api/auth/forgot-password`

**Description:** Request password reset email

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent successfully"
}
```

**Status Codes:**
- `200` - Success
- `404` - Email not found

---

## Dashboard APIs

### 1. Get Dashboard Statistics
**Endpoint:** `GET /api/dashboard/stats`

**Description:** Retrieve overall dashboard statistics

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "allProperties": 586,
  "totalViews": 12000,
  "totalReviews": 438,
  "totalFavorites": 438
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### 2. Get Tours
**Endpoint:** `GET /api/dashboard/tours`

**Description:** Retrieve user's tours filtered by status

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `status` (optional): `upcoming`, `cancelled`, `rescheduled`, `completed`

**Example:** `GET /api/dashboard/tours?status=upcoming`

**Response:**
```json
{
  "tours": [
    {
      "id": "tour_123",
      "title": "Palm Jumeirah, Dubai",
      "image": "/jumeirah.png",
      "date": "Friday, 19 April",
      "time": "11:00 AM – 11:30 AM",
      "timer": "00:22:00",
      "badge": "XXXXXX",
      "badgeColor": "yellow",
      "status": "upcoming"
    },
    {
      "id": "tour_124",
      "title": "Palm Jumeirah, Dubai",
      "image": "/jumeirah.png",
      "date": "Friday, 19 April",
      "time": "11:00 AM – 11:30 AM",
      "status": "cancelled",
      "errorMessage": "Cancelled due to maintenance issue at the property."
    }
  ]
}
```

**Field Descriptions:**
- `timer` - Only present for upcoming tours (countdown timer)
- `badge` - Property reference code
- `badgeColor` - Badge color scheme: `yellow` or `blue`
- `errorMessage` - Only present for cancelled tours

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### 3. Get Revenue Chart Data
**Endpoint:** `GET /api/dashboard/revenue`

**Description:** Retrieve monthly revenue data for chart display

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `month` (required): Month number (1-12)
- `year` (required): Year (e.g., 2026)

**Example:** `GET /api/dashboard/revenue?month=5&year=2026`

**Response:**
```json
{
  "data": [
    { "day": "1", "revenue": 140 },
    { "day": "5", "revenue": 180 },
    { "day": "10", "revenue": 160 },
    { "day": "15", "revenue": 220 },
    { "day": "20", "revenue": 210 },
    { "day": "25", "revenue": 190 },
    { "day": "30", "revenue": 180 }
  ]
}
```

**Note:** Revenue values are in millions (M)

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### 4. Get Activity Feed
**Endpoint:** `GET /api/dashboard/activities`

**Description:** Retrieve recent activities for the user

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "activities": [
    {
      "id": "act_123",
      "type": "Bid Approved",
      "description": "Your listing House on the Beverly Hills has been approved",
      "image": "/jumeirah.png",
      "timestamp": "2026-01-19T10:30:00Z"
    },
    {
      "id": "act_124",
      "type": "Review Completed",
      "description": "Dollie Horton left a review on House on the Northridge",
      "image": "/jumeirah.png",
      "timestamp": "2026-01-19T09:15:00Z"
    }
  ]
}
```

**Activity Types:**
- `Bid Approved`
- `Review Completed`
- `House Approved`
- `Review`

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

## Property/Booking APIs

### 1. Get Property Details
**Endpoint:** `GET /api/properties/:id`

**Description:** Retrieve detailed information about a property

**Path Parameters:**
- `id` - Property ID

**Example:** `GET /api/properties/prop_123`

**Response:**
```json
{
  "id": "prop_123",
  "name": "Bordeaux Getaway",
  "location": "Dubai",
  "rating": 4.8,
  "reviews": 24,
  "images": [
    "/jumeirah.png",
    "/jumeirah.png",
    "/jumeirah.png",
    "/jumeirah.png",
    "/jumeirah.png"
  ],
  "host": {
    "name": "Ghazal",
    "image": "/Avatar.png"
  },
  "guests": 4,
  "bedrooms": 2,
  "beds": 3,
  "bathrooms": 2,
  "description": "Come and stay at this superb duplex T2 in the heart of the historic center of Bordeaux...",
  "amenities": [
    {
      "icon": "Leaf",
      "label": "Garden view",
      "available": true
    },
    {
      "icon": "Wifi",
      "label": "Wifi",
      "available": true
    },
    {
      "icon": "Dog",
      "label": "Pets allowed",
      "available": false
    }
  ]
}
```

**Amenity Icons:**
- `Leaf`, `UtensilsCrossed`, `Wifi`, `Dog`, `CircleDot`, `Flame`, `Wind`, `Video`, `Refrigerator`, `Bike`

**Status Codes:**
- `200` - Success
- `404` - Property not found

---

### 2. Book Tour
**Endpoint:** `POST /api/tours/book`

**Description:** Book a property tour

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "propertyId": "prop_123",
  "date": "2026-04-19",
  "timeSlot": "09:30 AM - 10:00 AM"
}
```

**Response:**
```json
{
  "tourId": "tour_123",
  "confirmationCode": "XXXXXX"
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `401` - Unauthorized
- `409` - Time slot not available

---

### 3. Get Tour Availability
**Endpoint:** `GET /api/tours/availability`

**Description:** Get available tour time slots for a property

**Query Parameters:**
- `propertyId` (required): Property ID
- `month` (required): Month number (1-12)
- `year` (required): Year (e.g., 2026)

**Example:** `GET /api/tours/availability?propertyId=prop_123&month=5&year=2026`

**Response:**
```json
{
  "availableSlots": [
    {
      "date": "2026-05-15",
      "slots": [
        {
          "time": "09:00 AM - 09:30 AM",
          "available": false
        },
        {
          "time": "09:30 AM - 10:00 AM",
          "available": true
        },
        {
          "time": "10:00 AM - 10:30 AM",
          "available": true
        }
      ]
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `404` - Property not found

---

## Bid APIs

### 1. Place Bid
**Endpoint:** `POST /api/bids/place`

**Description:** Place a bid on a property

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "propertyId": "prop_123",
  "bidAmount": 444000,
  "installments": 2
}
```

**Installment Options:**
- `1` - Single payment
- `2` - Two installments
- `4` - Four installments

**Response:**
```json
{
  "bidId": "bid_123",
  "status": "pending",
  "bidsRemaining": 2
}
```

**Bid Status:**
- `pending` - Awaiting approval
- `approved` - Accepted by landlord
- `rejected` - Declined by landlord

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error / No bids remaining
- `401` - Unauthorized

---

### 2. Get User Bids
**Endpoint:** `GET /api/bids/user`

**Description:** Get user's bid history and remaining bids

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "bidsRemaining": 2,
  "activeBids": [
    {
      "id": "bid_123",
      "propertyId": "prop_123",
      "propertyTitle": "Bordeaux Getaway",
      "bidAmount": 444000,
      "status": "pending",
      "createdAt": "2026-01-19T10:30:00Z"
    },
    {
      "id": "bid_124",
      "propertyId": "prop_456",
      "propertyTitle": "Palm Jumeirah Villa",
      "bidAmount": 550000,
      "status": "approved",
      "createdAt": "2026-01-18T14:20:00Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

### 3. Get Bid Suggestions
**Endpoint:** `GET /api/bids/suggestions`

**Description:** Get suggested bid range for a property

**Query Parameters:**
- `propertyId` (required): Property ID

**Example:** `GET /api/bids/suggestions?propertyId=prop_123`

**Response:**
```json
{
  "suggestedMin": 430000,
  "suggestedMax": 460000
}
```

**Status Codes:**
- `200` - Success
- `404` - Property not found

---

## Rental/Payment APIs

### 1. Security Deposit Payment
**Endpoint:** `POST /api/rental/security-deposit`

**Description:** Process security deposit payment (5% of property value)

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "propertyId": "prop_123",
  "bidId": "bid_123",
  "cardHolderName": "John Doe",
  "cardNumber": "4111111111111111",
  "cvv": "123",
  "expiryDate": "2028-12-31"
}
```

**Response:**
```json
{
  "transactionId": "txn_123456",
  "status": "success"
}
```

**Status:**
- `success` - Payment processed
- `failed` - Payment failed

**Status Codes:**
- `200` - Success
- `400` - Validation error / Payment failed
- `401` - Unauthorized

---

### 2. E-Sign Contract
**Endpoint:** `POST /api/rental/e-sign`

**Description:** Sign rental agreement using UAE Pass

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "propertyId": "prop_123",
  "bidId": "bid_123",
  "uaePassSignature": "uae_pass_signature_token"
}
```

**Response:**
```json
{
  "contractId": "contract_123",
  "contractUrl": "https://storage.example.com/contracts/contract_123.pdf"
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation error
- `401` - Unauthorized

---

### 3. Get Contract Details
**Endpoint:** `GET /api/rental/contract`

**Description:** Get contract and booking summary

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `propertyId` (required): Property ID
- `bidId` (required): Bid ID

**Example:** `GET /api/rental/contract?propertyId=prop_123&bidId=bid_123`

**Response:**
```json
{
  "contractUrl": "https://storage.example.com/contracts/contract_123.pdf",
  "bookingSummary": {
    "property": "Bordeaux Getaway, prop_123",
    "propertyId": "prop_123",
    "landlord": "Ghazal",
    "leasePeriod": "12 Months",
    "startDate": "Feb 15, 2026"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Contract not found

---

### 4. Platform Fee Payment
**Endpoint:** `POST /api/rental/platform-fee`

**Description:** Process platform fee payment

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "propertyId": "prop_123",
  "bidId": "bid_123",
  "cardHolderName": "John Doe",
  "cardNumber": "4111111111111111",
  "cvv": "123",
  "expiryDate": "2028-12-31"
}
```

**Response:**
```json
{
  "transactionId": "txn_789012",
  "status": "success"
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation error / Payment failed
- `401` - Unauthorized

---

### 5. Submit Cheque
**Endpoint:** `POST /api/rental/submit-cheque`

**Description:** Upload cheque and book shipment

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
```
propertyId: prop_123
bidId: bid_123
chequeImage: [File]
address: 123 Main St, Dubai, UAE
deliveryDate: 2025-02-01
deliveryTime: 10:00 AM - 11:00 AM
```

**Response:**
```json
{
  "shipmentId": "ship_123",
  "trackingNumber": "TRK123456789"
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `401` - Unauthorized

---

### 6. Get Delivery Slots
**Endpoint:** `GET /api/rental/delivery-slots`

**Description:** Get available delivery time slots

**Query Parameters:**
- `date` (required): Date in YYYY-MM-DD format

**Example:** `GET /api/rental/delivery-slots?date=2025-02-01`

**Response:**
```json
{
  "slots": [
    {
      "time": "10:00 AM - 11:00 AM",
      "available": true
    },
    {
      "time": "11:00 AM - 12:00 PM",
      "available": true
    },
    {
      "time": "12:00 PM - 01:00 PM",
      "available": true
    },
    {
      "time": "01:00 PM - 02:00 PM",
      "available": false
    }
  ]
}
```

**Status Codes:**
- `200` - Success

---

## Review API

### 1. Submit Review
**Endpoint:** `POST /api/reviews`

**Description:** Submit a review for a completed tour

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "tourId": "tour_123",
  "propertyId": "prop_123",
  "rating": 5,
  "review": "Amazing property! The tour was well organized and the property exceeded expectations."
}
```

**Rating:** Integer from 1 to 5

**Response:**
```json
{
  "reviewId": "review_123",
  "status": "success"
}
```

**Status Codes:**
- `201` - Created successfully
- `400` - Validation error
- `401` - Unauthorized
- `403` - Tour not completed or already reviewed

---

## User Profile API

### 1. Get User Profile
**Endpoint:** `GET /api/user/profile`

**Description:** Get current user's profile information

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "usr_123456",
  "fullName": "John Doe",
  "email": "user@example.com",
  "userType": "Tenant",
  "avatar": "/avatars/usr_123456.png"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized

---

## Common Response Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 201  | Created |
| 400  | Bad Request / Validation Error |
| 401  | Unauthorized |
| 403  | Forbidden |
| 404  | Not Found |
| 409  | Conflict |
| 500  | Internal Server Error |

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

---

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Tokens are obtained from:
- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/uae-pass-login`

---

## Rate Limiting

API calls are rate limited to:
- **100 requests per minute** for authenticated users
- **20 requests per minute** for unauthenticated endpoints

---

## Date/Time Formats

- **Date:** ISO 8601 format `YYYY-MM-DD` (e.g., `2026-01-19`)
- **DateTime:** ISO 8601 format `YYYY-MM-DDTHH:MM:SSZ` (e.g., `2026-01-19T10:30:00Z`)
- **Display Format:** Human readable (e.g., `Friday, 19 April`)

---

## Notes

1. All monetary values are in AED (UAE Dirham)
2. Images can be URLs or file paths
3. Property IDs use prefix `prop_`
4. User IDs use prefix `usr_`
5. Bid IDs use prefix `bid_`
6. Tour IDs use prefix `tour_`
7. Transaction IDs use prefix `txn_`

---

*Last Updated: January 19, 2026*
