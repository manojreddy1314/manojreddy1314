import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusIcon, EditIcon, TrashIcon, BriefcaseIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function CareersManagement() {
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

  // Get all career postings
  const { data: careers, error: careersError } = await supabase
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false })

  if (careersError) {
    console.error("Error fetching careers:", careersError)
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
              <h1 className="text-xl font-semibold text-gray-900">Careers Management</h1>
            </div>
            <Link href="/admin/careers/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {careers && careers.length > 0 ? (
          <div className="space-y-6">
            {careers.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{job.department}</Badge>
                        <Badge variant="outline">{job.location}</Badge>
                        <Badge variant="outline">{job.employment_type}</Badge>
                        <Badge variant="outline">{job.experience_level}</Badge>
                        <Badge variant={job.is_active ? "default" : "secondary"}>
                          {job.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {job.salary_range && (
                        <p className="text-sm text-gray-600 font-medium">Salary: {job.salary_range}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{job.description}</p>
                  <div className="flex space-x-2">
                    <Link href={`/admin/careers/edit/${job.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <EditIcon className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/admin/careers/delete/${job.id}`} className="flex-1">
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
            <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No job postings yet</h3>
            <p className="text-gray-600 mb-6">Get started by posting your first job opening.</p>
            <Link href="/admin/careers/new">
              <Button className="bg-green-600 hover:bg-green-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Post First Job
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
