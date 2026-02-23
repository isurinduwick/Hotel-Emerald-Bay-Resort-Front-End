export default function Navbar() {
  return (
    <nav
      className="w-full flex items-center justify-between"
      style={{
        height: "88px",
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
        {/* Lotus SVG */}
        <svg
          width="48"
          height="54"
          viewBox="0 0 48 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem */}
          <line x1="24" y1="54" x2="24" y2="34" stroke="#B39977" strokeWidth="1.2" />
          {/* Leaves on stem */}
          <path d="M24 44 Q18 40 15 34 Q20 37 24 44Z" fill="#B39977" />
          <path d="M24 44 Q30 40 33 34 Q28 37 24 44Z" fill="#B39977" />
          {/* Outer petals */}
          <path d="M24 34 Q14 28 12 16 Q20 24 24 34Z" fill="#B39977" />
          <path d="M24 34 Q34 28 36 16 Q28 24 24 34Z" fill="#B39977" />
          <path d="M24 34 Q8 22 8 8 Q18 18 24 34Z" fill="#C4A882" opacity="0.8" />
          <path d="M24 34 Q40 22 40 8 Q30 18 24 34Z" fill="#C4A882" opacity="0.8" />
          {/* Inner petals */}
          <path d="M24 30 Q18 20 20 10 Q23 20 24 30Z" fill="#B39977" />
          <path d="M24 30 Q30 20 28 10 Q25 20 24 30Z" fill="#B39977" />
          {/* Center petal */}
          <path d="M24 28 Q21 16 24 8 Q27 16 24 28Z" fill="#9A7D5A" />
          {/* Top flourish */}
          <path d="M24 8 Q20 4 18 0 Q22 4 24 8Z" fill="#B39977" />
          <path d="M24 8 Q28 4 30 0 Q26 4 24 8Z" fill="#B39977" />
        </svg>

        {/* Brand text */}
        <div className="flex flex-col justify-center leading-tight ml-1">
          <span
            className="font-semibold tracking-widest uppercase"
            style={{ fontSize: "13px", color: "#6B5230", letterSpacing: "0.18em" }}
          >
            Emerald Bay
          </span>
          <span
            className="tracking-widest uppercase"
            style={{ fontSize: "8px", color: "#9A7D5A", letterSpacing: "0.3em" }}
          >
            Resort
          </span>
        </div>
      </div>

      {/* Right — Book Now Button */}
      <button
        className="flex items-center justify-center gap-2 font-semibold text-white uppercase tracking-widest transition-opacity hover:opacity-85 cursor-pointer"
        style={{
          width: "228px",
          height: "45px",
          backgroundColor: "#B39977",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "0px",
          fontSize: "13px",
          letterSpacing: "0.12em",
          border: "none",
        }}
      >
        {/* Booking / door icon */}
        <svg
          width="18"
          height="23"
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
