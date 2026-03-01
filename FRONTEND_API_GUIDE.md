# Frontend Integration Guide - Authentication API

## 🔗 API Base URL
```
Development: http://localhost:3000
Production: [TBD]
```

---

## 🚀 Quick Start

### Important: CORS & Credentials
All API requests **must** include credentials to send/receive session cookies:

```javascript
fetch('http://localhost:3000/auth/cognito/status', {
  credentials: 'include'  // ⚠️ REQUIRED FOR ALL REQUESTS
})
```

---

## 📍 Authentication Endpoints

### 1. **Login** - Initiate Authentication
```
GET /auth/cognito/login
```

**Parameters:** None required

**Request Headers:** None required

**What it does:** Redirects user to AWS Cognito login page

**Frontend Implementation:**
```javascript
// Simple redirect - no parameters needed
function handleLogin() {
  window.location.href = 'http://localhost:3000/auth/cognito/login';
}
```

**Response:** 
- HTTP 302 Redirect to AWS Cognito login page
- Backend automatically handles nonce, state, and all OAuth parameters

**User Flow:**
1. User clicks login button
2. Redirected to AWS Cognito (user enters email/password)
3. After successful login, redirected back to your app

---

### 2. **Check Auth Status** - Is User Logged In?
```
GET /auth/cognito/status
```

**Parameters:** None required

**Request Headers:** 
```
Cookie: connect.sid=xxx  (automatically sent with credentials: 'include')
```

**Response (200 OK):**
```json
// When logged in:
{
  "isAuthenticated": true,
  "user": {
    "user_id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone_no": "+1234567890",
    "auth_provider": "cognito",
    "status": "active",
    "created_at": "2026-01-20T10:30:00.000Z",
    "last_login_at": "2026-01-20T15:45:00.000Z"
  }
}

// When NOT logged in:
{
  "isAuthenticated": false,
  "user": null
}
```

**Frontend Implementation:**
```javascript
async function checkAuthStatus() {
  const response = await fetch('http://localhost:3000/auth/cognito/status', {
    credentials: 'include'
  });
  
  const data = await response.json();
  
  if (data.isAuthenticated) {
    // User is logged in
    setUser(data.user);
  } else {
    // User is not logged in
    setUser(null);
  }
}
```

**When to call:**
- On app initialization (useEffect, componentDidMount)
- After page reload
- When checking if user needs to login

---
Parameters:** None required

**Authentication:** Required (user must be logged in)

**Request Headers:** 
```
Cookie: connect.sid=xxx  (automatically sent with credentials: 'include')
```
### 3. **Get User Profile** - Get Current User Details
```
GET /auth/cognito/profile
```

**Authentication:** Required (user must be logged in)

**Response (Success - 200):**
```json
{
  "user": {
    "user_id": 1,
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone_no": "+1234567890",
    "auth_provider": "cognito",
    "status": "active"
  },
  "isAuthenticated": true
}
```

**Response (Not Authenticated - 401):**
```json
{
  "error": "Not authenticated",
  "message": "Please log in"
}
```

**Frontend Implementation:**
```javascript
async function getUserProfile() {
  const response = await fetch('http://localhost:3000/auth/cognito/profile', {
    credentials: 'include'
  });
  
  if (response.status === 401) {
    // Not logged in - redirect to login
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  const data = await response.json();
  return data.user;
}
```

--Parameters:** None required

**Request Headers:** None required (session will be destroyed regardless)

**What it does:** 
- Destroys server session
- Redirects to AWS Cognito logout
- Clears all authentication

**Response:**
- HTTP 302 Redirect to AWS Cognito logout endpoint
- AWS Cognito then redirects back to your app's home page

**Frontend Implementation:**
```javascript
// No parameters needed
**What it does:** 
- Destroys server session
- Redirects to AWS Cognito logout
- Clears all authentication

**Frontend Implementation:**
```javascript
function handleLogout() {
  window.location.href = 'http://localhost:3000/auth/cognito/logout';
}
```

---

## 💻 Complete React Example

```jsx
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on app load
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch(`${API_URL}/auth/cognito/status`, {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.isAuthenticated) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleLogin() {
    window.location.href = `${API_URL}/auth/cognito/login`;
  }

  function handleLogout() {
    window.location.href = `${API_URL}/auth/cognito/logout`;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.full_name}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please Login</h1>
          <button onClick={handleLogin}>Login with Email</button>
        </div>
      )}
    </div>
  );
}

export default App;
```

---

## 🛡️ Protected Routes Pattern

For routes that require authentication:

```javascript
// ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/auth/cognito/status', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  
  if (!user) {
    // Redirect to login
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return null;
  }

  return children;
### GET Request Example (No Parameters)
```javascript
async function getMyProperties() {
  const response = await fetch('http://localhost:3000/api/properties', {
    credentials: 'include'  // ⚠️ Required - sends session cookie
  });
  
  if (response.status === 401) {
    // Session expired or not logged in
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  const properties = await response.json();
  return properties;
}
```

### POST Request Example (With Body Parameters)
```javascript
async function createProperty(propertyData) {
  // propertyData is an object with your data
  const data = {
    title: "Beautiful Apartment",
    location: "Dubai Marina",
    price: 150000,
    bedrooms: 2
  };

  const response = await fetch('http://localhost:3000/api/properties', {
    method: 'POST',
    credentials: 'include',  // ⚠️ Required - sends session cookie
    headers: {
      'Content-Type': 'application/json'  // Required for JSON body
    },
    body: JSON.stringify(data)  // Convert object to JSON string
  });
  
  if (response.status === 401) {
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  return await response.json();
}
```

### PUT/PATCH Request Example (Update with Parameters)
```javascript
async function updateProperty(propertyId, updateData) {
  const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });
  
  if (response.status === 401) {
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  return await response.json();
}
```

### DELETE Request Example (With URL Parameter)
```javascript
async function deleteProperty(propertyId) {
  const response = await fetch(`http://localhost:3000/api/properties/${propertyId}`, {
    method: 'DELETE',
    credentials: 'include'
  });
  
  if (response.status === 401) {
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  return await response.json();
}
```

### Query Parameters Example
```javascript
async function searchProperties(filters) {
  // Build query string from object
  const queryParams = new URLSearchParams({
    location: filters.location,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    bedrooms: filters.bedrooms
  });

  const response = await fetch(
    `http://localhost:3000/api/properties?${queryParams}`,
    { credentials: 'include' }
  );
  
  if (response.status === 401) {
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  return await response.json();
}

// Usage:
searchProperties({
  location: 'Dubai',
  minPrice: 100000,
  maxPrice: 500000,
  bedrooms: 2
});
// Calls: /api/properties?location=Dubai&minPrice=100000&maxPrice=500000&bedrooms=2sync function createProperty(propertyData) {
  const response = await fetch('http://localhost:3000/api/properties', {
    method: 'POST',
    credentials: 'include',  // Always include this
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(propertyData)
  });
  
  if (response.status === 401) {
    window.location.href = 'http://localhost:3000/auth/cognito/login';
    return;
  }
  
  return await response.json();
}
```

---

## 🎨 Vue.js Example

```vue
<template>
  <div>
    <div v-if="loading">Loading...</div>
    
    <div v-else-if="user">
      <h1>Welcome, {{ user.full_name }}!</h1>
      <p>Email: {{ user.email }}</p>
      <button @click="logout">Logout</button>
    </div>
    
    <div v-else>
      <h1>Please Login</h1>
      <button @click="login">Login with Email</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      loading: true
    }
  },
  
  mounted() {
    this.checkAuth();
  },
  
  methods: {
    async checkAuth() {
      try {
        const response = await fetch('http://localhost:3000/auth/cognito/status', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.isAuthenticated) {
          this.user = data.user;
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        this.loading = false;
      }
    },
    
    login() {
      window.location.href = 'http://localhost:3000/auth/cognito/login';
    },
    
    logout() {
      window.location.href = 'http://localhost:3000/auth/cognito/logout';
    }
  }
}🎯 Parameter Summary

| Endpoint | Method | URL Params | Body Params | Headers | Response |
|----------|--------|------------|-------------|---------|----------|
| `/auth/cognito/login` | GET | None | None | None | 302 Redirect |
| `/auth/cognito/status` | GET | None | None | Cookie (auto) | JSON |
| `/auth/cognito/profile` | GET | None | None | Cookie (auto) | JSON |
| `/auth/cognito/logout` | GET | None | None | None | 302 Redirect |

**Key Points:**
- ✅ No manual parameters needed for auth endpoints
- ✅ Session cookie is automatically sent with `credentials: 'include'`
- ✅ All user data is stored server-side (secure)
- ✅ Frontend only needs to make simple fetch calls

---

## 📋 Checklist for Frontend Developer

- [ ] All fetch requests include `credentials: 'include'`
- [ ] Call `/auth/cognito/status` on app load to check auth
- [ ] Login button redirects to `/auth/cognito/login` (no params needed)
- [ ] Logout button redirects to `/auth/cognito/logout` (no params needed)
- [ ] Handle 401 responses (redirect to login)
- [ ] Protected routes check auth status before rendering
- [ ] Don't store sensitive data in localStorage (session cookies handle auth)
- [ ] Include `Content-Type: application/json` header for POST/PUT requests with body
- [ ] Use `JSON.stringify()` to convert objects to JSON for request body
// auth.js
const API_URL = 'http://localhost:3000';
let currentUser = null;

async function checkAuth() {
  const response = await fetch(`${API_URL}/auth/cognito/status`, {
    credentials: 'include'
  });
  const data = await response.json();
  
  currentUser = data.user;
  updateUI();
}

function updateUI() {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userInfo = document.getElementById('user-info');
  
  if (currentUser) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'block';
    userInfo.innerHTML = `Welcome, ${currentUser.full_name}!`;
  } else {
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
    userInfo.innerHTML = '';
  }
}

function login() {
  window.location.href = `${API_URL}/auth/cognito/login`;
}

function logout() {
  window.location.href = `${API_URL}/auth/cognito/logout`;
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', checkAuth);
```

```html
<!-- index.html -->
<div id="user-info"></div>
<button id="login-btn" onclick="login()">Login</button>
<button id="logout-btn" onclick="logout()" style="display: none;">Logout</button>
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Session Cookie Not Being Sent
**Problem:** User appears logged out even after login

**Solution:** Always include `credentials: 'include'` in fetch requests
```javascript
fetch(url, { credentials: 'include' })  // ✅ Correct
fetch(url)  // ❌ Wrong - cookies won't be sent
```

---

### Issue 2: CORS Errors
**Problem:** Browser blocks requests from frontend to backend

**Solution:** Backend needs CORS configuration (already configured on backend):
```javascript
// You don't need to do this - just for reference
// Backend has this configured:
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  credentials: true
}));
```

Make sure your frontend URL matches what backend expects.

---

### Issue 3: User Gets Redirected in Loop
**Problem:** After login, user keeps getting redirected

**Solution:** Make sure callback URL is configured correctly in AWS Cognito console:
- Callback URL: `http://localhost:3000/auth/cognito/callback`
- This should redirect to your frontend after processing

---

## 📋 Checklist for Frontend Developer

- [ ] All fetch requests include `credentials: 'include'`
- [ ] Call `/auth/cognito/status` on app load to check auth
- [ ] Login button redirects to `/auth/cognito/login`
- [ ] Logout button redirects to `/auth/cognito/logout`
- [ ] Handle 401 responses (redirect to login)
- [ ] Protected routes check auth status before rendering
- [ ] Don't store sensitive data in localStorage (session cookies handle auth)

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify `credentials: 'include'` is in all requests
3. Check that cookies are being sent (Browser DevTools → Network → Request Headers)
4. Ensure frontend URL matches CORS configuration on backend

---

## 📊 User Object Structure Reference

```typescript
interface User {
  user_id: number;
  full_name: string;
  email: string;
  emirates_id: string | null;
  phone_no: string | null;
  whatsapp_no: string | null;
  photo_url: string | null;
  auth_provider: 'cognito' | 'uaepass';
  status: 'active' | 'inactive';
  created_at: string;
  last_login_at: string;
}
```

---

**Questions?** Contact backend team for assistance.
