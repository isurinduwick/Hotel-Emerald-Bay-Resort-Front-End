"use client";

import { useState, useRef } from "react";

interface Tour {
  id: number;
  name: string;
  description: string;
  duration: string;
  location: string;
  image: string;
  status: "active" | "draft";
}

const TOUR_DURATIONS = [
  "Half Day (2-4 hrs)",
  "Full Day (6-8 hrs)",
  "Multi-Day (2+ days)",
];

const INITIAL_TOURS: Tour[] = [
  {
    id: 1,
    name: "Mirissa Kayak Safari Tours",
    description:
      "Paddle through serene mangrove forests and spot exotic wildlife on this unforgettable kayak adventure.",
    duration: "Half Day (2-4 hrs)",
    location: "Mirissa Lagoon",
    image: "/safariimg.jpg",
    status: "active",
  },
  {
    id: 2,
    name: "Sunset Kayak Experience",
    description:
      "Witness golden sunsets over the Indian Ocean while kayaking through calm coastal waters.",
    duration: "Half Day (2-4 hrs)",
    location: "Mirissa Bay",
    image: "/istimg.jpg",
    status: "active",
  },
  {
    id: 3,
    name: "Wildlife Nature Tours",
    description:
      "Explore the lush biodiversity of the southern coast with expert naturalist guides.",
    duration: "Full Day (6-8 hrs)",
    location: "Mirissa Rainforest",
    image: "/2ndimg.jpg",
    status: "active",
  },
  {
    id: 4,
    name: "Coastal Beach Tours",
    description:
      "Discover hidden beaches and secluded coves along the breathtaking Mirissa coastline.",
    duration: "Full Day (6-8 hrs)",
    location: "South Coast",
    image: "/3rdimg.jpg",
    status: "active",
  },
];

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>(INITIAL_TOURS);
  const [showForm, setShowForm] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    location: "",
    status: "active" as "active" | "draft",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", duration: "", location: "", status: "active" });
    setPreviewImage("");
    setEditingTour(null);
    setShowForm(false);
    setDurationDropdownOpen(false);
    setStatusDropdownOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    if (!formData.name || !formData.duration || !formData.location) return;
    const newTour: Tour = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      duration: formData.duration,
      location: formData.location,
      image: previewImage || "/safariimg.jpg",
      status: formData.status,
    };
    setTours((prev) => [...prev, newTour]);
    showSuccess("Tour created successfully!");
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingTour) return;
    setTours((prev) =>
      prev.map((t) =>
        t.id === editingTour.id
          ? {
              ...t,
              name: formData.name || t.name,
              description: formData.description || t.description,
              duration: formData.duration || t.duration,
              location: formData.location || t.location,
              image: previewImage || t.image,
              status: formData.status,
            }
          : t
      )
    );
    showSuccess("Tour updated successfully!");
    resetForm();
  };

  const handleEdit = (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      description: tour.description,
      duration: tour.duration,
      location: tour.location,
      status: tour.status,
    });
    setPreviewImage(tour.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
    setDeleteConfirm(null);
    showSuccess("Tour deleted successfully!");
  };

  const handleToggleStatus = (id: number) => {
    setTours((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "active" ? "draft" : "active" } : t
      )
    );
  };

  const filteredTours = tours.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activeTours = tours.filter((t) => t.status === "active").length;
  const draftTours = tours.filter((t) => t.status === "draft").length;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Success Toast */}
      {successMessage && (
        <div
          className="fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg"
          style={{
            backgroundColor: "rgba(52, 211, 153, 0.15)",
            color: "#34D399",
            border: "1px solid rgba(52, 211, 153, 0.3)",
            animation: "fadeInRight 0.3s ease-out",
          }}
        >
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
            Tour Management
          </h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Create, update and manage tour experiences for your guests
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
            style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add New Tour
          </button>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Tours", value: tours.length, icon: "total", color: "#B39977" },
          { label: "Active", value: activeTours, icon: "active", color: "#34D399" },
          { label: "Draft", value: draftTours, icon: "draft", color: "#FBBF24" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              {stat.icon === "total" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.8">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                </svg>
              )}
              {stat.icon === "active" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.8">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              )}
              {stat.icon === "draft" && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.8">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-xl font-bold" style={{ color: "#FFFFFF" }}>{stat.value}</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div
          className="rounded-2xl p-6 space-y-5"
          style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
              {editingTour ? "Edit Tour" : "Create New Tour"}
            </h2>
            <button onClick={resetForm} className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Image Upload - Hero */}
          <div>
            <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
              TOUR IMAGE
            </label>
            <div
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{ border: "2px dashed rgba(255,255,255,0.15)", height: "200px" }}
              onClick={() => fileInputRef.current?.click()}
            >
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-center">
                      <svg className="mx-auto mb-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <span className="text-xs text-white">Change Image</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="text-xs">Click to upload tour image</span>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Recommended: 1200 x 800px</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Tour Name */}
            <div>
              <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                TOUR NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Mirissa Kayak Safari"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                LOCATION
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData((f) => ({ ...f, location: e.target.value }))}
                placeholder="e.g. Mirissa Lagoon"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
              />
            </div>

            {/* Duration Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                DURATION
              </label>
              <button
                type="button"
                onClick={() => { setDurationDropdownOpen(!durationDropdownOpen); setStatusDropdownOpen(false); }}
                className="w-full px-4 py-3 rounded-xl text-sm text-left flex items-center justify-between outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: formData.duration ? "#EDE6D9" : "rgba(255,255,255,0.3)",
                }}
              >
                {formData.duration || "Select duration"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                  style={{ transform: durationDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {durationDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 shadow-xl"
                  style={{ backgroundColor: "#252833", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {TOUR_DURATIONS.map((dur) => (
                    <button key={dur}
                      onClick={() => { setFormData((f) => ({ ...f, duration: dur })); setDurationDropdownOpen(false); }}
                      className="w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                      style={{ color: formData.duration === dur ? "#B39977" : "rgba(255,255,255,0.6)", backgroundColor: formData.duration === dur ? "rgba(179,153,119,0.1)" : "transparent" }}>
                      {dur}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="relative">
              <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                STATUS
              </label>
              <button
                type="button"
                onClick={() => { setStatusDropdownOpen(!statusDropdownOpen); setDurationDropdownOpen(false); }}
                className="w-full px-4 py-3 rounded-xl text-sm text-left flex items-center justify-between outline-none"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: formData.status === "active" ? "#34D399" : "#FBBF24" }} />
                  {formData.status === "active" ? "Active" : "Draft"}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                  style={{ transform: statusDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {statusDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 shadow-xl"
                  style={{ backgroundColor: "#252833", border: "1px solid rgba(255,255,255,0.1)" }}>
                  {(["active", "draft"] as const).map((s) => (
                    <button key={s}
                      onClick={() => { setFormData((f) => ({ ...f, status: s })); setStatusDropdownOpen(false); }}
                      className="w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5 flex items-center gap-2"
                      style={{ color: formData.status === s ? "#B39977" : "rgba(255,255,255,0.6)", backgroundColor: formData.status === s ? "rgba(179,153,119,0.1)" : "transparent" }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s === "active" ? "#34D399" : "#FBBF24" }} />
                      {s === "active" ? "Active" : "Draft"}
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
              placeholder="Describe the tour experience, highlights, and what guests can expect..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 resize-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={editingTour ? handleUpdate : handleCreate}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
            >
              {editingTour ? "Update Tour" : "Create Tour"}
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-2.5 rounded-xl text-sm font-medium transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      {!showForm && (
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours by name or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
            />
          </div>
          {/* Filter Pills */}
          <div className="flex gap-2">
            {(["all", "active", "draft"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  backgroundColor: filterStatus === s ? "rgba(179,153,119,0.15)" : "rgba(255,255,255,0.05)",
                  color: filterStatus === s ? "#B39977" : "rgba(255,255,255,0.4)",
                  border: filterStatus === s ? "1px solid rgba(179,153,119,0.3)" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {s === "all" ? "All" : s === "active" ? "Active" : "Draft"}
              </button>
            ))}
          </div>
          {/* View Toggle */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            <button
              onClick={() => setViewMode("grid")}
              className="p-2.5 transition-all"
              style={{ backgroundColor: viewMode === "grid" ? "rgba(179,153,119,0.15)" : "transparent", color: viewMode === "grid" ? "#B39977" : "rgba(255,255,255,0.3)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-2.5 transition-all"
              style={{ backgroundColor: viewMode === "list" ? "rgba(179,153,119,0.15)" : "transparent", color: viewMode === "list" ? "#B39977" : "rgba(255,255,255,0.3)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Tours Grid */}
      {!showForm && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl overflow-hidden group"
              style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,29,39,0.8) 0%, transparent 60%)" }} />
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className="px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: tour.status === "active" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                      color: tour.status === "active" ? "#34D399" : "#FBBF24",
                      border: `1px solid ${tour.status === "active" ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}`,
                    }}
                  >
                    {tour.status}
                  </span>
                </div>
                {/* Location overlay */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
                    <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                  </svg>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{tour.location}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-semibold" style={{ color: "#FFFFFF" }}>{tour.name}</h3>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-xs" style={{ color: "#B39977" }}>{tour.duration}</span>
                </div>
                <p className="text-sm line-clamp-2 mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>{tour.description}</p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(tour.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                    style={{
                      border: `1px solid ${tour.status === "active" ? "rgba(251,191,36,0.2)" : "rgba(52,211,153,0.2)"}`,
                      color: tour.status === "active" ? "#FBBF24" : "#34D399",
                    }}
                  >
                    {tour.status === "active" ? "Set Draft" : "Activate"}
                  </button>
                  {deleteConfirm === tour.id ? (
                    <div className="flex items-center gap-1 ml-auto">
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-red-500/20"
                        style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444" }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(tour.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-red-500/10 ml-auto"
                      style={{ border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444" }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tours List View */}
      {!showForm && viewMode === "list" && (
        <div className="space-y-3">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
              style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="w-full sm:w-48 h-36 sm:h-auto flex-shrink-0 relative">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 sm:top-2 sm:left-2 sm:right-auto">
                  <span
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: tour.status === "active" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                      color: tour.status === "active" ? "#34D399" : "#FBBF24",
                    }}
                  >
                    {tour.status}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold mb-1" style={{ color: "#FFFFFF" }}>{tour.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#B39977" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                      </svg>
                      {tour.location}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>{tour.description}</p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => handleEdit(tour)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                  <button onClick={() => handleToggleStatus(tour.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                    style={{ border: `1px solid ${tour.status === "active" ? "rgba(251,191,36,0.2)" : "rgba(52,211,153,0.2)"}`, color: tour.status === "active" ? "#FBBF24" : "#34D399" }}>
                    {tour.status === "active" ? "Set Draft" : "Activate"}
                  </button>
                  {deleteConfirm === tour.id ? (
                    <div className="flex items-center gap-1 ml-auto">
                      <button onClick={() => handleDelete(tour.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444" }}>Confirm</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(tour.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-red-500/10 ml-auto"
                      style={{ border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444" }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!showForm && filteredTours.length === 0 && (
        <div className="text-center py-16">
          <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
            <circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
          </svg>
          <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            {searchQuery || filterStatus !== "all" ? "No tours match your search or filter." : "No tours added yet."}
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            {searchQuery || filterStatus !== "all" ? "Try adjusting your search or filter criteria." : 'Click "Add New Tour" to get started.'}
          </p>
        </div>
      )}
    </div>
  );
}
