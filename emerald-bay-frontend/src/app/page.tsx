import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WelcomeSection from "@/components/WelcomeSection";
import ServiceSectionNew from "@/components/ServiceSectionNew";
import PerfectStaySection from "@/components/PerfectStaySection";
import ToursGuideSection from "@/components/ToursGuideSection";
import ServicesSection from "@/components/ServicesSection";
import PackagesSection from "@/components/PackagesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex flex-1 w-full flex-col mt-[60px]">
        <HeroSection />
        <WelcomeSection />
        <ServicesSection />
        <PerfectStaySection />
        <ServiceSectionNew/>
        <ToursGuideSection />
        <PackagesSection />
      </main>
    </div>
  );
}