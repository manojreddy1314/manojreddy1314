"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, User, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  published_date: string
  is_active: boolean
  display_order: number
  created_at: string
}

export default function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .select("*")
        .order("display_order", { ascending: true })

      if (error) throw error
      setArticles(data || [])
    } catch (error) {
      console.error("Error fetching articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("news_articles").update({ is_active: !currentStatus }).eq("id", id)

      if (error) throw error
      fetchArticles()
    } catch (error) {
      console.error("Error updating article status:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
            <p className="text-gray-600 mt-2">Manage news articles and industry updates</p>
          </div>
          <Link href="/admin/news/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Article
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <Badge variant={article.is_active ? "default" : "secondary"} className="text-xs">
                        {article.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900 mb-2">{article.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(article.published_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActiveStatus(article.id, article.is_active)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {article.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Link href={`/admin/news/edit/${article.id}`}>
                      <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 bg-transparent">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/news/delete/${article.id}`}>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{article.excerpt}</CardDescription>
              </CardContent>
            </Card>
          ))}

          {articles.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-gray-500 mb-4">No news articles found</p>
                <Link href="/admin/news/new">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Article
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
