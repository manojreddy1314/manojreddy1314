"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

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

export default function EditLeadershipMember({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<LeadershipMember | null>(null)
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [bio, setBio] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [email, setEmail] = useState("")
  const [displayOrder, setDisplayOrder] = useState("0")
  const [isActive, setIsActive] = useState(true)
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
      setName(data.name)
      setPosition(data.position)
      setBio(data.bio)
      setImageUrl(data.image_url || "")
      setLinkedinUrl(data.linkedin_url || "")
      setEmail(data.email || "")
      setDisplayOrder(data.display_order.toString())
      setIsActive(data.is_active)
      setIsLoadingMember(false)
    }

    fetchMember()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: updateError } = await supabase
        .from("leadership")
        .update({
          name,
          position,
          bio,
          image_url: imageUrl || null,
          linkedin_url: linkedinUrl || null,
          email: email || null,
          display_order: Number.parseInt(displayOrder),
          is_active: isActive,
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id)

      if (updateError) throw updateError

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
            <h1 className="text-xl font-semibold text-gray-900">Edit Team Member</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Team Member</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position/Title *</Label>
                <Input
                  id="position"
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g., Chief Executive Officer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biography *</Label>
                <Textarea
                  id="bio"
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write a professional biography highlighting experience, achievements, and expertise..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Profile Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/profile-image.jpg"
                />
                {imageUrl && (
                  <div className="mt-2">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@trivix.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  placeholder="0"
                  min="0"
                />
                <p className="text-sm text-gray-600">Lower numbers appear first on the website</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
                <Label htmlFor="isActive">Active (visible on website)</Label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex space-x-4">
                <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Team Member"}
                </Button>
                <Link href="/admin/leadership" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
