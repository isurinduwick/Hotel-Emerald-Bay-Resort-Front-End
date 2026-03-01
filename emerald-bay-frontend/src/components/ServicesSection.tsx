"use client";

const FACILITIES = [
  {
    label: "Air Condition",
    comingSoon: false,
    icon: (
      <img src="/AirCondition.png" alt="Air Condition" width={48} height={48} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Speed WiFi",
    comingSoon: false,
    icon: (
      <img src="/SpeedWiFi.png" alt="Speed WiFi" width={48} height={48} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Breakfast",
    comingSoon: false,
    icon: (
      <img src="/Breakfast.png" alt="Breakfast" width={48} height={48} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Rooftop Pool",
    comingSoon: false,
    icon: (
      <img src="/RooftopPool.png" alt="Rooftop Pool" width={48} height={48} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Gym",
    comingSoon: true,
    icon: (
      <img src="/Gym.png" alt="Gym" width={48} height={48} style={{ objectFit: "contain" }} />
    ),
  },
];

const SERVICES = [
  {
    label: "Hotel Room Security",
    description:
      "Enhanced security for your comfort and peace of mind.",
    icon: (
      <img src="/hotelroomsecurity.png" alt="Hotel Room Security" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Full Room Amenities",
    description:
      "Each room offers complete amenities designed for comfort and convenience.",
    icon: (
      <img src="/fullroom.png" alt="Full Room Amenities" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Comfortable Rooms",
    description:
      "A peaceful and comfortable space to unwind and rest.",
    icon: (
      <img src="/comfortablerooms.png" alt="Comfortable Rooms" width={36} height={36} style={{ objectFit: "contain" }} />
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
          backgroundImage: "url(/serviceimg.jpeg)",
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
                  border: "1px solid #B39977",
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
                      background: "rgba(0,0,0,0.47)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "3px",
                      color: "rgba(255,255,255,0.45)",
                      fontSize: "7px",
                      fontFamily: "'Libre Franklin', sans-serif",
                      letterSpacing: "0.05em",
                      padding: "1px 4px",
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
