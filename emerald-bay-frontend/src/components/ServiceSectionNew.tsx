export default function ServiceSectionNew() {
  return (
    <section className="w-full bg-white pt-8 pb-18">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#A89172] mb-4 uppercase">
            Luxury, Comfort & Tailor Made Services
          </p>
          
          <h2 className="text-4xl md:text-5xl font-DM Serif Display font-bold text-gray-900 mb-6">
            Our Services that Make Every Stay<br />Special
          </h2>
          
          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-1 bg-[#C4A572] rounded-2xl"></div>
          
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <ServiceCard 
            imageSrc="/2ndimg.jpg"
            title="BAR"
            subtitle="Sip & Savor"
          />

          <ServiceCard 
            imageSrc="/pool2.png"
            title="ROOFTOP POOL"
            subtitle="Skyview Pool"
          />

          <ServiceCard 
            imageSrc="/restaurant.png"
            title="RESTAURANT"
            subtitle="Gourmet Experience"
          />

          <ServiceCard 
            imageSrc="/celebrations.png"
            title="CELEBRATIONS"
            subtitle="Joyful Moments"
          />

        </div>
      </div>
    </section>
  );
}


/* ===== SERVICE CARD WITH CIRCULAR ARCH DESIGN ===== */
function ServiceCard({ 
  imageSrc, 
  title, 
  subtitle 
}: { 
  imageSrc: string; 
  title: string; 
  subtitle: string;
}) {
  return (
    <div className="relative group cursor-pointer">
      {/* Circular arch container */}
      <div className="relative overflow-hidden rounded-t-full aspect-[3/4]">
        {/* Background Image */}
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Text overlay at bottom with black transparent bar */}
        <div className="absolute bottom-0 left-0 right-0 text-center text-white">
          <div className="bg-black/50 py-5 px-4">
            <h3 className="text-xl md:text-2xl font- Koulen font-bold mb-2 tracking-wider">
              {title}
            </h3>
            <p className="text-sm md:text-base font- Libre Franklin font-bold">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
