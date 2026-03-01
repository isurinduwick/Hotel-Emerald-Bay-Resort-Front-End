"use client";

const NAV_ITEMS = ["ROOMS & SUITES", "SERVICES", "TOURS", "PACKAGES", "GALLERY"];

const IMAGE_FRAMES = [
  { src: "/istimg.jpg", order: 1 },
  { src: "/2ndimg.jpg", order: 2 },
  { src: "/3rdimg.jpg", order: 3 },
];

export default function HeroSection() {
  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", flexShrink: 0 }}>
      <style>{`
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
          backgroundImage: "url(/edited.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#2b1200",
        }}
      >
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
          {NAV_ITEMS.map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center" }}>
              <a
                href={`#${item.toLowerCase().replace(/[\s&]+/g, "-")}`}
                className="hero-nav-link"
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.65")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.95")}
              >
                {item}
              </a>
              {i < NAV_ITEMS.length - 1 && (
                <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "7px", lineHeight: 1, userSelect: "none" }}>●</span>
              )}
            </div>
          ))}
        </div>

        {/* Hero headline */}
        <div className="hero-headline" style={{ position: "absolute", bottom: "170px", left: "48px", zIndex: 5 }}>
          <img
            src="/logo.png"
            alt="Emerald Bay Resort"
            style={{ display: "block", width: "clamp(160px, 40vw, 210px)", marginBottom: "15px" }}
          />
          <h1
            style={{
              fontFamily: "Georgia, 'Georgia'",
              fontSize: "clamp(24px, 3.1vw, 45px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#ffffff",
              lineHeight: 1.6,
              margin: 0,
              textShadow: "0 2px 12px rgba(0,0,0,0.45)",
            }}
          >
            Spend Your Dream
            <br />
            Holiday with us
          </h1>
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
