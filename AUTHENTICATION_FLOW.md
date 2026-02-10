# Authentication Flow Documentation

## Overview

The application uses **AWS Cognito Hosted UI** for authentication with role-based access control. The flow integrates seamlessly with the existing backend endpoints defined in `openapi.yaml`.

## Authentication Endpoints (From OpenAPI Spec)

### 1. **GET /api/cognito/login**

- Redirects to AWS Cognito Hosted UI for both sign-in and sign-up
- Used by both SignInForm and SignUpForm
- No authentication required

### 2. **GET /api/cognito/callback**

- Receives OAuth authorization code from Cognito
- Creates session cookie (`connect.sid`)
- Redirects to appropriate dashboard

### 3. **GET /api/cognito/status**

- Checks if user is authenticated
- Returns user data if authenticated
- No authentication required (public endpoint)

### 4. **GET /api/cognito/profile**

- Returns authenticated user's profile
- Requires session cookie
- Returns 401 if not authenticated

### 5. **GET /api/cognito/logout**

- Clears session
- Redirects to Cognito logout page

## User Flows

### Sign Up Flow

```
1. User visits /sign-up
2. User selects role (Landlord, Tenant, Agent, or Brokerage Owner)
3. Click "Continue to Sign Up"
4. Role ID stored in localStorage as "pendingRole"
5. Redirects to /api/cognito/login (Cognito Hosted UI)
6. User completes registration on Cognito
7. Cognito redirects to /api/cognito/callback
8. Backend creates session
9. Frontend receives callback at /auth/callback
10. Callback checks for pendingRole in localStorage
11. If found, assigns role via POST /api/users/assign-role
12. Redirects to appropriate dashboard based on role
```

### Sign In Flow

```
1. User visits /sign-in
2. Click "Sign In with Email"
3. Redirects to /api/cognito/login (Cognito Hosted UI)
4. User enters credentials on Cognito
5. Cognito redirects to /api/cognito/callback
6. Backend creates session
7. Frontend receives callback at /auth/callback
8. Checks user role via GET /api/users/role-status
9. Redirects to appropriate dashboard based on role
```

### Dashboard Routing (By Role ID)

```
Role ID 1 (LANDLORD)  → /Dash/landlord
Role ID 2 (TENANT)    → /Dash/tenant
Role ID 3 (AGENT)     → /Dash/agent
Role ID 4 (MANAGER)   → /Dash/manager
Role ID 5 (OWNER)     → /Dash/owner
Role ID 6 (ADMIN)     → /Dash/admin
```

### Forgot Password Flow

```
1. User clicks "Forgot Password?" on sign-in page
2. Opens ForgotPasswordModal
3. User enters email
4. Calls POST /api/cognito/forgot-password
5. User receives verification code via email
6. User enters code and new password
7. Calls POST /api/cognito/confirm-forgot-password
8. Password reset successful
9. User can sign in with new password
```

## Key Components

### 1. SignInForm (`components/auth/SignInForm.tsx`)

- Displays sign-in UI
- Redirects to `/api/cognito/login` on button click
- Includes "Forgot Password?" link
- Includes "Sign In with UAE Pass" option

### 2. SignUpForm (`components/auth/SignUpForm.tsx`)

- Displays role selection UI (4 role cards with icons)
- Stores selected role in localStorage
- Redirects to `/api/cognito/login` on button click
- Includes "Sign Up with UAE Pass" option

### 3. AuthCallbackPage (`app/auth/callback/page.tsx`)

- Handles post-authentication logic
- Checks for pendingRole in localStorage
- Assigns role if pending
- Checks user's role status
- Redirects to appropriate dashboard
- Handles errors gracefully

### 4. Auth Service (`api/auth.service.ts`)

- `checkAuthStatus()` - GET /api/cognito/status
- `getProfile()` - GET /api/cognito/profile
- `redirectToLogin()` - Navigate to /api/cognito/login
- `redirectToLogout()` - Navigate to /api/cognito/logout
- `forgotPassword()` - POST /api/cognito/forgot-password
- `confirmForgotPassword()` - POST /api/cognito/confirm-forgot-password
- `changePassword()` - POST /api/cognito/change-password

### 5. User Service (`api/user.service.ts`)

- `getRoleStatus()` - GET /api/users/role-status
- `assignRole(roleId)` - POST /api/users/assign-role
- `getProfile()` - GET /api/users/profile
- `updateProfile()` - PUT /api/users/profile

## Session Management

- Uses httpOnly session cookies (`connect.sid`)
- All API calls include `credentials: "include"`
- Session validated on backend for protected routes
- Session cleared on logout

## Role Selection

### Available Roles for Public Signup

1. **Landlord** (ID: 1) - Property owners
2. **Tenant** (ID: 2) - Property seekers
3. **Agent** (ID: 3) - Real estate agents
4. **Brokerage Owner** (ID: 5) - Brokerage company owners

### Restricted Roles (Not in Signup)

- **Manager** (ID: 4) - Created by brokerage owners
- **Admin** (ID: 6) - System administrators

## LocalStorage Usage

```typescript
// Store role during signup
localStorage.setItem("pendingRole", "1"); // Landlord

// Retrieve and assign after authentication
const pendingRole = localStorage.getItem("pendingRole");
if (pendingRole) {
  await userService.assignRole(parseInt(pendingRole, 10));
  localStorage.removeItem("pendingRole");
}
```

## Error Handling

- Authentication failures redirect to /sign-in
- Role assignment failures redirect to /onboarding/select-role
- Network errors show error message with retry option
- Unauthorized requests (401) trigger re-authentication

## Security Features

1. **Session-based authentication** - Secure httpOnly cookies
2. **AWS Cognito integration** - Industry-standard OAuth 2.0
3. **Role-based access control** - Backend validates user roles
4. **CSRF protection** - Session cookies with SameSite attribute
5. **Password reset flow** - Secure verification codes

## Backend Requirements

All endpoints are already implemented according to `openapi.yaml`:

- ✅ /api/cognito/login
- ✅ /api/cognito/callback
- ✅ /api/cognito/status
- ✅ /api/cognito/profile
- ✅ /api/cognito/logout
- ✅ /api/cognito/forgot-password
- ✅ /api/cognito/confirm-forgot-password
- ✅ /api/users/role-status
- ✅ /api/users/assign-role

## Testing Checklist

- [ ] Sign up with each role (Landlord, Tenant, Agent, Owner)
- [ ] Sign in with existing account
- [ ] Forgot password flow
- [ ] Role-based dashboard routing
- [ ] UAE Pass authentication
- [ ] Logout and session clearing
- [ ] Error handling for invalid credentials
- [ ] Role assignment after signup
- [ ] Fallback to role selection page if role assignment fails

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000  # Development
NEXT_PUBLIC_API_URL=https://api.propertybanana.com  # Production
```

## Notes

- The Cognito Hosted UI URL is managed by the backend
- Frontend never directly accesses AWS Cognito
- All authentication flows go through backend endpoints
- Role selection is optional - users can select role later from settings
- If role assignment fails, users are redirected to /onboarding/select-role
