"use client";

export default function LocationSection() {
  return (
    <section style={{ width: "100%", overflow: "hidden" }}>
      <style>{`
        .location-card {
          background-color: #fff;
          border-radius: 0;
          overflow: hidden;
          display: flex;
          flex-wrap: wrap;
          min-height: 360px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
        }
        .location-text {
          flex: 1 1 280px;
          padding: clamp(24px, 4vw, 56px) clamp(20px, 4vw, 52px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 24px;
        }
        .location-map {
          flex: 1 1 460px;
          position: relative;
          min-height: 300px;
        }
        @media (max-width: 768px) {
          .location-card {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .location-text {
            padding: 24px 20px !important;
          }
          .location-map {
            min-height: 250px !important;
            flex-basis: auto !important;
          }
        }
        @media (max-width: 480px) {
          .location-map {
            min-height: 200px !important;
          }
          .location-text {
            padding: 20px 16px !important;
            gap: 16px !important;
          }
        }
      `}</style>

      {/* Sub-label */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "clamp(48px, 6vw, 88px) 0 0",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontFamily: "Koulen",
            fontSize: "clamp(9px, 1vw, 12px)",
            fontWeight: 600,
            letterSpacing: "0.26em",
            color: "#ba9e7a",
            textTransform: "uppercase",
            margin: "0 0 clamp(16px, 2vw, 28px)",
          }}
        >
          Find Us With Ease
        </p>

        <h2
          style={{
            textAlign: "center",
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(24px, 4vw, 48px)",
            fontWeight: 800,
            color: "#1a1208",
            margin: "0 0 clamp(12px, 1.5vw, 20px)",
            lineHeight: 1.2,
            padding: "0 16px",
          }}
        >
          Discover Our Prime Location
        </h2>

        <div style={{ width: "52px", height: "4px", background: "#ba9e7a", borderRadius: "2px", margin: "0 auto clamp(36px, 4vw, 56px)" }} />
      </div>

      {/* Background image block */}
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundImage: "url(/loactionbackground.jpeg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "#1a1006",
          padding: "clamp(32px, 4vw, 56px) 0 clamp(48px, 5vw, 72px)",
          boxSizing: "border-box",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(10, 7, 2, 0.72)" }} />

        {/* Triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 0,
            height: 0,
            borderLeft: "60px solid transparent",
            borderRight: "60px solid transparent",
            borderTop: "45px solid #fff",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxHeight:"1300px", maxWidth: "1400px", margin: "15px auto", padding: "0 clamp(16px, 3vw, 40px)" }}>
            <div className="location-card">
              {/* Text */}
              <div className="location-text">
                <h3
                  style={{
                    fontFamily: "DM Serif Display",
                    fontSize: "clamp(20px, 3vw, 36px)",
                    fontWeight: 700,
                    color: "#000000",
                    margin: 0,
                    lineHeight: 1.25,
                    textAlign: "center",
                  }}
                >
                  Location &amp; Maps
                </h3>
                <div style={{ width: "48px", height: "3px", background: "#B39977", borderRadius: "2px" }} />

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(179, 153, 119, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#B39977" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontFamily: "'Libre Franklin', sans-serif",
                      fontSize: "clamp(13px, 1.2vw, 16px)",
                      color: "#000000",
                      fontWeight: 600,
                    }}
                  >
                    Harbor Road, Mirissa 81740
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Libre Franklin', sans-serif",
                    fontSize: "clamp(12px, 1.1vw, 15px)",
                    color: "#000000",
                    lineHeight: 1.8,
                    margin: 0,
                    maxWidth: "420px",
                    textAlign: "center",
                  }}
                >
                  Emerald Bay Resort Mirissa sits in the heart of vibrant Mirissa, Sri Lanka, perfectly
                  positioned just a short stroll from the golden sands of Weligambay and Secret
                  Beaches. Guests enjoy a prime coastal location that blends peaceful seaside charm
                  with easy access to Mirissa&apos;s top attractions, dining, and ocean adventures —
                  including whale watching and scenic beach sunsets — all within walking distance.
                </p>
              </div>

              {/* Map */}
              <div className="location-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1373!2d80.4492906!3d5.9470709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1154fadb9ce13%3A0x20d2e9d0c5af9992!2sEmerald%20Bay%20Resort!5e0!3m2!1sen!2slk!4v1709000000000!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Emerald Bay Resort Location on Google Maps"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(26, 29, 46, 0.85)",
                    backdropFilter: "blur(4px)",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#B39977" />
                  </svg>
                  <span style={{ fontFamily: "'Libre Franklin', sans-serif", fontSize: "11px", fontWeight: 600, color: "#fff", letterSpacing: "0.5px" }}>
                    Emerald Bay Resort
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
