import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex flex-1 w-full flex-col mt-[60px]">
        <HeroSection />
        <WelcomeSection />
        <ServicesSection />
      </main>
    </div>
  );
}
