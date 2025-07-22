import type React from "react"
import "@/app/globals.css"
import { Inter, Poppins } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import SmoothScroll from "@/components/smooth-scroll"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata = {
  title: "Elevate Digital - Marketing & Branding Agency",
  description:
    "We don't just provide services; we forge partnerships. Digital marketing, branding, and tech solutions for businesses of all sizes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-gray-900 font-sans antialiased text-white", inter.variable, poppins.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SmoothScroll>{children}</SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
