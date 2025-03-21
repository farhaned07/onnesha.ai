import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Define the search result interface
interface SearchResult {
  title: string
  link: string
  snippet: string
  source: string
  published?: string
}

export async function POST(req: Request) {
  try {
    const { query, limit = 5 } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    // You can use any search API here. For this example, we'll use Serper.dev
    // You'll need to add SERPER_API_KEY to your environment variables
    if (!process.env.SERPER_API_KEY) {
      return NextResponse.json({ error: "Search API key is not configured" }, { status: 500 })
    }

    const results = await fetchSearchResults(query, limit)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error in web search API route:", error)
    return NextResponse.json({ error: "An error occurred while processing your search request" }, { status: 500 })
  }
}

async function fetchSearchResults(query: string, limit: number): Promise<SearchResult[]> {
  try {
    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: query,
        num: limit,
      }),
    })

    if (!response.ok) {
      throw new Error(`Search API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    // Transform the response to our SearchResult format
    const results: SearchResult[] = []

    // Process organic search results
    if (data.organic) {
      data.organic.slice(0, limit).forEach((item: any) => {
        results.push({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
          source: new URL(item.link).hostname.replace("www.", ""),
          published: item.date,
        })
      })
    }

    return results
  } catch (error) {
    console.error("Error fetching search results:", error)
    throw error
  }
}

