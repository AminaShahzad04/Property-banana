# Property Banana - Project Structure

## 📁 Directory Structure

```
propertybanana/
├── app/                         # Next.js app directory (routing)
│   ├── page.tsx                # Home/Sign-in page
│   ├── layout.tsx              # Root layout
│   ├── globals.css             # Global styles
│   ├── sign-up/
│   ├── login-uae-pass/
│   ├── tour/
│   └── dashboard/              # Protected dashboard routes
│
├── components/                  # React components
│   ├── auth/                   # Authentication components
│   │   ├── AuthLayout.tsx
│   │   ├── SignInForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── ForgotPasswordModal.tsx
│   │   ├── UAEPassLoginModal.tsx
│   │   └── UAEPassModal.tsx
│   │
│   ├── layout/                 # Layout components
│   │   └── Logo.tsx
│   │
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Label.tsx
│   │   └── Select.tsx
│   │
│   ├── apartment/              # Apartment-specific (TODO)
│   ├── booking/                # Booking-specific (TODO)
│   ├── bid/                    # Bidding-specific (TODO)
│   └── dashboard/              # Dashboard-specific (TODO)
│
├── api/                        # API service layer
│   ├── auth.service.ts
│   ├── apartment.service.ts
│   ├── booking.service.ts
│   └── bid.service.ts
│
├── hooks/                      # Custom React hooks
│   ├── useAuth.ts
│   ├── useApartments.ts
│   ├── useBookings.ts
│   ├── useBids.ts
│   └── useDebounce.ts
│
├── types/                      # TypeScript type definitions
│   ├── index.ts               # Barrel export
│   ├── user.ts
│   ├── apartment.ts
│   ├── booking.ts
│   ├── bid.ts
│   └── tour.ts
│
├── constants/                  # App constants
│   ├── index.ts               # Barrel export
│   ├── routes.ts
│   ├── apartment-types.ts
│   ├── bid-status.ts
│   └── booking-status.ts
│
├── utils/                      # Utility functions
│   ├── index.ts               # Barrel export
│   ├── formatDate.ts
│   ├── currency.ts
│   └── validators.ts
│
├── lib/                        # Third-party integrations
│   ├── utils.ts               # cn() utility
│   ├── api-client.ts          # HTTP client wrapper
│   └── auth.ts                # Auth helpers
│
├── config/                     # App configuration
│   ├── env.ts                 # Environment variables
│   └── site.ts                # Site metadata
│
├── middleware.ts              # Next.js middleware (auth)
└── public/                    # Static assets
```

## 🎯 Key Conventions

### File Naming
- **Components**: PascalCase (e.g., `SignInForm.tsx`, `Button.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validators.ts`)
- **Types**: camelCase (e.g., `user.ts`, `apartment.ts`)
- **Constants**: kebab-case (e.g., `bid-status.ts`, `apartment-types.ts`)

### Import Patterns
```typescript
// ✅ Good - Use barrel exports
import { User, Apartment, Booking } from '@/types';
import { ROUTES, BID_STATUS } from '@/constants';
import { formatCurrency, formatDate } from '@/utils';

// ✅ Good - Direct imports for components
import { Button } from '@/components/ui/Button';
import { SignInForm } from '@/components/auth/SignInForm';

// ❌ Avoid - Old paths
import { Button } from '@/components/ui/button'; // Wrong case
import { SignInForm } from '@/components/sign-in-form'; // Old location
```

### Component Organization
- **auth/**: Authentication & user management
- **apartment/**: Property listings, cards, galleries
- **booking/**: Tour booking & scheduling
- **bid/**: Bidding system components
- **dashboard/**: User dashboard elements
- **ui/**: Pure, reusable UI components
- **layout/**: Structural components (Navbar, Footer, Sidebar)

## 🔧 Next Steps

### To Complete the Structure:
1. Create layout components:
   - `components/layout/Navbar.tsx`
   - `components/layout/Sidebar.tsx`
   - `components/layout/Footer.tsx`

2. Create apartment components:
   - `components/apartment/ApartmentCard.tsx`
   - `components/apartment/ApartmentGallery.tsx`
   - `components/apartment/ApartmentInfo.tsx`

3. Create booking components:
   - `components/booking/TourBookingModal.tsx`
   - `components/booking/VisitDatePicker.tsx`

4. Add apartment pages:
   - `app/apartments/page.tsx`
   - `app/apartments/[id]/page.tsx`

5. Add dashboard pages:
   - `app/dashboard/page.tsx`
   - `app/dashboard/bookings/page.tsx`
   - `app/dashboard/bids/page.tsx`

## 📝 Environment Variables

Create a `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# UAE Pass (if applicable)
NEXT_PUBLIC_UAE_PASS_CLIENT_ID=your_client_id
NEXT_PUBLIC_UAE_PASS_REDIRECT_URI=http://localhost:3000/auth/callback
NEXT_PUBLIC_UAE_PASS_ENV=staging

# Feature Flags
NEXT_PUBLIC_ENABLE_BIDDING=true
NEXT_PUBLIC_ENABLE_VIRTUAL_TOURS=true

# Optional
NEXT_PUBLIC_MAPBOX_TOKEN=your_token
NEXT_PUBLIC_GA_ID=your_ga_id
```

## 🚀 Usage Examples

### Using Types
```typescript
import type { Apartment, User } from '@/types';

const apartment: Apartment = {
  id: '1',
  title: 'Luxury Villa',
  // ...
};
```

### Using Constants
```typescript
import { ROUTES, BID_STATUS } from '@/constants';

router.push(ROUTES.APARTMENT_DETAILS('123'));
if (bid.status === BID_STATUS.ACCEPTED) {
  // ...
}
```

### Using Hooks
```typescript
import { useAuth, useApartments } from '@/hooks';

const { user, login, logout } = useAuth();
const { apartments, loading } = useApartments(filters);
```

### Using Services
```typescript
import { apartmentService } from '@/api/apartment.service';

const apartments = await apartmentService.getApartments({ type: ['villa'] });
```

## 🔒 Authentication Flow

1. User logs in → `authService.login()`
2. Token stored → `auth.setToken()`
3. Protected routes → `middleware.ts` checks token
4. API calls → `api-client.ts` includes token
5. Logout → `auth.clearSession()`

---

Built with ❤️ using Next.js 14+ and TypeScript
