import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Briefcase, CheckCircle, Code, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CareersPage() {
  const internships = [
    {
      title: "Graphic Design Intern",
      icon: <PenTool className="h-10 w-10 text-violet-600" />,
      description: "Create compelling visuals for websites, social media, advertisements, and branding materials.",
      requirements: [
        "Currently pursuing or recently completed a degree/diploma in Graphic Design, Fine Arts, or a related field",
        "Proficiency in Adobe Photoshop, Illustrator, and InDesign",
        "A strong portfolio showcasing your creative work",
      ],
      benefits: [
        "Experience with industry-standard design software",
        "Understanding of design principles and brand guidelines",
        "Portfolio-worthy projects",
      ],
    },
    {
      title: "Web Development Intern",
      icon: <Code className="h-10 w-10 text-violet-600" />,
      description: "Work alongside our developers on front-end and back-end tasks, helping to bring websites to life.",
      requirements: [
        "Currently pursuing or recently completed a degree/diploma in Computer Science, Web Development, or a related field",
        "Basic understanding of HTML, CSS, and JavaScript",
        "Familiarity with any relevant frameworks or libraries is a plus",
      ],
      benefits: [
        "Hands-on experience with HTML, CSS, JavaScript, and potentially other frameworks/languages",
        "Understanding of responsive design and web best practices",
        "Exposure to content management systems and version control",
      ],
    },
    {
      title: "Digital Marketing Intern",
      icon: <Briefcase className="h-10 w-10 text-violet-600" />,
      description: "Support our marketing team in executing strategies across various digital channels.",
      requirements: [
        "Currently pursuing or recently completed a degree/diploma in Marketing, Communications, or a related field",
        "Strong written and verbal communication skills",
        "Familiarity with social media platforms and digital trends",
      ],
      benefits: [
        "Practical knowledge of SEO, SEM, social media marketing, and content creation",
        "Experience with marketing analytics tools",
        "Understanding of digital campaign planning and execution",
      ],
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
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Join Our Team</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Are you a passionate and driven student looking to kickstart your career in the dynamic world of
                digital? Our internship programs offer a unique opportunity to learn from industry experts.
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

        {/* Why Join Us Section */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Why Intern with Us?</h2>
                <p className="text-lg text-muted-foreground">
                  At Elevate Digital, we believe in nurturing talent and providing hands-on experience that truly makes
                  a difference. Our internship programs are designed to give you real-world experience while learning
                  from industry experts.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-violet-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Real-World Experience</h3>
                      <p className="text-muted-foreground">
                        Work on live projects and contribute to client success from day one.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-violet-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Mentorship</h3>
                      <p className="text-muted-foreground">
                        Learn directly from seasoned professionals who are eager to share their knowledge and guide your
                        growth.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-violet-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Skill Development</h3>
                      <p className="text-muted-foreground">
                        Enhance your existing skills and acquire new ones in a supportive and collaborative environment.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-violet-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Networking Opportunities</h3>
                      <p className="text-muted-foreground">
                        Connect with industry leaders and build a professional network.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-violet-600 mr-3 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg">Potential for Future Roles</h3>
                      <p className="text-muted-foreground">Many of our interns have gone on to join us full-time!</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt="Our team at work"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-violet-600 p-6 rounded-lg shadow-xl">
                  <p className="text-white font-bold text-xl">Join Our</p>
                  <p className="text-white font-bold text-xl">Growing Team</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internship Opportunities */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-6 md:px-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Internship Opportunities</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We're seeking enthusiastic, creative, and proactive individuals who are eager to learn and make an
                impact. If you're a self-starter with a strong desire to excel, we encourage you to apply!
              </p>
            </div>

            <Tabs defaultValue="graphic" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-3 gap-2 h-auto mb-8">
                <TabsTrigger
                  value="graphic"
                  className="py-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <PenTool className="h-5 w-5" />
                    <span>Graphic Design</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="web"
                  className="py-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Code className="h-5 w-5" />
                    <span>Web Development</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="marketing"
                  className="py-3 data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Digital Marketing</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              {internships.map((internship, index) => (
                <TabsContent key={index} value={index === 0 ? "graphic" : index === 1 ? "web" : "marketing"}>
                  <Card className="border-none shadow-lg">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        {internship.icon}
                        <div>
                          <CardTitle className="text-2xl">{internship.title}</CardTitle>
                          <CardDescription className="text-base">{internship.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-lg mb-4">Requirements</h4>
                          <ul className="space-y-3">
                            {internship.requirements.map((req, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-violet-600 mr-2">•</span>
                                <span className="text-muted-foreground">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-4">What You'll Gain</h4>
                          <ul className="space-y-3">
                            {internship.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-violet-600 mr-2">•</span>
                                <span className="text-muted-foreground">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-violet-600 hover:bg-violet-700">Apply Now</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 md:py-24">
          <div className="container px-6 md:px-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">How to Apply</h2>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg">1</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Prepare Your Application</h3>
                    <p className="text-muted-foreground">
                      Get your resume, cover letter, and portfolio (for Graphic Design and Web Development applicants)
                      ready. In your cover letter, tell us why you're interested in interning with Elevate Digital and
                      which internship opportunity you're applying for.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg">2</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Submit Your Application</h3>
                    <p className="text-muted-foreground">
                      Send your application materials to careers@elevatedigital.com with the subject line "[Internship
                      Position] - Your Name". We review applications on a rolling basis.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg">3</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Interview Process</h3>
                    <p className="text-muted-foreground">
                      If your application is selected, you'll be invited for an initial interview, followed by a skills
                      assessment relevant to the position. This helps us understand your strengths and how you might fit
                      with our team.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="bg-violet-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg">4</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Onboarding</h3>
                    <p className="text-muted-foreground">
                      Successful candidates will receive an offer and be welcomed to the team! We'll provide a
                      comprehensive onboarding process to help you get started on your journey with us.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
                  Apply Today
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-violet-600 text-white">
          <div className="container px-6 md:px-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Have Questions?</h2>
              <p className="text-lg text-white/80 mb-8">
                If you have any questions about our internship program or the application process, don't hesitate to
                reach out to our team.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-violet-600 bg-transparent"
              >
                <Link href="/#contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
