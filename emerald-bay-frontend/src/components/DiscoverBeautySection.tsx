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
      {/* ── Heading ── */}
      <div style={{ textAlign: "center", padding: "0 24px", marginBottom: "clamp(32px, 4vw, 56px)" }}>
        <h2
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(28px, 4vw, 48px)",
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

        {/* Decorative line */}
        <div
          style={{
            width: "48px",
            height: "3px",
            background: "#ba9e7a",
            borderRadius: "2px",
            margin: "0 auto 20px",
          }}
        />

        <p
          style={{
            fontFamily: "Libre Franklin",
            fontSize: "clamp(13px, 1.1vw, 15px)",
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

      {/* ── Image Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "16px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(16px, 3vw, 40px)",
          aspectRatio: "16 / 9",
        }}
      >
        {/* Top-left: Pool panorama (spans 2 columns) */}
        <div
          style={{
            gridColumn: "1 / 3",
            gridRow: "1 / 2",
            position: "relative",
            borderRadius: "0",
            overflow: "hidden",
            border: "4px solid #EDE6D9",
          }}
        >
          <Image
            src="/discoverimg1.jpg"
            alt="Rooftop pool overlooking the bay"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        {/* Right: Couple on couch (spans 2 rows) */}
        <div
          style={{
            gridColumn: "3 / 4",
            gridRow: "1 / 3",
            position: "relative",
            borderRadius: "0",
            overflow: "hidden",
            border: "4px solid #EDE6D9",
          }}
        >
          <Image
            src="/discoverimg4.jpg"
            alt="Guests relaxing in the lobby"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 35vw"
          />

          {/* Navigation circle arrow */}
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
              background: "rgba(0, 0, 0, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              fontSize: "18px",
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

          {/* DISCOVER MORE button */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              left: "24px",
            }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 30px",
                backgroundColor: "rgba(0, 0, 0, 0.36)",
                backdropFilter: "blur(4px)",
                color: "#FFFFFF",
                fontFamily: "'Libre Franklin', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "2.5px",
                textDecoration: "none",
                textTransform: "uppercase",
                border: "5px solid #B39977",
                borderRadius: "0",
                transition: "background 0.2s",
              }}
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

        {/* Bottom-left: Couple in pool */}
        <div
          style={{
            gridColumn: "1 / 2",
            gridRow: "2 / 3",
            position: "relative",
            borderRadius: "0",
            overflow: "hidden",
            border: "4px solid #EDE6D9",
          }}
        >
          <Image
            src="/discoverimg2.png"
            alt="Guests enjoying drinks in the pool"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>

        {/* Bottom-center: Restaurant interior */}
        <div
          style={{
            gridColumn: "2 / 3",
            gridRow: "2 / 3",
            position: "relative",
            borderRadius: "0",
            overflow: "hidden",
            border: "4px solid #EDE6D9",
          }}
        >
          <Image
            src="/discoverimg3.jpg"
            alt="Hotel restaurant and lounge"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 30vw"
          />
        </div>
      </div>

      {/* ── Responsive overrides ── */}
      <style jsx>{`
        @media (max-width: 768px) {
          section > div:last-of-type {
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: auto auto auto !important;
            aspect-ratio: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
