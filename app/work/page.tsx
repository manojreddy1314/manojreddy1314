import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkPage() {
  const projects = [
    {
      id: 1,
      title: "Vidrava Technologies",
      description: "Web development, logo design, and patent assistance for a tech startup.",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      services: ["Web Development", "Logo Design", "Patent Assistance"],
      testimonial: {
        text: "Elevate Digital transformed our online presence. Their team delivered a website that perfectly captures our brand identity.",
        author: "Alex Chen, CEO of Vidrava Technologies",
      },
    },
    {
      id: 2,
      title: "K2VR Analytical Research",
      description: "Complete digital marketing strategy including SEO, SEM, and analytics setup.",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      services: ["Web Development", "SEO", "SEM", "Analytics"],
      testimonial: {
        text: "The SEO and SEM strategies implemented by Elevate Digital have significantly increased our organic traffic and lead generation.",
        author: "Sarah Johnson, Marketing Director at K2VR",
      },
    },
    {
      id: 3,
      title: "WAEs Café",
      description: "Complete startup solution including branding, packaging, and web development.",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      services: ["Web Development", "Branding", "Packaging", "Startup Solutions"],
      testimonial: {
        text: "From logo design to packaging and website, Elevate Digital created a cohesive brand identity that our customers love.",
        author: "Michael Torres, Founder of WAEs Café",
      },
    },
    {
      id: 4,
      title: "Fitness Revolution",
      description: "Brand identity and digital marketing campaign for a fitness studio chain.",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      services: ["Branding", "Digital Marketing", "Social Media", "Content Creation"],
      testimonial: {
        text: "The rebranding and marketing campaign helped us increase membership by 45% within three months.",
        author: "Jessica Lee, Owner of Fitness Revolution",
      },
    },
    {
      id: 5,
      title: "EcoSmart Solutions",
      description: "E-commerce website and digital strategy for an eco-friendly product line.",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      services: ["E-commerce Development", "SEO", "Product Photography", "Email Marketing"],
      testimonial: {
        text: "Our online sales have doubled since launching the new website and implementing the digital strategy.",
        author: "David Wilson, Founder of EcoSmart Solutions",
      },
    },
    {
      id: 6,
      title: "Global Finance Partners",
      description: "Corporate website redesign and content strategy for a financial services firm.",
      image: "/placeholder.svg?height=600&width=800",
      link: "#",
      services: ["Web Design", "Content Strategy", "SEO", "Branding"],
      testimonial: {
        text: "The new website has significantly improved our lead generation and professional image in the industry.",
        author: "Robert Chang, Managing Partner at Global Finance Partners",
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-6 md:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Work</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our portfolio of successful projects and see how we&apos;ve helped businesses achieve their
                digital goals.
              </p>
              <Button asChild variant="outline">
                <Link href="/" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link
                        href={project.link}
                        className="bg-violet-600 text-white px-4 py-2 rounded-md flex items-center"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services.slice(0, 3).map((service, index) => (
                      <span key={index} className="bg-muted text-xs px-3 py-1 rounded-full">
                        {service}
                      </span>
                    ))}
                    {project.services.length > 3 && (
                      <span className="bg-muted text-xs px-3 py-1 rounded-full">
                        +{project.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-violet-600 text-white">
          <div className="container px-6 md:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-lg text-white/80 mb-8">
                Let&apos;s discuss how we can help your business grow with our digital marketing and branding expertise.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-violet-600 bg-transparent"
              >
                <Link href="/#contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
