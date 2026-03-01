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
    description: "Enhanced security for your comfort and peace of mind.",
    icon: (
      <img src="/hotelroomsecurity.png" alt="Hotel Room Security" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Full Room Amenities",
    description: "Each room offers complete amenities designed for comfort and convenience.",
    icon: (
      <img src="/fullroom.png" alt="Full Room Amenities" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
  {
    label: "Comfortable Rooms",
    description: "A peaceful and comfortable space to unwind and rest.",
    icon: (
      <img src="/comfortablerooms.png" alt="Comfortable Rooms" width={36} height={36} style={{ objectFit: "contain" }} />
    ),
  },
];

export default function ServicesSection() {
  return (
    <section style={{ width: "100%", overflow: "hidden" }}>
      <style>{`
        .facilities-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(8px, 1.5vw, 16px);
          margin-bottom: clamp(40px, 5vw, 64px);
          width: 100%;
          max-width: 900px;
        }
        .facility-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: clamp(120px, 14vw, 160px);
          padding: 22px 12px 18px;
          background: rgba(255,255,255,0.08);
          border: 1px solid #B39977;
          backdrop-filter: blur(6px);
          border-radius: 4px;
          box-sizing: border-box;
        }
        .services-cards-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(16px, 2.5vw, 32px);
          max-width: 1100px;
          margin: 0 auto;
          transform: translateY(-145px);
        }
        .service-card {
          flex: 1 1 260px;
          max-width: 320px;
        }
        @media (max-width: 768px) {
          .facility-card {
            width: calc(50% - 10px) !important;
            padding: 16px 8px 14px !important;
          }
          .services-cards-row {
            flex-direction: column !important;
            align-items: center !important;
            transform: translateY(-80px) !important;
            gap: 16px !important;
          }
          .service-card {
            max-width: 100% !important;
            width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .facility-card {
            width: calc(50% - 8px) !important;
            padding: 12px 6px 10px !important;
          }
          .facility-card img { width: 36px !important; height: 36px !important; }
          .services-cards-row {
            transform: translateY(-50px) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .facility-card {
            width: clamp(110px, 16vw, 150px) !important;
          }
          .services-cards-row {
            transform: translateY(-100px) !important;
          }
        }
      `}</style>

      {/* Dark floral background block */}
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
        <div style={{ position: "absolute", inset: 0, background: "rgba(10, 7, 2, 0.72)" }} />

        {/* White triangle */}
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
            padding: "clamp(56px, 6vw, 90px) clamp(16px, 5vw, 80px) clamp(48px, 6vw, 80px)",
          }}
        >
          {/* Facilities */}
          <div className="facilities-row">
            {FACILITIES.map((f) => (
              <div key={f.label} className="facility-card">
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
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}
                >
                  {f.label}
                </span>
              </div>
            ))}
          </div>

          {/* Label */}
          <p
            style={{
              fontFamily: "'Cinzel', 'Trajan Pro', serif",
              fontSize: "clamp(9px, 1vw, 12px)",
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "#ba9e7a",
              textTransform: "uppercase",
              margin: "0 0 16px",
              textAlign: "center",
            }}
          >
            Our Hotel Facilities
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "DM Serif Display, serif",
              fontSize: "clamp(24px, 4vw, 56px)",
              fontWeight: 700,
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

      {/* Service cards */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "clamp(48px, 6vw, 80px) clamp(16px, 6vw, 100px)",
          boxSizing: "border-box",
        }}
      >
        <div className="services-cards-row">
          {SERVICES.map((s) => (
            <div
              key={s.label}
              className="service-card"
              style={{
                backgroundColor: "#EDE6D9",
                border: "1.5px solid #d9c9b0",
                borderRadius: "0px",
                padding: "clamp(24px, 3vw, 44px) clamp(16px, 2.5vw, 32px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
                boxSizing: "border-box",
                outline: "1px solid #B39977",
                outlineOffset: "-15px",
              }}
            >
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
              <h3
                style={{
                  fontFamily: "'Cinzel', 'Trajan Pro', serif",
                  fontSize: "clamp(11px, 1.1vw, 13px)",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "#2a2218",
                  textTransform: "uppercase",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {s.label}
              </h3>
              <p
                style={{
                  fontFamily: "'Libre Franklin', sans-serif",
                  fontSize: "clamp(13px, 1vw, 15px)",
                  fontWeight: 400,
                  color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.75,
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
