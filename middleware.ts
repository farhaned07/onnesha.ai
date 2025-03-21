import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/chat", "/dashboard", "/profile", "/settings", "/documents"]

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if the path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )
  
  // NextAuth.js token
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  // Authentication logic
  if (isProtectedRoute) {
    // If no token, redirect to sign-in page
    if (!token) {
      const signInUrl = new URL("/sign-in", request.url)
      signInUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(signInUrl)
    }
  } else if (pathname === "/sign-in" || pathname === "/sign-up") {
    // If already authenticated and trying to access sign-in/sign-up pages
    if (token) {
      return NextResponse.redirect(new URL("/chat", request.url))
    }
  }
  
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Protected routes
    "/chat/:path*",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/documents/:path*",
    // Auth pages
    "/sign-in",
    "/sign-up",
  ],
} 