"use client";

import Link from "next/link";

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "ROOMS & SUITES", href: "/rooms-and-suites" },
  { label: "SERVICES",       href: "#services" },
  { label: "TOURS",          href: "/tours" },
  { label: "PACKAGES",       href: "#packages" },
  { label: "GALLERY",        href: "/gallery" },
];

const IMAGE_FRAMES = [
  { src: "/istimg.jpg", order: 1 },
  { src: "/2ndimg.jpg", order: 2 },
  { src: "/3rdimg.jpg", order: 3 },
];

export default function HeroSection() {
  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", flexShrink: 0 }}>
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes heroLineReveal {
          from {
            clip-path: inset(0 100% 0 0);
            opacity: 0;
          }
          to {
            clip-path: inset(0 0% 0 0);
            opacity: 1;
          }
        }
        @keyframes heroGoldLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 60px;
            opacity: 1;
          }
        }
        @keyframes heroSlowZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.08);
          }
        }
        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        @keyframes heroGoldShimmer {
          0%, 100% {
            background-position: 0% 50%;
            opacity: 0.7;
          }
          50% {
            background-position: 100% 50%;
            opacity: 1;
          }
        }
        @keyframes heroSubtitleGlow {
          0%, 100% {
            opacity: 0.7;
            letter-spacing: 0.25em;
          }
          50% {
            opacity: 1;
            letter-spacing: 0.3em;
          }
        }
        .hero-bg-image {
          animation: heroSlowZoom 18s ease-in-out infinite alternate;
          will-change: transform;
        }
        .hero-headline-logo {
          opacity: 0;
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards,
                     heroFloat 5s ease-in-out 2s infinite;
        }
        .hero-headline-line1 {
          opacity: 0;
          animation: heroLineReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.8s forwards;
        }
        .hero-headline-line2 {
          opacity: 0;
          animation: heroLineReveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) 1.15s forwards;
        }
        .hero-gold-divider {
          opacity: 0;
          animation: heroGoldLine 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1.5s forwards,
                     heroGoldShimmer 3s ease-in-out 2.5s infinite;
        }
        .hero-subtitle {
          opacity: 0;
          animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1.8s forwards,
                     heroSubtitleGlow 4s ease-in-out 3s infinite;
        }
        .hero-nav-bar {
          position: absolute;
          width: clamp(320px, 42vw, 620px);
          height: 46px;
          left: 50.5%;
          transform: translateX(-50%);
          top: 12px;
          background: rgba(237, 230, 217, 0.34);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .hero-nav-link {
          color: #fff;
          font-family: 'Cinzel', 'Trajan Pro', serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          white-space: nowrap;
          padding: 0 10px;
          opacity: 0.95;
          transition: opacity 0.2s;
        }
        .hero-nav-link:hover { opacity: 0.65; }
        .hero-image-frame {
          box-sizing: border-box;
          flex: 1 1 0;
          max-width: 240px;
          aspect-ratio: 288 / 260;
          background-size: cover;
          background-position: center;
          border: 6px solid #EDE6D9;
        }
        @media (max-width: 768px) {
          .hero-nav-bar {
            width: calc(100% - 32px) !important;
            height: 40px;
            top: 8px;
            border-radius: 10px;
            overflow-x: auto;
            overflow-y: hidden;
            justify-content: flex-start;
            padding: 0 8px;
            scrollbar-width: none;
          }
          .hero-nav-bar::-webkit-scrollbar { display: none; }
          .hero-nav-link {
            font-size: 10px !important;
            padding: 0 8px !important;
          }
          .hero-headline {
            bottom: 80px !important;
            left: 20px !important;
          }
          .hero-headline img {
            width: 140px !important;
          }
          .hero-headline h1 {
            font-size: 24px !important;
            line-height: 1.4 !important;
          }
          .hero-image-frame {
            max-width: none !important;
            border-width: 3px !important;
          }
          .hero-frames-row {
            margin-top: -40px !important;
            gap: 4px !important;
            padding: 0 12px !important;
          }
        }
        @media (max-width: 480px) {
          .hero-nav-link { font-size: 9px !important; padding: 0 6px !important; }
          .hero-headline h1 { font-size: 20px !important; }
          .hero-headline img { width: 120px !important; }
          .hero-headline { bottom: 60px !important; left: 16px !important; }
          .hero-frames-row { margin-top: -30px !important; }
          .hero-image-frame { border-width: 2px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-nav-bar { width: clamp(320px, 60vw, 580px) !important; }
          .hero-nav-link { font-size: 11px !important; padding: 0 8px !important; }
        }
      `}</style>

      {/* Image frame */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(320px, 50vw, 626px)",
          overflow: "hidden",
          backgroundColor: "#2b1200",
        }}
      >
        {/* Ken Burns sliding background */}
        <div
          className="hero-bg-image"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/edited.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.50) 35%, rgba(0,0,0,0.05) 70%)",
          }}
        />

        {/* Nav bar */}
        <div className="hero-nav-bar">
          {NAV_ITEMS.map(({ label, href }, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <Link
                href={href}
                className="hero-nav-link"
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.65")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.95")}
              >
                {label}
              </Link>
              {i < NAV_ITEMS.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "7px", lineHeight: 1, userSelect: "none" }}>●</span>
              )}
            </div>
          ))}
        </div>

        {/* Hero headline */}
        <div className="hero-headline" style={{ position: "absolute", bottom: "170px", left: "48px", zIndex: 5 }}>
          <img
            className="hero-headline-logo"
            src="/logo.png"
            alt="Emerald Bay Resort"
            style={{ display: "block", width: "clamp(160px, 40vw, 210px)", marginBottom: "15px" }}
          />
          <h1
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(26px, 3.4vw, 50px)",
              fontWeight: 600,
              fontStyle: "italic",
              color: "#ffffff",
              lineHeight: 1.5,
              margin: 0,
              textShadow: "0 2px 16px rgba(0,0,0,0.4)",
              letterSpacing: "0.02em",
            }}
          >
            <span className="hero-headline-line1" style={{ display: "inline-block" }}>
              Spend Your Dream
            </span>
            <br />
            <span className="hero-headline-line2" style={{ display: "inline-block" }}>
              Holiday with us
            </span>
          </h1>
          <div
            className="hero-gold-divider"
            style={{
              height: "2px",
              background: "linear-gradient(90deg, #d4a853, #f5e6b8, #d4a853, transparent)",
              backgroundSize: "200% 100%",
              marginTop: "14px",
              borderRadius: "1px",
            }}
          />
          <p
            className="hero-subtitle"
            style={{
              fontFamily: "'Cinzel', 'Trajan Pro', serif",
              fontSize: "clamp(10px, 1.1vw, 14px)",
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginTop: "10px",
            }}
          >
            Luxury &middot; Comfort &middot; Serenity
          </p>
        </div>
      </div>

      {/* Three image frames */}
      <div
        className="hero-frames-row"
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "clamp(4px, 0.8vw, 12px)",
          padding: "0 clamp(8px, 2vw, 40px)",
          marginTop: "calc(-1 * clamp(50px, 7vw, 80px))",
          zIndex: 1,
          boxSizing: "border-box",
        }}
      >
        {IMAGE_FRAMES.map(({ src, order }) => (
          <div
            key={order}
            className="hero-image-frame"
            style={{
              backgroundImage: `url(${src})`,
              backgroundColor: order === 1 ? "#c8b89a" : order === 2 ? "#a89278" : "#8a7a68",
            }}
          />
        ))}
      </div>
    </section>
  );
}
