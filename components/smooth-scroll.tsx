"use client"

import type React from "react"

import { useEffect } from "react"

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Smooth scroll to anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute("href")
        if (!targetId) return

        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })

          // Update URL without page reload
          window.history.pushState(null, "", targetId)
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
