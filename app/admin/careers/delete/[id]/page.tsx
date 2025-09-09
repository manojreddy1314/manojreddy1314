"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { AlertTriangleIcon } from "lucide-react"

interface Career {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  experience_level: string
  description: string
  requirements: string
  responsibilities: string
  salary_range: string | null
  is_active: boolean
}

export default function DeleteCareerPosting({ params }: { params: { id: string } }) {
  const [career, setCareer] = useState<Career | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCareer, setIsLoadingCareer] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCareer = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("careers").select("*").eq("id", params.id).single()

      if (error) {
        setError("Failed to load career posting")
        setIsLoadingCareer(false)
        return
      }

      setCareer(data)
      setIsLoadingCareer(false)
    }

    fetchCareer()
  }, [params.id])

  const handleDelete = async () => {
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: deleteError } = await supabase.from("careers").delete().eq("id", params.id)

      if (deleteError) throw deleteError

      router.push("/admin/careers")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingCareer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading career posting...</p>
        </div>
      </div>
    )
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Career posting not found</p>
          <Link href="/admin/careers">
            <Button>Back to Careers</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/admin/careers" className="text-blue-600 hover:text-blue-800 mr-4">
              ← Back to Careers
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Delete Job Posting</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangleIcon className="h-5 w-5" />
              <span>Confirm Deletion</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800 font-medium mb-2">Warning: This action cannot be undone.</p>
              <p className="text-red-700 text-sm">
                You are about to permanently delete this job posting. This will remove it from your website immediately
                and any applicants will no longer be able to apply.
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{career.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{career.department}</Badge>
                    <Badge variant="outline">{career.location}</Badge>
                    <Badge variant="outline">{career.employment_type}</Badge>
                    <Badge variant="outline">{career.experience_level}</Badge>
                    <Badge variant={career.is_active ? "default" : "secondary"}>
                      {career.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                {career.salary_range && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Salary:</span> {career.salary_range}
                  </p>
                )}
                <p className="text-sm text-gray-600 line-clamp-3">{career.description}</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Deleting..." : "Yes, Delete Job Posting"}
              </Button>
              <Link href="/admin/careers" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
