"use client";

import { useState, useRef } from "react";

interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
}

const INITIAL_SERVICES: ServiceItem[] = [
  { id: 0, title: "BAR", subtitle: "Sip & Savor", imageSrc: "/2ndimg.jpg" },
  { id: 1, title: "ROOFTOP POOL", subtitle: "Skyview Pool", imageSrc: "/pool2.png" },
  { id: 2, title: "RESTAURANT", subtitle: "Gourmet Experience", imageSrc: "/restaurant.png" },
  { id: 3, title: "CELEBRATIONS", subtitle: "Joyful Moments", imageSrc: "/celebrations.png" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const startEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditTitle(service.title);
    setEditSubtitle(service.subtitle);
    setPreviewImage(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditSubtitle("");
    setPreviewImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = (id: number) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              title: editTitle || s.title,
              subtitle: editSubtitle || s.subtitle,
              imageSrc: previewImage || s.imageSrc,
            }
          : s
      )
    );
    showSuccess("Service updated successfully!");
    cancelEdit();
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Success Toast */}
      {successMessage && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium shadow-2xl"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            color: "#34D399",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            backdropFilter: "blur(12px)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(179, 153, 119, 0.12)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
              Manage Services
            </h1>
          </div>
          <p className="text-sm ml-[52px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            Update images, titles and subtitles for the homepage Services section
          </p>
        </div>
        <div
          className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs"
          style={{
            backgroundColor: "rgba(179, 153, 119, 0.08)",
            border: "1px solid rgba(179, 153, 119, 0.15)",
            color: "rgba(179, 153, 119, 0.7)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {services.length} services
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => {
          const isEditing = editingId === service.id;
          const displayImage =
            isEditing && previewImage ? previewImage : service.imageSrc;

          return (
            <div
              key={service.id}
              className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: "#1a1d27",
                border: isEditing
                  ? "1px solid rgba(179,153,119,0.4)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: isEditing
                  ? "0 0 30px rgba(179, 153, 119, 0.08)"
                  : "none",
              }}
            >
              {/* Image Area */}
              <div className="relative h-52 overflow-hidden group">
                <img
                  src={displayImage}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Title & subtitle on the image */}
                {!isEditing && (
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <div>
                      <h3
                        className="text-xl font-bold text-white tracking-wide"
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                      >
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/70 mt-0.5">
                        {service.subtitle}
                      </p>
                    </div>
                    <button
                      onClick={() => startEdit(service)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                      style={{
                        backgroundColor: "rgba(179, 153, 119, 0.85)",
                        color: "#FFFFFF",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                  </div>
                )}

                {/* Image upload overlay in edit mode */}
                {isEditing && (
                  <button
                    onClick={() => fileInputRefs.current[service.id]?.click()}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer"
                    style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(179, 153, 119, 0.2)",
                        border: "2px dashed rgba(179, 153, 119, 0.5)",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B39977"
                        strokeWidth="1.5"
                      >
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium" style={{ color: "#B39977" }}>
                      Click to change image
                    </span>
                    <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                      JPG, PNG or WebP recommended
                    </span>
                  </button>
                )}
              </div>

              {/* Edit Form (only visible when editing) */}
              {isEditing && (
                <div className="p-5 space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={(el) => { fileInputRefs.current[service.id] = el; }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-[10px] font-semibold mb-1.5 tracking-widest uppercase"
                        style={{ color: "rgba(179, 153, 119, 0.7)" }}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-colors focus:ring-1"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#EDE6D9",
                        }}
                        placeholder="Service title"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[10px] font-semibold mb-1.5 tracking-widest uppercase"
                        style={{ color: "rgba(179, 153, 119, 0.7)" }}
                      >
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={editSubtitle}
                        onChange={(e) => setEditSubtitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-colors focus:ring-1"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "#EDE6D9",
                        }}
                        placeholder="Subtitle text"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => handleSave(service.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Save Changes
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-5 py-2.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
