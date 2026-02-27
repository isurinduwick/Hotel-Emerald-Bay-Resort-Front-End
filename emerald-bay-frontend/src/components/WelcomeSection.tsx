"use client";

export default function WelcomeSection() {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "clamp(24px, 3vw, 48px) clamp(24px, 6vw, 96px) clamp(48px, 6vw, 88px)",
        boxSizing: "border-box",
      }}
    >
      {/* Label */}
      <p
        style={{
          textAlign: "center",
          fontFamily: "'Cinzel', 'Trajan Pro', serif",
          fontSize: "clamp(10px, 1.1vw, 13px)",
          fontWeight: "600",
          letterSpacing: "0.22em",
          color: "#ba9e7a",
          textTransform: "uppercase",
          marginBottom: "clamp(32px, 4vw, 52px)",
          margin: "0 0 clamp(32px, 4vw, 52px)",
        }}
      >
        Emerald Bay Resort Mirissa
      </p>

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "clamp(28px, 5vw, 72px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Left — image */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: "480px",
          }}
        >
          <img
            src="/welcomeimg.jpg"
            alt="Hotel staff welcoming guests at Emerald Bay Resort"
            style={{
              width: "100%",
              height: "clamp(280px, 35vw, 440px)",
              objectFit: "cover",
              display: "block",
              borderRadius: "4px",
              border: "10px solid #EDE6D9",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Right — text */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: "600px",
          }}
        >
          <h2
            style={{
              fontFamily: "DM Serif Display",
              fontSize: "clamp(26px, 3.2vw, 44px)",
              fontWeight: "700",
              color: "#1a1a1a",
              lineHeight: "1.25",
              margin: "0 0 clamp(18px, 2.5vw, 28px)",
            }}
          >
            Welcome To Our Hotel Emerald Bay Resort
          </h2>
          <p
            style={{
              fontFamily: "Libre Franklin",
              fontSize: "clamp(14px, 1.15vw, 16px)",
              fontWeight: "400",
              color: "rgba(0, 0, 0, 0.61)",
              lineHeight: "1.85",
              margin: 0,
            }}
          >
            Nestled along the golden shores of Mirissa, Emerald Bay Resort
            Mirissa offers a refined beachfront escape where comfort meets
            tropical elegance. Surrounded by swaying palms and the soothing
            sound of the ocean, our resort features beautifully designed rooms,
            a serene outdoor pool, and exceptional dining experiences. Just
            minutes from Mirissa Beach and Secret Beach, Emerald Bay Resort
            invites you to relax, indulge, and experience the charm of Sri
            Lanka&apos;s southern coast in style.
          </p>
        </div>
      </div>
    </section>
  );
}
