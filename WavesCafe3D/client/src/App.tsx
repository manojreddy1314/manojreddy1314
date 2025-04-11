import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LocationSection from "@/components/LocationSection";
import MenuSection from "@/components/MenuSection";
import FranchiseSection from "@/components/FranchiseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const { handleScrollAnimation } = useScrollAnimation();

  useEffect(() => {
    // Initialize scroll animations on component mount
    handleScrollAnimation();

    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimation);
    
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, [handleScrollAnimation]);

  return (
    <div ref={appRef} className="font-opensans theme-transition">
      <ScrollProgress />
      <Header />
      <HeroSection />
      <AboutSection />
      <LocationSection />
      <MenuSection />
      <FranchiseSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
