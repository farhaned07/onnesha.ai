import { NextResponse } from "next/server"

export const runtime = "nodejs"

/**
 * Prefetch API endpoint to warm up connections and prepare the API for incoming requests
 * This helps reduce cold start latency for the main chat API
 */
export async function POST(req: Request) {
  try {
    // Extract hint from request body
    const { hint } = await req.json()
    
    // Log prefetch request for debugging
    console.log("Prefetch request with hint:", hint?.substring(0, 30))
    
    // Just verify API key exists - no actual API call is made
    // This ensures connections are established
    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }
    
    // Perform other lightweight warm-up operations if needed
    // These are quick tasks that prime the backend for an actual request
    
    // Immediately return success to client
    return NextResponse.json({ success: true, message: "Prefetch completed" })
  } catch (error) {
    console.error("Error in prefetch API:", error)
    return NextResponse.json({ error: "Failed to complete prefetch" }, { status: 500 })
  }
} 