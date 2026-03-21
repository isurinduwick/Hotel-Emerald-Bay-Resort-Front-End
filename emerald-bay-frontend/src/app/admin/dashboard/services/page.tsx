"use client";

import { useState, useRef, useEffect } from "react";
import { SERVICES_API, apiFetch } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdmin";

interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
}

export default function ServicesPage() {
  const { token, isLoading: authLoading } = useAdminAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubtitle, setEditSubtitle] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  const createFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch services on mount
  useEffect(() => {
    const fetchServices = async () => {
      if (!token || authLoading) return;

      try {
        setInitialLoading(true);
        const data = await apiFetch(SERVICES_API.LIST, { token });
        const servicesArray = Array.isArray(data) ? data : data?.data || [];
        setServices(servicesArray);
        setApiError("");
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setApiError("Failed to load services");
        setServices([]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchServices();
  }, [token, authLoading]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const startEdit = (service: ServiceItem) => {
    setEditingId(service.id);
    setEditTitle(service.title);
    setEditSubtitle(service.subtitle);
    setPreviewImage(null);
    setShowCreateForm(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditSubtitle("");
    setPreviewImage(null);
  };

  const resetCreateForm = () => {
    setShowCreateForm(false);
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

  const handleCreate = async () => {
    if (!editTitle || !editSubtitle || !previewImage) {
      setApiError("Please fill in all fields and upload an image");
      return;
    }

    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      const serviceData = {
        title: editTitle,
        subtitle: editSubtitle,
        imageSrc: previewImage,
      };

      const response = await apiFetch(SERVICES_API.CREATE, {
        method: "POST",
        data: serviceData,
        token,
      });

      if (response && response.id) {
        setServices((prev) => [...prev, response]);
        showSuccess("Service created successfully!");
        resetCreateForm();
      } else {
        setApiError("Failed to create service");
      }
    } catch (error) {
      console.error("Create error:", error);
      setApiError("Failed to create service. Please try again.");
    }
  };

  const handleSave = async (id: number) => {
    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      const serviceData = {
        title: editTitle,
        subtitle: editSubtitle,
        imageSrc: previewImage || services.find(s => s.id === id)?.imageSrc,
      };

      const response = await apiFetch(SERVICES_API.UPDATE(id), {
        method: "PUT",
        data: serviceData,
        token,
      });

      if (response && response.id) {
        setServices((prev) =>
          prev.map((s) => (s.id === id ? response : s))
        );
        showSuccess("Service updated successfully!");
        cancelEdit();
      } else {
        setApiError("Failed to update service");
      }
    } catch (error) {
      console.error("Update error:", error);
      setApiError("Failed to update service. Please try again.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      await apiFetch(SERVICES_API.DELETE(id), {
        method: "DELETE",
        token,
      });

      setServices((prev) => prev.filter((s) => s.id !== id));
      showSuccess("Service deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      setApiError("Failed to delete service. Please try again.");
    }
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
            Loading services...
          </p>
        </div>
      )}

      {!initialLoading && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                Create, update and manage your hotel services
              </p>
            </div>
            <div className="flex items-center gap-3">
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
              {!showCreateForm && (
                <button
                  onClick={() => {
                    setShowCreateForm(true);
                    setEditingId(null);
                    setEditTitle("");
                    setEditSubtitle("");
                    setPreviewImage(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add New Service
                </button>
              )}
            </div>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                backgroundColor: "#1a1d27",
                border: "1px solid rgba(179,153,119,0.3)",
                boxShadow: "0 0 30px rgba(179, 153, 119, 0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: "#FFFFFF" }}>
                  Create New Service
                </h2>
                <button
                  onClick={resetCreateForm}
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
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    TITLE
                  </label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Restaurant & Bar"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#EDE6D9",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    SUBTITLE
                  </label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    placeholder="e.g. Fine dining experience"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#EDE6D9",
                    }}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                  SERVICE IMAGE
                </label>
                {previewImage ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPreviewImage(null)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => createFileInputRef.current?.click()}
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
                    <span className="text-sm">Click to upload image</span>
                  </button>
                )}
                <input
                  ref={createFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCreate}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                >
                  Create Service
                </button>
                <button
                  onClick={resetCreateForm}
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
                      <div className="absolute bottom-4 left-5 right-5">
                        <div className="mb-3">
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
                        <div className="flex items-center gap-2">
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
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                            style={{
                              backgroundColor: "rgba(239, 68, 68, 0.85)",
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
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            </svg>
                            Delete
                          </button>
                        </div>
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

          {/* Empty State */}
          {services.length === 0 && (
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
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                No services added yet. Click &quot;Add New Service&quot; to get started.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
