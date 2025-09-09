import { createClient } from "@/lib/supabase/server"
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

export default async function NewsSection() {
  const supabase = await createClient()

  const { data: articles, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .limit(3)

  if (error) {
    console.error("Error fetching news articles:", error)
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Unable to load news articles at this time.</p>
      </div>
    )
  }

  const newsArticles = articles || []

  if (newsArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No news articles available at this time.</p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {newsArticles.map((article) => (
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
  )
}
