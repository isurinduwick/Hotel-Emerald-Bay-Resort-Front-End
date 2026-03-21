"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

// Fallback rooms data for display if API fails
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
    amenities: ["wifi", "ac", "breakfast", "pool", "bed"],
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
    amenities: ["wifi", "ac", "breakfast", "bed"],
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
    amenities: ["wifi", "ac", "breakfast", "pool", "bed", "gym"],
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
    amenities: ["wifi", "ac", "breakfast", "pool", "bed"],
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
    amenities: ["wifi", "ac", "breakfast", "pool", "bed", "gym"],
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
    amenities: ["wifi", "ac", "bed"],
  },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: (
    <span title="Free Wi-Fi">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill="currentColor" />
      </svg>
    </span>
  ),
  ac: (
    <span title="Air Conditioning">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="3" width="20" height="8" rx="2" />
        <path d="M7 11v4a2 2 0 002 2h6a2 2 0 002-2v-4" />
        <path d="M12 15v6M9 18l3 3 3-3" />
      </svg>
    </span>
  ),
  breakfast: (
    <span title="Breakfast Included">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    </span>
  ),
  pool: (
    <span title="Pool Access">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M8 2L8 8M16 2L16 8" />
        <path d="M6 6h4M14 6h4" />
      </svg>
    </span>
  ),
  bed: (
    <span title="Premium Bedding">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 4v16M2 8h18a2 2 0 012 2v8H2" />
        <path d="M2 14h20" />
        <path d="M6 8v6M16 8v2" />
      </svg>
    </span>
  ),
  gym: (
    <span title="Gym Access">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 6v12M18 6v12M3 9h4M17 9h4M3 15h4M17 15h4M10 9v6M14 9v6" />
      </svg>
    </span>
  ),
};

const BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  STANDARD: { bg: "rgba(100,149,100,0.15)", text: "#4a8a4a" },
  DELUXE:   { bg: "rgba(179,153,119,0.18)", text: "#8a6a3a" },
  SUITE:    { bg: "rgba(205,138,55,0.18)",  text: "#a06820" },
  FAMILY:   { bg: "rgba(90,130,180,0.15)", text: "#3a6a9a" },
  PREMIUM:  { bg: "rgba(150,90,160,0.15)", text: "#7a3a8a" },
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
  amenities: string[];
}

export default function RoomsAndSuitesPage() {
  const [rooms, setRooms] = useState<Room[]>(FALLBACK_ROOMS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.emeraldbayresorts.com/api/v1/rooms");

        if (!response.ok) {
          throw new Error(`Failed to fetch rooms: ${response.status}`);
        }

        const data = await response.json();
        // Handle different API response structures
        const rawRooms = Array.isArray(data) ? data : data?.data || data;

        // Map API response to Room interface
        const mappedRooms = rawRooms.map((apiRoom: any, index: number) => {
          // Get fallback room for default values
          const fallbackRoom = FALLBACK_ROOMS[index] || FALLBACK_ROOMS[0];

          // Extract image URL - handle both single image string and array of images
          let imageUrl = fallbackRoom.image;
          if (apiRoom.image) {
            imageUrl = apiRoom.image;
          } else if (apiRoom.images && Array.isArray(apiRoom.images) && apiRoom.images.length > 0) {
            // If API returns images array, take the first image's URL
            imageUrl = apiRoom.images[0].image_url || apiRoom.images[0].url || apiRoom.images[0];
          }

          return {
            id: apiRoom.id || fallbackRoom.id,
            image: imageUrl,
            name: apiRoom.title || apiRoom.name || fallbackRoom.name,
            description: apiRoom.description || fallbackRoom.description,
            price: apiRoom.price || fallbackRoom.price,
            size: apiRoom.size || apiRoom.room_size || fallbackRoom.size,
            // Keep these from fallback
            type: apiRoom.type || fallbackRoom.type,
            guests: apiRoom.guests || fallbackRoom.guests,
            beds: apiRoom.beds || fallbackRoom.beds,
            amenities: apiRoom.amenities || fallbackRoom.amenities,
          };
        });

        setRooms(mappedRooms);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError("Failed to load rooms. Using cached data.");
        // Falls back to FALLBACK_ROOMS
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex flex-1 w-full flex-col mt-[60px]">
        {/* ── Hero Banner ─────────────────────────────────────── */}
        <section style={{ position: "relative", width: "100%", overflow: "hidden" }}>
          <style>{`
            @keyframes roomsBgZoom {
              0%   { transform: scale(1); }
              100% { transform: scale(1.06); }
            }
            @keyframes roomsFadeUp {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            @keyframes roomsLineGrow {
              from { width: 0; opacity: 0; }
              to   { width: 56px; opacity: 1; }
            }
            .rooms-bg { animation: roomsBgZoom 16s ease-in-out infinite alternate; }
            .rooms-hero-tag  { opacity:0; animation: roomsFadeUp 0.7s ease 0.4s forwards; }
            .rooms-hero-h1   { opacity:0; animation: roomsFadeUp 0.8s ease 0.65s forwards; }
            .rooms-hero-line { opacity:0; animation: roomsLineGrow 0.7s ease 1.0s forwards; }
            .rooms-hero-sub  { opacity:0; animation: roomsFadeUp 0.7s ease 1.15s forwards; }

            .room-card { transition: box-shadow 0.25s, transform 0.25s; }
            .room-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.13); }
            .book-btn { transition: background 0.2s, transform 0.15s; }
            .book-btn:hover { background: #9a7a58 !important; transform: scale(1.03); }

            @media (max-width: 768px) {
              .rooms-hero-h1-text { font-size: 28px !important; }
              .rooms-grid { grid-template-columns: 1fr !important; }
            }
            @media (min-width: 769px) and (max-width: 1100px) {
              .rooms-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>

          {/* Background */}
          <div style={{ position: "relative", width: "100%", height: "clamp(300px, 38vw, 500px)", overflow: "hidden", backgroundColor: "#1a0e05" }}>
            <div
              className="rooms-bg"
              style={{
                position: "absolute", inset: 0,
                backgroundImage: "url(/hotel-bg.jpeg)",
                backgroundSize: "cover", backgroundPosition: "center",
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.72) 100%)" }} />

            {/* Breadcrumb */}
            <div
              style={{
                position: "absolute", top: "28px", left: "50%", transform: "translateX(-50%)",
                display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-cinzel), serif", fontSize: "11px",
                color: "rgba(255,255,255,0.7)", letterSpacing: "0.18em", textTransform: "uppercase",
              }}
            >
              <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Home</Link>
              <span style={{ color: "rgba(255,255,255,0.35)" }}>›</span>
              <span style={{ color: "#d4a853" }}>Rooms &amp; Suites</span>
            </div>

            {/* Center text */}
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", paddingTop: "32px",
              }}
            >
              <span
                className="rooms-hero-tag"
                style={{
                  fontFamily: "var(--font-cinzel), serif", fontSize: "11px",
                  letterSpacing: "0.35em", color: "#d4a853", textTransform: "uppercase", marginBottom: "16px",
                }}
              >
                Emerald Bay Resort
              </span>

              <h1
                className="rooms-hero-h1 rooms-hero-h1-text"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  fontSize: "clamp(32px, 4.5vw, 62px)", fontWeight: 600, fontStyle: "italic",
                  color: "#fff", letterSpacing: "0.02em", margin: 0, lineHeight: 1.2,
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                Rooms &amp; Suites
              </h1>

              <div
                className="rooms-hero-line"
                style={{
                  height: "2px", marginTop: "18px",
                  background: "linear-gradient(90deg, transparent, #d4a853, #f5e6b8, #d4a853, transparent)",
                  borderRadius: "1px",
                }}
              />

              <p
                className="rooms-hero-sub"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "clamp(11px, 1.2vw, 14px)",
                  color: "rgba(255,255,255,0.75)", letterSpacing: "0.2em",
                  textTransform: "uppercase", marginTop: "16px",
                }}
              >
                Your perfect sanctuary awaits
              </p>
            </div>
          </div>
        </section>

        {/* ── Section Header ───────────────────────────────────── */}
        <section style={{ backgroundColor: "#EDE6D9", padding: "60px clamp(16px, 6vw, 80px) 20px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", letterSpacing: "0.3em", color: "#B39977", textTransform: "uppercase", marginBottom: "10px" }}>
              Choose Your Stay
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 600, fontStyle: "italic", color: "#2a1a0e", margin: 0 }}>
              Discover Our Rooms
            </h2>
            <div style={{ width: "48px", height: "2px", background: "linear-gradient(90deg, #d4a853, #f5e6b8, #d4a853)", margin: "14px auto 0", borderRadius: "1px" }} />
            <p style={{ fontFamily: "var(--font-geist-sans), sans-serif", fontSize: "15px", color: "rgba(60,40,20,0.65)", maxWidth: "580px", margin: "16px auto 0", lineHeight: 1.7 }}>
              Each room is thoughtfully designed to offer elegance, comfort, and a true sense of the tropics — framed by ocean views and lush greenery.
            </p>
          </div>
        </section>

        {/* ── Loading/Error State ──────────────────────────────── */}
        {loading && (
          <section style={{ backgroundColor: "#EDE6D9", padding: "80px 20px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", color: "#B39977" }}>
              Loading rooms...
            </div>
          </section>
        )}

        {error && (
          <section style={{ backgroundColor: "#EDE6D9", padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", backgroundColor: "rgba(255,200,200,0.2)", borderRadius: "8px", color: "#d64545" }}>
              {error}
            </div>
          </section>
        )}

        {/* ── Rooms Grid ───────────────────────────────────────── */}
        {!loading && (
          <section style={{ backgroundColor: "#EDE6D9", padding: "40px clamp(16px, 6vw, 80px) 80px" }}>
            <div
              className="rooms-grid"
              style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}
            >
              {rooms.map((room) => {
              const badge = BADGE_COLORS[room.type] ?? BADGE_COLORS.STANDARD;
              return (
                <div
                  key={room.id}
                  className="room-card"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", overflow: "hidden" }}>
                    <img
                      src={room.image}
                      alt={room.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    {/* Badge */}
                    <span
                      style={{
                        position: "absolute", top: "14px", left: "14px",
                        backgroundColor: "rgba(0,0,0,0.48)",
                        backdropFilter: "blur(6px)",
                        color: "#f5e6b8",
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "9px", fontWeight: 600,
                        letterSpacing: "0.22em", textTransform: "uppercase",
                        padding: "5px 12px", borderRadius: "20px",
                        border: "1px solid rgba(212,168,83,0.4)",
                      }}
                    >
                      {room.type}
                    </span>
                    {/* Price pill */}
                    <div
                      style={{
                        position: "absolute", bottom: "14px", right: "14px",
                        backgroundColor: "#B39977",
                        color: "#fff",
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "12px", fontWeight: 700,
                        padding: "6px 14px", borderRadius: "20px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                      }}
                    >
                      ${room.price}<span style={{ fontSize: "9px", fontWeight: 400, opacity: 0.85 }}>/night</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "22px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Room meta */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#8a6a3a" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                          <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        {room.size}
                      </span>
                      <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#C4A572" }} />
                      <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#8a6a3a" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                          <path d="M16 3.13a4 4 0 010 7.75"/>
                        </svg>
                        Up to {room.guests}
                      </span>
                      <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#C4A572" }} />
                      <span style={{ fontSize: "12px", color: "#8a6a3a" }}>{room.beds}</span>
                    </div>

                    {/* Room name */}
                    <h3
                      style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "clamp(17px, 1.5vw, 21px)",
                        fontWeight: 600,
                        color: "#2a1a0e",
                        margin: "0 0 4px",
                        lineHeight: 1.3,
                      }}
                    >
                      {room.name}
                    </h3>
                    <div style={{ width: "32px", height: "1.5px", background: "linear-gradient(90deg, #d4a853, transparent)", marginBottom: "10px" }} />

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "rgba(60,40,20,0.62)",
                        lineHeight: 1.65,
                        margin: "0 0 18px",
                        flex: 1,
                      }}
                    >
                      {room.description}
                    </p>

                    {/* Amenity icons */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                      {room.amenities?.map((a) => (
                        <span
                          key={a}
                          style={{
                            width: "34px", height: "34px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(179,153,119,0.1)",
                            color: "#B39977",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            border: "1px solid rgba(179,153,119,0.2)",
                          }}
                        >
                          {AMENITY_ICONS[a]}
                        </span>
                      ))}
                    </div>

                    {/* Divider */}
                    <div style={{ height: "1px", backgroundColor: "rgba(179,153,119,0.2)", marginBottom: "18px" }} />

                    {/* CTA */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                      <div>
                        <span style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "10px", color: "#B39977", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                          from
                        </span>
                        <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, color: "#2a1a0e", lineHeight: 1 }}>
                          ${room.price}
                          <span style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", fontWeight: 400, color: "#8a6a3a" }}> /night</span>
                        </div>
                      </div>
                      <Link
                        href={`/rooms-and-suites/${room.id}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#B39977",
                          color: "#fff",
                          border: "none",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                          borderBottomLeftRadius: "0px",
                          padding: "11px 24px",
                          fontFamily: "var(--font-cinzel), serif",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          textDecoration: "none",
                        }}
                        className="book-btn"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        )}

        {/* ── Amenities Banner ────────────────────────────────── */}
        <section
          style={{
            background: "linear-gradient(135deg, #2a1a0e 0%, #3d2510 50%, #2a1a0e 100%)",
            padding: "60px clamp(16px, 6vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", letterSpacing: "0.3em", color: "#d4a853", textTransform: "uppercase", marginBottom: "10px" }}>
              Every Room Includes
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 600, fontStyle: "italic", color: "#EDE6D9", margin: "0 0 40px" }}>
              Included Amenities
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "28px 48px" }}>
              {[
                { icon: "wifi", label: "Free Wi-Fi" },
                { icon: "ac", label: "Air Conditioning" },
                { icon: "breakfast", label: "Daily Breakfast" },
                { icon: "pool", label: "Pool Access" },
                { icon: "bed", label: "Premium Bedding" },
                { icon: "gym", label: "Gym Access" },
              ].map(({ icon, label }) => (
                <div key={icon} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      width: "50px", height: "50px", borderRadius: "12px",
                      backgroundColor: "rgba(212,168,83,0.12)",
                      border: "1px solid rgba(212,168,83,0.25)",
                      color: "#d4a853",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {AMENITY_ICONS[icon]}
                  </span>
                  <span style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "11px", color: "rgba(237,230,217,0.75)", letterSpacing: "0.1em" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
