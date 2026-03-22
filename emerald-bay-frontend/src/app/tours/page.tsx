"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TOUR_TIMES = [
  "SUNRISE - 6:00 AM",
  "MORNING - 8:30 AM",
  "AFTERNOON - 2:30 PM",
  "SUNSET - 4:30 PM",
];

export default function ToursPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="mt-15 flex flex-1 flex-col" style={{ backgroundColor: "#eeeeee" }}>
        <section style={{ padding: "28px clamp(16px, 4vw, 52px) 34px" }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 320px)",
              gap: "clamp(18px, 2.6vw, 34px)",
              alignItems: "start",
            }}
          >
            <div>
              <h1
                style={{
                  margin: "0 0 20px",
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(30px, 3.2vw, 46px)",
                  lineHeight: 1.1,
                  color: "#000000",
                }}
              >
                Mirissa Kayak Safari Tour
              </h1>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #d9d9d9",
                  backgroundColor: "#fff",
                }}
              >
                <img
                  src="/safariimg.jpg"
                  alt="Mirissa Kayak Safari"
                  style={{ width: "100%", display: "block", aspectRatio: "16 / 9", objectFit: "cover" }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "10px",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={index}
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "999px",
                        backgroundColor: index === 1 ? "#ffffff" : "rgba(255,255,255,0.65)",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h2
                  style={{
                    margin: "0 0 10px",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(24px, 2vw, 32px)",
                    color: "#111",
                  }}
                >
                  About
                </h2>
                <p
                  style={{
                    margin: 0,
                    color: "#2d2d2d",
                    lineHeight: 1.9,
                    fontSize: "15px",
                    maxWidth: "860px",
                  }}
                >
                  Take a glimpse into the comfort, elegance, and experiences our hotel has to offer.
                  <br />
                  From beautifully designed rooms to stunning views and relaxing spaces, our gallery captures the moments that make every stay 
                  special.
                  <br />
                  Explore and imagine your perfect getaway with us.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div
                style={{
                  background: "linear-gradient(180deg, #dee0ea 0%, #e7e4dc 34%, #f0eee9 100%)",
                  border: "1px solid #cfcfce",
                  borderRadius: "16px",
                  width: "100%",
                  maxWidth: "285px",
                  padding: "14px 15px 16px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.14)",
                  minHeight: "330px",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(22px, 1.5vw, 28px)",
                    lineHeight: 1.05,
                    color: "#121212",
                    letterSpacing: "0.01em",
                  }}
                >
                  Tour Information
                </h3>
                <hr style={{ border: 0, borderTop: "1px solid #bcbcbc", margin: "0 0 13px" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "13px" }}>
                  {TOUR_TIMES.map((time) => (
                    <li
                      key={time}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        color: "#393939",
                        fontSize: "14px",
                        fontWeight: 600,
                        letterSpacing: "0.01em",
                        textTransform: "uppercase",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          border: "1.6px solid #383838",
                          display: "inline-block",
                          boxSizing: "border-box",
                          backgroundColor: "transparent",
                          flexShrink: 0,
                        }}
                      />
                      {time}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: "285px",
                  backgroundColor: "#f3f2f0",
                  border: "1px solid #cfcfcf",
                  borderRadius: "14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.14)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#d8d2c4",
                    padding: "10px 18px",
                    textAlign: "left",
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "22px",
                    lineHeight: 1.05,
                    color: "#121212",
                  }}
                >
                  Book Your Tour
                </div>

                <div style={{ padding: "14px 18px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                    <span style={{ color: "#121212", fontSize: "15px", fontWeight: 700, lineHeight: 1 }}>Book Direct</span>
                    <span style={{ color: "#2738a8", fontSize: "33px", fontWeight: 800, lineHeight: 1 }}>
                      399 <span style={{ fontSize: "11px", color: "#6e6e6e", fontWeight: 600 }}>USD</span>
                    </span>
                  </div>

                  <p style={{ margin: "0 0 6px", color: "#6b6b6b", fontSize: "12px", textAlign: "center", fontWeight: 600 }}>
                    Contact us for more details
                  </p>
                  <p style={{ margin: "0 0 12px", color: "#2f3fb6", fontWeight: 700, fontSize: "13px", textAlign: "center" }}>
                    +94 77 212 0231
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <button
                      style={{
                        flex: 1,
                        border: "2px solid #b9a98b",
                        borderRadius: "5px",
                        height: "34px",
                        backgroundColor: "#d9ccb4",
                        color: "#2d2d2d",
                        fontWeight: 700,
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#2d2d2d" strokeWidth="2" />
                        <path d="M4 7L12 13L20 7" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Email this Booking
                    </button>

                    <button
                      aria-label="Open calendar"
                      style={{
                        width: "42px",
                        height: "34px",
                        borderRadius: "5px",
                        border: "1px solid #1f1f1f",
                        backgroundColor: "#f5f5f4",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="17" rx="2" stroke="#1f1f1f" strokeWidth="2" />
                        <path d="M8 2V6M16 2V6M3 9H21" stroke="#1f1f1f" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <hr style={{ border: 0, borderTop: "1px solid #d0d0d0", margin: "0 0 16px" }} />

                  <p
                    style={{
                      margin: 0,
                      textAlign: "center",
                      color: "#1f8f39",
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "35px",
                      lineHeight: 1.2,
                      fontWeight: 700,
                    }}
                  >
                    Enjoy Your Free Time with Us!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 980px) {
          main section > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}