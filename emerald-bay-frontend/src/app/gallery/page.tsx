"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GALLERY_IMAGES = [
  "/2ndimg.jpg",
  "/discoverimg4.jpg",
  "/discoverimg3.jpg",
  "/discoverimg1.jpg",
  "/hotel1.png",
  "/hotel2.png",
  "/discoverimg2.png",
  "/roomimg2.jpg",
];

export default function GalleryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans overflow-x-hidden">
      <Navbar />

      <main className="mt-15 flex flex-1 flex-col" style={{ backgroundColor: "#efefef" }}>
        <section
          style={{
            width: "100%",
            padding: "clamp(30px, 4vw, 48px) clamp(12px, 2.8vw, 30px) clamp(26px, 3.5vw, 38px)",
            boxSizing: "border-box",
          }}
        >
          <style>{`
            .gallery-shell {
              max-width: 1320px;
              margin: 0 auto;
            }
            .gallery-title {
              margin: 0;
              font-family: 'DM Serif Display', serif;
              font-size: clamp(15px, 3.4vw, 50px);
              line-height: 1.08;
              color: #000000;
              letter-spacing: 0.005em;
            }
            .gallery-title-line {
              width: clamp(46px, 5vw, 76px);
              height: 5px;
              border-radius: 8px;
              background: #b79a72;
              margin-top: 8px;
              margin-bottom: clamp(18px, 2.6vw, 30px);
            }
            .gallery-main-row {
              display: grid;
              grid-template-columns: minmax(0, 1fr) minmax(260px, 336px);
              gap: clamp(16px, 2.4vw, 34px);
              align-items: center;
            }
            .gallery-main-card {
              position: relative;
              border: 1px solid #cab693;
              border-radius: 14px;
              overflow: hidden;
              background: #ddd;
              box-shadow: 0 2px 8px rgba(0,0,0,0.12);
            }
            .gallery-main-photo {
              width: 100%;
              display: block;
              aspect-ratio: 16 / 8.3;
              object-fit: cover;
            }
            .gallery-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              width: clamp(28px, 2.5vw, 40px);
              height: clamp(28px, 2.5vw, 40px);
              border-radius: 999px;
              border: 3px solid #585449;
              background-color: rgba(225, 215, 197, 0.88);
              color: #222;
              font-size: clamp(18px, 2vw, 28px);
              line-height: 1;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
            .gallery-arrow.left { left: clamp(10px, 1.5vw, 18px); }
            .gallery-arrow.right { right: clamp(10px, 1.5vw, 18px); }
            .gallery-copy {
              text-align: center;
              font-size: clamp(14px, 1.2vw, 29px);
              line-height: 1.62;
              color: #151515;
              font-weight: 600;
            }
            .gallery-copy p {
              margin: 0;
            }
            .gallery-copy p + p {
              margin-top: clamp(14px, 1.8vw, 22px);
            }
            .gallery-thumb-row {
              margin-top: clamp(18px, 2.5vw, 30px);
              display: grid;
              grid-template-columns: repeat(8, minmax(74px, 1fr));
              gap: clamp(8px, 1vw, 12px);
            }
            .gallery-thumb-card {
              border: 1px solid #b9a48a;
              border-radius: 3px;
              overflow: hidden;
              background: #fff;
              box-shadow: 0 2px 6px rgba(0,0,0,0.1);
              aspect-ratio: 8 / 5;
            }
            .gallery-thumb-photo {
              width: 100%;
              height: 100%;
              display: block;
              object-fit: cover;
            }
            @media (max-width: 980px) {
              .gallery-main-row {
                grid-template-columns: 1fr;
              }
              .gallery-copy {
                max-width: 650px;
                margin: 0 auto;
              }
              .gallery-thumb-row {
                grid-template-columns: repeat(4, minmax(74px, 1fr));
              }
            }
            @media (max-width: 560px) {
              .gallery-thumb-row {
                grid-template-columns: repeat(2, minmax(74px, 1fr));
              }
            }
          `}</style>

          <div className="gallery-shell">
            <h1 className="gallery-title">Discover the Beauty of Your Perfect Stay</h1>
            <div className="gallery-title-line" />

            <div className="gallery-main-row">
              <div className="gallery-main-card">
                <img src="/istimg.jpg" alt="Discover our hotel gallery" className="gallery-main-photo" />

                <button className="gallery-arrow left" aria-label="Previous image">
                  ‹
                </button>
                <button className="gallery-arrow right" aria-label="Next image">
                  ›
                </button>
              </div>

              <div className="gallery-copy">
                <p>Take a glimpse into the comfort, elegance, and experiences our hotel has to offer.</p>
                <p>From beautifully designed rooms to stunning views and relaxing spaces, our gallery captures the moments that make every stay special.</p>
                <p>Explore and imagine your perfect getaway with us.</p>
              </div>
            </div>

            <div className="gallery-thumb-row">
              {GALLERY_IMAGES.map((src) => (
                <div key={src} className="gallery-thumb-card">
                  <img src={src} alt="Hotel gallery preview" className="gallery-thumb-photo" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
