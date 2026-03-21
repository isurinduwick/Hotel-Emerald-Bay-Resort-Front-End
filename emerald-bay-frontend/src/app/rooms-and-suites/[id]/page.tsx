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
      <Navbar />

      <main className="flex-1 w-full mt-[60px]">
        {/* Breadcrumb */}
        <div
          style={{
            padding: "20px clamp(16px, 6vw, 80px)",
            backgroundColor: "#EDE6D9",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
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
        <section style={{ backgroundColor: "#fff", padding: "40px clamp(16px, 6vw, 80px)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Page Title */}
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(24px, 2.5vw, 38px)",
                fontWeight: 600,
                color: "#2a1a0e",
                marginBottom: "40px",
                marginTop: 0,
              }}
            >
              Room View &amp; Details
            </h1>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>
              {/* Left: Image Gallery */}
              <div>
                {/* Main Image */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4/3",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "16px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  }}
                >
                  <img
                    src={room.gallery?.[selectedImage] || room.image}
                    alt={room.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(60px, 1fr))", gap: "8px" }}>
                  {room.gallery?.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        border: selectedImage === idx ? "2px solid #B39977" : "1px solid rgba(0,0,0,0.1)",
                        borderRadius: "6px",
                        padding: 0,
                        cursor: "pointer",
                        aspectRatio: "1",
                        overflow: "hidden",
                        transition: "border 0.2s",
                      }}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: Room Details & Booking */}
              <div>
                {/* Room Type Badge */}
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#EDE6D9",
                    color: "#8a6a3a",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {room.type}
                </div>

                {/* Room Name */}
                <h2
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "clamp(22px, 2vw, 32px)",
                    fontWeight: 600,
                    color: "#2a1a0e",
                    marginTop: 0,
                    marginBottom: "8px",
                    lineHeight: 1.3,
                  }}
                >
                  {room.name}
                </h2>

                <div style={{ width: "40px", height: "2px", background: "#B39977", marginBottom: "20px" }} />

                {/* Price */}
                <div style={{ marginBottom: "24px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "11px",
                      color: "#B39977",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Starting from
                  </span>
                  <div style={{ fontSize: "36px", fontWeight: 700, color: "#2a1a0e", lineHeight: 1 }}>
                    ${room.price}{" "}
                    <span style={{ fontSize: "14px", fontWeight: 400, color: "#8a6a3a" }}>USD</span>
                  </div>
                </div>

                {/* Room Meta */}
                <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#8a6a3a" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    {room.size}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#8a6a3a" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                    Up to {room.guests} Guests
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#8a6a3a" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 4v16M2 8h18a2 2 0 012 2v8H2" />
                      <path d="M2 14h20" />
                      <path d="M6 8v6M16 8v2" />
                    </svg>
                    {room.beds}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", marginBottom: "24px" }} />

                {/* Room Facilities */}
                <div style={{ marginBottom: "28px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#2a1a0e",
                      marginBottom: "16px",
                      marginTop: 0,
                    }}
                  >
                    Room Facilities
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
                    {room.facilities?.map((facility, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "6px",
                            backgroundColor: "rgba(179,153,119,0.1)",
                            color: "#B39977",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(179,153,119,0.2)",
                            flexShrink: 0,
                          }}
                        >
                          {AMENITY_ICONS[facility.icon]}
                        </span>
                        <span style={{ fontSize: "12px", color: "#8a6a3a" }}>{facility.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", marginBottom: "24px" }} />

                {/* Booking Section */}
                <div style={{ backgroundColor: "#EDE6D9", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#2a1a0e",
                        marginTop: 0,
                        marginBottom: "12px",
                      }}
                    >
                      Book Direct
                    </h3>
                    <div style={{ fontSize: "13px", color: "#8a6a3a", lineHeight: 1.6 }}>
                      <div>Contact for more details:</div>
                      <div style={{ fontFamily: "var(--font-cinzel), serif", fontWeight: 600, marginTop: "4px" }}>
                        +94 77 222 0228
                      </div>
                    </div>
                  </div>

                  <div style={{ height: "1px", background: "rgba(0,0,0,0.1)", marginBottom: "16px" }} />

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", font: "13px", color: "#8a6a3a" }}>
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        Booking.com
                      </div>
                      <div>450 USD</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        Agoda
                      </div>
                      <div>450 USD</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        Expedia
                      </div>
                      <div>400 USD</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                        Hotels.com
                      </div>
                      <div>400 USD</div>
                    </div>
                  </div>

                  <button
                    style={{
                      width: "100%",
                      backgroundColor: "#B39977",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "12px",
                      marginTop: "16px",
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#9a7a58")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#B39977")}
                  >
                    Email Booking
                  </button>
                </div>

                {/* Compare Prices Button */}
                <button
                  style={{
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#8a6a3a",
                    border: "1px solid #B39977",
                    borderRadius: "6px",
                    padding: "10px",
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#EDE6D9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Compare Prices
                </button>
              </div>
            </div>

            {/* Description Section */}
            <div style={{ marginTop: "60px", paddingTop: "40px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
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
