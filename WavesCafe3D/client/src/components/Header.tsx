import { useState, useEffect } from "react";
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 theme-transition ${scrolled ? "bg-white/90 dark:bg-[#000042]/90 backdrop-blur-sm shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#hero" className="flex items-center">
          <Logo width={40} height={40} className="mr-2" />
          <span className="font-poppins font-bold text-[#000042] dark:text-white text-2xl">WAE'S CAFÉ</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="font-medium text-[#000042] dark:text-white hover:text-[#FFDE6A] dark:hover:text-[#FFDE6A] transition">About</a>
          <a href="#locations" className="font-medium text-[#000042] dark:text-white hover:text-[#FFDE6A] dark:hover:text-[#FFDE6A] transition">Locations</a>
          <a href="#menu" className="font-medium text-[#000042] dark:text-white hover:text-[#FFDE6A] dark:hover:text-[#FFDE6A] transition">Menu</a>
          <a href="#franchise" className="font-medium text-[#000042] dark:text-white hover:text-[#FFDE6A] dark:hover:text-[#FFDE6A] transition">Franchise</a>
          <a href="#contact" className="font-medium text-[#000042] dark:text-white hover:text-[#FFDE6A] dark:hover:text-[#FFDE6A] transition">Contact</a>
          <ThemeSwitcher />
        </nav>

        <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden text-[#000042] dark:text-white">
          <i className="fas fa-bars text-2xl"></i>
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white dark:bg-[#000042] w-full py-4 px-6 shadow-lg ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col space-y-4">
          <a href="#about" className="font-medium text-[#000042] dark:text-white py-2" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#locations" className="font-medium text-[#000042] dark:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Locations</a>
          <a href="#menu" className="font-medium text-[#000042] dark:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#franchise" className="font-medium text-[#000042] dark:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Franchise</a>
          <a href="#contact" className="font-medium text-[#000042] dark:text-white py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="flex items-center space-x-2 py-2">
            <span className="font-medium text-[#000042] dark:text-white">Theme</span>
            <ThemeSwitcher mobile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
