"use client";

import Image from "next/image";

export default function DiscoverBeautySection() {
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
        .discover-beauty-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 40px);
          aspect-ratio: 16 / 9;
        }
        .discover-beauty-grid .cell-1 { grid-column: 1 / 3; grid-row: 1 / 2; }
        .discover-beauty-grid .cell-2 { grid-column: 3 / 4; grid-row: 1 / 3; }
        .discover-beauty-grid .cell-3 { grid-column: 1 / 2; grid-row: 2 / 3; }
        .discover-beauty-grid .cell-4 { grid-column: 2 / 3; grid-row: 2 / 3; }
        .discover-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 10px 20px;
          background-color: rgba(0, 0, 0, 0.36);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-family: 'Libre Franklin', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-decoration: none;
          text-transform: uppercase;
          border: 4px solid #B39977;
          border-radius: 0;
          transition: background 0.2s;
        }
        @media (max-width: 768px) {
          .discover-beauty-grid {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto auto !important;
            aspect-ratio: unset !important;
            gap: 10px !important;
          }
          .discover-beauty-grid .cell-1 { grid-column: 1 / -1 !important; grid-row: 1 / 2 !important; min-height: 180px; }
          .discover-beauty-grid .cell-2 { grid-column: 1 / -1 !important; grid-row: 2 / 3 !important; min-height: 220px; }
          .discover-beauty-grid .cell-3 { grid-column: 1 / 2 !important; grid-row: 3 / 4 !important; min-height: 160px; }
          .discover-beauty-grid .cell-4 { grid-column: 2 / 3 !important; grid-row: 3 / 4 !important; min-height: 160px; }
          .discover-more-btn {
            padding: 8px 14px !important;
            font-size: 9px !important;
            letter-spacing: 1.5px !important;
            border-width: 3px !important;
          }
        }
        @media (max-width: 480px) {
          .discover-beauty-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto auto !important;
            gap: 8px !important;
          }
          .discover-beauty-grid .cell-1 { grid-column: 1 !important; grid-row: 1 !important; min-height: 160px; }
          .discover-beauty-grid .cell-2 { grid-column: 1 !important; grid-row: 2 !important; min-height: 200px; }
          .discover-beauty-grid .cell-3 { grid-column: 1 !important; grid-row: 3 !important; min-height: 160px; }
          .discover-beauty-grid .cell-4 { grid-column: 1 !important; grid-row: 4 !important; min-height: 160px; }
        }
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "clamp(32px, 4vw, 56px)" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 800,
            color: "#1a1208",
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          Discover the Beauty of Your
          <br />
          Perfect Stay
        </h2>
        <div style={{ width: "48px", height: "3px", background: "#ba9e7a", borderRadius: "2px", margin: "0 auto 20px" }} />
        <p
          style={{
            fontFamily: "Libre Franklin",
            fontSize: "clamp(12px, 1.1vw, 15px)",
            color: "#7a6d5e",
            maxWidth: "440px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Every image reflects our commitment to elegance, comfort,
          <br />
          and unforgettable hospitality.
        </p>
      </div>

      {/* Image Grid */}
      <div className="discover-beauty-grid">
        {/* Top-left: Pool (spans 2 cols) */}
        <div className="cell-1" style={{ position: "relative", overflow: "hidden", border: "4px solid #EDE6D9" }}>
          <Image src="/discoverimg1.jpg" alt="Rooftop pool overlooking the bay" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 60vw" />
        </div>

        {/* Right: Couple (spans 2 rows) */}
        <div className="cell-2" style={{ position: "relative", overflow: "hidden", border: "4px solid #EDE6D9" }}>
          <Image src="/discoverimg4.jpg" alt="Guests relaxing in the lobby" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 35vw" />

          {/* Arrow button */}
          <button
            aria-label="Next image"
            style={{
              position: "absolute",
              top: "50%",
              right: "16px",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.8)",
              background: "rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s",
              backdropFilter: "blur(2px)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.25)")}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 3L11 8L6 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Discover More */}
          <div style={{ position: "absolute", bottom: "clamp(12px, 2vw, 24px)", left: "clamp(12px, 2vw, 24px)" }}>
            <a
              href="#"
              className="discover-more-btn"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.36)")}
            >
              Discover More
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom-left */}
        <div className="cell-3" style={{ position: "relative", overflow: "hidden", border: "4px solid #EDE6D9" }}>
          <Image src="/discoverimg2.png" alt="Guests enjoying drinks in the pool" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 30vw" />
        </div>

        {/* Bottom-center */}
        <div className="cell-4" style={{ position: "relative", overflow: "hidden", border: "4px solid #EDE6D9" }}>
          <Image src="/discoverimg3.jpg" alt="Hotel restaurant and lounge" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 30vw" />
        </div>
      </div>
    </section>
  );
}
