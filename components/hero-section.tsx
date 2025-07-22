"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Users, Award, TrendingUp } from "lucide-react"
import { motion, useScroll, useTransform, useAnimation } from "framer-motion"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const controls = useAnimation()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    setIsLoaded(true)
    controls.start("visible")
  }, [controls])

  const socialProofStats = [
    { icon: <Users className="h-5 w-5" />, number: "500+", label: "Happy Clients" },
    { icon: <Award className="h-5 w-5" />, number: "98%", label: "Success Rate" },
    { icon: <TrendingUp className="h-5 w-5" />, number: "300%", label: "Avg Growth" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        />

        {/* Trust-building floating elements */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full opacity-40"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* ED Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          className="text-[40vw] md:text-[30vw] lg:text-[25vw] font-bold text-gray-800/5 select-none"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          ED
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="container relative z-30 px-6 md:px-10 text-center pt-16 md:pt-20 flex flex-col justify-center min-h-screen"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mb-8"
        >
          {/* Power Words for Emotional Impact */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6"
          >
            <motion.span
              className="inline-block text-white"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(255,255,255,0.5)",
                transition: { duration: 0.3 },
              }}
            >
              Transform
            </motion.span>
            <br />
            <motion.span
              className="inline-block text-teal-400"
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 20px rgba(20,184,166,0.8)",
                transition: { duration: 0.3 },
              }}
            >
              Your Success
            </motion.span>
          </motion.h1>

          {/* Benefit-Focused Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Join <span className="text-teal-400 font-semibold">500+ successful businesses</span> who've{" "}
            <span className="text-white font-semibold">tripled their revenue</span> with our proven digital strategies.
            <br />
            <span className="text-gray-400 text-lg">
              No long-term contracts. Results guaranteed in 90 days or your money back.
            </span>
          </motion.p>
        </motion.div>

        {/* Social Proof - Authority Psychology */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-8"
          >
            {socialProofStats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-gray-800/50 px-6 py-3 rounded-full border border-gray-700"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(20, 184, 166, 0.5)",
                  backgroundColor: "rgba(20, 184, 166, 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-teal-400">{stat.icon}</div>
                <div>
                  <div className="text-white font-bold text-lg">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="text-gray-400 text-sm mb-8">
            ⭐⭐⭐⭐⭐ Rated 4.9/5 by 500+ clients • Featured in TechCrunch, Forbes & Entrepreneur
          </motion.div>
        </motion.div>

        {/* CTA Buttons with Psychological Triggers */}
        <motion.div variants={containerVariants} initial="hidden" animate={isLoaded ? "visible" : "hidden"}>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            {/* Primary CTA - Action-oriented */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-gray-900 px-10 py-6 text-lg font-bold rounded-full shadow-2xl relative overflow-hidden group"
                asChild
              >
                <a href="#contact">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    🚀 Get My FREE Strategy Session
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </a>
              </Button>
            </motion.div>

            {/* Secondary CTA - Social Proof */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-teal-400 px-10 py-6 text-lg bg-transparent rounded-full relative overflow-hidden group"
                asChild
              >
                <a href="#work">
                  <motion.span
                    className="absolute inset-0 bg-gray-800"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Success Stories
                  </span>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Risk Reversal - Reduces Anxiety */}
          <motion.div variants={itemVariants} className="text-center text-gray-400 text-sm max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <span>✅ No Setup Fees</span>
              <span>✅ 90-Day Guarantee</span>
              <span>✅ Cancel Anytime</span>
            </div>
            <p className="text-xs">Join risk-free. If you don't see results in 90 days, we'll refund every penny.</p>
          </motion.div>
        </motion.div>

        {/* Testimonial Ticker - Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 max-w-2xl mx-auto"
        >
          <motion.div
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-center"
          >
            <p className="text-gray-300 italic mb-3">
              "Elevate Digital increased our revenue by 340% in just 6 months. Best investment we ever made!"
            </p>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-gray-900 font-bold">AC</span>
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Alex Chen</div>
                <div className="text-gray-400 text-sm">CEO, Vidrava Technologies</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll Indicator with Curiosity Gap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-center"
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="text-gray-400 text-sm mb-2 group-hover:text-teal-400 transition-colors">
            Discover the secret to 300% growth ↓
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
