"use client";

import Image from "next/image";

const activities = [
  { id: 1, name: "Beach", image: "/Beach.jpeg" },
  { id: 2, name: "Whale watching", image: "/whale.jpeg" },
  { id: 3, name: "Safari", image: "/safari.jpeg" },
  { id: 4, name: "Snorkeling", image: "/Snorkeling.jpeg" },
  { id: 5, name: "Rainforest", image: "/Rainforest.jpeg" },
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
      <style>{`
        .awaits-header-row {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: clamp(24px, 4vw, 64px);
          max-width: 1200px;
          margin: 0 auto clamp(36px, 5vw, 64px);
          padding: 0 clamp(16px, 3vw, 40px);
        }
        .awaits-header-left { flex: 1 1 320px; }
        .awaits-header-right {
          flex: 1 1 300px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .awaits-grid-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .awaits-grid-bottom {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 16px;
        }
        .awaits-activity-card {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #B39977;
        }
        .awaits-top-card { aspect-ratio: 21 / 8; }
        .awaits-bottom-card { aspect-ratio: 16 / 8; }
        @media (max-width: 768px) {
          .awaits-header-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .awaits-header-right {
            justify-content: flex-start !important;
          }
          .awaits-header-right p {
            text-align: left !important;
          }
          .awaits-grid-top {
            grid-template-columns: 1fr !important;
          }
          .awaits-grid-bottom {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .awaits-grid-bottom {
            grid-template-columns: 1fr !important;

          }
          .awaits-header-row {
            margin: 0 auto -420px !important;
            gap: 0px !important;
          }
          .awaits-header-right p {
            margin-top: -660px !important;
          }
          .awaits-grid-top {
            gap: 10px !important;
          }
          .awaits-grid-bottom {
            gap: 10px !important;
          }
          .awaits-top-card { aspect-ratio: 16 / 8 !important; }
          .awaits-bottom-card { aspect-ratio: 16 / 8 !important; }
        }
      `}</style>

      {/* Sub-label */}
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

      {/* Header row */}
      <div className="awaits-header-row">
        <div className="awaits-header-left">
          <h2
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(22px, 4vw, 45px)",
              fontWeight: 800,
              color: "#1a1208",
              margin: "0 0 20px",
              lineHeight: 1.18,
            }}
          >
            Discover What Awaits Just
            <br />
            Steps Away
          </h2>
          <div style={{ width: "52px", height: "4px", background: "#ba9e7a", borderRadius: "2px" }} />
        </div>

        <div className="awaits-header-right">
          <p
            style={{
              fontFamily: "Libre Franklin",
              fontSize: "clamp(12px, 1.1vw, 15px)",
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

      {/* Activity grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px, 3vw, 40px)" }}>
        <div className="awaits-grid-top">
          {/* Row 1: 2 cards */}
          {activities.slice(0, 2).map((item) => (
            <div key={item.id} className="awaits-activity-card awaits-top-card">
              <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 50vw" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(60,60,60,0.54) 18%, rgba(255,255,255,0) 59%)", pointerEvents: "none" }} />
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "24px",
                  fontFamily: "DM Serif Display",
                  fontSize: "clamp(16px, 2vw, 26px)",
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

          {/* Row 2: 3 cards */}
          <div className="awaits-grid-bottom">
            {activities.slice(2).map((item) => (
              <div key={item.id} className="awaits-activity-card awaits-bottom-card">
                <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 33vw" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(60,60,60,0.54) 18%, rgba(255,255,255,0) 59%)", pointerEvents: "none" }} />
                <span
                  style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(14px, 1.8vw, 24px)",
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
    </section>
  );
}
