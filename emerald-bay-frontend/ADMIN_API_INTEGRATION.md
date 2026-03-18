# Admin Panel API Integration Guide

## ✅ Completed Updates

### 1. Login Page (`/admin/login/page.tsx`)
- ✅ Integrated with `AUTH_API.LOGIN`
- ✅ Stores token in localStorage
- ✅ Shows loading and error states
- ✅ Auto-redirects to dashboard on success

### 2. Dashboard Page (`/admin/dashboard/page.tsx`)
- ✅ Fetches real-time stats from APIs
- ✅ Counts: Rooms, Services, Tours, Packages, Gallery Images
- ✅ Auto-checks authentication before rendering

### 3. Gallery Page (`/admin/dashboard/gallery/page.tsx`)
- ✅ Fetches gallery images with `GALLERY_IMAGES_API.LIST`
- ✅ Add image with `GALLERY_IMAGES_API.CREATE`
- ✅ Delete image with `GALLERY_IMAGES_API.DELETE`
- ✅ Real-time loading and error states

## 📝 Template for Remaining Pages

Use this pattern to update **Rooms**, **Packages**, **Services**, and **Tours** pages:

```typescript
"use client";

import { useState, useEffect, useRef } from "react";
import { ROOMS_API, apiFetch } from "@/lib/api"; // Replace with appropriate API
import { useAdminAuth } from "@/hooks/useAdmin";

interface Item {
  id: number;
  name: string;
  // ... other fields
}

export default function ManagePage() {
  const { token, isLoading: authLoading } = useAdminAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  // Fetch items on mount
  useEffect(() => {
    const fetchItems = async () => {
      if (!token || authLoading) return;

      try {
        setLoading(true);
        const data = await apiFetch(ROOMS_API.LIST, { token }); // Replace ROOMS_API
        const itemsArray = Array.isArray(data) ? data : data?.data || [];
        setItems(itemsArray);
        setApiError("");
      } catch (err) {
        console.error("Failed to fetch items:", err);
        setApiError("Failed to load items");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [token, authLoading]);

  // Create item
  const handleCreate = async (itemData: any) => {
    if (!token) return;

    try {
      const response = await apiFetch(ROOMS_API.CREATE, { // Replace ROOMS_API
        method: "POST",
        data: itemData,
        token,
      });

      setItems((prev) => [response, ...prev]);
      setSuccessMessage("Item created successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to create:", err);
      setApiError("Failed to create item");
    }
  };

  // Update item
  const handleUpdate = async (id: number, itemData: any) => {
    if (!token) return;

    try {
      const response = await apiFetch(ROOMS_API.UPDATE(id), { // Replace ROOMS_API
        method: "PUT",
        data: itemData,
        token,
      });

      setItems((prev) => prev.map((item) => (item.id === id ? response : item)));
      setSuccessMessage("Item updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update:", err);
      setApiError("Failed to update item");
    }
  };

  // Delete item
  const handleDelete = async (id: number) => {
    if (!token) return;

    try {
      await apiFetch(ROOMS_API.DELETE(id), { // Replace ROOMS_API
        method: "DELETE",
        token,
      });

      setItems((prev) => prev.filter((item) => item.id !== id));
      setSuccessMessage("Item deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete:", err);
      setApiError("Failed to delete item");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Success Toast */}
      {successMessage && (
        <div
          className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
          style={{
            backgroundColor: "rgba(52, 211, 153, 0.15)",
            color: "#34D399",
          }}
        >
          {successMessage}
        </div>
      )}

      {/* Error Toast */}
      {apiError && (
        <div
          className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            color: "#FCA5A5",
          }}
        >
          {apiError}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.3)" }}>
          Loading items...
        </div>
      ) : (
        // Render your list and forms here
        <div>
          {/* Your JSX here */}
        </div>
      )}
    </div>
  );
}
```

## 🔧 API Imports to Use

```typescript
// For Rooms
import { ROOMS_API, apiFetch } from "@/lib/api";

// For Packages
import { PACKAGES_API, apiFetch } from "@/lib/api";

// For Services
import { SERVICES_API, apiFetch } from "@/lib/api";

// For Tours
import { TOURS_API, apiFetch } from "@/lib/api";
```

## 📋 Page-Specific Updates Needed

### Rooms Page (`/admin/dashboard/rooms/page.tsx`)
- Replace `INITIAL_ROOMS` with API fetch
- Update `handleAdd` to use `ROOMS_API.CREATE`
- Update `handleEdit` to use `ROOMS_API.UPDATE`
- Update `handleDelete` to use `ROOMS_API.DELETE`

### Packages Page (`/admin/dashboard/packages/page.tsx`)
- Replace `INITIAL_PACKAGES` with `PACKAGES_API.LIST`
- Use `PACKAGES_API.CREATE/UPDATE/DELETE`

### Services Page (`/admin/dashboard/services/page.tsx`)
- Replace `INITIAL_SERVICES` with `SERVICES_API.LIST`
- Use `SERVICES_API.CREATE/UPDATE/DELETE`

### Tours Page (`/admin/dashboard/tours/page.tsx`)
- Replace `INITIAL_TOURS` with `TOURS_API.LIST`
- Use `TOURS_API.CREATE/UPDATE/DELETE`

## 🔐 Authentication

All protected routes use the `useAdminAuth()` hook:

```typescript
import { useAdminAuth } from "@/hooks/useAdmin";

export default function AdminPage() {
  const { token, isLoading } = useAdminAuth();
  // token is automatically available if user is authenticated
}
```

## 🚀 API Endpoint Reference

All endpoints are pre-configured in `/src/lib/api.ts`:

```typescript
// Rooms
ROOMS_API.LIST           // GET all rooms
ROOMS_API.DETAIL(id)     // GET single room
ROOMS_API.CREATE         // POST new room
ROOMS_API.UPDATE(id)     // PUT update room
ROOMS_API.DELETE(id)     // DELETE room

// Similar pattern for PACKAGES_API, SERVICES_API, TOURS_API, etc.
```

## ✨ Quick Start for Each Page

1. Add `useAdminAuth` hook to get token
2. Add `useEffect` to fetch data from API
3. Update handlers to use corresponding API endpoints
4. Add error/success message state
5. Replace hardcoded data with API responses

That's it! All pages follow the same pattern used in Gallery and Dashboard.
