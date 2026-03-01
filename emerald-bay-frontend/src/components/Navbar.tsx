"use client";

import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about-us" },
  { label: "Contact us", href: "#contact-us" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  /* Close menu on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  /* Subtle shadow on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .hamburger-line {
          display: block;
          width: 22px;
          height: 2px;
          background: #1e1e1e;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s;
        }
        .hamburger-open .hamburger-line:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger-open .hamburger-line:nth-child(2) {
          opacity: 0;
        }
        .hamburger-open .hamburger-line:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
        .mobile-menu {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s ease;
        }
        .mobile-menu.open {
          max-height: 400px;
          opacity: 1;
        }
        .menu-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 40;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .menu-backdrop.visible {
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .book-now-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .logo-text span:first-child { font-size: 14px !important; }
          .logo-text span:last-child { font-size: 9px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .desktop-nav-links { gap: 20px !important; }
          .desktop-nav-links a { font-size: 13px !important; }
          .book-now-desktop { width: 140px !important; font-size: 9px !important; }
        }
      `}</style>

      {/* Backdrop overlay */}
      <div
        className={`menu-backdrop ${menuOpen ? "visible" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        ref={menuRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          backgroundColor: "#EDE6D9",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
            padding: "0 clamp(16px, 4vw, 100px)",
            boxSizing: "border-box",
          }}
        >
          {/* Left — Desktop links */}
          <div
            className="desktop-nav-links"
            style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 40px)" }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  color: "rgba(30,30,30,0.85)",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Center — Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <img
              src="/dd1ad1fffc0272ff00b890bd6208b12e2aa7c2df.png"
              alt="Emerald Bay Logo"
              style={{
                width: "clamp(50px, 5vw, 70px)",
                height: "clamp(62px, 6vw, 86px)",
                objectFit: "contain",
                position: "relative",
                top: "-6px",
                marginRight: "-6px",
              }}
            />
            <div className="logo-text" style={{ display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-cinzel), 'Trajan Pro', serif",
                  fontSize: "clamp(14px, 1.3vw, 18px)",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Emerald Bay
              </span>
              <span
                style={{
                  fontFamily: "var(--font-cinzel), 'Trajan Pro', serif",
                  fontSize: "clamp(9px, 0.8vw, 11px)",
                  fontWeight: 400,
                  color: "#8a8a8a",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  marginTop: "2px",
                }}
              >
                Resort
              </span>
            </div>
          </div>

          {/* Right — Book Now (desktop) + Hamburger (mobile) */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              className="book-now-desktop"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontWeight: 600,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                width: "170px",
                height: "30px",
                backgroundColor: "#B39977",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "0px",
                fontSize: "10px",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="18" height="19" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="16" height="21" rx="1.5" stroke="white" strokeWidth="1.5" />
                <rect x="4" y="1" width="10" height="2.5" rx="1" fill="white" />
                <circle cx="13" cy="12" r="1.2" fill="white" />
                <line x1="4" y1="7" x2="14" y2="7" stroke="white" strokeWidth="1.2" />
                <line x1="4" y1="10.5" x2="10" y2="10.5" stroke="white" strokeWidth="1.2" />
              </svg>
              Book Now
            </button>

            <button
              className={`hamburger-btn ${menuOpen ? "hamburger-open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{
                display: "none",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "40px",
                height: "40px",
                background: "transparent",
                border: "1.5px solid rgba(30,30,30,0.2)",
                borderRadius: "8px",
                cursor: "pointer",
                padding: 0,
                transition: "border-color 0.2s",
              }}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
          style={{ backgroundColor: "#EDE6D9", borderTop: "1px solid rgba(179,153,119,0.25)" }}
        >
          <div style={{ padding: "16px clamp(16px, 4vw, 32px) 24px" }}>
            {NAV_LINKS.map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  color: "rgba(30,30,30,0.9)",
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  borderBottom: i < NAV_LINKS.length - 1 ? "1px solid rgba(179,153,119,0.2)" : "none",
                }}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                marginTop: "18px",
                padding: "12px 0",
                fontWeight: 600,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                backgroundColor: "#B39977",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "0px",
                fontSize: "12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="19" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="16" height="21" rx="1.5" stroke="white" strokeWidth="1.5" />
                <rect x="4" y="1" width="10" height="2.5" rx="1" fill="white" />
                <circle cx="13" cy="12" r="1.2" fill="white" />
                <line x1="4" y1="7" x2="14" y2="7" stroke="white" strokeWidth="1.2" />
                <line x1="4" y1="10.5" x2="10" y2="10.5" stroke="white" strokeWidth="1.2" />
              </svg>
              Book Now
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
