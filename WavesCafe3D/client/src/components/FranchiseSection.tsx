import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}

const FranchiseSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/franchise-inquiry", formData);
      
      toast({
        title: "Inquiry Submitted",
        description: "Thank you for your franchise inquiry! We will contact you soon.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        message: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error submitting your inquiry. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="franchise" 
      className="py-20 parallax-bg bg-gray-100 dark:bg-[#00002e] theme-transition" 
      style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg')", 
        backgroundBlendMode: "overlay" 
      }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white/90 dark:bg-[#000042]/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="font-poppins font-bold text-4xl text-[#000042] dark:text-white mb-4">
              Become a <span className="text-[#FFDE6A]">Franchise Partner</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Join the Waes Café family and build your own successful business with our proven model and support system.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div data-scroll-animation="slide-right">
              <h3 className="font-poppins font-semibold text-2xl text-[#000042] dark:text-white mb-6">Why Choose Waes?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#FFDE6A] text-xl mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Established Brand</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Leverage our reputation for quality and excellence.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#FFDE6A] text-xl mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Comprehensive Training</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">We'll teach you everything you need to know to run a successful café.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#FFDE6A] text-xl mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Ongoing Support</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Marketing, operations, and supply chain assistance from day one.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-[#FFDE6A] text-xl mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Proven Business Model</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Follow our successful formula for a profitable café business.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div data-scroll-animation="slide-up">
              <h3 className="font-poppins font-semibold text-2xl text-[#000042] dark:text-white mb-6">Franchise Information</h3>
              {/* Franchise Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[#000042] dark:text-white mb-1">Full Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#000042] dark:text-white mb-1">Email Address</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-[#000042] dark:text-white mb-1">Phone Number</label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-[#000042] dark:text-white mb-1">Preferred Location</label>
                  <Input 
                    type="text" 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                    required 
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[#000042] dark:text-white mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3} 
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105"
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">Want to learn more about our franchise opportunities?</p>
            <a href="#contact" className="inline-flex items-center text-[#FFDE6A] font-poppins font-medium hover:underline">
              Contact our franchise team
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseSection;
