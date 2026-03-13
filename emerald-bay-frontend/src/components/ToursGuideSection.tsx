"use client";

import { useState } from "react";

const tours = [
  { id: 1, image: "/safariimg.jpg", name: "Mirissa Kayak Safari Tours" },
  { id: 2, image: "/istimg.jpg", name: "Sunset Kayak Experience" },
  { id: 3, image: "/2ndimg.jpg", name: "Wildlife Nature Tours" },
  { id: 4, image: "/3rdimg.jpg", name: "Coastal Beach Tours" },
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
        padding: "clamp(32px, 4vw, 64px) clamp(16px, 6vw, 96px) clamp(48px, 6vw, 88px)",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .tours-header-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: clamp(16px, 3vw, 40px);
          max-width: 1200px;
          margin: 0 auto clamp(28px, 4vw, 48px);
        }
        .tours-content-row {
          display: flex;
          flex-wrap: nowrap;
          gap: clamp(10px, 1.6vw, 10px);
          max-width: 1200px;
          margin: 0 auto;
          align-items: stretch;
          justify-content: flex-end;
        }
        .tours-slider {
          flex: 1 1 0;
          width: 100%;
          min-width: 0;
          max-width: 850px;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 6px solid #e8ddd0;
          box-sizing: border-box;
        }
        .tours-slider-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          min-height: 220px;
        }
        .tours-side-thumbs {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.2vw, 14px);
          flex: 0 0 auto;
          width: clamp(110px, 14vw, 175px);
        }
        .tours-thumb {
          flex: 1 1 0;
          border-radius: 10px;
          overflow: hidden;
          border: 4px solid #e8ddd0;
          box-sizing: border-box;
        }
        .tours-main-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: opacity 0.4s ease;
        }
        @media (max-width: 768px) {
          .tours-header-row {
            display: block !important;
            margin-bottom: 20px !important;
          }
          .tours-header-desc {
            text-align: left !important;
            max-width: 100% !important;
            margin-top: 10px !important;
          }
          .tours-content-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .tours-side-thumbs {
            flex-direction: column !important;
            width: 100% !important;
            gap: 8px !important;
          }
          .tours-thumb {
            width: 100% !important;
            min-height: 120px !important;
          }
          .tours-slider {
            border-width: 4px !important;
          }
          .tours-slider-media {
            min-height: 200px;
          }
        }
        @media (max-width: 480px) {
          .tours-slider {
            border-width: 3px !important;
          }
          .tours-thumb {
            min-height: 110px !important;
          }
          .tours-slider-media {
            min-height: 180px;
          }
        }
      `}</style>

      {/* Section label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Cinzel', 'Trajan Pro', serif",
          fontSize: "clamp(9px, 1vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.26em",
          color: "#ba9e7a",
          textTransform: "uppercase",
          margin: "0 0 clamp(20px, 2.5vw, 32px)",
        }}
      >
        Premium Destination Tours
      </p>

      {/* Header row */}
      <div className="tours-header-row">
        <div style={{ flex: "1 1 260px" }}>
          <h2
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "clamp(22px, 3.2vw, 44px)",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
              margin: "0 0 10px",
            }}
          >
            Let Our Tours Guide You
          </h2>
          <div style={{ width: "48px", height: "3px", backgroundColor: "#ba9e7a", borderRadius: "2px" }} />
        </div>
        <p
          className="tours-header-desc"
          style={{
            flex: "1 1 300px",
            maxWidth: "420px",
            fontFamily: "Arial, sans-serif",
            fontSize: "clamp(12px, 1.1vw, 15px)",
            color: "#555",
            lineHeight: 1.7,
            margin: 0,
            textAlign: "right",
          }}
        >
          Explore the beauty, culture, and adventure our destination has to offer. Our carefully selected tours make it easy for you to experience more during your stay.
        </p>
      </div>

      {/* Main content */}
      <div className="tours-content-row">
        {/* Slider */}
        <div className="tours-slider">
          <div className="tours-slider-media">
            <img
              key={tour.id}
              src={tour.image}
              alt={tour.name}
              className="tours-main-image"
            />

            {/* Overlay card */}
            <div
              style={{
                position: "absolute",
                bottom: "clamp(8px, 1.5vw, 18px)",
                right: "clamp(8px, 1.5vw, 18px)",
                backgroundColor: "rgba(20,20,20,0.82)",
                backdropFilter: "blur(4px)",
                borderRadius: "10px",
                padding: "clamp(10px, 1.4vw, 18px) clamp(12px, 1.8vw, 22px)",
                minWidth: "clamp(140px, 18vw, 210px)",
                color: "#fff",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(9px, 1vw, 12px)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 clamp(8px, 1.2vw, 12px)",
                  lineHeight: 1.4,
                  color: "#fff",
                }}
              >
                {tour.name}
              </p>

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
                  fontSize: "clamp(8px, 0.85vw, 11px)",
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginBottom: "clamp(8px, 1.2vw, 12px)",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(186,158,122,0.4)"; e.currentTarget.style.borderColor = "#ba9e7a"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
              >
                Discover More
              </button>

              {/* Nav row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px" }}>
                <button
                  onClick={prev}
                  aria-label="Previous tour"
                  style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "15px", lineHeight: 1, padding: "0 2px", opacity: 0.85, transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
                >
                  ←
                </button>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: "clamp(10px, 0.9vw, 12px)", color: "rgba(255,255,255,0.75)", letterSpacing: "0.06em", userSelect: "none" }}>
                  {String(current + 1).padStart(2, "0")}
                </span>
                <button
                  onClick={next}
                  aria-label="Next tour"
                  style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "15px", lineHeight: 1, padding: "0 2px", opacity: 0.85, transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side thumbnails */}
        <div className="tours-side-thumbs">
          {sideImages.map((img) => (
            <div key={img.src} className="tours-thumb">
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
