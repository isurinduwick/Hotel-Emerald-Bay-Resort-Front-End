"use client";

import { useState, useRef, useEffect } from "react";
import { ROOMS_API, apiFetch, API_BASE_URL } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdmin";

interface Room {
  id: number;
  name: string;
  size: string;
  price: string;
  description: string;
  images: string[];
}

const unwrapApiEntity = <T,>(response: T | { data?: T } | null | undefined): T | null => {
  if (!response) return null;
  if (typeof response === 'object' && response !== null && 'data' in response) {
    return ((response as { data?: T }).data ?? null) as T | null;
  }
  return response as T;
};

const ROOM_SIZES = [
  "Small (15-20 sqm)",
  "Medium (20-30 sqm)",
  "Large (30-45 sqm)",
  "Suite (45-60 sqm)",
  "Penthouse (60+ sqm)",
];

// Helper function to extract image URL from image object or string
const getImageUrl = (image: any): string => {
  if (!image) return '';

  let imagePath = '';

  // Extract path from object
  if (typeof image === 'string') {
    imagePath = image;
  } else if (typeof image === 'object' && image !== null) {
    // Try common property names for image URLs
    imagePath = image.image_path || image.path || image.url || image.image || '';
  }

  if (!imagePath) return '';

  // Keep client-side preview sources untouched.
  if (imagePath.startsWith('data:image/') || imagePath.startsWith('blob:')) {
    return imagePath;
  }

  // If it's already a full URL, return as-is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Convert /public/storage paths to /storage (Laravel convention)
  if (imagePath.startsWith('/public/storage/')) {
    imagePath = imagePath.replace('/public/storage/', '/storage/');
  }

  // If it's a relative path, prepend the API base URL
  if (imagePath.startsWith('/')) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // Otherwise, treat as a relative path and prepend storage
  return `${API_BASE_URL}/storage/${imagePath}`;
};

export default function RoomsPage() {
  const { token, isLoading: authLoading } = useAdminAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    price: "",
    description: "",
  });
  const [previewImages, setPreviewImages] = useState<Array<{ src: string; isNew: boolean; fileIndex?: number }>>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  // Fetch rooms on mount
  useEffect(() => {
    const fetchRooms = async () => {
      if (!token || authLoading) return;

      try {
        setInitialLoading(true);
        const data = await apiFetch(ROOMS_API.LIST, { token });
        const roomsArray = Array.isArray(data) ? data : data?.data || [];

        // Fetch images for each room
        const roomsWithImages = await Promise.all(
          roomsArray.map(async (room: Room) => {
            try {
              const images = await apiFetch(ROOMS_API.IMAGES(room.id), { token });
              return {
                ...room,
                images: Array.isArray(images) ? images : images?.data || [],
              };
            } catch (err) {
              console.error(`Failed to fetch images for room ${room.id}:`, err);
              return { ...room, images: [] };
            }
          })
        );

        setRooms(roomsWithImages);
        setApiError("");
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setApiError("Failed to load rooms");
        setRooms([]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchRooms();
  }, [token, authLoading]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", size: "", price: "", description: "" });
    setPreviewImages([]);
    setImageFiles([]);
    setEditingRoom(null);
    setShowForm(false);
    setSizeDropdownOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentFileIndex = imageFiles.length;
    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    files.forEach((file, fileIdx) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [
          ...prev,
          {
            src: reader.result as string,
            isNew: true,
            fileIndex: currentFileIndex + fileIdx,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePreviewImage = (index: number) => {
    const imageToRemove = previewImages[index];

    // Remove from preview array
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // If it's a new file, also remove from imageFiles
    if (imageToRemove.isNew && imageToRemove.fileIndex !== undefined) {
      setImageFiles((prev) => prev.filter((_, i) => i !== imageToRemove.fileIndex));
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.size || !formData.price) return;
    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      const hasNewImages = imageFiles.length > 0;

      const payload = {
        name: formData.name,
        size: formData.size,
        price: formData.price,
        description: formData.description || '',
      };

      let apiResponse;

      if (hasNewImages) {
        const roomFormData = new FormData();
        roomFormData.append('name', payload.name);
        roomFormData.append('size', payload.size);
        roomFormData.append('price', payload.price);
        roomFormData.append('description', payload.description);

        for (const imageFile of imageFiles) {
          roomFormData.append('image_files[]', imageFile);
        }

        apiResponse = await apiFetch(ROOMS_API.CREATE, {
          method: "POST",
          formData: roomFormData,
          token,
        });
      } else {
        apiResponse = await apiFetch(ROOMS_API.CREATE, {
          method: "POST",
          data: payload,
          token,
        });
      }

      const response = unwrapApiEntity<Room>(apiResponse);

      if (!response || !response.id) {
        setApiError("Failed to create room - no ID in response");
        return;
      }

      // Fetch the latest room images for UI consistency.
      // Fetch the images for this room
      try {
        const images = await apiFetch(ROOMS_API.IMAGES(response.id), { token });
        const fullRoomData = {
          ...response,
          images: Array.isArray(images) ? images : images?.data || [],
        };
        setRooms((prev) => [...prev, fullRoomData]);
      } catch {
        // Fallback: just add the response as-is with empty images
        setRooms((prev) => [...prev, { ...response, images: [] }]);
      }

      showSuccess("Room created successfully!");
      resetForm();
    } catch (error) {
      console.error("Create error:", error);
      setApiError("Failed to create room. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!editingRoom || !token) {
      setApiError("Authentication required");
      return;
    }

    try {
      const hasNewImages = imageFiles.length > 0;

      const payload = {
        name: formData.name || editingRoom.name,
        size: formData.size || editingRoom.size,
        price: formData.price || editingRoom.price,
        description: formData.description || editingRoom.description || '',
      };

      const roomFormData = new FormData();
      roomFormData.append('name', payload.name);
      roomFormData.append('size', payload.size);
      roomFormData.append('price', payload.price);
      roomFormData.append('description', payload.description);

      if (hasNewImages) {
        for (const imageFile of imageFiles) {
          roomFormData.append('image_files[]', imageFile);
        }
      }

      roomFormData.append('_method', 'PUT');

      const apiResponse = await apiFetch(ROOMS_API.UPDATE(editingRoom.id), {
        method: "POST",
        formData: roomFormData,
        token,
      });

      const response = unwrapApiEntity<Room>(apiResponse);

      if (!response || !response.id) {
        setApiError("Failed to update room");
        return;
      }

      // Fetch the updated room with all its latest images
      try {
        const images = await apiFetch(ROOMS_API.IMAGES(editingRoom.id), { token });
        const fullRoomData = {
          ...response,
          images: Array.isArray(images) ? images : images?.data || [],
        };
        setRooms((prev) =>
          prev.map((r) => (r.id === editingRoom.id ? fullRoomData : r))
        );
      } catch {
        // Fallback: just update with the response and empty images
        setRooms((prev) =>
          prev.map((r) => (r.id === editingRoom.id ? { ...response, images: [] } : r))
        );
      }

      showSuccess("Room updated successfully!");
      resetForm();
    } catch (error) {
      console.error("Update error:", error);
      setApiError("Failed to update room. Please try again.");
    }
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      size: room.size,
      price: room.price,
      description: room.description || '',
    });
    // Set preview images to existing room images, marked as not new
    setPreviewImages((room.images || []).map((img) => ({ src: img, isNew: false })));
    setImageFiles([]); // Reset image files - only new uploads will be added
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      await apiFetch(ROOMS_API.DELETE(id), {
        method: "DELETE",
        token,
      });

      setRooms((prev) => prev.filter((r) => r.id !== id));
      showSuccess("Room deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      setApiError("Failed to delete room. Please try again.");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Success Toast */}
      {successMessage && (
        <div
          className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg animate-pulse"
          style={{
            backgroundColor: "rgba(52, 211, 153, 0.15)",
            color: "#34D399",
            border: "1px solid rgba(52, 211, 153, 0.3)",
          }}
        >
          {successMessage}
        </div>
      )}

      {/* API Error */}
      {apiError && (
        <div
          className="p-4 rounded-xl text-sm flex items-center gap-2 mb-4"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.15)",
            border: "1px solid #EF4444",
            color: "#FCA5A5"
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {apiError}
        </div>
      )}

      {/* Loading State */}
      {initialLoading && (
        <div className="text-center py-16">
          <svg className="mx-auto mb-4 animate-spin" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2v4M12 18v4M22 12h-4M4 12H0" />
          </svg>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Loading rooms...
          </p>
        </div>
      )}

      {!initialLoading && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                Room Management
              </h1>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Create, update and manage your hotel rooms
              </p>
            </div>
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Room
              </button>
            )}
          </div>

          {/* Create / Edit Form */}
          {showForm && (
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                backgroundColor: "#1a1d27",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                  {editingRoom ? "Edit Room" : "Create New Room"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Room Name */}
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    ROOM NAME
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Superior Ocean View"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#EDE6D9",
                    }}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    PRICE PER NIGHT (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
                    placeholder="e.g. 250"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#EDE6D9",
                    }}
                  />
                </div>

                {/* Size Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    ROOM SIZE
                  </label>
                  <button
                    type="button"
                    onClick={() => setSizeDropdownOpen(!sizeDropdownOpen)}
                    className="w-full px-4 py-3 rounded-xl text-sm text-left flex items-center justify-between outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: formData.size ? "#EDE6D9" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {formData.size || "Select room size"}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      style={{
                        transform: sizeDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {sizeDropdownOpen && (
                    <div
                      className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 shadow-xl"
                      style={{
                        backgroundColor: "#252833",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {ROOM_SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setFormData((f) => ({ ...f, size }));
                            setSizeDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                          style={{
                            color: formData.size === size ? "#B39977" : "rgba(255,255,255,0.6)",
                            backgroundColor: formData.size === size ? "rgba(179,153,119,0.1)" : "transparent",
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                  DESCRIPTION
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the room features, amenities, and experience..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 resize-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#EDE6D9",
                  }}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                  ROOM IMAGES
                </label>
                <div className="flex flex-wrap gap-3">
                  {previewImages.map((imgObj, i) => (
                    <div
                      key={i}
                      className="relative w-24 h-24 rounded-xl overflow-hidden group"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <img src={getImageUrl(imgObj.src)} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removePreviewImage(i)}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-white/10"
                    style={{
                      border: "2px dashed rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span className="text-[10px]">Upload</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={editingRoom ? handleUpdate : handleCreate}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                >
                  {editingRoom ? "Update Room" : "Create Room"}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Rooms List */}
          <div className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                style={{
                  backgroundColor: "#1a1d27",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Image */}
                {room.images && room.images.length > 0 ? (
                  <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 relative">
                    <img
                      src={getImageUrl(room.images[0])}
                      alt={room.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ccc" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3EImage not found%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    {room.images.length > 1 && (
                      <span
                        className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded-lg"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.6)",
                          color: "#fff",
                        }}
                      >
                        +{room.images.length - 1} more
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="w-full sm:w-48 h-40 sm:h-auto shrink-0 relative bg-gray-700 flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-semibold" style={{ color: "#FFFFFF" }}>
                          {room.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span
                            className="text-xs px-2 py-0.5 rounded-md"
                            style={{
                              backgroundColor: "rgba(179,153,119,0.12)",
                              color: "#B39977",
                            }}
                          >
                            {room.size}
                          </span>
                        </div>
                      </div>
                      <p className="text-lg font-bold whitespace-nowrap" style={{ color: "#B39977" }}>
                        ${room.price}
                        <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.3)" }}>
                          /night
                        </span>
                      </p>
                    </div>
                    <p className="text-sm mt-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {room.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(room)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-red-500/10"
                      style={{
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#EF4444",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {rooms.length === 0 && (
            <div className="text-center py-16">
              <svg
                className="mx-auto mb-4"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                No rooms added yet. Click &quot;Add New Room&quot; to get started.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
