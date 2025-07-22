"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Briefcase, Code, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CareersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

  const internships = [
    {
      title: "Graphic Design Intern",
      icon: <PenTool className="h-8 w-8" />,
      description: "Create compelling visuals for websites, social media, advertisements, and branding materials.",
    },
    {
      title: "Web Development Intern",
      icon: <Code className="h-8 w-8" />,
      description: "Work alongside our developers on front-end and back-end tasks, helping to bring websites to life.",
    },
    {
      title: "Digital Marketing Intern",
      icon: <Briefcase className="h-8 w-8" />,
      description: "Support our marketing team in executing strategies across various digital channels.",
    },
  ]

  return (
    <section id="careers" className="py-32 md:py-40 bg-gray-800">
      <div className="container px-6 md:px-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
              Join Our <span className="text-teal-400">Team</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Are you a passionate and driven student looking to kickstart your career in the dynamic world of digital?
              Our internship programs offer a unique opportunity to learn from industry experts.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {internships.map((internship, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="bg-gray-900/50 p-8 rounded-lg h-full flex flex-col hover:bg-gray-900/80 transition-colors">
                  <div className="text-teal-400 mb-6">{internship.icon}</div>
                  <h3 className="text-xl font-medium text-white mb-4">{internship.title}</h3>
                  <p className="text-gray-400 flex-grow">{internship.description}</p>
                  <Button
                    variant="outline"
                    className="mt-6 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-gray-900 px-8 py-6 text-lg font-medium rounded-full"
            >
              View All Opportunities
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
