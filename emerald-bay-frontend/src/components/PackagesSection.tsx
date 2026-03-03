"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const packages = [
  {
    id: 1,
    image: "/roomimg1.jpg",
    title: "STAY 2, PAY 1",
    description: "Enjoy an extra on us more time to relax, at no extra cost",
    cta: "LEARN MORE",
  },
  {
    id: 2,
    image: "/serviceimg.jpeg",
    title: "DINNER BUFFET",
    description: "",
    cta: "",
  },
  {
    id: 3,
    image: "/travelimg1.jpg",
    title: "10% OFF",
    description: "",
    cta: "",
  },
  {
    id: 4,
    image: "/travelimg2.jpg",
    title: "SPA RETREAT",
    description: "",
    cta: "",
  },
  {
    id: 5,
    image: "/travelimg3.jpg",
    title: "ROMANTIC ESCAPE",
    description: "",
    cta: "",
  },
];

export default function PackagesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(packages.length);
  const [progress, setProgress] = useState(0);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setProgress(0);
      setCurrentPage(0);
      setTotalPages(1);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setProgress(ratio);

    // Calculate which "page" we're on
    const cardWidth = el.scrollWidth / packages.length;
    const visibleCards = Math.round(el.clientWidth / cardWidth);
    const pages = packages.length - visibleCards + 1;
    setTotalPages(Math.max(pages, 1));
    setCurrentPage(Math.min(Math.round(ratio * (pages - 1)), pages - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollByCard = (direction: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / packages.length;
    el.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  const prev = () => scrollByCard(-1);
  const next = () => scrollByCard(1);

  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding:
          "clamp(48px, 6vw, 88px) 0 clamp(48px, 6vw, 88px)",
        boxSizing: "border-box",
      }}
    >
      {/* Section label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Cinzel', 'Trajan Pro', serif",
          fontSize: "clamp(9px, 1vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.26em",
          color: "#ba9e7a",
          textTransform: "uppercase",
          margin: "0 0 clamp(16px, 2vw, 24px)",
        }}
      >
        Exclusive Stays, Exceptional Value
      </p>

      {/* Heading */}
      <h2
        style={{
          textAlign: "center",
          fontFamily: "DM Serif Display, serif",
          fontSize: "clamp(28px, 3.4vw, 48px)",
          fontWeight: 700,
          color: "#1a1a1a",
          lineHeight: 1.15,
          margin: "0 auto clamp(10px, 1.2vw, 16px)",
          maxWidth: "700px",
        }}
      >
        Packages at Emerald Bay Resort Mirissa
      </h2>

      {/* Gold underline accent */}
      <div
        style={{
          width: 48,
          height: 3,
          backgroundColor: "#ba9e7a",
          borderRadius: 2,
          margin: "0 auto clamp(32px, 4vw, 56px)",
        }}
      />

      {/* Scrollable cards row */}
      <style>{`
        .packages-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        ref={scrollRef}
        className="packages-scroll"
        style={{
          display: "flex",
          gap: "clamp(16px, 2vw, 28px)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          paddingLeft: "140px",
          paddingRight: "clamp(50px, 6vw, 96px)",
          paddingBottom: 4,
          scrollPaddingLeft: "140px",
          WebkitOverflowScrolling: "touch",
        }}
      >

        {packages.map((pkg) => (
          <div
            key={pkg.id}
            style={{
              flex: "0 0 clamp(240px, 22vw, 310px)",
              scrollSnapAlign: "start",
              borderRadius: "24px 0 24px 0",
              overflow: "hidden",
              position: "relative",
              aspectRatio: "3 / 4",
              cursor: "pointer",
            }}
          >
            {/* Background image */}
            <img
              src={pkg.image}
              alt={pkg.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
              }}
            />

            {/* Card content */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "clamp(18px, 2vw, 28px)",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(16px, 1.6vw, 22px)",
                  fontWeight: 700,
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: 0,
                  lineHeight: 1.25,
                  textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                }}
              >
                {pkg.title}
              </h3>

              {pkg.description && (
                <p
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "clamp(11px, 1vw, 14px)",
                    color: "rgba(255,255,255,0.88)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {pkg.description}
                </p>
              )}

              {pkg.cta && (
                <button
                  style={{
                    marginTop: 6,
                    alignSelf: "flex-start",
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.6)",
                    borderRadius: 4,
                    color: "#fff",
                    fontFamily: "'Cinzel', serif",
                    fontSize: "clamp(9px, 0.8vw, 11px)",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "8px 18px",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(186,158,122,0.45)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#ba9e7a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(255,255,255,0.6)";
                  }}
                >
                  {pkg.cta}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar + navigation row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "clamp(24px, 3vw, 40px) auto 0",
          padding: "0 clamp(24px, 6vw, 96px)",
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            flex: 1,
            height: 3,
            backgroundColor: "#e8e0d6",
            borderRadius: 2,
            overflow: "hidden",
            marginRight: "clamp(24px, 3vw, 48px)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.max((1 / totalPages) * 100, 10)}%`,
              backgroundColor: "#ba9e7a",
              borderRadius: 2,
              transform: `translateX(${progress * (totalPages - 1) * 100}%)`,
              transition: "transform 0.15s ease-out",
            }}
          />
        </div>

        {/* Nav arrows + counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 1.2vw, 16px)",
          }}
        >
          <button
            onClick={prev}
            aria-label="Previous package"
            style={{
              background: "none",
              border: "none",
              color: "#ba9e7a",
              cursor: "pointer",
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1,
              padding: "4px",
              opacity: currentPage === 0 ? 0.35 : 1,
              transition: "opacity 0.2s",
            }}
          >
            ←
          </button>

          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "clamp(12px, 1vw, 14px)",
              color: "#555",
              letterSpacing: "0.04em",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {currentPage + 1}/{packages.length}
          </span>

          <button
            onClick={next}
            aria-label="Next package"
            style={{
              background: "none",
              border: "none",
              color: "#ba9e7a",
              cursor: "pointer",
              fontSize: "clamp(18px, 1.6vw, 22px)",
              lineHeight: 1,
              padding: "4px",
              opacity: currentPage >= totalPages - 1 ? 0.35 : 1,
              transition: "opacity 0.2s",
            }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
