"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trash2, Calendar, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DeleteNewsArticleProps {
  params: { id: string }
}

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  category: string
  author: string
  published_date: string
  is_active: boolean
}

export default function DeleteNewsArticle({ params }: DeleteNewsArticleProps) {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase.from("news_articles").select("*").eq("id", params.id).single()

      if (error) throw error
      setArticle(data)
    } catch (error) {
      console.error("Error fetching article:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!article) return

    setDeleting(true)
    try {
      const { error } = await supabase.from("news_articles").delete().eq("id", params.id)

      if (error) throw error

      router.push("/admin/news")
    } catch (error) {
      console.error("Error deleting article:", error)
      alert("Error deleting article. Please try again.")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">Article not found</p>
              <Link href="/admin/news">
                <Button className="mt-4">Back to News</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/news">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Delete News Article</h1>
            <p className="text-gray-600 mt-1">This action cannot be undone</p>
          </div>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center">
              <Trash2 className="w-5 h-5 mr-2" />
              Confirm Deletion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-medium mb-2">You are about to permanently delete this news article:</p>
              <div className="bg-white rounded border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <Badge variant={article.is_active ? "default" : "secondary"} className="text-xs">
                    {article.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.published_date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{article.excerpt}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleDelete} disabled={deleting} className="bg-red-600 hover:bg-red-700 text-white">
                <Trash2 className="w-4 h-4 mr-2" />
                {deleting ? "Deleting..." : "Delete Article"}
              </Button>
              <Link href="/admin/news">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
