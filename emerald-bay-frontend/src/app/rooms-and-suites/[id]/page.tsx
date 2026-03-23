"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

// Fallback room data for display if API fails
const FALLBACK_ROOMS = [
  {
    id: 1,
    type: "STANDARD",
    name: "Superior Ocean View",
    size: "30–45 m²",
    guests: 2,
    beds: "1 King Bed",
    price: 250,
    description:
      "Wake up to breathtaking ocean panoramas with a spacious king bed and private balcony. Enjoy the gentle sea breeze and spectacular sunrises from the comfort of your room.",
    image: "/roomimg1.jpg",
    gallery: ["/roomimg1.jpg", "/2ndimg.jpg", "/roomimg2.jpg", "/istimg.jpg"],
    amenities: ["wifi", "ac", "breakfast", "pool", "bed"],
    facilities: [
      { icon: "ac", label: "Air Condition" },
      { icon: "wifi", label: "Speed Wifi" },
      { icon: "breakfast", label: "Breakfast" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "bed", label: "Bathroom Amenities" },
      { icon: "gym", label: "Room Security" },
    ],
    longDescription:
      "Experience luxury and comfort in our Superior Ocean View room. Each room is thoughtfully designed with premium furnishings, modern amenities, and stunning vistas of the Indian Ocean. Perfect for a romantic getaway or a peaceful retreat.",
  },
  {
    id: 2,
    type: "DELUXE",
    name: "Deluxe Double Room",
    size: "20–30 m²",
    guests: 2,
    beds: "2 Twin Beds",
    price: 180,
    description:
      "A comfortable twin bed room with modern design, cozy interiors, and a relaxing atmosphere. Perfect for couples or friends seeking a stylish retreat close to the beach.",
    image: "/2ndimg.jpg",
    gallery: ["/2ndimg.jpg", "/roomimg1.jpg", "/roomimg2.jpg", "/istimg.jpg"],
    amenities: ["wifi", "ac", "breakfast", "bed"],
    facilities: [
      { icon: "ac", label: "Air Condition" },
      { icon: "wifi", label: "Speed Wifi" },
      { icon: "breakfast", label: "Breakfast" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "bed", label: "Bathroom Amenities" },
      { icon: "gym", label: "Room Security" },
    ],
    longDescription:
      "Discover elegance in simplicity with our Deluxe Double Room. Featuring twin beds, contemporary design, and all essential amenities, it's the ideal choice for those seeking comfort without compromise.",
  },
  {
    id: 3,
    type: "SUITE",
    name: "Beachfront Suite",
    size: "45–60 m²",
    guests: 3,
    beds: "1 King Bed + Sofa",
    price: 400,
    description:
      "Indulge in luxury with direct beach access, a private plunge pool and stunning sunset views. This suite redefines opulence with handcrafted furnishings and butler service.",
    image: "/roomimg2.jpg",
    gallery: ["/roomimg2.jpg", "/roomimg1.jpg", "/2ndimg.jpg", "/istimg.jpg"],
    amenities: ["wifi", "ac", "breakfast", "pool", "bed", "gym"],
    facilities: [
      { icon: "ac", label: "Air Condition" },
      { icon: "wifi", label: "Speed Wifi" },
      { icon: "breakfast", label: "Breakfast" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "bed", label: "Bathroom Amenities" },
      { icon: "gym", label: "Room Security" },
    ],
    longDescription:
      "Step into paradise with our Beachfront Suite. Direct access to pristine sands, a private plunge pool, and panoramic ocean views combine to create an unforgettable experience. Personalized butler service adds the perfect finishing touch.",
  },
  {
    id: 4,
    type: "FAMILY",
    name: "Family Garden Room",
    size: "35–45 m²",
    guests: 4,
    beds: "2 Queen Beds",
    price: 320,
    description:
      "Spacious family room surrounded by lush tropical gardens. Features two comfortable queen beds, a play area for children, and a private garden terrace for peaceful evenings.",
    image: "/istimg.jpg",
    gallery: ["/istimg.jpg", "/roomimg1.jpg", "/2ndimg.jpg", "/roomimg2.jpg"],
    amenities: ["wifi", "ac", "breakfast", "pool", "bed"],
    facilities: [
      { icon: "ac", label: "Air Condition" },
      { icon: "wifi", label: "Speed Wifi" },
      { icon: "breakfast", label: "Breakfast" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "bed", label: "Bathroom Amenities" },
      { icon: "gym", label: "Room Security" },
    ],
    longDescription:
      "Welcome to family comfort and tropical charm. Our Family Garden Room offers space, nature, and amenities designed with families in mind. Let the children play while you relax on the private garden terrace.",
  },
  {
    id: 5,
    type: "PREMIUM",
    name: "Rooftop Panorama Suite",
    size: "55–70 m²",
    guests: 2,
    beds: "1 King Bed",
    price: 520,
    description:
      "Perched on the top floor, this suite offers 360° panoramic views of the ocean and coastline. Features a private rooftop terrace, jacuzzi, and exclusive concierge service.",
    image: "/3rdimg.jpg",
    gallery: ["/3rdimg.jpg", "/roomimg1.jpg", "/2ndimg.jpg", "/istimg.jpg"],
    amenities: ["wifi", "ac", "breakfast", "pool", "bed", "gym"],
    facilities: [
      { icon: "ac", label: "Air Condition" },
      { icon: "wifi", label: "Speed Wifi" },
      { icon: "breakfast", label: "Breakfast" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "bed", label: "Bathroom Amenities" },
      { icon: "gym", label: "Room Security" },
    ],
    longDescription:
      "Elevate your experience with our Rooftop Panorama Suite. Panoramic ocean views, a private rooftop terrace with jacuzzi, and exclusive concierge service create an unparalleled luxury experience.",
  },
  {
    id: 6,
    type: "STANDARD",
    name: "Garden View Room",
    size: "18–25 m²",
    guests: 2,
    beds: "1 Double Bed",
    price: 140,
    description:
      "A charming room overlooking our tropical garden oasis. Cozy, well-appointed, and filled with natural light — the ideal base for your Mirissa beach adventure.",
    image: "/discoverimg1.jpg",
    gallery: ["/discoverimg1.jpg", "/roomimg1.jpg", "/2ndimg.jpg", "/roomimg2.jpg"],
    amenities: ["wifi", "ac", "bed"],
    facilities: [
      { icon: "ac", label: "Air Condition" },
      { icon: "wifi", label: "Speed Wifi" },
      { icon: "breakfast", label: "Breakfast" },
      { icon: "pool", label: "Rooftop Pool" },
      { icon: "bed", label: "Bathroom Amenities" },
      { icon: "gym", label: "Room Security" },
    ],
    longDescription:
      "Embrace the beauty of nature from your own peaceful sanctuary. Our Garden View Room offers intimate charm and all the comforts you need for a memorable stay.",
  },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  ac: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="3" width="20" height="8" rx="2" />
      <path d="M7 11v4a2 2 0 002 2h6a2 2 0 002-2v-4" />
      <path d="M12 15v6M9 18l3 3 3-3" />
    </svg>
  ),
  breakfast: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  pool: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M8 2L8 8M16 2L16 8" />
      <path d="M6 6h4M14 6h4" />
    </svg>
  ),
  bed: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M2 4v16M2 8h18a2 2 0 012 2v8H2" />
      <path d="M2 14h20" />
      <path d="M6 8v6M16 8v2" />
    </svg>
  ),
  gym: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6v12M18 6v12M3 9h4M17 9h4M3 15h4M17 15h4M10 9v6M14 9v6" />
    </svg>
  ),
};

interface Room {
  id: number;
  type: string;
  name: string;
  size: string;
  guests: number;
  beds: string;
  price: number;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  facilities: { icon: string; label: string }[];
  longDescription: string;
}

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = Number(params.id);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [breakfastImageIndex, setBreakfastImageIndex] = useState(0);

  // Breakfast images rotation
  const breakfastImages = [
    "https://i.pinimg.com/736x/69/62/98/696298263d36f1e9d4f43e3eff6f662b.jpg",
    "https://i.pinimg.com/1200x/7d/d8/66/7dd866f939cd7b7ab37229c897bb949c.jpg",
    "https://i.pinimg.com/1200x/73/f8/a9/73f8a962194665f8ff4a72d0267f0fff.jpg",
  ];

  // Auto-rotate breakfast images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBreakfastImageIndex((prev) => (prev + 1) % breakfastImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [breakfastImages.length]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.emeraldbayresorts.com/api/v1/rooms/${roomId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch room: ${response.status}`);
        }

        const data = await response.json();
        // Handle different API response structures
        const apiRoom = data?.data || data;

        // Get fallback room for default values
        const fallbackRoom = FALLBACK_ROOMS.find((r) => r.id === roomId) || FALLBACK_ROOMS[0];

        // Extract images/gallery
        let gallery = fallbackRoom.gallery;
        if (apiRoom.images && Array.isArray(apiRoom.images) && apiRoom.images.length > 0) {
          // Map images array to URLs
          gallery = apiRoom.images.map((img: any) => img.image_url || img.url || img);
        } else if (apiRoom.image) {
          // If only single image, create gallery from it
          gallery = [apiRoom.image];
        }

        // Map API response to Room interface
        const mappedRoom: Room = {
          id: apiRoom.id || fallbackRoom.id,
          image: apiRoom.image || gallery[0] || fallbackRoom.image,
          name: apiRoom.title || apiRoom.name || fallbackRoom.name,
          description: apiRoom.description || fallbackRoom.description,
          price: apiRoom.price || fallbackRoom.price,
          size: apiRoom.size || apiRoom.room_size || fallbackRoom.size,
          gallery: gallery,
          longDescription: apiRoom.long_description || apiRoom.description || fallbackRoom.longDescription,
          // Keep these from fallback
          type: apiRoom.type || fallbackRoom.type,
          guests: apiRoom.guests || fallbackRoom.guests,
          beds: apiRoom.beds || fallbackRoom.beds,
          amenities: apiRoom.amenities || fallbackRoom.amenities,
          facilities: apiRoom.facilities || fallbackRoom.facilities,
        };

        setRoom(mappedRoom);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch room:", err);
        setError("Failed to load room details.");
        // Try to use fallback
        const fallbackRoom = FALLBACK_ROOMS.find((r) => r.id === roomId);
        if (fallbackRoom) {
          setRoom(fallbackRoom);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", color: "#B39977" }}>
              Loading room details...
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Not found state
  if (!room) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div style={{ textAlign: "center", padding: "80px 20px" }}>
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "28px", color: "#2a1a0e" }}>
              Room Not Found
            </h1>
            <Link href="/rooms-and-suites" style={{ color: "#B39977", textDecoration: "none", marginTop: "20px", display: "inline-block" }}>
              Back to Rooms
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Mobile-optimized responsive styles */}
      <style jsx>{`
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 40px;
          align-items: start;
        }
        .calendar-breakfast-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 32px;
        }
        .room-meta-row {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .room-meta-divider {
          width: 1px;
          height: 40px;
          background-color: #e0e0e0;
        }
        .breadcrumb-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .facilities-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .right-column {
          order: 0;
        }
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .right-column {
            order: 1;
          }
          .facilities-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 768px) {
          .calendar-breakfast-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .thumbnail-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 24px;
          }
          .room-meta-row {
            gap: 16px;
          }
          .room-meta-divider {
            display: none;
          }
          .facilities-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
        }
        @media (max-width: 480px) {
          .thumbnail-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
          .breadcrumb-container {
            font-size: 10px;
          }
          .facilities-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
      <Navbar />

      <main className="flex-1 w-full mt-[60px]">
        {/* Breadcrumb */}
        <div
          style={{
            padding: "16px clamp(12px, 4vw, 80px)",
            backgroundColor: "#EDE6D9",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              className="breadcrumb-container"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                fontSize: "11px",
                color: "rgba(60,40,20,0.6)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <Link href="/" style={{ color: "rgba(60,40,20,0.5)", textDecoration: "none" }}>
                Home
              </Link>
              <span style={{ color: "rgba(60,40,20,0.35)" }}>›</span>
              <Link href="/rooms-and-suites" style={{ color: "rgba(60,40,20,0.5)", textDecoration: "none" }}>
                Rooms & Suites
              </Link>
              <span style={{ color: "rgba(60,40,20,0.35)" }}>›</span>
              <span style={{ color: "#B39977" }}>{room.name}</span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div style={{ backgroundColor: "#EDE6D9", padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", backgroundColor: "rgba(255,200,200,0.2)", borderRadius: "8px", color: "#d64545" }}>
              {error} Showing cached data.
            </div>
          </div>
        )}

        {/* Content */}
        <section style={{ backgroundColor: "#fff", padding: "clamp(24px, 5vw, 40px) clamp(12px, 4vw, 80px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Page Title */}
            <h1
              style={{
                fontFamily: "var(--font-dm-serif), 'DM Serif Display', serif",
                fontSize: "clamp(22px, 2.5vw, 38px)",
                fontWeight: 400,
                color: "#2a1a0e",
                marginBottom: "clamp(24px, 4vw, 40px)",
                marginTop: 0,
              }}
            >
              Room View &amp; Details
            </h1>

            <div className="main-grid">
              {/* Left Column: Main Content */}
              <div>
                {/* Main Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "16px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  <img
                    src={room.gallery?.[selectedImage] || room.image}
                    alt={room.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div className="thumbnail-grid">
                  {room.gallery?.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        border: selectedImage === idx ? "3px solid #B39977" : "2px solid #e5e0d8",
                        borderRadius: "10px",
                        padding: 0,
                        cursor: "pointer",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        boxShadow: selectedImage === idx ? "0 4px 12px rgba(179,153,119,0.3)" : "none",
                        opacity: selectedImage === idx ? 1 : 0.7,
                        background: "none",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedImage !== idx) {
                          e.currentTarget.style.opacity = "1";
                          e.currentTarget.style.borderColor = "#B39977";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedImage !== idx) {
                          e.currentTarget.style.opacity = "0.7";
                          e.currentTarget.style.borderColor = "#e5e0d8";
                        }
                      }}
                    >
                      <img
                        src={img}
                        alt={`Room view ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </button>
                  ))}
                </div>

                {/* Room Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(24px, 4vw, 32px)",
                    fontWeight: 700,
                    color: "#1a1a1a",
                    marginTop: 0,
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}
                >
                  {room.name}
                </h2>

                {/* Room Description */}
                <p style={{
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                  marginTop: 0,
                }}>
                  {room.description}
                </p>

                {/* Price and Room Meta Row */}
                <div className="room-meta-row">
                  {/* Price */}
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                      <span style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "#B39977" }}>{room.price}</span>
                      <span style={{ fontSize: "clamp(14px, 2vw, 16px)", fontWeight: 500, color: "#B39977" }}>USD</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "#888" }}>Per night</div>
                  </div>

                  {/* Divider */}
                  <div className="room-meta-divider" />

                  {/* Room Meta */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "clamp(12px, 2vw, 14px)", color: "#555", flexWrap: "wrap" }}>
                    <span>{room.beds}</span>
                    <span style={{ color: "#ccc" }}>•</span>
                    <span>{room.guests} Adults</span>
                    <span style={{ color: "#ccc" }}>•</span>
                    <span>{room.size}</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  style={{
                    backgroundColor: "#5a4a3a",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "14px 28px",
                    marginBottom: "32px",
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    width: "100%",
                    maxWidth: "200px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#4a3a2a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#5a4a3a";
                  }}
                >
                  BOOK NOW
                </button>

                {/* Room Only Basis Section */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "14px", color: "#1a1a1a", marginBottom: "4px", fontWeight: 600 }}>
                    Room Only Basis - <span style={{ color: "#B39977" }}>EMERALD BAY RESORT</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: "#4CAF50", marginTop: "8px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginTop: "2px", flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Free cancellation up to 2:00 PM on day of arrival</span>
                  </div>
                </div>

                {/* Exclusive Benefits */}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ fontSize: "14px", color: "#1a1a1a", marginBottom: "8px", fontWeight: 500 }}>
                    Exclusive benefits include
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4CAF50" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>3 kid stay free</span>
                  </div>
                </div>

                {/* Calendar and Breakfast Row - Professional Design */}
                <div className="calendar-breakfast-grid">
                  {/* Calendar Section - Impressive Design */}
                  <div style={{
                    background: "linear-gradient(145deg, #ffffff 0%, #f8f6f3 100%)",
                    border: "1px solid rgba(179,153,119,0.2)",
                    borderRadius: "16px",
                    padding: "clamp(16px, 3vw, 24px)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Decorative corner accent */}
                    <div style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, transparent 50%, rgba(179,153,119,0.1) 50%)",
                      borderRadius: "0 16px 0 0",
                    }} />

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "20px",
                    }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, #B39977 0%, #d4c4a8 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(179,153,119,0.3)",
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>Select Dates</div>
                        <div style={{ fontSize: "11px", color: "#888" }}>Check availability</div>
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      padding: "8px 0",
                    }}>
                      <button style={{
                        background: "none",
                        border: "1px solid #e5e0d8",
                        borderRadius: "8px",
                        cursor: "pointer",
                        padding: "8px 12px",
                        color: "#B39977",
                        fontSize: "14px",
                        transition: "all 0.2s",
                      }}>
                        ‹
                      </button>
                      <div style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#1a1a1a",
                        fontFamily: "var(--font-playfair), serif",
                      }}>
                        July <span style={{ color: "#B39977" }}>2025</span>
                      </div>
                      <button style={{
                        background: "none",
                        border: "1px solid #e5e0d8",
                        borderRadius: "8px",
                        cursor: "pointer",
                        padding: "8px 12px",
                        color: "#B39977",
                        fontSize: "14px",
                        transition: "all 0.2s",
                      }}>
                        ›
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "4px", textAlign: "center" }}>
                      {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, idx) => (
                        <div key={idx} style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#B39977",
                          padding: "8px 0",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}>
                          {day}
                        </div>
                      ))}
                      <div />
                      {[...Array(31)].map((_, i) => {
                        const date = i + 1;
                        const isSelected = date === 15 || date === 18;
                        const isInRange = date > 15 && date < 18;
                        return (
                          <div
                            key={i}
                            style={{
                              fontSize: "12px",
                              padding: "8px 4px",
                              borderRadius: isSelected ? "8px" : isInRange ? "0" : "8px",
                              background: isSelected
                                ? "linear-gradient(135deg, #B39977 0%, #9a7a58 100%)"
                                : isInRange
                                  ? "rgba(179,153,119,0.15)"
                                  : "transparent",
                              color: isSelected ? "#fff" : "#333",
                              cursor: "pointer",
                              fontWeight: isSelected ? 600 : 400,
                              transition: "all 0.2s",
                              boxShadow: isSelected ? "0 2px 8px rgba(179,153,119,0.3)" : "none",
                            }}
                          >
                            {date}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Breakfast Image - Impressive Design */}
                  <div style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                    background: "#000",
                  }}>
                    <img
                      src={breakfastImages[breakfastImageIndex]}
                      alt="Complimentary Breakfast"
                      style={{
                        width: "100%",
                        height: "100%",
                        minHeight: "280px",
                        objectFit: "cover",
                        display: "block",
                        transition: "all 0.8s ease-in-out",
                        transform: "scale(1.02)",
                      }}
                    />

                    {/* Top badge */}
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "linear-gradient(135deg, #B39977 0%, #d4c4a8 100%)",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Included
                    </div>

                    {/* Image indicators */}
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      display: "flex",
                      gap: "6px",
                      zIndex: 2,
                    }}>
                      {breakfastImages.map((_, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: breakfastImageIndex === idx ? "#B39977" : "rgba(255,255,255,0.5)",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                            boxShadow: breakfastImageIndex === idx ? "0 0 10px rgba(179,153,119,0.5)" : "none",
                          }}
                          onClick={() => setBreakfastImageIndex(idx)}
                        />
                      ))}
                    </div>

                    {/* Bottom overlay with content */}
                    <div style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                      padding: "60px 20px 20px",
                    }}>
                      <div style={{
                        fontSize: "18px",
                        fontWeight: 600,
                        color: "#fff",
                        marginBottom: "8px",
                        fontFamily: "var(--font-playfair), serif",
                      }}>
                        Complimentary Breakfast
                      </div>
                      <div style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: 1.5,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Fresh daily breakfast included with your stay
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Room Facilities & Compare Prices */}
              <div className="right-column">
                {/* Room Facilities Section */}
                <div style={{
                  background: "linear-gradient(180deg, rgba(217,219,237,0.75) 0%, rgba(237,230,217,1) 54%, rgba(237,230,217,0.5) 100%)",
                  border: "1px solid #e5e0d8",
                  borderRadius: "12px",
                  padding: "clamp(16px, 3vw, 24px)",
                  marginBottom: "20px",
                }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginTop: 0,
                      marginBottom: "20px",
                    }}
                  >
                    Room Facilities
                  </h3>
                  <div className="facilities-grid">
                    {[
                      { icon: "ac", label: "Air Condition", sublabel: "Cool Comfort" },
                      { icon: "wifi", label: "Speed Wifi", sublabel: "High-Speed WiFi" },
                      { icon: "breakfast", label: "Breakfast", sublabel: "Complimentary Breakfast" },
                      { icon: "pool", label: "Rooftop Pool", sublabel: "Skyline Pool" },
                      { icon: "bed", label: "Bathroom Amenities", sublabel: "Premium Amenities" },
                      { icon: "gym", label: "Room Security", sublabel: "Secure Access" },
                    ].map((facility, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <span
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            backgroundColor: "#f5f3f0",
                            color: "#B39977",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {AMENITY_ICONS[facility.icon]}
                        </span>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a1a1a" }}>{facility.label}</div>
                          <div style={{ fontSize: "11px", color: "#888" }}>{facility.sublabel}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compare Prices Section */}
                <div style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e0d8",
                  borderRadius: "12px",
                  padding: "clamp(16px, 3vw, 24px)",
                }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#1a1a1a",
                      marginTop: 0,
                      marginBottom: "20px",
                    }}
                  >
                    Compare Prices
                  </h3>

                  {/* Book Direct */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a" }}>Book Direct</span>
                    <span style={{ fontSize: "18px", fontWeight: 700, color: "#B39977" }}>{room.price} <span style={{ fontSize: "12px" }}>USD</span></span>
                  </div>

                  {/* Contact Info */}
                  <div style={{ fontSize: "12px", color: "#888", marginBottom: "4px" }}>
                    Contact us for more details
                  </div>
                  <div style={{ fontSize: "14px", color: "#B39977", fontWeight: 600, marginBottom: "16px" }}>
                    +94 77 212 0231
                  </div>

                  {/* Email Booking Button */}
                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#B39977",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "12px",
                      marginBottom: "20px",
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email this Booking
                  </button>

                  {/* OTA Prices */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {[
                      { name: "Booking.com", price: "450" },
                      { name: "Agoda", price: "450" },
                      { name: "Expedia", price: "450" },
                      { name: "Hotels.com", price: "450" },
                    ].map((ota, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: idx < 3 ? "1px solid #f0ebe4" : "none",
                      }}>
                        <span style={{ fontSize: "13px", color: "#555" }}>{ota.name}</span>
                        <span style={{ fontSize: "13px", fontWeight: 600, color: "#333" }}>{ota.price} <span style={{ fontSize: "11px", color: "#888" }}>USD</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div style={{ marginTop: "clamp(32px, 5vw, 60px)", paddingTop: "clamp(24px, 4vw, 40px)", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(20px, 1.8vw, 28px)",
                  fontWeight: 600,
                  color: "#2a1a0e",
                  marginBottom: "16px",
                  marginTop: 0,
                }}
              >
                About This Room
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.8,
                  color: "rgba(60,40,20,0.7)",
                  maxWidth: "800px",
                }}
              >
                {room.longDescription}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
