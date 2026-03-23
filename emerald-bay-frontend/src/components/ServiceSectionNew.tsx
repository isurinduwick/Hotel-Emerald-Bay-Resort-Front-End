"use client";

import { useRef, useState } from "react";

type ServiceItem = {
  name: string;
  imageSrc: string;
};

type ServiceData = {
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
  tagline?: string;
  sectionTitle?: string;
  items?: ServiceItem[];
};

const SERVICES: ServiceData[] = [
  {
    imageSrc: "/2ndimg.jpg",
    title: "BAR",
    subtitle: "Sip & Savor",
    description:
      "Step into our stylish hotel bar, where great drinks meet a warm and relaxing atmosphere.",
    sectionTitle: "OUR SIGNATURE DRINKS",
    items: [
      { name: "Black Bacardi", imageSrc: "/2ndimg.jpg" },
      { name: "Sunset Mojito", imageSrc: "/2ndimg.jpg" },
      { name: "Gold Rush Spritz", imageSrc: "/2ndimg.jpg" },
    ],
  },
  {
    imageSrc: "/ROOFTOPPOOL2.jpeg",
    title: "ROOFTOP POOL",
    subtitle: "Skyview Pool",
    description:
      "Soak in panoramic views from our breathtaking rooftop pool — a serene escape suspended high above the city, designed for relaxation and tranquility in equal measure.",
    tagline: "We look forward to welcoming you.",
  },
  {
    imageSrc: "/RESTAURANT2.png",
    title: "RESTAURANT",
    subtitle: "Gourmet Experience",
    description:
      "Savor exceptional cuisine crafted by our chefs using the finest seasonal and local ingredients, where every dish tells a story of passion, culture, and culinary artistry.",
    tagline: "We look forward to welcoming you.",
  },
  {
    imageSrc: "/CELEBRATIONS2.jpeg",
    title: "CELEBRATIONS",
    subtitle: "Joyful Moments",
    description:
      "Let us make your special moments truly unforgettable. From intimate gatherings to grand occasions, our dedicated team crafts bespoke experiences tailored to every dream.",
    tagline: "We look forward to welcoming you.",
  },
  {
    imageSrc: "/Laundry.jpg",
    title: "LAUNDRY",
    subtitle: "Fresh & Clean",
    description:
      "Experience premium laundry and dry-cleaning care handled with precision, using eco-friendly products to ensure your garments are returned fresh, pressed, and immaculate.",
    tagline: "We look forward to welcoming you.",
  },
];

export default function ServiceSectionNew() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<ServiceData | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.firstElementChild
        ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 24
        : 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white pt-6 sm:pt-8 pb-12 sm:pb-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#A89172] mb-3 sm:mb-4 uppercase">
            Luxury, Comfort &amp; Tailor Made Services
          </p>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            style={{ fontFamily: "DM Serif Display" }}
          >
            Our Services that Make Every Stay
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Special
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 sm:w-20 h-1 bg-[#C4A572] rounded-2xl"></div>
          </div>
        </div>

        {/* Service Cards Slider */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-5 z-10 bg-white shadow-md rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center hover:bg-[#C4A572] hover:text-white transition-colors text-gray-700 text-lg"
          >
            &#8592;
          </button>

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.title}
                {...service}
                onClick={() => setActiveService(service)}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-5 z-10 bg-white shadow-md rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center hover:bg-[#C4A572] hover:text-white transition-colors text-gray-700 text-lg"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Service Popup Modal */}
      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </section>
  );
}

/* ─────────────────────────── Service Card ─────────────────────────── */

function ServiceCard({
  imageSrc,
  title,
  subtitle,
  onClick,
}: ServiceData & { onClick: () => void }) {
  return (
    <div
      className="relative group cursor-pointer flex-none w-[80%] sm:w-[44%] lg:w-[22%] snap-center"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-full aspect-3/3 sm:aspect-3/4 max-h-65 sm:max-h-none">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 text-center text-white">
          <div className="bg-black/50 py-3 sm:py-4 md:py-5 px-3 sm:px-4">
            <h3
              className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 tracking-wider"
              style={{ fontFamily: "Koulen" }}
            >
              {title}
            </h3>
            <p
              className="text-xs sm:text-sm md:text-base font-bold"
              style={{ fontFamily: "Libre Franklin" }}
            >
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Service Modal ─────────────────────────── */

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceData;
  onClose: () => void;
}) {
  return (
    /* Backdrop
       Mobile  → bottom-sheet (items-end, no side padding)
       Tablet+ → centered dialog (items-center, padding)
    */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/*
        Modal panel
        Mobile  → full width, stacked (col), rounded top corners, max 92vh, slides up
        Tablet  → side-by-side (row), max-w-2xl, fully rounded
        Desktop → side-by-side (row), max-w-4xl, fully rounded
      */}
      <div
        className="
          relative flex flex-col sm:flex-row
          w-full sm:max-w-2xl lg:max-w-4xl
          sm:h-[460px] lg:h-[500px]
          rounded-t-3xl sm:rounded-2xl
          overflow-hidden shadow-2xl animate-fadeInUp
        "
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Image block
            Mobile  → full-width strip at top, h-56
            Tablet+ → left half, min-height fills panel
        ── */}
        <div className="relative w-full sm:w-5/12 lg:w-1/2 flex-shrink-0 h-56 sm:h-full">
          <img
            src={service.imageSrc}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle bottom fade on mobile so image bleeds into dark panel */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:hidden"
            style={{ background: "linear-gradient(to bottom, transparent, #0f0d0b)" }}
          />

          {/* Mobile drag handle pill sitting on the image */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/40 sm:hidden" />

          {/* Close button — top-right of image, visible on all sizes */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="
              absolute top-3 right-3
              w-8 h-8 flex items-center justify-center
              rounded-full bg-black/40 text-white text-sm
              hover:bg-[#C4A572] transition-colors
            "
          >
            ✕
          </button>
        </div>

        {/* ── Dark content panel ── */}
        <div
          className="relative flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: "#0f0d0b" }}
        >
          {/* Blurred bg texture */}
          <div
            className="absolute inset-0 opacity-[0.15] pointer-events-none"
            style={{
              backgroundImage: `url(${service.imageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(12px)",
              transform: "scale(1.15)",
            }}
          />

          {/* Content */}
          <div className="relative flex-1 flex flex-col px-5 sm:px-7 lg:px-8 pt-5 sm:pt-8 pb-7 sm:pb-8">

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center tracking-widest mb-3"
              style={{ fontFamily: "Koulen" }}
            >
              {service.title}
            </h2>

            {/* Gold divider */}
            <div className="w-full h-px bg-[#C4A572] mb-4" />

            {/* Description */}
            <p
              className="text-white/75 text-xs sm:text-sm lg:text-base text-center leading-relaxed mb-4"
              style={{ fontFamily: "Libre Franklin" }}
            >
              {service.description}
            </p>

            {/* Subtle separator */}
            <div className="w-full h-px bg-white/15 mb-4 sm:mb-5" />

            {/* ── BAR: section label + items list ── */}
            {service.sectionTitle && service.items && (
              <>
                <p
                  className="text-[#C4A572] text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase mb-3 sm:mb-4"
                  style={{ fontFamily: "Libre Franklin" }}
                >
                  {service.sectionTitle}
                </p>
                <ul className="flex flex-col gap-2.5 sm:gap-3">
                  {service.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex items-center gap-3 sm:gap-4 bg-white/5 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 border border-white/8"
                    >
                      <div className="w-12 h-10 sm:w-14 sm:h-12 lg:w-16 lg:h-14 flex-shrink-0 rounded-md overflow-hidden">
                        <img
                          src={item.imageSrc}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="text-white text-xs sm:text-sm lg:text-base font-semibold"
                        style={{ fontFamily: "Libre Franklin" }}
                      >
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ── Other cards: welcoming tagline centred in remaining space ── */}
            {service.tagline && (
              <div className="flex-1 flex items-center justify-center">
                <p
                  className="text-white/90 text-lg sm:text-xl lg:text-2xl text-center leading-snug"
                  style={{ fontFamily: "DM Serif Display", fontStyle: "italic" }}
                >
                  {service.tagline}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
