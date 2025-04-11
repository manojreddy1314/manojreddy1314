import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#000042] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <Logo className="h-12 w-12 text-white mr-3" />
            <div>
              <h3 className="font-poppins font-bold text-2xl">WAE'S CAFÉ</h3>
              <p className="text-gray-400 text-sm">Est. 2016</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#about" className="hover:text-[#FFDE6A] transition">About</a>
            <a href="#locations" className="hover:text-[#FFDE6A] transition">Locations</a>
            <a href="#menu" className="hover:text-[#FFDE6A] transition">Menu</a>
            <a href="#franchise" className="hover:text-[#FFDE6A] transition">Franchise</a>
            <a href="#contact" className="hover:text-[#FFDE6A] transition">Contact</a>
          </div>
        </div>
        
        <hr className="border-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Waes Café. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#FFDE6A] transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#FFDE6A] transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-[#FFDE6A] transition">Careers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
