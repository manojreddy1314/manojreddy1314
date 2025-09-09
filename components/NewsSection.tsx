"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronRight } from "lucide-react"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  published_date: string
  is_active: boolean
}

const fallbackArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Advanced Manufacturing Solutions for Industry 4.0",
    excerpt:
      "Discover how our cutting-edge press tool and mould design services are helping manufacturers transition to smart manufacturing processes.",
    category: "Manufacturing",
    author: "Trivix Team",
    published_date: "2024-01-15",
    is_active: true,
  },
  {
    id: "2",
    title: "Quality Inspection Excellence with VMS/CMM Technology",
    excerpt:
      "Learn about our precision quality control methods using advanced coordinate measuring machines and vision measurement systems.",
    category: "Quality Control",
    author: "Trivix Team",
    published_date: "2024-01-10",
    is_active: true,
  },
  {
    id: "3",
    title: "Training the Next Generation of Engineers",
    excerpt:
      "Our comprehensive training programs are preparing diploma and engineering students for successful careers in modern manufacturing.",
    category: "Training",
    author: "Trivix Team",
    published_date: "2024-01-05",
    is_active: true,
  },
]

export default function NewsSection() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchArticles() {
      try {
        console.log("[v0] Attempting to create Supabase client...")
        const supabase = createClient()
        console.log("[v0] Supabase client created successfully")

        const { data, error } = await supabase
          .from("news_articles")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true })
          .limit(3)

        if (error) {
          if (
            error.message.includes("does not exist") ||
            error.message.includes("table") ||
            error.message.includes("schema cache") ||
            error.message.includes("news_articles")
          ) {
            console.log("[v0] Database table 'news_articles' not found - setup scripts need to be run")
            setError("Database tables not created yet. Please run the setup scripts to enable dynamic content.")
          } else {
            console.log("[v0] Database connection error, using fallback content")
            setError("Unable to connect to database. Showing sample content.")
          }
          setArticles(fallbackArticles)
        } else {
          console.log("[v0] Successfully fetched news articles:", data?.length || 0)
          setArticles(data || fallbackArticles)
          setError(null)
        }
      } catch (err) {
        console.log("[v0] Unexpected error occurred, using fallback content")
        setError("Unable to load articles. Showing sample content.")
        setArticles(fallbackArticles)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading news articles...</p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> {error} Showing sample content below.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(article.published_date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-lg text-gray-900 leading-tight">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4 leading-relaxed">{article.excerpt}</CardDescription>
              <Button
                variant="outline"
                size="sm"
                className="text-[var(--trivix-blue)] border-[var(--trivix-blue)] hover:bg-[var(--trivix-blue)] hover:text-white bg-transparent"
              >
                Read More
                <ChevronRight className="ml-1 w-3 h-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
