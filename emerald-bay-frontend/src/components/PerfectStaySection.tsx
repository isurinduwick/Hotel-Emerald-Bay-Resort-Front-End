"use client";

import { useState } from "react";

const ROOMS = [
  {
    id: 0,
    name: "Superior Ocean View",
    description: "Wake up to breathtaking ocean panoramas with a spacious king bed and private balcony.",
    image: "/roomimg1.jpg",
  },
  {
    id: 1,
    name: "Deluxe Double Room",
    description: "A comfortable twin bed room with modern design, cozy interiors, and a relaxing atmosphere.",
    image: "/2ndimg.jpg",
  },
  {
    id: 2,
    name: "Beachfront Suite",
    description: "Indulge in luxury with direct beach access, a private plunge pool and stunning sunset views.",
    image: "/roomimg2.jpg",
  },
];

export default function PerfectStaySection() {
  const [active, setActive] = useState(1);

  const prev = () => setActive((a) => (a - 1 + ROOMS.length) % ROOMS.length);
  const next = () => setActive((a) => (a + 1) % ROOMS.length);

  const getCardIndex = (offset: number) =>
    (active + offset + ROOMS.length) % ROOMS.length;

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "clamp(16px, 2vw, 28px) 0 clamp(40px, 5vw, 72px)",
        marginTop: "-20px",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .stay-cards-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(12px, 2vw, 24px);
          width: 100%;
          max-width: 1100px;
          padding: 0 clamp(64px, 8vw, 120px);
          box-sizing: border-box;
        }
        .stay-side-card {
          flex: 0 0 clamp(130px, 18vw, 220px);
          height: clamp(220px, 26vw, 320px);
        }
        .stay-featured-card {
          flex: 0 0 clamp(260px, 38vw, 460px);
          height: clamp(280px, 36vw, 440px);
        }
        .stay-arrow {
          position: absolute;
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #d4c4a8;
          background: rgba(255,255,255,0.9);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.12);
          transition: background 0.2s;
        }
        @media (max-width: 768px) {
          .stay-side-card { display: none !important; }
          .stay-featured-card {
            flex: 0 0 calc(100% - 32px) !important;
            height: 340px !important;
            max-width: 400px;
          }
          .stay-cards-strip {
            padding: 0 16px !important;
          }
          .stay-arrow {
            width: 36px !important;
            height: 36px !important;
          }
          .stay-arrow-left { left: 8px !important; }
          .stay-arrow-right { right: 8px !important; }
        }
        @media (max-width: 480px) {
          .stay-featured-card {
            height: 300px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .stay-side-card {
            flex: 0 0 clamp(100px, 16vw, 180px) !important;
            height: clamp(180px, 22vw, 260px) !important;
          }
          .stay-featured-card {
            flex: 0 0 clamp(240px, 34vw, 380px) !important;
            height: clamp(260px, 32vw, 380px) !important;
          }
          .stay-cards-strip {
            padding: 0 clamp(48px, 6vw, 80px) !important;
          }
        }
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: "center", padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: "DM Serif Display",
            fontSize: "clamp(26px, 4.5vw, 56px)",
            fontWeight: 800,
            color: "#1a1208",
            margin: "0 0 14px",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          Your Perfect Stay Starts Here
        </h2>
        <div style={{ width: "56px", height: "3px", background: "#ba9e7a", borderRadius: "2px", margin: "0 auto 20px" }} />
        <p
          style={{
            fontFamily: "Libre Franklin",
            fontSize: "clamp(13px, 1.2vw, 15px)",
            color: "#7a6d5e",
            maxWidth: "420px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Discover a collection of curated living spaces designed for the
          ultimate beachfront escape in Mirissa
        </p>
      </div>

      {/* Carousel */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "clamp(32px, 5vw, 56px)",
          minHeight: "320px",
        }}
      >
        {/* Left arrow */}
        <button onClick={prev} aria-label="Previous room" className="stay-arrow stay-arrow-left" style={{ left: "clamp(8px, 2.5vw, 40px)" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="#7a6d5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Cards */}
        <div className="stay-cards-strip">
          <RoomCard room={ROOMS[getCardIndex(-1)]} featured={false} onClick={prev} />
          <RoomCard room={ROOMS[getCardIndex(0)]} featured={true} onClick={() => {}} />
          <RoomCard room={ROOMS[getCardIndex(1)]} featured={false} onClick={next} />
        </div>

        {/* Right arrow */}
        <button onClick={next} aria-label="Next room" className="stay-arrow stay-arrow-right" style={{ right: "clamp(8px, 2.5vw, 40px)" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="#7a6d5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
        {ROOMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to room ${i + 1}`}
            style={{
              width: i === active ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === active ? "#ba9e7a" : "#d4c4a8",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          fontFamily: "'Cinzel', 'Trajan Pro', serif",
          fontSize: "clamp(9px, 1vw, 11px)",
          fontWeight: 600,
          letterSpacing: "0.26em",
          color: "#ba9e7a",
          textTransform: "uppercase",
          marginTop: "clamp(28px, 3.5vw, 44px)",
        }}
      >
        {/* Luxury, Comfort & Tailor Made Services */}
      </p>
    </section>
  );
}

function RoomCard({
  room,
  featured,
  onClick,
}: {
  room: (typeof ROOMS)[number];
  featured: boolean;
  onClick: () => void;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div
      onClick={!featured ? onClick : undefined}
      className={featured ? "stay-featured-card" : "stay-side-card"}
      style={{
        position: "relative",
        borderRadius: "clamp(10px, 1.2vw, 18px)",
        overflow: "hidden",
        cursor: featured ? "default" : "pointer",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        boxShadow: featured ? "0 16px 48px rgba(0,0,0,0.28)" : "0 4px 20px rgba(0,0,0,0.14)",
        transform: featured ? "scale(1)" : "scale(0.92)",
        flexShrink: 0,
      }}
    >
      <img
        src={room.image}
        alt={room.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />

      {/* Heart */}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
        aria-label="Favourite"
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.7)",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(4px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          zIndex: 3,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
            fill={liked ? "#e05c5c" : "none"}
            stroke={liked ? "#e05c5c" : "rgba(255,255,255,0.9)"}
            strokeWidth="1.8"
          />
        </svg>
      </button>

      {/* Bottom overlay — featured only */}
      {featured && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(14px, 2vw, 28px) clamp(14px, 2.5vw, 28px) clamp(14px, 2vw, 24px)",
            background: "linear-gradient(to top, rgba(10,7,2,0.88) 0%, rgba(10,7,2,0.60) 60%, transparent 100%)",
            zIndex: 2,
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: "clamp(16px, 2vw, 24px)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 6px",
              letterSpacing: "0.01em",
            }}
          >
            {room.name}
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(11px, 1vw, 13px)",
              color: "rgba(255,255,255,0.82)",
              margin: "0 0 clamp(10px, 1.5vw, 18px)",
              lineHeight: 1.55,
            }}
          >
            {room.description}
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1.5px solid rgba(255,255,255,0.7)",
                background: "transparent",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(10px, 0.85vw, 13px)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              View Details
            </button>
            <button
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: "8px",
                border: "none",
                background: "rgba(30,22,10,0.75)",
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
                fontSize: "clamp(10px, 0.85vw, 13px)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.03em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(186,158,122,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(30,22,10,0.75)")}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="12" rx="2" stroke="white" strokeWidth="1.4" fill="none" />
                <line x1="1" y1="7" x2="15" y2="7" stroke="white" strokeWidth="1.2" />
                <line x1="5" y1="1" x2="5" y2="5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="11" y1="1" x2="11" y2="5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Book Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
