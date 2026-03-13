export default function ServiceSectionNew() {
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

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <ServiceCard imageSrc="/2ndimg.jpg" title="BAR" subtitle="Sip & Savor" />
          <ServiceCard imageSrc="/pool2.png" title="ROOFTOP POOL" subtitle="Skyview Pool" />
          <ServiceCard imageSrc="/restaurant.png" title="RESTAURANT" subtitle="Gourmet Experience" />
          <ServiceCard imageSrc="/celebrations.png" title="CELEBRATIONS" subtitle="Joyful Moments" />
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
    <div className="relative group cursor-pointer max-w-xs sm:max-w-none mx-15 w-full">
      <div className="relative overflow-hidden rounded-t-full aspect-3/3 sm:aspect-3/4 max-h-65 sm:max-h-none ">
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
