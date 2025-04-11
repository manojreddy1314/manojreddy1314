import { useRef } from "react";

const AboutSection = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#000042] theme-transition">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={imageContainerRef} className="md:w-1/2 relative" data-scroll-animation="slide-right">
            {/* Coffee Prep Animation */}
            <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg" 
                alt="Coffee Preparation" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* 3D Animated Element */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFDE6A] rounded-full flex items-center justify-center shadow-lg">
              <p className="font-poppins font-bold text-[#000042] text-center">Since<br/>2016</p>
            </div>
          </div>
          
          <div ref={contentRef} className="md:w-1/2" data-scroll-animation="slide-up">
            <div className="space-y-6">
              <h2 className="font-poppins font-bold text-4xl text-[#000042] dark:text-white">
                About <span className="text-[#FFDE6A]">Waes Café</span>
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Founded in 2016, Waes Café has been serving exceptional coffee and food experiences to our community. 
                We pride ourselves on sourcing the finest ingredients and creating a warm, welcoming atmosphere where 
                people can connect and enjoy life's simple pleasures.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Our skilled baristas and chefs craft each item with precision and passion, ensuring that every visit 
                to Waes is memorable. From our signature coffee blends to our mouthwatering sandwiches and burgers, 
                quality is at the heart of everything we do.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center">
                  <i className="fas fa-coffee text-[#FFDE6A] text-3xl mr-3"></i>
                  <div>
                    <h3 className="font-poppins font-semibold text-[#000042] dark:text-white">Premium Coffee</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Sourced globally, roasted locally</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-utensils text-[#FFDE6A] text-3xl mr-3"></i>
                  <div>
                    <h3 className="font-poppins font-semibold text-[#000042] dark:text-white">Fresh Food</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Made with love every day</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-hands-helping text-[#FFDE6A] text-3xl mr-3"></i>
                  <div>
                    <h3 className="font-poppins font-semibold text-[#000042] dark:text-white">Community</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Creating connections through coffee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
