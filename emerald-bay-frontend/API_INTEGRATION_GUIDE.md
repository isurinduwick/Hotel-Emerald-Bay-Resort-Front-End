# API Integration Guide

## Environment Configuration

### `.env.local` Variables
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_VERSION=v1
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are accessible in the browser. When deploying, update:
- `NEXT_PUBLIC_API_BASE_URL` to your production backend URL

## API Structure

All endpoints are organized in `src/lib/api.ts`:

### Available API Objects
- `ROOMS_API` - Room endpoints
- `PACKAGES_API` - Package endpoints
- `SERVICES_API` - Service endpoints
- `TOURS_API` - Tour endpoints
- `OFFERS_API` - Offer endpoints
- `GALLERY_IMAGES_API` - Gallery endpoints
- `SECTIONS_API` - Section endpoints
- `AUTH_API` - Authentication endpoints
- `DASHBOARD_API` - Admin dashboard endpoints

## Usage Examples

### Example 1: Fetch Rooms (in a component)
```typescript
'use client';

import { ROOMS_API, apiFetch } from '@/lib/api';
import { useEffect, useState } from 'react';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch(ROOMS_API.LIST)
      .then(data => setRooms(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {rooms.map((room: any) => (
        <div key={room.id}>{room.name}</div>
      ))}
    </div>
  );
}
```

### Example 2: Using the Custom Hook
```typescript
'use client';

import { PACKAGES_API } from '@/lib/api';
import { useApiFetch } from '@/hooks/useApi';

export default function PackagesPage() {
  const { data: packages, loading, error } = useApiFetch(PACKAGES_API.LIST);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {packages?.map((pkg: any) => (
        <div key={pkg.id}>{pkg.name}</div>
      ))}
    </div>
  );
}
```

### Example 3: Fetch a Single Item
```typescript
import { ROOMS_API } from '@/lib/api';

// Get room by ID
const roomUrl = ROOMS_API.DETAIL(1);
const room = await apiFetch(roomUrl);
```

### Example 4: Create/Update with Authentication
```typescript
import { AUTH_API, apiFetch } from '@/lib/api';
import { useApiMutation } from '@/hooks/useApi';

const { mutate } = useApiMutation();

// Login
const loginData = await mutate(AUTH_API.LOGIN, {
  method: 'POST',
  data: { email: 'admin@example.com', password: 'password' },
});

const token = loginData.token;

// Create room (protected)
const newRoom = await mutate(ROOMS_API.CREATE, {
  method: 'POST',
  data: { name: 'New Room', price: 150 },
  token: token,
});
```

## API Endpoints Overview

### Public Endpoints (No Auth Required)
- `GET /api/v1/sections` - List all sections
- `GET /api/v1/rooms` - List all rooms
- `GET /api/v1/packages` - List all packages
- `GET /api/v1/offers` - List all offers
- `GET /api/v1/offers/popups` - Get popup offers
- `GET /api/v1/gallery-images` - List gallery images
- `GET /api/v1/services` - List services
- `GET /api/v1/tours` - List tours
- `POST /api/v1/auth/login` - User login

### Protected Endpoints (Auth Required)
- Dashboard stats and analytics
- Create, update, delete operations for all resources
- User profile and logout operations

## Deployment Notes

### Before Deploying to Production

1. **Update `.env.local` with production backend URL:**
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-production-domain.com
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   npm start
   ```

3. **Verify CORS settings** on backend - ensure your frontend domain is allowed

## Token Storage (for Authentication)

For storing auth tokens, consider using:
- localStorage (persisted across sessions)
- sessionStorage (cleared on browser close)
- Cookies (httpOnly for security)

Example with localStorage:
```typescript
// After login
localStorage.setItem('authToken', loginData.token);

// When making authenticated requests
const token = localStorage.getItem('authToken');
```

## Troubleshooting

### "CORS error"
- Check backend CORS configuration
- Ensure `NEXT_PUBLIC_API_BASE_URL` is correct
- Backend should allow requests from your frontend domain

### "API not found"
- Verify API base URL in `.env.local`
- Check that backend is running
- Inspect network tab in browser DevTools

### "401 Unauthorized"
- Token may be expired or invalid
- Try logging in again
- Check token is being passed correctly in Authorization header
