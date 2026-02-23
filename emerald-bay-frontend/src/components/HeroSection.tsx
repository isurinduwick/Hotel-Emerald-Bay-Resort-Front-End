"use client";

const NAV_ITEMS = ["ROOMS & SUITES", "SERVICES", "TOURS", "PACKAGES", "GALLERY"];

const IMAGE_FRAMES = [
  { src: "/img1.jpg", rightPct: "57.8%", order: 1 },
  { src: "/img2.jpg", rightPct: "42.2%", order: 2 },
  { src: "/img3.jpg", rightPct: "26.6%", order: 3 },
];

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* ── Image Frame: full width × 626px ── */}
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "clamp(320px, 50vw, 626px)",
          backgroundImage: "url(/edited.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#2b1200", // fallback while image loads
        }}
      >
        {/* Gradient overlay for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.50) 35%, rgba(0,0,0,0.05) 70%)",
          }}
        />

        {/* ── Rectangle 3 — rooms-to-gallery nav bar ── */}
        <div
          style={{
            position: "absolute",
            width: "clamp(320px, 42vw, 620px)",
            height: "46px",
            left: "50.5%",
            transform: "translateX(-50%)",
            top: "12px",
            background: "rgba(237, 230, 217, 0.34)",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            zIndex: 10,
          }}
        >
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item}
              style={{ display: "flex", alignItems: "center" }}
            >
              <a
                href={`#${item.toLowerCase().replace(/[\s&]+/g, "-")}`}
                style={{
                  color: "#fff",
                  fontFamily: "'Cinzel', 'Trajan Pro', serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  padding: "0 22px",
                  opacity: 0.95,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.65")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.95")
                }
              >
                {item}
              </a>
              {i < NAV_ITEMS.length - 1 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "7px",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  ●
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ── Hero headline ── */}
        <div
          style={{
            position: "absolute",
            bottom: "170px",
            left: "48px",
            zIndex: 5,
          }}
        >
          <h1
            style={{
              fontFamily: "helvetica, 'Arial Rounded MT Bold'",
              fontSize: "clamp(35px, 3.1vw, 45px)",
              fontWeight: "700",
              fontStyle: "italic",
              color: "#ffffff",
              lineHeight: "1.6",
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

      {/* ── Three image frames (Rectangle 5 style) ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "clamp(8px, 1.5vw, 24px)",
          padding: "0 clamp(16px, 4vw, 80px)",
          marginTop: "calc(-1 * clamp(80px, 12vw, 130px))",
          zIndex: 1,
          boxSizing: "border-box",
        }}
      >
        {IMAGE_FRAMES.map(({ src, order }) => (
          <div
            key={order}
            style={{
              boxSizing: "border-box",
              flex: "1 1 0",
              maxWidth: "320px",
              aspectRatio: "288 / 260",
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: order === 1 ? "#c8b89a" : order === 2 ? "#a89278" : "#8a7a68",
              border: "6px solid #EDE6D9",
            }}
          />
        ))}
      </div>
    </section>
  );
}
