import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon, EditIcon, TrashIcon, UsersIcon, LinkedinIcon, MailIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function LeadershipManagement() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/admin/login")
  }

  // Check if user is admin
  const { data: adminUser, error: adminError } = await supabase
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .single()

  if (adminError || !adminUser) {
    redirect("/admin/login")
  }

  // Get all leadership team members
  const { data: leadership, error: leadershipError } = await supabase
    .from("leadership")
    .select("*")
    .order("display_order", { ascending: true })

  if (leadershipError) {
    console.error("Error fetching leadership:", leadershipError)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Leadership Management</h1>
            </div>
            <Link href="/admin/leadership/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {leadership && leadership.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leadership.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/leadership-placeholder.png"
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={member.is_active ? "default" : "secondary"}>
                      {member.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-purple-600 font-medium">{member.position}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Order: {member.display_order}</span>
                    <div className="flex space-x-2">
                      {member.linkedin_url && <LinkedinIcon className="h-4 w-4 text-blue-600" />}
                      {member.email && <MailIcon className="h-4 w-4 text-gray-600" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {member.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>}
                  <div className="flex space-x-2">
                    <Link href={`/admin/leadership/edit/${member.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <EditIcon className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/admin/leadership/delete/${member.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-red-600 hover:text-red-700 bg-transparent"
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No leadership team members yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first team member.</p>
            <Link href="/admin/leadership/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add First Team Member
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
