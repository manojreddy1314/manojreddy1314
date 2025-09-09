import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await updateSession(request)
  }

  // For all other routes, just continue without Supabase session handling
  return
}

export const config = {
  matcher: ["/admin/:path*"],
}
