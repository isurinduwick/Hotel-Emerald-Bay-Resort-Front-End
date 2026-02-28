"use client";

import { useState } from "react";

const tours = [
  {
    id: 1,
    image: "/safariimg.jpg",
    name: "Mirissa Kayak Safari Tours",
  },
  {
    id: 2,
    image: "/istimg.jpg",
    name: "Sunset Kayak Experience",
  },
  {
    id: 3,
    image: "/2ndimg.jpg",
    name: "Wildlife Nature Tours",
  },
  {
    id: 4,
    image: "/3rdimg.jpg",
    name: "Coastal Beach Tours",
  },
];

const sideImages = [
  { src: "/istimg.jpg", alt: "Sunset kayaking on the lagoon" },
  { src: "/2ndimg.jpg", alt: "Kingfisher bird in the mangroves" },
  { src: "/3rdimg.jpg", alt: "Serene beach cove in Mirissa" },
];

export default function ToursGuideSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + tours.length) % tours.length);
  const next = () => setCurrent((c) => (c + 1) % tours.length);

  const tour = tours[current];

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding:
          "clamp(32px, 4vw, 64px) clamp(24px, 6vw, 96px) clamp(48px, 6vw, 88px)",
        boxSizing: "border-box",
      }}
    >
      {/* Section label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Cinzel', 'Trajan Pro', serif",
          fontSize: "clamp(9px, 1vw, 12px)",
          fontWeight: "600",
          letterSpacing: "0.26em",
          color: "#ba9e7a",
          textTransform: "uppercase",
          margin: "0 0 clamp(20px, 2.5vw, 32px)",
        }}
      >
        Premium Destination Tours
      </p>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "clamp(16px, 3vw, 40px)",
          maxWidth: "1200px",
          margin: "0 auto clamp(28px, 4vw, 48px)",
        }}
      >
        {/* Left heading */}
        <div style={{ flex: "1 1 260px" }}>
          <h2
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "clamp(26px, 3.2vw, 44px)",
              fontWeight: "700",
              color: "#1a1a1a",
              lineHeight: "1.2",
              margin: "0 0 10px",
            }}
          >
            Let Our Tours Guide You
          </h2>
          {/* Gold underline accent */}
          <div
            style={{
              width: "48px",
              height: "3px",
              backgroundColor: "#ba9e7a",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Right description */}
        <p
          style={{
            flex: "1 1 300px",
            maxWidth: "420px",
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(13px, 1.1vw, 15px)",
            color: "#555",
            lineHeight: "1.7",
            margin: "0",
            textAlign: "right",
          }}
        >
          Explore the beauty, culture, and adventure our destination has to
          offer. Our carefully selected tours make it easy for you to experience
          more during your stay.
        </p>
      </div>

      {/* Main content row */}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "clamp(10px, 1.6vw, 10px)",
          maxWidth: "1200px",
          margin: "0 auto",
          alignItems: "stretch",
          justifyContent: "flex-end",
        }}
      >
        {/* ── Slider ── */}
        <div
          style={{
            flex: "1 1 0",
            maxWidth: "850px",
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            border: "6px solid #e8ddd0",
            boxSizing: "border-box",
          }}
        >
          {/* Fixed aspect-ratio wrapper so full image is always visible */}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
            <img
              key={tour.id}
              src={tour.image}
              alt={tour.name}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                transition: "opacity 0.4s ease",
              }}
            />

            {/* Overlay card — bottom right */}
            <div
              style={{
                position: "absolute",
                bottom: "clamp(10px, 1.5vw, 18px)",
                right: "clamp(10px, 1.5vw, 18px)",
                backgroundColor: "rgba(20,20,20,0.82)",
                backdropFilter: "blur(4px)",
                borderRadius: "10px",
                padding: "clamp(10px, 1.4vw, 18px) clamp(12px, 1.8vw, 22px)",
                minWidth: "clamp(150px, 18vw, 210px)",
                color: "#fff",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(10px, 1vw, 12px)",
                  fontWeight: "700",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 clamp(8px, 1.2vw, 12px)",
                  lineHeight: "1.4",
                  color: "#fff",
                }}
              >
                {tour.name}
              </p>

              {/* Discover More button */}
              <button
                style={{
                  display: "block",
                  width: "100%",
                  padding: "6px 0",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.5)",
                  borderRadius: "4px",
                  color: "#fff",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "clamp(9px, 0.85vw, 11px)",
                  fontWeight: "600",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginBottom: "clamp(8px, 1.2vw, 12px)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(186,158,122,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "#ba9e7a";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "rgba(255,255,255,0.5)";
                }}
              >
                Discover More
              </button>

              {/* Navigation row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "6px",
                }}
              >
                <button
                  onClick={prev}
                  aria-label="Previous tour"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "15px",
                    lineHeight: "1",
                    padding: "0 2px",
                    opacity: 0.85,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")
                  }
                >
                  ←
                </button>

                <span
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(10px, 0.9vw, 12px)",
                    color: "rgba(255,255,255,0.75)",
                    letterSpacing: "0.06em",
                    userSelect: "none",
                  }}
                >
                  {String(current + 1).padStart(2, "0")}
                </span>

                <button
                  onClick={next}
                  aria-label="Next tour"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "15px",
                    lineHeight: "1",
                    padding: "0 2px",
                    opacity: 0.85,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")
                  }
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Side thumbnails ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px, 1.2vw, 14px)",
            flex: "0 0 auto",
            width: "clamp(110px, 14vw, 175px)",
          }}
        >
          {sideImages.map((img) => (
            <div
              key={img.src}
              style={{
                flex: "1 1 0",
                borderRadius: "10px",
                overflow: "hidden",
                border: "4px solid #e8ddd0",
                boxSizing: "border-box",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "clamp(80px, 10vw, 120px)",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
