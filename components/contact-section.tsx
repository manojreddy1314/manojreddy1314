"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, Users, Award } from "lucide-react"

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [urgencyTimer, setUrgencyTimer] = useState(47) // Minutes left

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  // Psychological triggers
  const urgencyIndicators = [
    "🔥 Only 3 strategy sessions left this week",
    "⏰ Next available slot: Tomorrow 2 PM",
    "💎 Free consultation worth $500",
  ]

  const trustSignals = [
    { icon: <Users className="h-5 w-5" />, text: "500+ Happy Clients" },
    { icon: <Award className="h-5 w-5" />, text: "98% Success Rate" },
    { icon: <Clock className="h-5 w-5" />, text: "24hr Response Time" },
  ]

  return (
    <section id="contact" className="py-32 md:py-40 bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

      <div className="container px-6 md:px-10 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Psychological Header */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <motion.div
              className="inline-flex items-center bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 text-sm mb-8"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="w-2 h-2 bg-red-400 rounded-full mr-3"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              />
              <span className="text-red-300">Limited Time: Free Strategy Session - {urgencyTimer} minutes left!</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
              Ready to <span className="text-teal-400">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join the <span className="text-teal-400 font-semibold">500+ successful businesses</span> who've
              transformed their growth with our proven strategies.
              <br />
              <span className="text-white font-semibold">Book your FREE strategy session now</span> - normally $500,
              yours free today.
            </p>

            {/* Urgency Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              {urgencyIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 px-4 py-2 rounded-full text-sm text-gray-300 border border-gray-700"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, delay: index * 0.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  {indicator}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Contact Form */}
            <motion.div variants={itemVariants} className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="h-16 w-16 text-teal-400 mb-4" />
                  <h3 className="text-2xl font-medium text-white mb-2">🎉 Congratulations!</h3>
                  <p className="text-gray-400 mb-6">
                    Your FREE strategy session is confirmed! We'll contact you within 2 hours to schedule your call.
                  </p>
                  <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-4 mb-6">
                    <p className="text-teal-400 font-semibold">💰 You just saved $500 on our premium consultation!</p>
                  </div>
                  <Button onClick={() => setIsSubmitted(false)} className="bg-teal-500 hover:bg-teal-600 text-gray-900">
                    Book Another Session
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Get Your FREE Strategy Session</h3>
                    <p className="text-gray-400">
                      Normally $500 - <span className="text-teal-400 font-semibold">FREE for the next 24 hours</span>
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          required
                          className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Business Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          required
                          className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        required
                        className="bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenue" className="text-gray-300">
                        Current Monthly Revenue
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-gray-900/50 border-gray-600 text-white">
                          <SelectValue placeholder="Select revenue range" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-600">
                          <SelectItem value="0-10k">$0 - $10,000</SelectItem>
                          <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k+">$100,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="challenge" className="text-gray-300">
                        Biggest Challenge *
                      </Label>
                      <Textarea
                        id="challenge"
                        placeholder="What's your biggest challenge in growing your business online?"
                        className="min-h-[120px] bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-teal-400"
                        required
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-gray-900 font-bold py-6 text-lg rounded-full shadow-2xl"
                      >
                        <Send className="mr-2 h-5 w-5" />🚀 Claim My FREE $500 Strategy Session
                      </Button>
                    </motion.div>

                    {/* Trust Indicators */}
                    <div className="flex justify-center items-center space-x-6 pt-4 border-t border-gray-700">
                      {trustSignals.map((signal, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-400 text-sm">
                          <div className="text-teal-400">{signal.icon}</div>
                          <span>{signal.text}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-center text-gray-500 pt-4">
                      🔒 Your information is 100% secure. We never share your details.
                    </p>
                  </form>
                </>
              )}
            </motion.div>

            {/* Enhanced Contact Information */}
            <motion.div variants={containerVariants} className="space-y-8">
              {/* Immediate Response Promise */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-500/30 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">⚡ What Happens Next?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                      1
                    </div>
                    <div>
                      <div className="text-white font-medium">Instant Confirmation</div>
                      <div className="text-gray-300 text-sm">You'll receive immediate confirmation of your session</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <div className="text-white font-medium">Personal Call Within 2 Hours</div>
                      <div className="text-gray-300 text-sm">
                        Our strategy expert will call to schedule your session
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center text-gray-900 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <div className="text-white font-medium">Custom Growth Plan</div>
                      <div className="text-gray-300 text-sm">Receive a personalized roadmap to 3x your revenue</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Details */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-teal-400 mt-1" />
                    <div>
                      <h3 className="font-medium text-white text-lg">Our Location</h3>
                      <p className="text-gray-400">123 Innovation Drive, Tech City, TC 10101</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-teal-400 mt-1" />
                    <div>
                      <h3 className="font-medium text-white text-lg">Emergency Hotline</h3>
                      <p className="text-gray-400">+1 (555) 987-6543</p>
                      <p className="text-gray-300 text-sm">Available 24/7 for urgent matters</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-teal-400 mt-1" />
                    <div>
                      <h3 className="font-medium text-white text-lg">Direct Email</h3>
                      <p className="text-gray-400">hello@elevatedigital.com</p>
                      <p className="text-gray-300 text-sm">Response within 2 hours guaranteed</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={itemVariants} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-medium text-white mb-4">Recent Success Story</h3>
                <blockquote className="text-gray-300 italic mb-4">
                  "I was skeptical about another marketing agency, but Elevate Digital delivered results in just 30
                  days. My revenue increased by 180% in 3 months!"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-900 font-bold">MJ</span>
                  </div>
                  <div>
                    <div className="text-white font-medium">Maria Johnson</div>
                    <div className="text-gray-400 text-sm">CEO, EcoSmart Solutions</div>
                    <div className="text-teal-400 text-sm">⭐⭐⭐⭐⭐ 5/5 stars</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
