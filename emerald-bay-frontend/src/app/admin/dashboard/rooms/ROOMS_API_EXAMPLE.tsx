"use client";

import { useState, useRef, useEffect } from "react";
import { ROOMS_API, apiFetch } from "@/lib/api";
import { useAdminAuth } from "@/hooks/useAdmin";

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
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [apiError, setApiError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch rooms on mount
    useEffect(() => {
        const fetchRooms = async () => {
            if (!token || authLoading) return;

            try {
                setInitialLoading(true);
                const data = await apiFetch(ROOMS_API.LIST, { token });
                const roomsArray = Array.isArray(data) ? data : data?.data || [];
                setRooms(roomsArray);
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

    const handleAdd = async () => {
        if (!formData.name || !formData.size || !formData.price || !token) {
            setApiError("Please fill in all fields");
            return;
        }

        try {
            setIsSubmitting(true);
            const roomData = {
                name: formData.name,
                size: formData.size,
                price: parseFloat(formData.price),
                description: formData.description,
                images: previewImages,
            };

            const response = await apiFetch(ROOMS_API.CREATE, {
                method: "POST",
                data: roomData,
                token,
            });

            setRooms((prev) => [response, ...prev]);
            showSuccess("Room added successfully!");
            resetForm();
            setApiError("");
        } catch (err) {
            console.error("Failed to add room:", err);
            setApiError("Failed to add room. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = async () => {
        if (!editingRoom || !formData.name || !formData.size || !formData.price || !token) {
            setApiError("Please fill in all fields");
            return;
        }

        try {
            setIsSubmitting(true);
            const roomData = {
                name: formData.name,
                size: formData.size,
                price: parseFloat(formData.price),
                description: formData.description,
                images: previewImages,
            };

            const response = await apiFetch(ROOMS_API.UPDATE(editingRoom.id), {
                method: "PUT",
                data: roomData,
                token,
            });

            setRooms((prev) => prev.map((r) => (r.id === editingRoom.id ? response : r)));
            showSuccess("Room updated successfully!");
            resetForm();
            setApiError("");
        } catch (err) {
            console.error("Failed to update room:", err);
            setApiError("Failed to update room. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (roomId: number) => {
        if (!token) return;

        try {
            await apiFetch(ROOMS_API.DELETE(roomId), {
                method: "DELETE",
                token,
            });

            setRooms((prev) => prev.filter((r) => r.id !== roomId));
            showSuccess("Room deleted successfully!");
            setApiError("");
        } catch (err) {
            console.error("Failed to delete room:", err);
            setApiError("Failed to delete room. Please try again.");
        }
    };

    const startEdit = (room: Room) => {
        setFormData({
            name: room.name,
            size: room.size,
            price: room.price,
            description: room.description,
        });
        setPreviewImages(room.images);
        setImageFiles([]);
        setEditingRoom(room);
        setShowForm(true);
        setApiError("");
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

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                        Room Management
                    </h1>
                    <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Create, update and manage hotel rooms
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="px-4 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all hover:scale-[1.02]"
                        style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add Room
                    </button>
                )}
            </div>

            {/* Loading State */}
            {initialLoading ? (
                <div className="text-center py-16" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Loading rooms...
                </div>
            ) : (
                <>
                    {/* Rooms List */}
                    <div className="grid grid-cols-1 gap-4">
                        {rooms.map((room) => (
                            <div
                                key={room.id}
                                className="rounded-2xl p-6 flex items-start justify-between"
                                style={{
                                    backgroundColor: "#1a1d27",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                }}
                            >
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-2" style={{ color: "#FFFFFF" }}>
                                        {room.name}
                                    </h3>
                                    <div className="space-y-1 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                                        <p>Size: {room.size}</p>
                                        <p>Price: ${room.price}/night</p>
                                        <p>{room.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        onClick={() => startEdit(room)}
                                        className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                                        style={{
                                            backgroundColor: "rgba(179,153,119,0.2)",
                                            color: "#B39977",
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(room.id)}
                                        className="px-3 py-2 rounded-lg text-sm font-medium"
                                        style={{
                                            backgroundColor: "rgba(239,68,68,0.2)",
                                            color: "#EF4444",
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {rooms.length === 0 && (
                        <div className="text-center py-12" style={{ color: "rgba(255,255,255,0.3)" }}>
                            No rooms yet. Add your first room!
                        </div>
                    )}
                </>
            )}

            {/* Add/Edit Form Modal */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    onClick={resetForm}
                >
                    <div
                        className="rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
                        style={{
                            backgroundColor: "#1a1d27",
                            border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-6" style={{ color: "#FFFFFF" }}>
                            {editingRoom ? "Edit Room" : "Add New Room"}
                        </h2>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    Room Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., Deluxe Ocean View"
                                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#EDE6D9",
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    Room Size
                                </label>
                                <select
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#EDE6D9",
                                    }}
                                >
                                    <option value="">Select size</option>
                                    {ROOM_SIZES.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    Price per Night
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="e.g., 250"
                                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#EDE6D9",
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Room description..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        color: "#EDE6D9",
                                    }}
                                />
                            </div>

                            {/* Image Upload Preview */}
                            {previewImages.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                                        Images
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {previewImages.map((img, idx) => (
                                            <div key={idx} className="relative">
                                                <img src={img} alt="preview" className="w-16 h-16 rounded-lg object-cover" />
                                                <button
                                                    onClick={() => removePreviewImage(idx)}
                                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                                                    style={{ backgroundColor: "#EF4444", color: "#FFFFFF" }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload Button */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                style={{
                                    backgroundColor: "rgba(179,153,119,0.2)",
                                    color: "#B39977",
                                    border: "1px dashed rgba(179,153,119,0.4)",
                                }}
                            >
                                Add Images
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={editingRoom ? handleEdit : handleAdd}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-60"
                                style={{ backgroundColor: "#B39977", color: "#FFFFFF" }}
                            >
                                {isSubmitting ? "Saving..." : editingRoom ? "Update Room" : "Add Room"}
                            </button>
                            <button
                                onClick={resetForm}
                                className="flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.05)",
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
        </div>
    );
}
