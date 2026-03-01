"use client";

import Image from "next/image";

const activities = [
  {
    id: 1,
    name: "Beach",
    image: "/Beach.jpeg",
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
  },
  {
    id: 2,
    name: "Whale watching",
    image: "/whale.jpeg",
    gridColumn: "2 / 3",
    gridRow: "1 / 2",
  },
  {
    id: 3,
    name: "Safari",
    image: "/safari.jpeg",
    gridColumn: "1 / 2",
    gridRow: "2 / 3",
  },
  {
    id: 4,
    name: "Snorkeling",
    image: "/Snorkeling.jpeg",
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
  },
  {
    id: 5,
    name: "Rainforest",
    image: "/Rainforest.jpeg",
    gridColumn: "3 / 4",
    gridRow: "2 / 3",
  },
];

export default function DiscoverAwaitsSection() {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "clamp(48px, 6vw, 88px) 0",
        boxSizing: "border-box",
      }}
    >
      {/* ── Sub-label ── */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "Koulen",
          fontSize: "clamp(9px, 1vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.26em",
          color: "#ba9e7a",
          textTransform: "uppercase",
          margin: "0 0 clamp(24px, 3vw, 44px)",
        }}
      >
        Explore. Experience. Enjoy.
      </p>

      {/* ── Header row: heading left, description right ── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          gap: "clamp(24px, 4vw, 64px)",
          maxWidth: "1200px",
          margin: "0 auto clamp(36px, 5vw, 64px)",
          padding: "0 clamp(16px, 3vw, 40px)",
        }}
      >
        {/* Left — heading */}
        <div style={{ flex: "1 1 320px" }}>
          <h2
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(25px, 4vw, 45px)",
              fontWeight: 800,
              fontStyle: "normal",
              color: "#1a1208",
              margin: "0 0 20px",
              lineHeight: 1.18,
            }}
          >
            Discover What Awaits Just
            <br />
            Steps Away
          </h2>

          {/* Gold decorative line */}
          <div
            style={{
              width: "52px",
              height: "4px",
              background: "#ba9e7a",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* Right — description */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              fontFamily: "Libre Franklin",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "#7a6d5e",
              lineHeight: 1.75,
              margin: 0,
              maxWidth: "420px",
              textAlign: "right",
            }}
          >
            Mirissa, Sri Lanka offers golden beaches, breathtaking sunsets,
            whale watching adventures, and vibrant coastal charm perfect
            for relaxation and exploration.
          </p>
        </div>
      </div>

      {/* ── Activity image grid ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 40px)",
        }}
      >
        <div
          className="discover-awaits-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "16px",
          }}
        >
          {/* Row 1: Beach (left half) + Whale watching (right half) */}
          {activities.slice(0, 2).map((item) => (
            <div
              key={item.id}
              style={{
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                aspectRatio: "21 / 8",
                border: "1px solid #B39977",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark gradient overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(60,60,60,0.54) 18%, rgba(255,255,255,0) 59%)",
                  pointerEvents: "none",
                }}
              />
              {/* Label */}
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "24px",
                  fontFamily: "DM Serif Display",
                  fontSize: "clamp(18px, 2vw, 26px)",
                  fontWeight: 700,
                  color: "#fff",
                  textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                  letterSpacing: "0.02em",
                }}
              >
                {item.name}
              </span>
            </div>
          ))}

          {/* Row 2: Safari, Snorkeling, Rainforest (3 equal columns) */}
          <div
            className="discover-awaits-bottom-row"
            style={{
              gridColumn: "1 / -1",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
            }}
          >
            {activities.slice(2).map((item) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  aspectRatio: "16 / 8",
                  border: "1px solid #B39977",
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Dark gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(60,60,60,0.54) 18%, rgba(255,255,255,0) 59%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Label */}
                <span
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(16px, 1.8vw, 24px)",
                    fontWeight: 700,
                    color: "#fff",
                    textShadow: "0 2px 8px rgba(0,0,0,0.35)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style jsx>{`
        @media (max-width: 640px) {
          .discover-awaits-grid {
            grid-template-columns: 1fr !important;
          }
          .discover-awaits-bottom-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
