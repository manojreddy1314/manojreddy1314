import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-6 md:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Get in Touch</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions or want to discuss your project? We're here to help you elevate your digital presence.
              </p>
              <Button asChild variant="outline">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <div className="bg-muted p-8 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup Solutions</SelectItem>
                        <SelectItem value="digital">Digital Marketing</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="tech">Tech Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project or inquiry..."
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By submitting this form, you agree to our{" "}
                    <a href="#" className="underline hover:text-violet-600">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline hover:text-violet-600">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    Have questions or want to discuss your project? Reach out to us through any of the following
                    channels.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-violet-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Our Location</h3>
                        <p className="text-muted-foreground">123 Innovation Drive, Tech City, TC 10101</p>
                        <p className="text-muted-foreground">United States</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-violet-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Phone Number</h3>
                        <p className="text-muted-foreground">+1 (555) 987-6543</p>
                        <p className="text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-violet-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-medium text-lg">Email Address</h3>
                        <p className="text-muted-foreground">hello@elevatedigital.com</p>
                        <p className="text-muted-foreground">We typically respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium">Monday - Friday</h4>
                      <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium">Saturday</h4>
                      <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg col-span-2">
                      <h4 className="font-medium">Sunday</h4>
                      <p className="text-muted-foreground">Closed</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-bold mb-4">Find Us</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1626972904128!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Office Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-6 md:px-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">What services do you offer?</h3>
                  <p className="text-muted-foreground">
                    We offer a comprehensive range of digital marketing and branding services including startup
                    solutions, digital marketing, branding, marketing, and tech support. Visit our Services section for
                    more details.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">How much do your services cost?</h3>
                  <p className="text-muted-foreground">
                    Our pricing varies based on the scope and requirements of each project. We offer customized
                    solutions tailored to your specific needs and budget. Contact us for a free consultation and quote.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">How long does a typical project take?</h3>
                  <p className="text-muted-foreground">
                    Project timelines depend on the complexity and scope of work. A simple website might take 2-4 weeks,
                    while a comprehensive branding project could take 1-3 months. We'll provide a detailed timeline
                    during our initial consultation.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">Do you work with clients internationally?</h3>
                  <p className="text-muted-foreground">
                    Yes, we work with clients globally. Our digital-first approach allows us to collaborate effectively
                    with businesses anywhere in the world.
                  </p>
                </div>

                <div className="bg-background p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-2">What makes your agency different?</h3>
                  <p className="text-muted-foreground">
                    We don't just provide services; we forge partnerships. Our focus is on delivering measurable results
                    and building long-term relationships with our clients. We combine creativity with data-driven
                    strategies to ensure your success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
