"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)

  const loadingPhases = [
    "Initializing...",
    "Loading Assets...",
    "Preparing Experience...",
    "Almost Ready...",
    "Welcome!",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1.5

        // Update phase based on progress
        if (newProgress >= 20 && currentPhase === 0) setCurrentPhase(1)
        if (newProgress >= 40 && currentPhase === 1) setCurrentPhase(2)
        if (newProgress >= 70 && currentPhase === 2) setCurrentPhase(3)
        if (newProgress >= 90 && currentPhase === 3) setCurrentPhase(4)

        if (newProgress >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 1000)
          }, 800)
          return 100
        }
        return newProgress
      })
    }, 60)

    return () => clearInterval(timer)
  }, [onComplete, currentPhase])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Animated Grid Background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0px 0px", "50px 50px"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>

          {/* Floating Geometric Shapes */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`shape-${i}`}
              className="absolute"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + Math.sin(i) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              {i % 3 === 0 ? (
                <div className="w-4 h-4 border border-teal-400 rotate-45" />
              ) : i % 3 === 1 ? (
                <div className="w-3 h-3 bg-teal-400 rounded-full" />
              ) : (
                <div className="w-5 h-1 bg-teal-400" />
              )}
            </motion.div>
          ))}

          {/* Central Loading Animation */}
          <div className="relative flex items-center justify-center">
            {/* Outer rotating rings with different speeds */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 100 + i * 50,
                  height: 100 + i * 50,
                  border: `2px solid rgba(20, 184, 166, ${0.1 + i * 0.1})`,
                  borderTopColor: `rgba(20, 184, 166, ${0.3 + i * 0.2})`,
                  borderRightColor: "transparent",
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3 + i * 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}

            {/* Pulsing inner circles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute rounded-full"
                style={{
                  width: 60 - i * 12,
                  height: 60 - i * 12,
                  backgroundColor: `rgba(20, 184, 166, ${0.1 + i * 0.05})`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 - i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Orbiting elements */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute w-2 h-2 bg-teal-400 rounded-full"
                style={{
                  transformOrigin: `${80 + Math.floor(i / 4) * 40}px 0px`,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + Math.floor(i / 4) * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.2,
                }}
                initial={{
                  rotate: i * 30,
                }}
              />
            ))}

            {/* Center content with enhanced animations */}
            <motion.div
              className="relative z-10 text-center"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {/* Brand name with letter animation */}
              <motion.div className="text-white font-light text-3xl tracking-wider mb-6">
                {"ELEVATE".split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    animate={{
                      y: [0, -10, 0],
                      color: ["#ffffff", "#14b8a6", "#ffffff"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>

              {/* Animated tagline */}
              <motion.div
                className="text-gray-400 text-sm mb-8 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.span
                  key={currentPhase}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {loadingPhases[currentPhase]}
                </motion.span>
              </motion.div>

              {/* Enhanced progress bar */}
              <motion.div
                className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4 relative"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 rounded-full relative"
                  style={{
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Glowing effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Progress percentage with animation */}
              <motion.div
                className="text-teal-400 text-lg font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.floor(progress)}%
                </motion.span>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced corner decorations with animations */}
          {[
            { position: "top-8 left-8", borders: "border-l-2 border-t-2", delay: 0.3 },
            { position: "top-8 right-8", borders: "border-r-2 border-t-2", delay: 0.5 },
            { position: "bottom-8 left-8", borders: "border-l-2 border-b-2", delay: 0.7 },
            { position: "bottom-8 right-8", borders: "border-r-2 border-b-2", delay: 0.9 },
          ].map((corner, i) => (
            <motion.div
              key={i}
              className={`absolute ${corner.position} w-20 h-20 ${corner.borders} border-gray-600`}
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{
                opacity: [0, 1, 0.5, 1],
                scale: 1,
                rotate: 0,
              }}
              transition={{
                delay: corner.delay,
                duration: 1,
                opacity: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />
          ))}

          {/* Animated particles with trails */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? "#14b8a6" : i % 3 === 1 ? "#0d9488" : "#2dd4bf",
              }}
              animate={{
                y: [0, -200, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-full h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
              animate={{
                y: ["0vh", "100vh"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Digital noise overlay */}
          <motion.div
            className="absolute inset-0 opacity-5 pointer-events-none"
            animate={{
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 0.1,
              repeat: Number.POSITIVE_INFINITY,
            }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
