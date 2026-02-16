# Tour Endpoint Missing Fields

## Endpoint: `/dashboard/tenant/my-tours`

**Current Implementation:** ✅ `GET /api/dashboard/tenant/my-tours`  
**Service:** `api/tenant.service.ts` → `getMyTours()`

---

## Current Response Structure

```typescript
{
  tours: [
    {
      tour_id: number;
      listing_id: number;
      property_id: number;
      tenant_user_id: number;
      tour_date: string;
      time_slot: string;
      status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
      created_at: string;
    }
  ]
}
```

---

## ⚠️ Required Additional Fields

### 1. Property Details (JOIN with properties/listings table)

**Missing Fields:**

```typescript
property_title?: string;           // Property name/title
property_location?: string;        // Full address or location string
property_image?: string;           // Main property image URL
```

**Why Needed:** To display property information in tour cards without making additional API calls.

**Backend Implementation:** Join `tours` table with `properties` and `listings` tables to include these fields.

---

### 2. Lockbox Information (for upcoming tours)

**Missing Fields:**

```typescript
lockbox_code?: string;            // 6-digit lockbox access code (e.g., "XXXXXX", "d4r4fgg")
lockbox_status?: "pending" | "ready";  // Whether lockbox code is available
```

**Why Needed:** Display lockbox access codes for scheduled tours in the upcoming tab.

**Backend Implementation:**

- If lockbox assigned to property, include the code
- Only show for tours with status "SCHEDULED" and within 24 hours of tour time

**Visual Design:**

- Yellow badge for primary/standard lockbox
- Blue badge for digital/secondary lockbox

---

### 3. Cancellation Details (for cancelled tours)

**Missing Fields:**

```typescript
cancellation_reason?: string;     // Reason for cancellation
cancelled_by?: "LANDLORD" | "TENANT" | "SYSTEM";  // Who cancelled
```

**Why Needed:** Show detailed cancellation information to users.

**Example:** `"Cancelled due to maintenance issue at the property."`

---

### 4. Timer/Countdown (for upcoming tours)

**Missing Fields:**

```typescript
countdown_timer?: string;         // Time until tour starts (e.g., "00:22:00")
```

**Why Needed:** Show how much time remains before tour starts.

**Backend Implementation:**

- Calculate difference between current time and tour_date + time_slot
- Format as "HH:MM:SS"
- Only include for tours with status "SCHEDULED"

**Alternative:** Frontend can calculate this from `tour_date` and `time_slot` if they're properly formatted.

---

## Updated Response Structure (Required)

```typescript
{
  tours: [
    {
      // Existing fields
      tour_id: number;
      listing_id: number;
      property_id: number;
      tenant_user_id: number;
      tour_date: string;              // ISO 8601 format: "2026-04-19"
      time_slot: string;              // Format: "11:00 AM – 11:30 AM"
      status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED" | "NO_SHOW";
      created_at: string;

      // NEW REQUIRED FIELDS
      property_title: string;         // "Luxury Villa in Palm Jumeirah"
      property_location: string;      // "Palm Jumeirah, Dubai"
      property_image: string;         // URL to main property image

      // CONDITIONAL FIELDS
      lockbox_code?: string;          // Only for SCHEDULED tours
      cancellation_reason?: string;   // Only for CANCELLED tours
      cancelled_by?: "LANDLORD" | "TENANT" | "SYSTEM";  // Only for CANCELLED
    }
  ]
}
```

---

## Example Response

```json
{
  "tours": [
    {
      "tour_id": 1,
      "listing_id": 45,
      "property_id": 23,
      "tenant_user_id": 10,
      "tour_date": "2026-04-19",
      "time_slot": "11:00 AM – 11:30 AM",
      "status": "SCHEDULED",
      "created_at": "2026-04-10T08:30:00Z",
      "property_title": "Luxury Villa in Palm Jumeirah",
      "property_location": "Palm Jumeirah, Dubai",
      "property_image": "https://s3.amazonaws.com/propertybanana/properties/23/main.jpg",
      "lockbox_code": "XXXXXX"
    },
    {
      "tour_id": 2,
      "listing_id": 52,
      "property_id": 31,
      "tenant_user_id": 10,
      "tour_date": "2026-04-15",
      "time_slot": "02:00 PM – 02:30 PM",
      "status": "CANCELLED",
      "created_at": "2026-04-08T10:15:00Z",
      "property_title": "Modern Apartment in Downtown",
      "property_location": "Downtown Dubai",
      "property_image": "https://s3.amazonaws.com/propertybanana/properties/31/main.jpg",
      "cancellation_reason": "Cancelled due to maintenance issue at the property.",
      "cancelled_by": "LANDLORD"
    }
  ]
}
```

---

## Priority

### High Priority (Blocking UI)

1. ✅ `property_title` - **CRITICAL** (currently showing "Property #23")
2. ✅ `property_location` - **CRITICAL** (currently showing "Property #23")
3. ✅ `property_image` - **CRITICAL** (fallback to /jumeirah.png)

### Medium Priority (Feature Complete)

4. ⚠️ `lockbox_code` - Needed for upcoming tours functionality
5. ⚠️ `cancellation_reason` - Needed to show why tour was cancelled

### Low Priority (Nice to Have)

6. ℹ️ `countdown_timer` - Can be calculated on frontend
7. ℹ️ `cancelled_by` - Additional context for cancellations

---

## SQL Query Example (Backend Reference)

```sql
SELECT
  t.tour_id,
  t.listing_id,
  t.property_id,
  t.tenant_user_id,
  t.tour_date,
  t.time_slot,
  t.status,
  t.created_at,
  -- Property details
  COALESCE(p.title, p.property_name, CONCAT(p.property_type, ' in ', p.location)) as property_title,
  p.location as property_location,
  pi.image_url as property_image,
  -- Lockbox info (if available)
  l.lockbox_code,
  -- Cancellation details
  t.cancellation_reason,
  t.cancelled_by
FROM tours t
INNER JOIN listings lst ON t.listing_id = lst.listing_id
INNER JOIN properties p ON lst.property_id = p.property_id
LEFT JOIN property_images pi ON p.property_id = pi.property_id AND pi.is_primary = true
LEFT JOIN lockboxes l ON p.property_id = l.property_id AND l.is_active = true
WHERE t.tenant_user_id = ?
ORDER BY t.tour_date DESC, t.time_slot DESC;
```

---

## Frontend Workaround (Temporary)

If backend cannot implement immediately, frontend will:

1. Show `"Property #${property_id}"` as title
2. Use fallback image `/jumeirah.png`
3. Hide lockbox codes
4. Hide cancellation reasons
5. Calculate countdown timer from `tour_date` if needed

**Note:** This provides degraded UX until backend implements the full response.
