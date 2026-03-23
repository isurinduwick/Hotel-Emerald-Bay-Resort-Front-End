"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LaundryPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show popup after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes popupBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupBackdropOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes popupSlideIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.85) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateX(0deg);
          }
        }
        @keyframes popupSlideOut {
          from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotateX(0deg);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.85) rotateX(10deg);
          }
        }
        @keyframes shimmerGold {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse24Badge {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(212, 168, 83, 0.6), 0 0 40px rgba(212, 168, 83, 0.3);
          }
          50% {
            transform: scale(1.08);
            box-shadow: 0 0 35px rgba(212, 168, 83, 0.8), 0 0 60px rgba(212, 168, 83, 0.4);
          }
        }
        @keyframes rotateStarburst {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes borderLuxuryGlow {
          0%, 100% {
            border-color: rgba(212, 168, 83, 0.6);
            box-shadow:
              0 30px 90px rgba(0, 0, 0, 0.7),
              0 0 60px rgba(212, 168, 83, 0.2),
              inset 0 0 40px rgba(212, 168, 83, 0.08);
          }
          50% {
            border-color: rgba(212, 168, 83, 1);
            box-shadow:
              0 30px 90px rgba(0, 0, 0, 0.7),
              0 0 80px rgba(212, 168, 83, 0.35),
              inset 0 0 60px rgba(212, 168, 83, 0.15);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .laundry-popup-backdrop {
          animation: popupBackdropIn 0.5s ease-out forwards;
        }
        .laundry-popup-backdrop.closing {
          animation: popupBackdropOut 0.4s ease-out forwards;
        }
        .laundry-popup-container {
          animation: popupSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .laundry-popup-container.closing {
          animation: popupSlideOut 0.4s ease-out forwards;
        }
        .laundry-shimmer-gold {
          background: linear-gradient(
            110deg,
            #d4a853 0%,
            #f5e6b8 35%,
            #fff 50%,
            #f5e6b8 65%,
            #d4a853 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGold 2.5s linear infinite;
        }
        .laundry-badge-24 {
          animation: pulse24Badge 2.5s ease-in-out infinite;
        }
        .laundry-starburst {
          animation: rotateStarburst 30s linear infinite;
        }
        .laundry-border-luxury {
          animation: borderLuxuryGlow 3s ease-in-out infinite;
        }
        .laundry-close-btn {
          transition: all 0.3s ease;
        }
        .laundry-close-btn:hover {
          transform: rotate(90deg) scale(1.15);
          background: rgba(212, 168, 83, 0.2);
          border-color: rgba(212, 168, 83, 0.6);
        }
        .laundry-feature-card {
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .laundry-feature-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; }
        .laundry-feature-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; }
        .laundry-feature-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; }
        .laundry-feature-card:hover {
          transform: translateY(-3px);
          background: rgba(212, 168, 83, 0.15);
          border-color: rgba(212, 168, 83, 0.4);
        }
        @media (max-width: 640px) {
          .laundry-popup-container {
            width: calc(100% - 24px) !important;
            max-width: 340px !important;
            padding: 20px 16px !important;
          }
          .laundry-popup-title {
            font-size: 20px !important;
          }
          .laundry-badge-24 {
            width: 75px !important;
            height: 75px !important;
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`laundry-popup-backdrop ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.82)",
          backdropFilter: "blur(10px)",
          zIndex: 9999,
          cursor: "pointer",
        }}
      />

      {/* Popup Container */}
      <div
        className={`laundry-popup-container laundry-border-luxury ${isClosing ? "closing" : ""}`}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "420px",
          backgroundColor: "#0d0d0d",
          borderRadius: "16px",
          padding: "28px 20px",
          zIndex: 10000,
          border: "2px solid rgba(212, 168, 83, 0.6)",
          overflow: "hidden",
        }}
      >
        {/* Decorative Starburst Background */}
        <div
          className="laundry-starburst"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(212, 168, 83, 0.03) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="laundry-close-btn"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1.5px solid rgba(255, 255, 255, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            zIndex: 10,
          }}
          aria-label="Close popup"
        >
          ×
        </button>

        {/* Content */}
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* 24H Badge */}
          <div
            className="laundry-badge-24"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "95px",
              height: "95px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d4a853 0%, #f4d98a 30%, #d4a853 70%, #b8860b 100%)",
              marginBottom: "18px",
              border: "3px solid rgba(26, 26, 26, 0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "32px",
                fontWeight: 800,
                color: "#0d0d0d",
                lineHeight: 1,
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              24
            </span>
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "10px",
                fontWeight: 700,
                color: "#0d0d0d",
                letterSpacing: "0.15em",
                marginTop: "3px",
              }}
            >
              HOURS
            </span>
          </div>

          {/* Title */}
          <h2
            className="laundry-popup-title laundry-shimmer-gold"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize: "28px",
              fontWeight: 700,
              margin: "0 0 10px 0",
              letterSpacing: "0.01em",
              lineHeight: 1.2,
            }}
          >
            Premium Laundry Service
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "11px",
              color: "rgba(255, 255, 255, 0.55)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              margin: "0 0 20px 0",
            }}
          >
            Available Round The Clock
          </p>

          {/* Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "160px",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "18px",
              border: "2px solid rgba(212, 168, 83, 0.25)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Image
              src="/Laundry.jpg"
              alt="Premium Laundry Service"
              fill
              style={{
                objectFit: "cover",
              }}
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(13, 13, 13, 0.7) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Features */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            {[
              { icon: "⚡", label: "Express Service" },
              { icon: "✨", label: "Premium Care" },
              { icon: "🛎️", label: "Room Pickup" },
            ].map((feature, index) => (
              <div
                key={index}
                className="laundry-feature-card"
                style={{
                  padding: "14px 8px",
                  backgroundColor: "rgba(212, 168, 83, 0.08)",
                  borderRadius: "10px",
                  border: "1px solid rgba(212, 168, 83, 0.2)",
                }}
              >
                <div style={{ fontSize: "26px", marginBottom: "6px" }}>{feature.icon}</div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "9px",
                    color: "rgba(255, 255, 255, 0.75)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    lineHeight: 1.3,
                  }}
                >
                  {feature.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "10px",
              color: "rgba(255, 255, 255, 0.35)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginTop: "18px",
              marginBottom: 0,
            }}
          >
            Emerald Bay Resort · Luxury Redefined
          </p>
        </div>
      </div>
    </>
  );
}
