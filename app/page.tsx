"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users,
  Award,
  Wrench,
  Cog,
  Microscope,
  Printer,
  GraduationCap,
  BookOpen,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  UserCheck,
  Briefcase,
  Target,
} from "lucide-react"
import NewsSection from "@/components/NewsSection"

function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        company: formData.service, // Using service as company field
        message: formData.message,
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800 text-sm">
            Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">
            Sorry, there was an error sending your message. Please try again or contact us directly.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="group/field">
          <label className="block text-sm font-medium text-gray-900 mb-2 group-focus-within/field:text-blue-600 transition-colors duration-300">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-sm focus:scale-105"
            placeholder="John"
          />
        </div>
        <div className="group/field">
          <label className="block text-sm font-medium text-gray-900 mb-2 group-focus-within/field:text-blue-600 transition-colors duration-300">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-sm focus:scale-105"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="group/field">
        <label className="block text-sm font-medium text-gray-900 mb-2 group-focus-within/field:text-blue-600 transition-colors duration-300">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-sm focus:scale-105"
          placeholder="john@example.com"
        />
      </div>
      <div className="group/field">
        <label className="block text-sm font-medium text-gray-900 mb-2 group-focus-within/field:text-blue-600 transition-colors duration-300">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-sm focus:scale-105"
          placeholder="+91 98765 43210"
        />
      </div>
      <div className="group/field">
        <label className="block text-sm font-medium text-gray-900 mb-2 group-focus-within/field:text-blue-600 transition-colors duration-300">
          Service Interest
        </label>
        <select
          name="service"
          value={formData.service}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-sm focus:scale-105"
        >
          <option value="">Select a service</option>
          <option value="Press Tool Design">Press Tool Design</option>
          <option value="Mould Design">Mould Design</option>
          <option value="Jig & Fixture Design">Jig & Fixture Design</option>
          <option value="Quality Inspection">Quality Inspection</option>
          <option value="3D Printing & Scanning">3D Printing & Scanning</option>
          <option value="Training Programs">Training Programs</option>
        </select>
      </div>
      <div className="group/field">
        <label className="block text-sm font-medium text-gray-900 mb-2 group-focus-within/field:text-blue-600 transition-colors duration-300">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 hover:shadow-sm focus:scale-105 resize-none"
          placeholder="Tell us about your project or training requirements..."
        ></textarea>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-trivix-blue hover:bg-blue-700 text-white border border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 group/btn relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110">
          {isSubmitting ? "Sending..." : "Send Message"}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left"></div>
      </Button>
    </form>
  )
}

export default function TrivixWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0])
  const statsRef = useRef<HTMLDivElement>(null)

  const carouselSlides = [
    {
      title: "Press Tool Design Excellence",
      description:
        "Advanced press tool design and development for automotive, aerospace, and manufacturing industries with precision engineering and innovative solutions.",
      image: "/precision-press-tool-manufacturing.png",
      features: ["CAD/CAM Design", "Prototype Development", "Testing & Validation"],
    },
    {
      title: "Precision Mould Design",
      description:
        "State-of-the-art mould design services for injection molding, die casting, and forming applications with optimal efficiency and quality.",
      image: "/injection-mould-manufacturing-precision.png",
      features: ["3D Modeling", "Flow Analysis", "Cooling System Design"],
    },
    {
      title: "Quality Inspection Systems",
      description:
        "Advanced VMS/CMM quality inspection services ensuring precision and compliance with international standards for manufacturing excellence.",
      image: "/engineer-using-cmm-coordinate-measuring-machine.png",
      features: ["Dimensional Analysis", "Quality Reports", "Compliance Testing"],
    },
    {
      title: "3D Printing & Scanning",
      description:
        "Cutting-edge 3D printing and scanning services for rapid prototyping, reverse engineering, and innovative manufacturing solutions.",
      image: "/3d-printing-laboratory-modern-equipment.png",
      features: ["Rapid Prototyping", "3D Scanning", "Material Selection"],
    },
    {
      title: "Industrial Training Programs",
      description:
        "Comprehensive training programs for students and professionals in modern manufacturing technologies and engineering excellence.",
      image: "/students-learning-manufacturing-workshop.png",
      features: ["Hands-on Learning", "Industry Certification", "Expert Guidance"],
    },
  ]

  const statsData = [
    { number: 5, label: "Years Experience", suffix: "+" },
    { number: 70, label: "Students Trained", suffix: "+" },
    { number: 15, label: "Projects Completed", suffix: "+" },
    { number: 7, label: "Industry Partners", suffix: "+" },
  ]

  const animateCounter = (target: number, index: number, duration = 2000) => {
    const startTime = Date.now()
    const startValue = 0

    const updateCounter = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart)

      setAnimatedStats((prev) => {
        const newStats = [...prev]
        newStats[index] = currentValue
        return newStats
      })

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            setStatsAnimated(true)
            // Stagger the animations
            statsData.forEach((stat, index) => {
              setTimeout(() => {
                animateCounter(stat.number, index, 2000 + index * 200)
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.5 },
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [statsAnimated])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [carouselSlides.length])

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "leadership", "training", "careers", "blog", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80 // Account for fixed header height
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-trivix-off-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <img
                src="/trivix-logo.png"
                alt="Trivix Techno Skills Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:rotate-3"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900 drop-shadow-sm transition-colors duration-300 group-hover:text-trivix-blue">
                  Trivix
                </h1>
                <p className="text-xs text-gray-700 drop-shadow-sm transition-colors duration-300 group-hover:text-trivix-light-blue">
                  Techno Skills
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "leadership", label: "Leadership" },
                { id: "training", label: "Training" },
                { id: "careers", label: "Careers" },
                { id: "blog", label: "News" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-trivix-light-blue hover:scale-110 drop-shadow-sm relative group ${
                    activeSection === item.id ? "text-trivix-blue" : "text-gray-800"
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-trivix-blue transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-trivix-blue hover:bg-blue-700 text-white border border-blue-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 animate-pulse hover:animate-none"
              >
                Get Quote
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 transition-all duration-300 hover:bg-gray-100 rounded-lg hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-800 drop-shadow-sm transition-transform duration-300 rotate-90" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800 drop-shadow-sm transition-transform duration-300 hover:rotate-180" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
              <nav className="flex flex-col space-y-4">
                {[
                  { id: "home", label: "Home" },
                  { id: "about", label: "About" },
                  { id: "services", label: "Services" },
                  { id: "leadership", label: "Leadership" },
                  { id: "training", label: "Training" },
                  { id: "careers", label: "Careers" },
                  { id: "blog", label: "News" },
                  { id: "contact", label: "Contact" },
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left font-medium transition-all duration-300 drop-shadow-sm hover:translate-x-2 hover:bg-gray-50 p-2 rounded-lg ${
                      activeSection === item.id ? "text-trivix-blue" : "text-gray-800 hover:text-trivix-light-blue"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-trivix-blue to-trivix-light-blue overflow-hidden"
      >
        <div className="absolute inset-0 bg-blue-900/30 z-0"></div>
        <div
          className="absolute top-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl z-0 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
          }}
        ></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-white/20 rounded-full blur-lg z-0 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px) rotate(${mousePosition.x * 0.1}deg)`,
          }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-xl z-0 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            animationDelay: "1s",
          }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-white/15 rounded-full blur-lg z-0 animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.01}px)`,
            animationDuration: "3s",
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 isolate">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-trivix-blue text-white border-trivix-blue shadow-lg font-medium transform transition-all duration-500 hover:scale-110 hover:bg-trivix-light-blue animate-in fade-in-0 slide-in-from-top-4">
              Engineering Excellence
            </Badge>
            <h1
              className={`text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl transition-all duration-1000 ${isVisible ? "animate-in fade-in-0 slide-in-from-bottom-8" : "opacity-0"}`}
            >
              <span className="inline-block animate-in slide-in-from-left-8 duration-700 delay-300">Precision</span>{" "}
              <span className="inline-block animate-in slide-in-from-right-8 duration-700 delay-500">Engineering</span>{" "}
              <span className="inline-block animate-in slide-in-from-bottom-8 duration-700 delay-700">&</span>{" "}
              <span className="inline-block animate-in slide-in-from-left-8 duration-700 delay-900">Industrial</span>{" "}
              <span className="inline-block animate-in slide-in-from-right-8 duration-700 delay-1100">Training</span>{" "}
              <span className="inline-block animate-in slide-in-from-bottom-8 duration-700 delay-1300 text-blue-200">
                Excellence
              </span>
            </h1>
            <div
              className={`relative z-20 bg-trivix-blue/90 backdrop-blur-sm rounded-lg p-6 mx-auto max-w-4xl border border-trivix-light-blue/50 shadow-lg isolate transition-all duration-1000 hover:shadow-2xl hover:scale-105 ${isVisible ? "animate-in fade-in-0 slide-in-from-bottom-4 delay-1500" : "opacity-0"}`}
            >
              <p
                className="text-xl text-white mb-8 leading-relaxed drop-shadow-2xl"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)" }}
              >
                Advanced engineering solutions and cutting-edge training programs for modern manufacturing industries.
              </p>
            </div>
          </div>

          <div className="relative bg-trivix-blue/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-trivix-light-blue/30 shadow-lg z-20 isolate transition-all duration-500 hover:shadow-2xl hover:bg-trivix-blue/95 group">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-trivix-blue/95 backdrop-blur-sm rounded-lg p-6 border border-trivix-light-blue/30 relative z-30 isolate transition-all duration-500 group-hover:bg-trivix-blue/98">
                  <div className="bg-trivix-blue rounded-md p-4 mb-4 border border-trivix-light-blue transition-all duration-300 hover:border-trivix-light-blue">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg transition-all duration-500 group-hover:text-blue-100">
                      {carouselSlides[currentSlide].title}
                    </h2>
                  </div>
                  <p className="text-white/90 mb-6 leading-relaxed drop-shadow-md transition-all duration-500 group-hover:text-white">
                    {carouselSlides[currentSlide].description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {carouselSlides[currentSlide].features.map((feature, idx) => (
                      <Badge
                        key={idx}
                        className="bg-trivix-light-blue text-white border-trivix-light-blue/50 shadow-sm hover:bg-trivix-light-blue transition-all duration-300 hover:scale-110 hover:shadow-lg animate-in fade-in-0 slide-in-from-bottom-2 isolate z-20"
                        style={{
                          animationDelay: `${idx * 100}ms`,
                          isolation: "isolate",
                          position: "relative",
                          backgroundColor: "var(--trivix-light-blue)",
                          color: "white",
                          textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                        }}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("services")}
                      className="bg-white text-trivix-blue hover:bg-gray-100 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 group/btn"
                    >
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                        Our Services
                      </span>
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={() => scrollToSection("contact")}
                      className="border-white text-white hover:bg-white/20 bg-trivix-light-blue/50 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 hover:border-trivix-light-blue"
                    >
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 relative">
                <div className="relative overflow-hidden rounded-xl shadow-2xl border border-trivix-light-blue/30 transition-all duration-500 hover:shadow-trivix-light-blue/25 hover:scale-105 group/image">
                  <img
                    src={carouselSlides[currentSlide].image || "/placeholder.svg"}
                    alt={carouselSlides[currentSlide].title}
                    className="w-full h-80 object-cover transition-all duration-500 group-hover/image:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-trivix-blue/20 to-transparent opacity-0 transition-opacity duration-300 group-hover/image:opacity-100"></div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-trivix-blue/80 hover:bg-trivix-light-blue/90 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm z-30 hover:scale-110 hover:shadow-xl hover:-translate-x-1 group/nav"
            >
              <ChevronRight className="w-5 h-5 rotate-180 transition-transform duration-300 group-hover/nav:scale-110" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-trivix-blue/80 hover:bg-trivix-light-blue/90 text-white p-3 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm z-30 hover:scale-110 hover:shadow-xl hover:translate-x-1 group/nav"
            >
              <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/nav:scale-110" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentSlide ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className={`relative text-center bg-trivix-light-blue/60 backdrop-blur-sm rounded-lg p-6 border border-trivix-light-blue/30 shadow-md transition-all duration-500 hover:shadow-xl hover:scale-105 hover:bg-trivix-light-blue/70 hover:-translate-y-2 group/stat cursor-pointer overflow-hidden ${isVisible ? "animate-in fade-in-0 slide-in-from-bottom-4" : "opacity-0"}`}
                style={{ animationDelay: `${2000 + index * 200}ms` }}
              >
                {/* Background animation circle */}
                <div className="absolute inset-0 rounded-lg">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-trivix-light-blue/20 to-trivix-light-blue/20 rounded-lg transform scale-0 group-hover/stat:scale-100 transition-transform duration-700 ease-out"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, rgba(59, 130, 246, 0.3) ${(animatedStats[index] / stat.number) * 100}%, transparent ${(animatedStats[index] / stat.number) * 100}%)`,
                    }}
                  ></div>
                </div>

                {/* Progress ring */}
                <div className="absolute top-2 right-2 w-8 h-8">
                  <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
                    <circle
                      cx="16"
                      cy="16"
                      r="12"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 12}`}
                      strokeDashoffset={`${2 * Math.PI * 12 * (1 - animatedStats[index] / stat.number)}`}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                </div>

                {/* Animated counter */}
                <div className="relative z-10">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-md transition-all duration-300 group-hover/stat:scale-110 group-hover/stat:text-white">
                    <span className="tabular-nums">{animatedStats[index]}</span>
                    <span className="text-white">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-white/90 drop-shadow-sm transition-colors duration-300 group-hover/stat:text-white font-medium">
                    {stat.label}
                  </div>
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover/stat:opacity-100 transition-opacity duration-700"
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${30 + i * 15}%`,
                        animation: `float-${i} 3s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Pulse effect on hover */}
                <div className="absolute inset-0 rounded-lg border-2 border-white/20 opacity-0 group-hover/stat:opacity-100 group-hover/stat:animate-pulse transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes float-0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(180deg); }
          }
          @keyframes float-1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-180deg); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(360deg); }
          }
        `}</style>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-trivix-blue border-gray-200">About Trivix</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Engineering Excellence Since 2008</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trivix Techno Skills Pvt. Ltd. is a premier engineering company specializing in precision manufacturing
              solutions and comprehensive industrial training programs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img
                src="/engineering-team-precision-manufacturing.png"
                alt="Our Team"
                className="rounded-2xl shadow-xl border border-gray-200/30"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To deliver cutting-edge engineering solutions and world-class training programs that empower industries
                and individuals to achieve excellence in manufacturing and technology.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200/30">
                    <Users className="w-8 h-8 text-trivix-blue" />
                  </div>
                  <h4 className="font-bold text-gray-900">70+</h4>
                  <p className="text-sm text-gray-600">Students Trained</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200/30">
                    <Award className="w-8 h-8 text-trivix-blue" />
                  </div>
                  <h4 className="font-bold text-gray-900">15+</h4>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-trivix-blue text-white border-blue-200 animate-in fade-in-0 slide-in-from-top-4">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 delay-200">
              Comprehensive Engineering Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 delay-300">
              From precision tool design to advanced quality inspection, we offer complete engineering services for
              modern manufacturing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wrench,
                title: "Press Tool Design",
                description:
                  "Custom press tool design and development for automotive, aerospace, and manufacturing industries with precision engineering.",
                features: ["CAD/CAM Design", "Prototype Development", "Testing & Validation"],
                prProcess: [
                  "Market research & requirement analysis",
                  "Brainstorming innovative design solutions",
                  "2D concept sketches & design validation",
                  "Reverse engineering",
                ],
                color: "blue",
                bgColor: "bg-blue-600",
                hoverBgColor: "hover:bg-blue-700",
                borderColor: "hover:border-blue-200",
                gradientColor: "hover:to-blue-50",
                iconBg: "from-blue-100 to-blue-200",
                iconBorder: "border-blue-200/50",
                iconText: "text-blue-600",
                iconHover: "group-hover:text-blue-700",
                titleHover: "group-hover:text-blue-700",
                chevronColor: "text-blue-600",
                chevronHover: "group-hover:text-blue-700",
                borderHover: "border-blue-400",
              },
              {
                icon: Cog,
                title: "Mould Design",
                description:
                  "Advanced mould design services for injection molding, die casting, and forming applications with optimal efficiency.",
                features: ["3D Modeling", "Flow Analysis", "Cooling System Design"],
                prProcess: [
                  "Market research & requirement analysis",
                  "Brainstorming innovative design solutions",
                  "2D concept sketches & design validation",
                  "Reverse engineering",
                ],
                color: "indigo",
                bgColor: "bg-indigo-600",
                hoverBgColor: "hover:bg-indigo-700",
                borderColor: "hover:border-indigo-200",
                gradientColor: "hover:to-indigo-50",
                iconBg: "from-indigo-100 to-indigo-200",
                iconBorder: "border-indigo-200/50",
                iconText: "text-indigo-600",
                iconHover: "group-hover:text-indigo-700",
                titleHover: "group-hover:text-indigo-700",
                chevronColor: "text-indigo-600",
                chevronHover: "group-hover:text-indigo-700",
                borderHover: "border-indigo-400",
              },
              {
                icon: Wrench,
                title: "Jig & Fixture Design",
                description:
                  "Precision jigs and fixtures for manufacturing processes, including manufacturing of fixtures, ensuring accuracy and repeatability in production.",
                features: ["Custom Solutions", "Assembly Fixtures", "Inspection Jigs"],
                color: "cyan",
                bgColor: "bg-cyan-600",
                hoverBgColor: "hover:bg-cyan-700",
                borderColor: "hover:border-cyan-200",
                gradientColor: "hover:to-cyan-50",
                iconBg: "from-cyan-100 to-cyan-200",
                iconBorder: "border-cyan-200/50",
                iconText: "text-cyan-600",
                iconHover: "group-hover:text-cyan-700",
                titleHover: "group-hover:text-cyan-700",
                chevronColor: "text-cyan-600",
                chevronHover: "group-hover:text-cyan-700",
                borderHover: "border-cyan-400",
              },
              {
                icon: Lightbulb,
                title: "Product Designing",
                description:
                  "Comprehensive product design services from concept to market-ready solutions with innovative engineering approaches.",
                features: [
                  "Market research & requirement analysis",
                  "Brainstorming innovative design solutions",
                  "2D concept sketches & design validation",
                  "Reverse Engineering",
                ],
                color: "purple",
                bgColor: "bg-purple-600",
                hoverBgColor: "hover:bg-purple-700",
                borderColor: "hover:border-purple-200",
                gradientColor: "hover:to-purple-50",
                iconBg: "from-purple-100 to-purple-200",
                iconBorder: "border-purple-200/50",
                iconText: "text-purple-600",
                iconHover: "group-hover:text-purple-700",
                titleHover: "group-hover:text-purple-700",
                chevronColor: "text-purple-600",
                chevronHover: "group-hover:text-purple-700",
                borderHover: "border-purple-400",
              },
              {
                icon: Microscope,
                title: "VMS/CMM Quality Inspection",
                description:
                  "Advanced quality inspection services using Vision Measuring Systems and Coordinate Measuring Machines.",
                features: ["Dimensional Analysis", "Quality Reports", "Compliance Testing"],
                color: "green",
                bgColor: "bg-green-600",
                hoverBgColor: "hover:bg-green-700",
                borderColor: "hover:border-green-200",
                gradientColor: "hover:to-green-50",
                iconBg: "from-green-100 to-green-200",
                iconBorder: "border-green-200/50",
                iconText: "text-green-600",
                iconHover: "group-hover:text-green-700",
                titleHover: "group-hover:text-green-700",
                chevronColor: "text-green-600",
                chevronHover: "group-hover:text-green-700",
                borderHover: "border-green-400",
              },
              {
                icon: Printer,
                title: "3D Printing & Scanning",
                description:
                  "State-of-the-art 3D printing and scanning services for rapid prototyping and reverse engineering.",
                features: ["Rapid Prototyping", "3D Scanning", "Material Selection"],
                color: "orange",
                bgColor: "bg-orange-600",
                hoverBgColor: "hover:bg-orange-700",
                borderColor: "hover:border-orange-200",
                gradientColor: "hover:to-orange-50",
                iconBg: "from-orange-100 to-orange-200",
                iconBorder: "border-orange-200/50",
                iconText: "text-orange-600",
                iconHover: "group-hover:text-orange-700",
                titleHover: "group-hover:text-orange-700",
                chevronColor: "text-orange-600",
                chevronHover: "group-hover:text-orange-700",
                borderHover: "border-orange-400",
              },
              {
                icon: GraduationCap,
                title: "Consulting Services",
                description:
                  "Expert engineering consulting for process optimization, quality improvement, and technology implementation.",
                features: ["Process Analysis", "Technology Consulting", "Quality Systems"],
                color: "teal",
                bgColor: "bg-teal-600",
                hoverBgColor: "hover:bg-teal-700",
                borderColor: "hover:border-teal-200",
                gradientColor: "hover:to-teal-50",
                iconBg: "from-teal-100 to-teal-200",
                iconBorder: "border-teal-200/50",
                iconText: "text-teal-600",
                iconHover: "group-hover:text-teal-700",
                titleHover: "group-hover:text-teal-700",
                chevronColor: "text-teal-600",
                chevronHover: "group-hover:text-teal-700",
                borderHover: "border-teal-400",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer border-2 ${service.borderColor} bg-white hover:bg-gradient-to-br hover:from-white ${service.gradientColor} animate-in fade-in-0 slide-in-from-bottom-8`}
                style={{ animationDelay: `${500 + index * 150}ms` }}
              >
                <CardHeader className="relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${service.color}-500/5 to-${service.color}-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div
                    className={`relative w-12 h-12 bg-gradient-to-br ${service.iconBg} rounded-lg flex items-center justify-center mb-4 border ${service.iconBorder} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 group-hover:shadow-lg`}
                  >
                    <service.icon
                      className={`w-6 h-6 ${service.iconText} ${service.iconHover} transition-all duration-300 group-hover:scale-110`}
                    />

                    <div
                      className={`absolute inset-0 rounded-lg border-2 ${service.borderHover} opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 animate-pulse`}
                    ></div>
                  </div>

                  <CardTitle
                    className={`text-xl text-gray-900 ${service.titleHover} transition-all duration-300 group-hover:translate-x-1`}
                  >
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </CardDescription>

                  <ul className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-all duration-300 group-hover:translate-x-2"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        <ChevronRight
                          className={`w-4 h-4 ${service.chevronColor} ${service.chevronHover} mr-2 transition-all duration-300 group-hover:scale-110`}
                        />
                        <span className="group-hover:font-medium transition-all duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {service.prProcess && (
                    <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-gray-300 transition-colors duration-300">
                      <h4
                        className={`font-semibold text-gray-900 mb-2 ${service.titleHover} transition-colors duration-300`}
                      >
                        PR Process:
                      </h4>
                      <ul className="space-y-1">
                        {service.prProcess.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs text-gray-600 group-hover:text-gray-700 transition-all duration-300 group-hover:translate-x-1"
                            style={{ transitionDelay: `${100 + idx * 30}ms` }}
                          >
                            <ChevronRight
                              className={`w-3 h-3 ${service.chevronColor} ${service.chevronHover} mr-1 transition-all duration-300`}
                            />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0">
                    <Button
                      size="sm"
                      onClick={() => scrollToSection("contact")}
                      className={`w-full ${service.bgColor} ${service.hoverBgColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      Learn More
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className={`w-2 h-2 bg-${service.color}-400 rounded-full animate-ping`}></div>
                  </div>
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                    <div className={`w-1 h-1 bg-${service.color}-300 rounded-full animate-pulse`}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <Card className="bg-white border-2 border-gray-200 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl group cursor-pointer transform-gpu">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200/30 group-hover:from-blue-200 group-hover:to-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Microscope className="w-8 h-8 text-trivix-blue group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Quality Control & Inspection Methods
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Advanced quality inspection and reporting using state-of-the-art VMS/CMM technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Vision Measuring Systems (VMS)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">High-precision optical measurement</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Non-contact dimensional inspection</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Surface profile analysis</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Automated measurement routines</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Coordinate Measuring Machine (CMM)</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">3D coordinate measurement</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Geometric dimensioning & tolerancing</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Form and position analysis</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Comprehensive quality reports</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-trivix-blue border-gray-200">Leadership</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals leading innovation in engineering solutions and industrial training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Kumar",
                position: "Chief Executive Officer",
                experience: "20+ years",
                expertise: "Strategic Leadership & Business Development",
                image: "/professional-ceo-portrait.png",
              },
              {
                name: "Priya Sharma",
                position: "Head of Engineering",
                experience: "15+ years",
                expertise: "Tool Design & Manufacturing Excellence",
                image: "/professional-female-engineer.png",
              },
              {
                name: "Amit Patel",
                position: "Training Director",
                experience: "12+ years",
                expertise: "Industrial Training & Skill Development",
                image: "/professional-training-director-portrait.png",
              },
            ].map((leader, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 text-center group cursor-pointer transform-gpu hover:scale-105 hover:-translate-y-2 border-2 border-gray-200 hover:border-blue-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                    {leader.position}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                      <Award className="w-4 h-4 text-trivix-blue group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300" />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {leader.experience} Experience
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                      <Target className="w-4 h-4 text-trivix-blue group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300" />
                      <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                        {leader.expertise}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-trivix-blue border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
              Training Programs
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">
              Comprehensive Industrial Training
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
              Empowering students and professionals with cutting-edge skills in engineering and manufacturing
              technologies.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                level: "Diploma Students",
                programs: [
                  "CAD/CAM Fundamentals",
                  "Manufacturing Processes",
                  "Quality Control Basics",
                  "Industrial Safety",
                  "Tool Making",
                  "Industrial Training",
                ],
                duration: "6-12 months",
                icon: BookOpen,
              },
              {
                level: "Engineering Students",
                programs: ["Advanced CAD Design", "Tool & Die Making", "CNC Programming", "Project Management"],
                duration: "3-6 months",
                icon: GraduationCap,
              },
              {
                level: "Working Professionals",
                programs: [
                  "Industry 4.0 Technologies",
                  "Advanced Quality Systems",
                  "Leadership in Manufacturing",
                  "Continuous Improvement",
                ],
                duration: "1-3 months",
                icon: Users,
              },
            ].map((program, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 hover:border-blue-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200/30 group-hover:from-blue-200 group-hover:to-blue-100 group-hover:border-blue-400 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <program.icon className="w-8 h-8 text-trivix-blue group-hover:text-blue-700 transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                    {program.level}
                  </CardTitle>
                  <CardDescription className="text-trivix-blue font-medium group-hover:text-blue-700 transition-colors duration-300">
                    Duration: {program.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {program.programs.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-600 group-hover:text-gray-800 transition-all duration-300 hover:translate-x-2 animate-slide-in-left"
                        style={{ animationDelay: `${index * 150 + idx * 100}ms` }}
                      >
                        <ChevronRight className="w-4 h-4 text-trivix-blue mr-2 group-hover:text-blue-700 transition-colors duration-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6 bg-trivix-blue hover:bg-blue-700 text-white border border-blue-200 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                    onClick={() => scrollToSection("contact")}
                  >
                    <span className="relative z-10">Enroll Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded"></div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-trivix-blue text-white border-blue-200 hover:bg-blue-700 hover:border-blue-300 transition-all duration-300 transform hover:scale-105">
              Careers
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-fade-in">Join Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
              Be part of our innovative team and contribute to cutting-edge engineering solutions and training programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                title: "Senior Design Engineer",
                department: "Engineering",
                type: "Full-time",
                location: "Bengaluru",
                experience: "5+ years",
                description: "Lead design projects for press tools and moulds with advanced CAD/CAM expertise.",
              },
              {
                title: "Quality Inspector",
                department: "Quality Assurance",
                type: "Full-time",
                location: "Bengaluru",
                experience: "3+ years",
                description: "Operate VMS/CMM equipment and ensure quality standards in manufacturing processes.",
              },
              {
                title: "Training Coordinator",
                department: "Training",
                type: "Full-time",
                location: "Bengaluru",
                experience: "4+ years",
                description: "Develop and deliver industrial training programs for students and professionals.",
              },
              {
                title: "3D Printing Specialist",
                department: "Technology",
                type: "Full-time",
                location: "Bengaluru",
                experience: "2+ years",
                description: "Manage 3D printing operations and support rapid prototyping projects.",
              },
            ].map((job, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 hover:border-blue-300 group animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-blue-800 transition-colors duration-300">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="text-trivix-blue font-medium group-hover:text-blue-700 transition-colors duration-300">
                        {job.department}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="secondary"
                      className="group-hover:bg-blue-100 group-hover:text-blue-800 transition-all duration-300 transform group-hover:scale-105"
                    >
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {job.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4 group-hover:text-gray-600 transition-colors duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-300" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="w-4 h-4 group-hover:text-blue-600 transition-colors duration-300" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-trivix-blue hover:bg-blue-700 text-white border border-blue-200 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden isolate z-10"
                    onClick={() => scrollToSection("contact")}
                    style={{ isolation: "isolate", position: "relative", backgroundColor: "rgb(30, 64, 175)" }}
                  >
                    <span
                      className="relative z-10"
                      style={{ color: "white", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      Apply Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card
              className="bg-gray-100 border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 hover:border-blue-300 group animate-fade-in-up"
              style={{ animationDelay: "800ms" }}
            >
              <CardContent className="py-8">
                <UserCheck className="w-12 h-12 text-trivix-blue mx-auto mb-4 group-hover:text-blue-700 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                  Don't see the right position?
                </h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  We're always looking for talented individuals to join our team. Send us your resume and we'll keep you
                  in mind for future opportunities.
                </p>

                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-trivix-blue hover:bg-blue-700 text-white border border-blue-200 shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden isolate z-10"
                  style={{ isolation: "isolate", position: "relative", backgroundColor: "rgb(30, 64, 175)" }}
                >
                  <span className="relative z-10" style={{ color: "white", textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                    Send Resume
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog/News Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in fade-in-0 slide-in-from-bottom-8 duration-700 group">
            <Badge className="mb-4 bg-trivix-blue text-white border-blue-200 animate-in fade-in-0 slide-in-from-top-4 delay-200 hover:scale-110 hover:shadow-xl hover:bg-blue-700 hover:border-blue-300 transition-all duration-500 hover:rotate-1 hover:-translate-y-1 cursor-pointer relative overflow-hidden group/badge">
              <span className="relative z-10">Latest News</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"></div>
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 delay-300 hover:text-trivix-blue hover:scale-105 transition-all duration-500 cursor-pointer hover:drop-shadow-lg group-hover:animate-pulse">
              Industry Insights & Updates
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 delay-400 hover:text-gray-800 hover:scale-105 transition-all duration-300 cursor-pointer hover:drop-shadow-sm group-hover:translate-y-1">
              Stay updated with the latest trends in engineering, manufacturing technologies, and industry best
              practices.
            </p>
          </div>

          <div className="animate-in fade-in-0 slide-in-from-bottom-8 delay-500 duration-700 hover:scale-105 transition-all duration-500 hover:drop-shadow-2xl group/news relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-gray-100 opacity-0 group-hover/news:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="relative z-10 group-hover/news:translate-y-2 transition-transform duration-500">
              <NewsSection />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-trivix-blue border-gray-200 animate-in fade-in-0 slide-in-from-top-4 hover:bg-trivix-blue hover:text-white hover:scale-105 transition-all duration-300">
              Contact Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 delay-200 hover:text-trivix-blue transition-colors duration-300">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 delay-300 hover:text-gray-800 transition-colors duration-300">
              Ready to start your next project or training program? Contact us today for a consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 animate-in fade-in-0 slide-in-from-left-4 delay-400 hover:text-trivix-blue transition-colors duration-300">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-md hover:scale-105 animate-in fade-in-0 slide-in-from-left-4 delay-500 hover:border-l-4 hover:border-trivix-blue">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center border border-blue-200/30 group-hover:from-blue-200 group-hover:to-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                    <MapPin className="w-6 h-6 text-trivix-blue group-hover:text-blue-700 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      Address
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Sattva Opus, 54, Tumkur Rd
                      <br />
                      opp. Metro Pillar No. 85, Vidya Nagar
                      <br />
                      Kempegowdanagar, Bengaluru, Karnataka 560073
                      <br />
                      India
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                      Coordinates: 17.4960081, 78.4009574
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg transition-all duration-300 hover:bg-green-50 hover:shadow-md hover:scale-105 animate-in fade-in-0 slide-in-from-left-4 delay-600">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center border border-blue-200/30 group-hover:from-green-200 group-hover:to-green-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                    <Phone className="w-6 h-6 text-trivix-blue group-hover:text-green-700 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                      Phone
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      +91 8861370562
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg transition-all duration-300 hover:bg-purple-50 hover:shadow-md hover:scale-105 animate-in fade-in-0 slide-in-from-left-4 delay-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center border border-blue-200/30 group-hover:from-purple-200 group-hover:to-purple-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                    <Mail className="w-6 h-6 text-trivix-blue group-hover:text-purple-700 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      Email
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      niranjan@trivixtechnoskills.com
                    </p>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      sudeep@trivixtechnoskills.com
                    </p>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      likhith@trivixtechnoskills.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group cursor-pointer p-4 rounded-lg transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:scale-105 animate-in fade-in-0 slide-in-from-left-4 delay-800">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-gray-100 rounded-lg flex items-center justify-center border border-blue-200/30 group-hover:from-orange-200 group-hover:to-orange-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-lg">
                    <Clock className="w-6 h-6 text-trivix-blue group-hover:text-orange-700 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      Business Hours
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Saturday: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-in fade-in-0 slide-in-from-right-4 delay-500">
              <Card className="shadow-lg border border-gray-200/30 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
                <CardHeader>
                  <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Send us a Message
                  </CardTitle>
                  <CardDescription className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Google Maps Integration */}
          <div className="mt-16 animate-in fade-in-0 slide-in-from-bottom-8 delay-1000">
            <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg border border-gray-200/30 hover:shadow-2xl hover:scale-105 transition-all duration-500 group">
              <div className="p-6 bg-white border-b border-gray-200 group-hover:bg-blue-50 transition-colors duration-300">
                <div className="flex items-center justify-between">
                  <div className="group-hover:translate-x-2 transition-transform duration-300">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      Our Location
                    </h3>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      Sattva Opus, 54, Tumkur Rd, opp. Metro Pillar No. 85, Vidya Nagar, Kempegowdanagar, Bengaluru,
                      Karnataka 560073
                    </p>
                    <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-500 transition-colors duration-300">
                      Lat: 17.4960081, Long: 78.4009574
                    </p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/84UCeiEFQHLakmCz8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-trivix-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 border border-blue-200 shadow-lg hover:shadow-xl hover:scale-110 hover:-translate-y-1 group/link"
                  >
                    <MapPin className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">View on Google Maps</span>
                    <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
              <div className="relative h-80 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6!2d78.4009574!3d17.4960081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDI5JzQ1LjYiTiA3OMKwMjQnMDMuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                ></iframe>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <a
                    href="https://maps.app.goo.gl/84UCeiEFQHLakmCz8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-900 hover:text-blue-500 text-sm font-medium transition-colors duration-300 group/maplink"
                  >
                    <ExternalLink className="w-3 h-3 group-hover/maplink:scale-110 transition-transform duration-300" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/trivix-logo.png" alt="Trivix Techno Skills Logo" className="h-8 w-auto object-contain" />
                <div>
                  <h3 className="text-lg font-bold text-white">Trivix</h3>
                  <p className="text-xs text-gray-400">Techno Skills</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Leading provider of engineering solutions and industrial training programs, empowering industries with
                precision and excellence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Press Tool Design</li>
                <li>Mould Design</li>
                <li>Quality Inspection</li>
                <li>3D Printing & Scanning</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Training</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Diploma Programs</li>
                <li>Engineering Courses</li>
                <li>Professional Training</li>
                <li>Industry Certifications</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>+91 8861370562</li>
                <li>niranjan@trivixtechnoskills.com</li>
                <li>Bengaluru, Karnataka</li>
                <li>Mon-Fri: 9AM-6PM</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-300">© 2025 Trivix Techno Skills Pvt. Ltd. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">
              Website developed by{" "}
              <a
                href="https://www.vidravatechnologies.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-trivix-blue hover:text-blue-400 transition-colors duration-300 underline"
              >
                Vidrava Technologies Pvt Ltd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
