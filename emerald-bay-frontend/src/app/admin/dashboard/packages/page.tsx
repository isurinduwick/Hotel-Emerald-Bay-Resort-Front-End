"use client";

import { useState, useRef, useEffect } from "react";
import { API_BASE_URL, PACKAGES_API, apiFetch } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdmin";

interface Package {
  id: number;
  title: string;
  description: string;
  ctaText: string;
  validUntil: string;
  highlight: string;
  image: string;
  status: "active" | "draft";
}

const HIGHLIGHT_OPTIONS = [
  "Best Seller",
  "New",
  "Limited Time",
  "Seasonal",
  "Premium",
];

const normalizePackageImageUrl = (image?: string | null): string => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${API_BASE_URL}${image}`;
  }

  return `${API_BASE_URL}/${image}`;
};

const normalizePackage = (pkg: Package): Package => ({
  ...pkg,
  image: normalizePackageImageUrl(pkg.image),
});

export default function PackagesPage() {
  const { token, isLoading: authLoading } = useAdminAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ctaText: "",
    validUntil: "",
    highlight: "",
    status: "active" as "active" | "draft",
  });
  const [previewImage, setPreviewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [highlightDropdownOpen, setHighlightDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft">("all");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      if (!token || authLoading) return;

      try {
        setInitialLoading(true);
        const data = await apiFetch(PACKAGES_API.LIST, { token });
        const packagesArray = Array.isArray(data) ? data : data?.data || [];
        setPackages(packagesArray.map(normalizePackage));
        setApiError("");
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        setApiError("Failed to load packages");
        setPackages([]);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchPackages();
  }, [token, authLoading]);

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", ctaText: "", validUntil: "", highlight: "", status: "active" });
    setPreviewImage("");
    setEditingPackage(null);
    setShowForm(false);
    setHighlightDropdownOpen(false);
    setStatusDropdownOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    if (!formData.title) return;
    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      const packageData = {
        title: formData.title,
        description: formData.description,
        ctaText: formData.ctaText,
        validUntil: formData.validUntil,
        highlight: formData.highlight,
        image: previewImage || "/roomimg1.jpg",
        status: formData.status,
      };

      const response = await apiFetch(PACKAGES_API.CREATE, {
        method: "POST",
        data: packageData,
        token,
      });

      // Handle both direct response and wrapped response
      const createdPackage = response?.data || response;

      if (createdPackage && (createdPackage.id || createdPackage.success)) {
        setPackages((prev) => [...prev, normalizePackage(createdPackage)]);
        showSuccess("Package created successfully!");
        resetForm();
      } else {
        console.error("Unexpected response structure:", response);
        setApiError("Package created but response format unexpected. Refreshing...");
        setTimeout(() => window.location.reload(), 2000);
      }
    } catch (error) {
      console.error("Create error:", error);
      setApiError(`Failed to create package: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleUpdate = async () => {
    if (!editingPackage || !token) {
      setApiError("Authentication required");
      return;
    }

    try {
      // Use FormData with _method=PUT for broader server compatibility
      const packageFormData = new FormData();
      packageFormData.append('title', formData.title || editingPackage.title);
      packageFormData.append('description', formData.description || editingPackage.description);
      packageFormData.append('ctaText', formData.ctaText || editingPackage.ctaText);
      packageFormData.append('validUntil', formData.validUntil || editingPackage.validUntil);
      packageFormData.append('highlight', formData.highlight || editingPackage.highlight);
      packageFormData.append('status', formData.status);
      packageFormData.append('_method', 'PUT');

      const response = await apiFetch(PACKAGES_API.UPDATE(editingPackage.id), {
        method: "POST",
        formData: packageFormData,
        token,
      });

      const updatedPackage = normalizePackage(response?.data ?? response);

      if (updatedPackage && updatedPackage.id) {
        setPackages((prev) =>
          prev.map((p) => (p.id === editingPackage.id ? updatedPackage : p))
        );
        showSuccess("Package updated successfully!");
        resetForm();
      } else {
        setApiError("Failed to update package");
      }
    } catch (error) {
      console.error("Update error:", error);
      setApiError("Failed to update package. Please try again.");
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      title: pkg.title,
      description: pkg.description,
      ctaText: pkg.ctaText,
      validUntil: pkg.validUntil,
      highlight: pkg.highlight,
      status: pkg.status,
    });
    setPreviewImage(pkg.image);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!token) {
      setApiError("Authentication required");
      return;
    }

    try {
      await apiFetch(PACKAGES_API.DELETE(id), {
        method: "DELETE",
        token,
      });

      setPackages((prev) => prev.filter((p) => p.id !== id));
      setDeleteConfirm(null);
      showSuccess("Package deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      setApiError("Failed to delete package. Please try again.");
    }
  };

  const handleToggleStatus = async (id: number) => {
    if (!token) {
      setApiError("Authentication required");
      return;
    }

    const targetPackage = packages.find((p) => p.id === id);
    if (!targetPackage) return;

    const nextStatus: "active" | "draft" = targetPackage.status === "active" ? "draft" : "active";

    try {
      // Use FormData with _method=PUT for broader server compatibility
      const packageFormData = new FormData();
      packageFormData.append('title', targetPackage.title);
      packageFormData.append('description', targetPackage.description);
      packageFormData.append('ctaText', targetPackage.ctaText);
      packageFormData.append('validUntil', targetPackage.validUntil);
      packageFormData.append('highlight', targetPackage.highlight);
      packageFormData.append('status', nextStatus);
      packageFormData.append('_method', 'PUT');

      const response = await apiFetch(PACKAGES_API.UPDATE(id), {
        method: "POST",
        formData: packageFormData,
        token,
      });

      const updatedPackage = normalizePackage(response?.data ?? response);

      if (!updatedPackage || !updatedPackage.id) {
        setApiError("Failed to update package status");
        return;
      }

      setPackages((prev) => prev.map((p) => (p.id === id ? updatedPackage : p)));
      showSuccess(`Package set to ${nextStatus}`);
    } catch (error) {
      console.error("Status toggle error:", error);
      setApiError("Failed to update package status. Please try again.");
    }
  };

  const filteredPackages = packages.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const activePackages = packages.filter((p) => p.status === "active").length;
  const draftPackages = packages.filter((p) => p.status === "draft").length;

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
            Loading packages...
          </p>
        </div>
      )}

      {!initialLoading && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                Package Management
              </h1>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Create, update and manage promotional packages and offers
              </p>
            </div>
            {!showForm && (
              <button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Package
              </button>
            )}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Total Packages", value: packages.length, icon: "total", color: "#B39977" },
              { label: "Active", value: activePackages, icon: "active", color: "#34D399" },
              { label: "Draft", value: draftPackages, icon: "draft", color: "#FBBF24" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-4 flex items-center gap-3"
                style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                  {stat.icon === "total" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.8">
                      <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 000 4h4v-4h-4z" />
                    </svg>
                  )}
                  {stat.icon === "active" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.8">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  )}
                  {stat.icon === "draft" && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stat.color} strokeWidth="1.8">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
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
                  {editingPackage ? "Edit Package" : "Create New Package"}
                </h2>
                <button onClick={resetForm} className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                  PACKAGE IMAGE
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
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span className="text-xs text-white">Change Image</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                      </svg>
                      <span className="text-xs">Click to upload package image</span>
                      <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>Recommended: 800 x 1000px (portrait)</span>
                    </div>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    PACKAGE TITLE
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. STAY 2, PAY 1"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
                  />
                </div>

                {/* CTA Text */}
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    BUTTON TEXT
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData((f) => ({ ...f, ctaText: e.target.value }))}
                    placeholder="e.g. LEARN MORE"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
                  />
                </div>

                {/* Valid Until */}
                <div>
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    VALID UNTIL
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData((f) => ({ ...f, validUntil: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9", colorScheme: "dark" }}
                  />
                </div>

                {/* Highlight Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-medium mb-2 tracking-wide" style={{ color: "rgba(255,255,255,0.6)" }}>
                    HIGHLIGHT TAG
                  </label>
                  <button
                    type="button"
                    onClick={() => { setHighlightDropdownOpen(!highlightDropdownOpen); setStatusDropdownOpen(false); }}
                    className="w-full px-4 py-3 rounded-xl text-sm text-left flex items-center justify-between outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: formData.highlight ? "#EDE6D9" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {formData.highlight || "Select highlight"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
                      style={{ transform: highlightDropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {highlightDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden z-20 shadow-xl"
                      style={{ backgroundColor: "#252833", border: "1px solid rgba(255,255,255,0.1)" }}>
                      {HIGHLIGHT_OPTIONS.map((h) => (
                        <button key={h}
                          onClick={() => { setFormData((f) => ({ ...f, highlight: h })); setHighlightDropdownOpen(false); }}
                          className="w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5"
                          style={{ color: formData.highlight === h ? "#B39977" : "rgba(255,255,255,0.6)", backgroundColor: formData.highlight === h ? "rgba(179,153,119,0.1)" : "transparent" }}>
                          {h}
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
                    onClick={() => { setStatusDropdownOpen(!statusDropdownOpen); setHighlightDropdownOpen(false); }}
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
                  placeholder="Describe the package offer, inclusions, and value for guests..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 resize-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={editingPackage ? handleUpdate : handleCreate}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03] active:scale-[0.98]"
                  style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                >
                  {editingPackage ? "Update Package" : "Create Package"}
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
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search packages by title or description..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#EDE6D9" }}
                />
              </div>
              <div className="flex gap-2">
                {(["all", "active", "draft"] as const).map((s) => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium transition-all"
                    style={{
                      backgroundColor: filterStatus === s ? "rgba(179,153,119,0.15)" : "rgba(255,255,255,0.05)",
                      color: filterStatus === s ? "#B39977" : "rgba(255,255,255,0.4)",
                      border: filterStatus === s ? "1px solid rgba(179,153,119,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    }}>
                    {s === "all" ? "All" : s === "active" ? "Active" : "Draft"}
                  </button>
                ))}
              </div>
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <button onClick={() => setViewMode("grid")} className="p-2.5 transition-all"
                  style={{ backgroundColor: viewMode === "grid" ? "rgba(179,153,119,0.15)" : "transparent", color: viewMode === "grid" ? "#B39977" : "rgba(255,255,255,0.3)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                  </svg>
                </button>
                <button onClick={() => setViewMode("list")} className="p-2.5 transition-all"
                  style={{ backgroundColor: viewMode === "list" ? "rgba(179,153,119,0.15)" : "transparent", color: viewMode === "list" ? "#B39977" : "rgba(255,255,255,0.3)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Packages Grid */}
          {!showForm && viewMode === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-2xl overflow-hidden group"
                  style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,29,39,0.9) 0%, rgba(26,29,39,0.3) 40%, transparent 70%)" }} />
                    {/* Status + Highlight Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: pkg.status === "active" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                          color: pkg.status === "active" ? "#34D399" : "#FBBF24",
                          border: `1px solid ${pkg.status === "active" ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}`,
                        }}>
                        {pkg.status}
                      </span>
                      {pkg.highlight && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                          style={{ backgroundColor: "rgba(179,153,119,0.2)", color: "#B39977", border: "1px solid rgba(179,153,119,0.3)" }}>
                          {pkg.highlight}
                        </span>
                      )}
                    </div>
                    {/* Title overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold" style={{ color: "#FFFFFF", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{pkg.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-sm line-clamp-2 mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{pkg.description}</p>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {pkg.ctaText && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: "rgba(179,153,119,0.12)", color: "#B39977" }}>
                          CTA: {pkg.ctaText}
                        </span>
                      )}
                      {pkg.validUntil && (
                        <span className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          Valid until {pkg.validUntil}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(pkg)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                        style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button onClick={() => handleToggleStatus(pkg.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                        style={{ border: `1px solid ${pkg.status === "active" ? "rgba(251,191,36,0.2)" : "rgba(52,211,153,0.2)"}`, color: pkg.status === "active" ? "#FBBF24" : "#34D399" }}>
                        {pkg.status === "active" ? "Set Draft" : "Activate"}
                      </button>
                      {deleteConfirm === pkg.id ? (
                        <div className="flex items-center gap-1 ml-auto">
                          <button onClick={() => handleDelete(pkg.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444" }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(pkg.id)}
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

          {/* Packages List View */}
          {!showForm && viewMode === "list" && (
            <div className="space-y-3">
              {filteredPackages.map((pkg) => (
                <div key={pkg.id} className="rounded-2xl overflow-hidden flex flex-col sm:flex-row"
                  style={{ backgroundColor: "#1a1d27", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-full sm:w-48 h-36 sm:h-auto shrink-0 relative">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase"
                        style={{
                          backgroundColor: pkg.status === "active" ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.15)",
                          color: pkg.status === "active" ? "#34D399" : "#FBBF24",
                        }}>
                        {pkg.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="text-base font-semibold" style={{ color: "#FFFFFF" }}>{pkg.title}</h3>
                        {pkg.highlight && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-medium shrink-0"
                            style={{ backgroundColor: "rgba(179,153,119,0.12)", color: "#B39977" }}>
                            {pkg.highlight}
                          </span>
                        )}
                      </div>
                      <p className="text-sm line-clamp-2 mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{pkg.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        {pkg.ctaText && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ backgroundColor: "rgba(179,153,119,0.12)", color: "#B39977" }}>
                            CTA: {pkg.ctaText}
                          </span>
                        )}
                        {pkg.validUntil && (
                          <span className="flex items-center gap-1 text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Valid until {pkg.validUntil}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button onClick={() => handleEdit(pkg)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                        style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                        Edit
                      </button>
                      <button onClick={() => handleToggleStatus(pkg.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
                        style={{ border: `1px solid ${pkg.status === "active" ? "rgba(251,191,36,0.2)" : "rgba(52,211,153,0.2)"}`, color: pkg.status === "active" ? "#FBBF24" : "#34D399" }}>
                        {pkg.status === "active" ? "Set Draft" : "Activate"}
                      </button>
                      {deleteConfirm === pkg.id ? (
                        <div className="flex items-center gap-1 ml-auto">
                          <button onClick={() => handleDelete(pkg.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/20" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#EF4444" }}>Confirm</button>
                          <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(pkg.id)}
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
          {!showForm && filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <svg className="mx-auto mb-4" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5">
                <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" /><path d="M4 6v12c0 1.1.9 2 2 2h14v-4" /><path d="M18 12a2 2 0 000 4h4v-4h-4z" />
              </svg>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                {searchQuery || filterStatus !== "all" ? "No packages match your search or filter." : "No packages added yet."}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                {searchQuery || filterStatus !== "all" ? "Try adjusting your search or filter criteria." : 'Click "Add New Package" to get started.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
