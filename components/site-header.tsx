"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Home", href: isHomePage ? "#hero" : "/" },
    { name: "About Us", href: isHomePage ? "#about" : "/#about" },
    { name: "Services", href: isHomePage ? "#services" : "/#services" },
    { name: "Work", href: isHomePage ? "#work" : "/#work" },
    { name: "Careers", href: isHomePage ? "#careers" : "/#careers" },
    { name: "Contact", href: isHomePage ? "#contact" : "/#contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 px-6 md:px-10",
        scrolled ? "bg-gray-900/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center mr-3">
            <span className="text-gray-900 font-bold text-lg">E</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-300 hover:text-teal-400 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button className="bg-teal-500 hover:bg-teal-600 text-gray-900 font-medium px-6 py-2 rounded-full" asChild>
            <Link href="#contact">Let's Talk</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          <span className="sr-only">Toggle menu</span>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-[88px] z-50 bg-gray-900 lg:hidden">
          <nav className="container mx-auto py-8 flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium px-6 py-2 text-gray-300 hover:text-teal-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-6 pt-4">
              <Button
                className="w-full bg-teal-500 hover:bg-teal-600 text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Let's Talk
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
