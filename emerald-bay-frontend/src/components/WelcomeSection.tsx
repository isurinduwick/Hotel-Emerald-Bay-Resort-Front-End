
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="w-full bg-[#F8F5F0] py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Image */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-[420px] h-[300px]">
            <Image
              src="/hotel-welcome.png"   // put your image inside public folder
              alt="Hotel Welcome"
              fill
              className="object-cover rounded-md shadow-lg"
            />
          </div>

        </div>
        {/* Right Content */}
        <div>
          <h2 className="text-4xl font-serif font-semibold text-gray-900 leading-snug mb-6">
            Welcome To Our Hotel Emerald Bay Resort
          </h2>

          <p className="text-gray-600 leading-relaxed text-base">
            Nestled along the golden shores of Mirissa, Emerald Bay Resort 
            Mirissa offers a refined beachfront escape where comfort meets 
            tropical elegance. Surrounded by swaying palms and the soothing 
            sound of the ocean, our resort features beautifully designed rooms, 
            a serene outdoor pool, and exceptional dining experiences. Just 
            minutes from Mirissa Beach and Secret Beach, Emerald Bay Resort 
            invites you to relax, indulge, and experience the charm of Sri Lanka’s 
            southern coast in style.
          </p>
        </div>

        

      </div>
    </section>
  );
}
