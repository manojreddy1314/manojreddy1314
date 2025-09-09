"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangleIcon, LinkedinIcon, MailIcon } from "lucide-react"

interface LeadershipMember {
  id: string
  name: string
  position: string
  bio: string
  image_url: string | null
  linkedin_url: string | null
  email: string | null
  display_order: number
  is_active: boolean
}

export default function DeleteLeadershipMember({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<LeadershipMember | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingMember, setIsLoadingMember] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchMember = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from("leadership").select("*").eq("id", params.id).single()

      if (error) {
        setError("Failed to load team member")
        setIsLoadingMember(false)
        return
      }

      setMember(data)
      setIsLoadingMember(false)
    }

    fetchMember()
  }, [params.id])

  const handleDelete = async () => {
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: deleteError } = await supabase.from("leadership").delete().eq("id", params.id)

      if (deleteError) throw deleteError

      router.push("/admin/leadership")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingMember) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team member...</p>
        </div>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Team member not found</p>
          <Link href="/admin/leadership">
            <Button>Back to Leadership</Button>
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
            <Link href="/admin/leadership" className="text-blue-600 hover:text-blue-800 mr-4">
              ← Back to Leadership
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Delete Team Member</h1>
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
                You are about to permanently delete this team member from your leadership section. This will remove them
                from your website immediately.
              </p>
            </div>

            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="flex space-x-4">
                <img
                  src={member.image_url || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/leadership-placeholder.png"
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{member.name}</h3>
                  <p className="text-purple-600 font-medium">{member.position}</p>
                  <p className="text-sm text-gray-600 mt-1">Display Order: {member.display_order}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    {member.linkedin_url && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <LinkedinIcon className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MailIcon className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                    )}
                  </div>
                  {member.bio && <p className="text-sm text-gray-600 mt-3 line-clamp-3">{member.bio}</p>}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <Button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                {isLoading ? "Deleting..." : "Yes, Delete Team Member"}
              </Button>
              <Link href="/admin/leadership" className="flex-1">
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
