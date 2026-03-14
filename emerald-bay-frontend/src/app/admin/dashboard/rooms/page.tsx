"use client";

import { useState, useRef } from "react";

interface Room {
  id: number;
  name: string;
  size: string;
  price: string;
  description: string;
  images: string[];
}

const ROOM_SIZES = [
  "Small (15-20 sqm)",
  "Medium (20-30 sqm)",
  "Large (30-45 sqm)",
  "Suite (45-60 sqm)",
  "Penthouse (60+ sqm)",
];

const INITIAL_ROOMS: Room[] = [
  {
    id: 0,
    name: "Superior Ocean View",
    size: "Large (30-45 sqm)",
    price: "250",
    description:
      "Wake up to breathtaking ocean panoramas with a spacious king bed and private balcony.",
    images: ["/roomimg1.jpg"],
  },
  {
    id: 1,
    name: "Deluxe Double Room",
    size: "Medium (20-30 sqm)",
    price: "180",
    description:
      "A comfortable twin bed room with modern design, cozy interiors, and a relaxing atmosphere.",
    images: ["/2ndimg.jpg"],
  },
  {
    id: 2,
    name: "Beachfront Suite",
    size: "Suite (45-60 sqm)",
    price: "400",
    description:
      "Indulge in luxury with direct beach access, a private plunge pool and stunning sunset views.",
    images: ["/roomimg2.jpg"],
  },
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    price: "",
    description: "",
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

    const newFiles = [...imageFiles, ...files];
    setImageFiles(newFiles);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePreviewImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!formData.name || !formData.size || !formData.price) return;

    const newRoom: Room = {
      id: Date.now(),
      name: formData.name,
      size: formData.size,
      price: formData.price,
      description: formData.description,
      images:
        previewImages.length > 0 ? previewImages : ["/roomimg1.jpg"],
    };

    setRooms((prev) => [...prev, newRoom]);
    showSuccess("Room created successfully!");
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingRoom) return;

    setRooms((prev) =>
      prev.map((r) =>
        r.id === editingRoom.id
          ? {
              ...r,
              name: formData.name || r.name,
              size: formData.size || r.size,
              price: formData.price || r.price,
              description: formData.description || r.description,
              images:
                previewImages.length > 0 ? previewImages : r.images,
            }
          : r
      )
    );
    showSuccess("Room updated successfully!");
    resetForm();
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      size: room.size,
      price: room.price,
      description: room.description,
    });
    setPreviewImages(room.images);
    setImageFiles([]);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    showSuccess("Room deleted successfully!");
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
              value={formData.description}
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
              {previewImages.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-xl overflow-hidden group"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
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
            <div className="w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 relative">
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-full object-cover"
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
    </div>
  );
}
