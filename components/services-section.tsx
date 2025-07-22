"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Rocket, Globe, Palette, Megaphone, Code } from "lucide-react"

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeService, setActiveService] = useState(0)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const services = [
    {
      id: 0,
      name: "Startup Solutions",
      icon: <Rocket className="h-8 w-8" />,
      description: "We help businesses to start, run and thrive in the market",
      color: "from-blue-500 to-cyan-500",
      items: [
        "Logo Design & Brand Identity",
        "Web Development",
        "Social Media Management",
        "Google Maps Profile Setup",
        "Market Research & STP",
        "Packaging & Print Design",
        "CRM Solutions",
        "E-commerce Development",
      ],
    },
    {
      id: 1,
      name: "Digital Marketing",
      icon: <Globe className="h-8 w-8" />,
      description: "Comprehensive digital strategies to grow your online presence",
      color: "from-green-500 to-teal-500",
      items: [
        "Website Development",
        "Search Engine Optimization (SEO)",
        "Search Engine Marketing (SEM)",
        "Social Media Marketing (SMM)",
        "Digital Ad Campaigns",
        "Content Marketing",
        "Blog Management",
        "Organic Traffic Growth",
      ],
    },
    {
      id: 2,
      name: "Branding Solutions",
      icon: <Palette className="h-8 w-8" />,
      description: "Create a memorable brand identity that resonates with your audience",
      color: "from-purple-500 to-pink-500",
      items: [
        "Logo & Tagline Creation",
        "Color Palette & Typography",
        "Brand Positioning",
        "Brand Strategy",
        "Poster & Banner Design",
        "Digital Banner Creation",
        "Packaging Design",
        "Website Design",
      ],
    },
    {
      id: 3,
      name: "Marketing",
      icon: <Megaphone className="h-8 w-8" />,
      description: "Multi-channel marketing approaches for maximum reach",
      color: "from-orange-500 to-red-500",
      items: [
        "Digital Marketing",
        "Email Marketing",
        "Affiliate Marketing",
        "Influencer Marketing",
        "Traditional (Offline) Marketing",
        "Content Creation",
        "Event Marketing",
        "Comprehensive TTL Campaigns",
      ],
    },
    {
      id: 4,
      name: "Tech Support",
      icon: <Code className="h-8 w-8" />,
      description: "Technical solutions to power your digital presence",
      color: "from-indigo-500 to-blue-500",
      items: [
        "Web Development",
        "CRM Implementation",
        "Security Solutions",
        "App Development",
        "E-commerce Website Development",
        "Website Customization",
        "Technical Maintenance",
        "Performance Optimization",
      ],
    },
  ]

  return (
    <section id="services" className="py-32 md:py-40 bg-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container px-6 md:px-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.h2
              className="text-4xl md:text-6xl font-light mb-8 text-white"
              whileInView={{
                backgroundImage: [
                  "linear-gradient(45deg, #ffffff, #ffffff)",
                  "linear-gradient(45deg, #ffffff, #14b8a6, #ffffff)",
                  "linear-gradient(45deg, #ffffff, #ffffff)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Our <span className="text-teal-400">Services</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 max-w-3xl mx-auto"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We offer a wide range of services to help your business thrive in the digital landscape.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Service Navigation */}
            <motion.div variants={itemVariants} className="space-y-4">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                  className={`w-full text-left p-6 rounded-lg transition-all duration-500 relative overflow-hidden group ${
                    activeService === index
                      ? "bg-teal-500/20 border-l-4 border-teal-400"
                      : "bg-gray-900/50 hover:bg-gray-900/80"
                  }`}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10`}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className={`${activeService === index ? "text-teal-400" : "text-gray-400"} transition-colors`}
                      animate={hoveredService === index ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <div>
                      <motion.h3
                        className={`font-medium ${activeService === index ? "text-white" : "text-gray-300"}`}
                        animate={activeService === index ? { x: [0, 5, 0] } : { x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.name}
                      </motion.h3>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Service Details */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, x: 50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -50, rotateY: 15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-gray-900/50 rounded-lg p-8 relative overflow-hidden"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${services[activeService].color} opacity-5`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center space-x-4 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.div
                        className="text-teal-400"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, delay: 0.5 }}
                      >
                        {services[activeService].icon}
                      </motion.div>
                      <h3 className="text-2xl font-medium text-white">{services[activeService].name}</h3>
                    </motion.div>

                    <motion.p
                      className="text-gray-300 mb-8 text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {services[activeService].description}
                    </motion.p>

                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {services[activeService].items.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3 group cursor-pointer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                          whileHover={{ x: 10, scale: 1.02 }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-teal-400 rounded-full"
                            whileHover={{ scale: 1.5, boxShadow: "0 0 10px rgba(20, 184, 166, 0.5)" }}
                          />
                          <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
