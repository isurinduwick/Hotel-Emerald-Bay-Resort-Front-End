"use client";

import { useState, useRef } from "react";

interface GalleryImage {
  id: number;
  src: string;
  caption: string;
  category: string;
}

const CATEGORIES = ["All", "Rooms", "Pool", "Restaurant", "Beach", "Spa", "Events"];

const INITIAL_IMAGES: GalleryImage[] = [
  { id: 1, src: "/roomimg1.jpg", caption: "Superior Ocean View Room", category: "Rooms" },
  { id: 2, src: "/roomimg2.jpg", caption: "Beachfront Suite", category: "Rooms" },
  { id: 3, src: "/2ndimg.jpg", caption: "Deluxe Double Room", category: "Rooms" },
  { id: 4, src: "/pool2.png", caption: "Rooftop Infinity Pool", category: "Pool" },
  { id: 5, src: "/discoverimg1.jpg", caption: "Ocean View Dining", category: "Restaurant" },
  { id: 6, src: "/discoverimg2.jpg", caption: "Sunset Beach Lounge", category: "Beach" },
  { id: 7, src: "/discoverimg3.jpg", caption: "Tropical Garden Path", category: "Spa" },
  { id: 8, src: "/discoverimg4.jpg", caption: "Private Beach Cabana", category: "Beach" },
];

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>(INITIAL_IMAGES);
  const [showUpload, setShowUpload] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [viewImage, setViewImage] = useState<GalleryImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const resetUpload = () => {
    setCaption("");
    setCategory("");
    setPreviewSrc("");
    setShowUpload(false);
    setCategoryDropdownOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!previewSrc || !category) return;

    const newImage: GalleryImage = {
      id: Date.now(),
      src: previewSrc,
      caption: caption || "Untitled",
      category,
    };

    setImages((prev) => [newImage, ...prev]);
    showSuccess("Photo added to gallery!");
    resetUpload();
  };

  const handleDelete = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setDeleteConfirmId(null);
    showSuccess("Photo removed from gallery!");
  };

  const filtered = filterCategory === "All" ? images : images.filter((img) => img.category === filterCategory);

  return (
    <div className="space-y-6 max-w-6xl">
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

      {/* Image Preview Modal */}
      {viewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setViewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setViewImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <img
              src={viewImage.src}
              alt={viewImage.caption}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
                {viewImage.caption}
              </p>
              <span
                className="text-xs px-2.5 py-1 rounded-lg"
                style={{
                  backgroundColor: "rgba(179,153,119,0.15)",
                  color: "#B39977",
                }}
              >
                {viewImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="rounded-2xl p-6 w-full max-w-sm space-y-4"
            style={{
              backgroundColor: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "#FFFFFF" }}>
                  Delete Photo
                </h3>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  This action cannot be undone
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02]"
                style={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
            Gallery Management
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Add and remove photos from the hotel gallery
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs px-3 py-1.5 rounded-lg" style={{ backgroundColor: "rgba(179,153,119,0.12)", color: "#B39977" }}>
            {images.length} photo{images.length !== 1 ? "s" : ""}
          </span>
          {!showUpload && (
            <button
              onClick={() => {
                resetUpload();
                setShowUpload(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Photo
            </button>
          )}
        </div>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{
            backgroundColor: "#1a1d27",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              Add New Photo
            </h2>
            <button
              onClick={resetUpload}
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
            {/* Image Upload Area */}
            <div>
              <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                PHOTO
              </label>
              {previewSrc ? (
                <div
                  className="relative rounded-xl overflow-hidden group"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <img src={previewSrc} alt="Preview" className="w-full h-48 object-cover" />
                  <button
                    onClick={() => {
                      setPreviewSrc("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#EF4444" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      Remove
                    </div>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors hover:bg-white/5"
                  style={{
                    border: "2px dashed rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-sm">Click to upload photo</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                    JPG, PNG up to 10MB
                  </span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Caption & Category */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                  CAPTION
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Sunset view from the terrace"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#EDE6D9",
                  }}
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                  CATEGORY
                </label>
                <button
                  type="button"
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  className="w-full px-4 py-3 rounded-xl text-sm text-left flex items-center justify-between outline-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: category ? "#EDE6D9" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {category || "Select category"}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    style={{
                      transform: categoryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {categoryDropdownOpen && (
                  <div
                    className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 shadow-xl"
                    style={{
                      backgroundColor: "#252833",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setCategoryDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                        style={{
                          color: category === cat ? "#B39977" : "rgba(255,255,255,0.6)",
                          backgroundColor: category === cat ? "rgba(179,153,119,0.1)" : "transparent",
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAdd}
              disabled={!previewSrc || !category}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100"
              style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
            >
              Add to Gallery
            </button>
            <button
              onClick={resetUpload}
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

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              backgroundColor: filterCategory === cat ? "rgba(179,153,119,0.15)" : "rgba(255,255,255,0.04)",
              color: filterCategory === cat ? "#B39977" : "rgba(255,255,255,0.4)",
              border: filterCategory === cat ? "1px solid rgba(179,153,119,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {cat}
            {cat !== "All" && (
              <span className="ml-1.5" style={{ opacity: 0.6 }}>
                {images.filter((img) => img.category === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="rounded-2xl overflow-hidden group relative"
              style={{
                backgroundColor: "#1a1d27",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Image */}
              <div
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={() => setViewImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <svg
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.9)"
                    strokeWidth="1.5"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M9 21H3v-6" />
                    <path d="M21 3l-7 7" />
                    <path d="M3 21l7-7" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#FFFFFF" }}>
                      {img.caption}
                    </p>
                    <span
                      className="inline-block text-[10px] px-2 py-0.5 rounded-md mt-1.5"
                      style={{
                        backgroundColor: "rgba(179,153,119,0.12)",
                        color: "#B39977",
                      }}
                    >
                      {img.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setDeleteConfirmId(img.id)}
                    className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    title="Delete photo"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            {filterCategory === "All"
              ? 'No photos in the gallery yet. Click "Add Photo" to get started.'
              : `No photos in the "${filterCategory}" category.`}
          </p>
        </div>
      )}
    </div>
  );
}
