import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up animation timeline for content fade-in
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    if (contentRef.current) {
      tl.fromTo(
        contentRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }
  }, []);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-serving-coffee-548-large.mp4" type="video/mp4" />
          {/* Fallback background image */}
          <img 
            src="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg" 
            alt="Café Ambiance" 
            className="w-full h-full object-cover"
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#000042]/60"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center">
        <div ref={contentRef} className="max-w-2xl text-center">
          <h1 className="font-poppins font-bold text-5xl md:text-7xl text-white leading-tight mb-4">
            Extraordinary <span className="text-[#FFDE6A]">Coffee</span> Experience
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Where every cup tells a story and every bite creates a memory.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              className="px-8 py-6 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105"
            >
              <a href="#menu">Explore Menu</a>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="px-8 py-6 bg-transparent border-2 border-white text-white font-poppins font-semibold rounded-full hover:bg-white/10 transition transform hover:scale-105"
            >
              <a href="#locations">Find Us</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <i className="fas fa-chevron-down text-2xl"></i>
      </div>
    </section>
  );
};

export default HeroSection;
