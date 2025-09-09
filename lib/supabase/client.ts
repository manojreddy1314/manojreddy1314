import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  console.log("[v0] Attempting to create Supabase client...")
  console.log("[v0] SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("[v0] SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Present" : "Missing")

  try {
    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    console.log("[v0] Supabase client created successfully")
    return client
  } catch (error) {
    console.error("[v0] Supabase client creation failed:", error)
    throw error
  }
}
