"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, ArrowRight, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function WorkSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

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
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  }

  const projects = [
    {
      id: 1,
      title: "Vidrava Technologies",
      category: "Tech Startup",
      description:
        "Complete digital transformation including web development, brand identity, and patent assistance for an innovative tech startup.",
      image: "/placeholder.svg?height=500&width=700&text=Vidrava+Tech+Website",
      results: {
        metric1: { label: "Traffic Increase", value: "340%" },
        metric2: { label: "Lead Generation", value: "250%" },
        metric3: { label: "Brand Recognition", value: "180%" },
      },
      services: ["Web Development", "Logo Design", "Patent Assistance", "SEO"],
      color: "from-blue-500 to-cyan-500",
      testimonial: {
        text: "Elevate Digital transformed our online presence completely. The website perfectly captures our innovative spirit.",
        author: "Alex Chen",
        position: "CEO, Vidrava Technologies",
        rating: 5,
      },
    },
    {
      id: 2,
      title: "K2VR Analytical Research",
      category: "Research & Analytics",
      description:
        "Comprehensive digital marketing strategy with advanced SEO, SEM campaigns, and analytics implementation.",
      image: "/placeholder.svg?height=500&width=700&text=K2VR+Analytics+Dashboard",
      results: {
        metric1: { label: "Organic Traffic", value: "420%" },
        metric2: { label: "Conversion Rate", value: "165%" },
        metric3: { label: "ROI Improvement", value: "290%" },
      },
      services: ["Digital Marketing", "SEO", "SEM", "Analytics", "Content Strategy"],
      color: "from-green-500 to-teal-500",
      testimonial: {
        text: "The SEO and SEM strategies have significantly boosted our research visibility and client acquisition.",
        author: "Sarah Johnson",
        position: "Marketing Director, K2VR",
        rating: 5,
      },
    },
    {
      id: 3,
      title: "WAEs Café",
      category: "Food & Beverage",
      description:
        "End-to-end startup solution covering branding, packaging design, web development, and market positioning.",
      image: "/placeholder.svg?height=500&width=700&text=WAEs+Cafe+Branding",
      results: {
        metric1: { label: "Brand Awareness", value: "380%" },
        metric2: { label: "Customer Base", value: "220%" },
        metric3: { label: "Sales Growth", value: "195%" },
      },
      services: ["Branding", "Packaging", "Web Development", "Social Media", "Photography"],
      color: "from-orange-500 to-red-500",
      testimonial: {
        text: "From concept to launch, Elevate Digital created a cohesive brand identity that resonates with our customers.",
        author: "Michael Torres",
        position: "Founder, WAEs Café",
        rating: 5,
      },
    },
    {
      id: 4,
      title: "EcoSmart Solutions",
      category: "Sustainability",
      description:
        "E-commerce platform development with integrated sustainability tracking and eco-friendly product showcase.",
      image: "/placeholder.svg?height=500&width=700&text=EcoSmart+E-commerce",
      results: {
        metric1: { label: "Online Sales", value: "450%" },
        metric2: { label: "User Engagement", value: "320%" },
        metric3: { label: "Mobile Traffic", value: "280%" },
      },
      services: ["E-commerce", "Sustainability Tech", "Mobile App", "Digital Marketing"],
      color: "from-green-600 to-emerald-500",
      testimonial: {
        text: "The e-commerce platform perfectly showcases our eco-friendly mission while driving incredible sales growth.",
        author: "Emma Green",
        position: "CEO, EcoSmart Solutions",
        rating: 5,
      },
    },
  ]

  return (
    <section id="work" className="py-32 md:py-40 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
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
          {/* Section Header */}
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
              Our <span className="text-teal-400">Portfolio</span>
            </motion.h2>
            <motion.p
              className="text-lg text-gray-400 max-w-3xl mx-auto mb-8"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover how we've helped businesses transform their digital presence and achieve remarkable growth
              through strategic design and innovative solutions.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
              variants={containerVariants}
            >
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "300%", label: "Average Growth" },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-bold text-teal-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                <motion.div
                  className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800 relative group">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.services.slice(0, 3).map((service, i) => (
                            <span
                              key={i}
                              className={`bg-gradient-to-r ${project.color} bg-opacity-20 text-white text-xs px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm`}
                            >
                              {service}
                            </span>
                          ))}
                          {project.services.length > 3 && (
                            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                              +{project.services.length - 3} more
                            </span>
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/30 text-white hover:bg-white hover:text-gray-900 bg-transparent backdrop-blur-sm"
                        >
                          View Case Study
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>

                    {/* Floating Category Badge */}
                    <motion.div
                      className="absolute top-6 left-6 bg-teal-500 text-gray-900 px-4 py-2 rounded-full text-sm font-medium"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.category}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Project Details */}
                <motion.div
                  className={`space-y-8 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div>
                    <motion.h3
                      className="text-3xl md:text-4xl font-light text-white mb-4"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">{project.description}</p>

                    {/* Services Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.services.map((service, i) => (
                        <motion.span
                          key={i}
                          className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700 hover:border-teal-400 hover:text-teal-400 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {service}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Results Metrics */}
                  <motion.div
                    className="grid grid-cols-3 gap-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700"
                    whileHover={{ borderColor: "rgba(20, 184, 166, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {Object.entries(project.results).map(([key, metric]) => (
                      <div key={key} className="text-center">
                        <motion.div
                          className="text-2xl font-bold text-teal-400 mb-1"
                          animate={hoveredProject === project.id ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {metric.value}
                        </motion.div>
                        <div className="text-gray-400 text-xs">{metric.label}</div>
                      </div>
                    ))}
                  </motion.div>

                  {/* Testimonial */}
                  <motion.div
                    className="bg-gray-800/30 p-6 rounded-xl border-l-4 border-teal-400"
                    whileHover={{ x: 10, backgroundColor: "rgba(31, 41, 55, 0.5)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-3">
                      {[...Array(project.testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 italic mb-4">"{project.testimonial.text}"</blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-gray-900" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{project.testimonial.author}</div>
                        <div className="text-gray-400 text-sm">{project.testimonial.position}</div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-32 p-12 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700"
          >
            <motion.h3
              className="text-3xl md:text-4xl font-light text-white mb-6"
              whileInView={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Ready to Start Your <span className="text-teal-400">Success Story</span>?
            </motion.h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join our portfolio of successful clients and let us help you achieve remarkable growth through strategic
              digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-teal-500 hover:bg-teal-600 text-gray-900 px-8 py-6 text-lg font-medium rounded-full"
                  asChild
                >
                  <Link href="#contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-teal-400 px-8 py-6 text-lg bg-transparent rounded-full"
                  asChild
                >
                  <Link href="/work">View All Projects</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
