export default function ServicesSection() {
  return (
    <section className="w-full">
      {/* TOP DARK FACILITIES SECTION */}
      <div className="relative bg-[url('/service.png')] bg-cover bg-center py-16 md:py-24 pb-36 md:pb-48">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center text-white">
          {/* Facilities Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-16">
            <Facility iconSrc="/air-condition.png" title="Air Condition" />
            <Facility iconSrc="/wifi.png" title="Speed WiFi" />
            <Facility iconSrc="/breakfast.png" title="Breakfast" />
            <Facility iconSrc="/pool.png" title="Rooftop Pool" />
            <Facility iconSrc="/gym.png" title="Gym" />
          </div>
          <p className="text-xs sm:text-sm tracking-widest text-[#C4A572] mb-3">
            OUR HOTEL FACILITIES
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold">
            Our Comfortable Services
          </h2>
        </div>
      </div>

      {/* BOTTOM SERVICE CARDS */}
      <div className="bg-white pt-8 sm:pt-12 md:pt-16 pb-3 -mt-28 md:-mt-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-16 md:mb-30">
            <ServiceCard
              iconSrc="/security.png"
              title="HOTEL ROOM SECURITY"
              description="Enhanced security for your comfort and peace of mind."
            />
            <ServiceCard
              iconSrc="/amenities.png"
              title="FULL ROOM AMENITIES"
              description="Each room offers complete amenities designed for comfort and convenience."
            />
            <ServiceCard
              iconSrc="/bed.png"
              title="COMFORTABLE ROOMS"
              description="A peaceful and comfortable space to unwind and rest."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Facility({ iconSrc, title }: { iconSrc: string; title: string }) {
  return (
    <div className="border border-white/40 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center hover:bg-white/10 transition min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
      <div className="mb-3 md:mb-4">
        <img src={iconSrc} alt={title} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain" />
      </div>
      <p className="text-xs sm:text-sm font-medium text-center">{title}</p>
    </div>
  );
}

function ServiceCard({ iconSrc, title, description }: { iconSrc: string; title: string; description: string }) {
  return (
    <div className="bg-[#F5EFE6] p-4 sm:p-5 md:p-7 border border-[#CBB89D] text-center relative shadow-sm">
      <div className="border border-[#CBB89D] p-4 sm:p-5 md:p-7">
        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-[#B79A72] rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white">
          <img src={iconSrc} alt={title} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain" />
        </div>
        <h3 className="font-bold text-[10px] sm:text-xs tracking-[0.15em] mb-3 md:mb-4 text-gray-900 uppercase">
          {title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed px-1 sm:px-2">
          {description}
        </p>
      </div>
    </div>
  );
}
