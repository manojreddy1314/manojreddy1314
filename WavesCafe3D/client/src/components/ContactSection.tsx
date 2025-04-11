import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
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
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message! We will respond as soon as possible.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#000042] theme-transition">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl text-[#000042] dark:text-white mb-4">
            Get in <span className="text-[#FFDE6A]">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you! Reach out using the form below or connect with us on social media.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div data-scroll-animation="slide-right">
            <h3 className="font-poppins font-semibold text-2xl text-[#000042] dark:text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-[#FFDE6A] rounded-full p-3 mr-4 text-[#000042]">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Email Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">info@waescafe.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#FFDE6A] rounded-full p-3 mr-4 text-[#000042]">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Call Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">+91 9876543210</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#FFDE6A] rounded-full p-3 mr-4 text-[#000042]">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-poppins font-medium text-[#000042] dark:text-white">Visit Us</h4>
                  <p className="text-gray-600 dark:text-gray-300">Multiple locations in Bangalore</p>
                  <a href="#locations" className="text-[#FFDE6A] hover:underline">View locations</a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-poppins font-medium text-[#000042] dark:text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-[#000042] text-white dark:bg-white dark:text-[#000042] w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-[#000042] text-white dark:bg-white dark:text-[#000042] w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-[#000042] text-white dark:bg-white dark:text-[#000042] w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon bg-[#000042] text-white dark:bg-white dark:text-[#000042] w-10 h-10 rounded-full flex items-center justify-center">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div data-scroll-animation="slide-up">
            <h3 className="font-poppins font-semibold text-2xl text-[#000042] dark:text-white mb-6">Send Us a Message</h3>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-[#000042] dark:text-white mb-1">Your Name</label>
                <Input 
                  type="text" 
                  id="contact-name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[#000042] dark:text-white mb-1">Email Address</label>
                <Input 
                  type="email" 
                  id="contact-email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-[#000042] dark:text-white mb-1">Subject</label>
                <Input 
                  type="text" 
                  id="contact-subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-[#000042] dark:text-white mb-1">Message</label>
                <Textarea 
                  id="contact-message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  rows={5} 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#000042]/60 text-[#000042] dark:text-white" 
                  required 
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
