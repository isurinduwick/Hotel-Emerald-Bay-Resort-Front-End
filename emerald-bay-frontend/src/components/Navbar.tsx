export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-between fixed top-0 left-0 z-50"
      style={{
        height: "60px",
        paddingTop: "16px",
        paddingRight: "88px",
        paddingBottom: "11px",
        paddingLeft: "100px",
        backgroundColor: "#EDE6D9",
      }}
    >
      {/* Left — Navigation Links */}
      <div
        className="flex items-center gap-10"
        style={{ width: "363px", height: "20px" }}
      >
        {["Home", "About us", "Contact us"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-sm font-medium tracking-wide transition-opacity hover:opacity-60"
            style={{ color: "rgba(30, 30, 30, 0.85)" }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Center — Logo */}
      <div
        className="flex items-center justify-center"
        style={{
          width: "252px",
          height: "61px",
          gap: "3px",
          paddingRight: "19px",
          paddingBottom: "2px",
        }}
      >
        {/* Logo Image */}
        <img
          src="/dd1ad1fffc0272ff00b890bd6208b12e2aa7c2df.png"
          alt="Emerald Bay Logo"
          style={{ width: "70px", height: "86px", objectFit: "contain", position: "relative", top: "-10px", right: "30px" }}
        />

        {/* Brand text */}
        <div className="flex flex-col items-center justify-center leading-none" style={{ position: "relative", right: "32px" }}>
          <span
            style={{
              fontFamily: "var(--font-cinzel), 'Trajan Pro', serif",
              fontSize: "18px",
              fontWeight: "700",
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
              fontSize: "11px",
              fontWeight: "400",
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

      {/* Right — Book Now Button */}
      <button
        className="flex items-center justify-center gap-2 font-semibold text-white uppercase tracking-widest transition-opacity hover:opacity-85 cursor-pointer"
        style={{
          width: "170px",
          height: "30px",
          backgroundColor: "#B39977",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "0px",
          fontSize: "10px",
          letterSpacing: "0.12em",
          border: "none",
        }}
      >
        {/* Booking / door icon */}
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="1" y="1" width="16" height="21" rx="1.5" stroke="white" strokeWidth="1.5" />
          <rect x="4" y="1" width="10" height="2.5" rx="1" fill="white" />
          <circle cx="13" cy="12" r="1.2" fill="white" />
          <line x1="4" y1="7" x2="14" y2="7" stroke="white" strokeWidth="1.2" />
          <line x1="4" y1="10.5" x2="10" y2="10.5" stroke="white" strokeWidth="1.2" />
        </svg>
        Book Now
      </button>
    </nav>
  );
}
