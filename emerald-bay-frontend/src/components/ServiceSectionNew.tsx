"use client";

import { useRef } from "react";

export default function ServiceSectionNew() {
  const sliderRef = useRef<HTMLDivElement>(null);

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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: "DM Serif Display" }}>
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
            <ServiceCard imageSrc="/2ndimg.jpg" title="BAR" subtitle="Sip & Savor" />
            <ServiceCard imageSrc="/pool2.png" title="ROOFTOP POOL" subtitle="Skyview Pool" />
            <ServiceCard imageSrc="/restaurant.png" title="RESTAURANT" subtitle="Gourmet Experience" />
            <ServiceCard imageSrc="/celebrations.png" title="CELEBRATIONS" subtitle="Joyful Moments" />
            <ServiceCard imageSrc="/laundry.png" title="LAUNDRY" subtitle="Fresh & Clean" />
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
    </section>
  );
}

function ServiceCard({
  imageSrc,
  title,
  subtitle,
}: {
  imageSrc: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative group cursor-pointer flex-none w-[80%] sm:w-[44%] lg:w-[22%] snap-center">
      <div className="relative overflow-hidden rounded-t-full aspect-3/3 sm:aspect-3/4 max-h-65 sm:max-h-none">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 text-center text-white">
          <div className="bg-black/50 py-3 sm:py-4 md:py-5 px-3 sm:px-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 tracking-wider" style={{ fontFamily: "Koulen" }}>
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base font-bold" style={{ fontFamily: "Libre Franklin" }}>
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
