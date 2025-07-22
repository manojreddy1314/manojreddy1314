"use client"

import { useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Users, Award, TrendingUp, Clock, Shield } from "lucide-react"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

  // Psychological triggers data
  const trustFactors = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "500+ Success Stories",
      description: "Join hundreds of businesses who've transformed their growth",
      color: "text-blue-400",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Industry Recognition",
      description: "Featured in Forbes, TechCrunch, and Entrepreneur Magazine",
      color: "text-yellow-400",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Proven Results",
      description: "Average 300% growth within 6 months guaranteed",
      color: "text-green-400",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "10+ Years Experience",
      description: "Decade of expertise in digital transformation",
      color: "text-purple-400",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Risk-Free Guarantee",
      description: "90-day money-back guarantee on all services",
      color: "text-teal-400",
    },
  ]

  const problemSolutionTabs = [
    {
      problem: "Struggling with Low Online Visibility?",
      solution: "We've helped 500+ businesses dominate their market with proven SEO strategies",
      result: "Average 340% increase in organic traffic",
    },
    {
      problem: "Wasting Money on Ineffective Marketing?",
      solution: "Our data-driven approach eliminates guesswork and maximizes ROI",
      result: "Clients see 5x return on marketing investment",
    },
    {
      problem: "Competitors Stealing Your Customers?",
      solution: "We create compelling brand stories that make you the obvious choice",
      result: "95% client retention rate after rebranding",
    },
  ]

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

  return (
    <section id="about" className="py-32 md:py-40 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <motion.div style={{ x }} className="absolute top-20 right-10 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="container px-6 md:px-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Problem-Agitation-Solution Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.h2
              className="text-4xl md:text-6xl font-light mb-8 text-white"
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              Why Most Businesses <span className="text-red-400">Fail Online</span>
              <br />
              <span className="text-teal-400">And How We Fix It</span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-red-300">87% of businesses struggle with digital marketing.</span> They waste
              thousands on strategies that don't work, while their competitors steal their customers.
              <br />
              <br />
              <span className="text-teal-300 font-semibold">We've cracked the code.</span> Our proven system has helped
              500+ businesses transform their struggles into success stories.
            </motion.p>
          </motion.div>

          {/* Problem-Solution Tabs */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex flex-col md:flex-row justify-center mb-8 space-y-2 md:space-y-0 md:space-x-4">
              {problemSolutionTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === index ? "bg-teal-500 text-gray-900" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  Problem #{index + 1}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 text-center max-w-4xl mx-auto"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">{problemSolutionTabs[activeTab].problem}</h3>
              <p className="text-gray-300 text-lg mb-6">{problemSolutionTabs[activeTab].solution}</p>
              <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 inline-block">
                <span className="text-teal-400 font-bold text-xl">{problemSolutionTabs[activeTab].result}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Factors Grid */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-3xl font-light text-center text-white mb-12">
              Why <span className="text-teal-400">Smart Businesses</span> Choose Us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trustFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`${factor.color} mb-4 group-hover:scale-110 transition-transform`}>{factor.icon}</div>
                  <h4 className="text-white font-semibold text-lg mb-2">{factor.title}</h4>
                  <p className="text-gray-400">{factor.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Proof Story */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 text-center"
          >
            <motion.div
              className="border-l-4 border-teal-400 pl-6 py-4 bg-gray-800/50 rounded-r-lg mb-8 max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-2xl text-white font-light italic mb-4">
                "Before Elevate Digital, we were just another struggling startup. Now we're the market leader in our
                industry."
              </p>
              <div className="flex items-center justify-center space-x-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-gray-900 font-bold">AC</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Alex Chen</div>
                  <div className="text-gray-400">CEO, Vidrava Technologies</div>
                  <div className="text-teal-400 text-sm">Revenue increased 340% in 6 months</div>
                </div>
              </div>
            </motion.div>

            {/* Authority Statement */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-4xl font-bold text-teal-400 mb-2"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(20, 184, 166, 0)",
                      "0 0 20px rgba(20, 184, 166, 0.5)",
                      "0 0 0px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  10+
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Years of Proven Excellence
                </div>
              </motion.div>
              <motion.div
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-4xl font-bold text-teal-400 mb-2"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(20, 184, 166, 0)",
                      "0 0 20px rgba(20, 184, 166, 0.5)",
                      "0 0 0px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  500+
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Successful Transformations
                </div>
              </motion.div>
              <motion.div
                className="text-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="text-4xl font-bold text-teal-400 mb-2"
                  animate={{
                    textShadow: [
                      "0 0 0px rgba(20, 184, 166, 0)",
                      "0 0 20px rgba(20, 184, 166, 0.5)",
                      "0 0 0px rgba(20, 184, 166, 0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                >
                  98%
                </motion.div>
                <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  Client Satisfaction Rate
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
