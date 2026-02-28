"use client";

const FACILITIES = [
  {
    label: "Air Condition",
    comingSoon: false,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="10" width="36" height="16" rx="4" stroke="white" strokeWidth="2" fill="none" />
        <line x1="6" y1="18" x2="42" y2="18" stroke="white" strokeWidth="2" />
        <line x1="14" y1="26" x2="10" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="26" x2="24" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="26" x2="38" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <circle cx="36" cy="14" r="2" fill="white" />
      </svg>
    ),
  },
  {
    label: "Speed WiFi",
    comingSoon: false,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="10" y="28" width="28" height="12" rx="3" stroke="white" strokeWidth="2" fill="none" />
        <line x1="18" y1="28" x2="18" y2="40" stroke="white" strokeWidth="1.5" />
        <line x1="30" y1="28" x2="30" y2="40" stroke="white" strokeWidth="1.5" />
        <path d="M8 20 Q24 8 40 20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M13 25 Q24 15 35 25" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="30" r="1.5" fill="white" />
        <line x1="24" y1="10" x2="24" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Breakfast",
    comingSoon: false,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M16 14 C16 14 14 20 14 24 C14 30 18 34 24 34 C30 34 34 30 34 24 C34 20 32 14 32 14 Z" stroke="white" strokeWidth="2" fill="none" />
        <path d="M34 18 C38 18 40 20 40 24 C40 28 38 30 34 30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="10" y1="38" x2="38" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="10" x2="24" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="8" x2="20" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="8" x2="28" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Rooftop Pool",
    comingSoon: false,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="18" r="7" stroke="white" strokeWidth="2" fill="none" />
        <line x1="24" y1="11" x2="24" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="31" y1="18" x2="34" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="18" x2="14" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="10" x2="16" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="10" x2="32" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 34 Q14 30 18 34 Q22 38 26 34 Q30 30 34 34 Q38 38 42 34" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M10 40 Q14 36 18 40 Q22 44 26 40 Q30 36 34 40 Q38 44 42 40" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Gym",
    comingSoon: true,
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="20" width="6" height="8" rx="2" stroke="white" strokeWidth="2" fill="none" />
        <rect x="36" y="20" width="6" height="8" rx="2" stroke="white" strokeWidth="2" fill="none" />
        <rect x="12" y="16" width="6" height="16" rx="2" stroke="white" strokeWidth="2" fill="none" />
        <rect x="30" y="16" width="6" height="16" rx="2" stroke="white" strokeWidth="2" fill="none" />
        <line x1="18" y1="24" x2="30" y2="24" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="24" x2="6" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="42" y1="24" x2="46" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SERVICES = [
  {
    label: "Hotel Room Security",
    description:
      "Enhanced security for your comfort and peace of mind.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="6" width="28" height="24" rx="3" stroke="#c8a97e" strokeWidth="2" fill="none" />
        <rect x="10" y="6" width="16" height="8" rx="2" stroke="#c8a97e" strokeWidth="2" fill="none" />
        <circle cx="18" cy="22" r="3" stroke="#c8a97e" strokeWidth="2" fill="none" />
        <line x1="12" y1="14" x2="24" y2="14" stroke="#c8a97e" strokeWidth="1.5" />
        <line x1="8" y1="18" x2="28" y2="18" stroke="#c8a97e" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "Full Room Amenities",
    description:
      "Each room offers complete amenities designed for comfort and convenience.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M14 8 C14 8 12 12 12 18 L24 18 C24 12 22 8 22 8 Z" stroke="#c8a97e" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M24 13 C27 13 29 15 29 18" stroke="#c8a97e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <line x1="8" y1="22" x2="28" y2="22" stroke="#c8a97e" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 6 L16 8" stroke="#c8a97e" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 5 L20 8" stroke="#c8a97e" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="27" r="3" stroke="#c8a97e" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    label: "Comfortable Rooms",
    description:
      "A peaceful and comfortable space to unwind and rest.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 24 L4 18 Q4 14 8 14 L28 14 Q32 14 32 18 L32 24" stroke="#c8a97e" strokeWidth="2" fill="none" strokeLinejoin="round" />
        <path d="M2 24 L34 24" stroke="#c8a97e" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 24 L4 28" stroke="#c8a97e" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 24 L32 28" stroke="#c8a97e" strokeWidth="2" strokeLinecap="round" />
        <rect x="8" y="16" width="8" height="8" rx="2" stroke="#c8a97e" strokeWidth="1.5" fill="none" />
        <rect x="20" y="16" width="8" height="8" rx="2" stroke="#c8a97e" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section style={{ width: "100%", overflow: "hidden" }}>
      {/* ── Dark floral background block ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundImage: "url(/istimg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#1a1006",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10, 7, 2, 0.72)",
          }}
        />

        {/* White downward triangle at the very top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "38px solid transparent",
            borderRight: "38px solid transparent",
            borderTop: "68px solid #fff",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "clamp(56px, 6vw, 90px) clamp(20px, 5vw, 80px) clamp(48px, 6vw, 80px)",
          }}
        >
          {/* ── Facilities icon row ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(8px, 1.5vw, 16px)",
              marginBottom: "clamp(40px, 5vw, 64px)",
              width: "100%",
              maxWidth: "900px",
            }}
          >
            {FACILITIES.map((f) => (
              <div
                key={f.label}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "clamp(120px, 14vw, 160px)",
                  padding: "22px 12px 18px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(6px)",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                {f.comingSoon && (
                  <span
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      background: "rgba(255,255,255,0.18)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "3px",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "9px",
                      fontFamily: "'Libre Franklin', sans-serif",
                      letterSpacing: "0.05em",
                      padding: "2px 5px",
                    }}
                  >
                    Coming soon
                  </span>
                )}
                {f.icon}
                <span
                  style={{
                    color: "#fff",
                    fontFamily: "'Libre Franklin', sans-serif",
                    fontSize: "clamp(11px, 1.1vw, 13px)",
                    fontWeight: "500",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}
                >
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Section label ── */}
          <p
            style={{
              fontFamily: "'Cinzel', 'Trajan Pro', serif",
              fontSize: "clamp(9px, 1vw, 12px)",
              fontWeight: "600",
              letterSpacing: "0.22em",
              color: "#ba9e7a",
              textTransform: "uppercase",
              margin: "0 0 16px",
              textAlign: "center",
            }}
          >
            Our Hotel Facilities
          </p>

          {/* ── Section heading ── */}
          <h2
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: "700",
              color: "#fff",
              margin: 0,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            Our Comfortable Services
          </h2>
        </div>
      </div>

      {/* ── Service cards block ── */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "clamp(48px, 6vw, 80px) clamp(20px, 6vw, 100px)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "clamp(16px, 2.5vw, 32px)",
            maxWidth: "1100px",
            margin: "0 auto",
            transform: "translateY(-145px)",
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.label}
              style={{
                flex: "1 1 260px",
                maxWidth: "320px",
                backgroundColor: "#EDE6D9",
                border: "1.5px solid #d9c9b0",
                borderRadius: "0px",
                padding: "clamp(28px, 3vw, 44px) clamp(20px, 2.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
                boxSizing: "border-box",
                outline: "1px solid #B39977",
                outlineOffset: "-15px",
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#B39977",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {s.icon}
              </div>

              {/* Label */}
              <h3
                style={{
                  fontFamily: "'Cinzel', 'Trajan Pro', serif",
                  fontSize: "clamp(11px, 1.1vw, 13px)",
                  fontWeight: "700",
                  letterSpacing: "0.16em",
                  color: "#2a2218",
                  textTransform: "uppercase",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {s.label}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Libre Franklin', sans-serif",
                  fontSize: "clamp(13px, 1vw, 15px)",
                  fontWeight: "400",
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: "1.75",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
