import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables:", {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey,
    })
    throw new Error("Supabase environment variables are not configured. Please check your project settings.")
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
