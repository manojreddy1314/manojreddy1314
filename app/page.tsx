"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import WorkSection from "@/components/work-section"
import CareersSection from "@/components/careers-section"
import ContactSection from "@/components/contact-section"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import LoadingScreen from "@/components/loading-screen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <div className="flex min-h-screen flex-col bg-gray-900">
          <SiteHeader />
          <main className="flex-1">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <WorkSection />
            <CareersSection />
            <ContactSection />
          </main>
          <SiteFooter />
        </div>
      )}
    </>
  )
}
