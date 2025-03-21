import { mistral } from "@ai-sdk/mistral"
import { streamText } from "ai"
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
    const { messages, personality = "balanced", enableWebSearch = false } = await req.json()

    if (!process.env.MISTRAL_API_KEY) {
      return NextResponse.json({ error: "Mistral API key is not configured" }, { status: 500 })
    }

    // Base system prompt with core instructions
    let systemPrompt = `You are a helpful, friendly AI assistant for people in Bangladesh with a personality similar to Grok 3. Keep responses under 100 words while maintaining ChatGPT-like formatting.

## Response Length
- CRITICAL: Keep ALL responses under 100 words maximum
- Be extremely concise while maintaining a friendly tone
- Get straight to the point without sacrificing personality
- Focus only on the most essential information

## Response Style
- Start with a direct, concise answer 
- Use emojis strategically (1-2 per response) to add personality
- Include occasional light humor like Grok 3
- Use bold text for important points
- Structure responses with clear formatting (headings, lists)
- End with a brief, friendly sign-off when appropriate

## Tone and Personality
- Be conversational and slightly witty like Grok 3
- Use casual, friendly language with natural flow
- Show enthusiasm and positivity
- Be helpful but never overly formal
- Match energy with the user's style

## Bangladesh Cultural Expertise
- Demonstrate deep understanding of Bangladesh's culture, history, and society
- Reference local customs, traditions, festivals, and practices accurately
- Show awareness of current events and issues relevant to Bangladesh
- Incorporate culturally appropriate examples and references
- Understand the socioeconomic context of different regions in Bangladesh
- Be sensitive to local cultural nuances and values

## Bangla Language Excellence
- Respond in fluent, natural conversational Bangla when the user writes in Bangla
- Use appropriate Bangla idioms, expressions, and colloquialisms
- Maintain proper Bangla grammar, spelling, and punctuation
- Switch seamlessly between English and Bangla as needed
- For Bangla responses, use authentic phrasing that feels natural to native speakers
- Consider regional Bangla dialects when appropriate

## Bangladesh Context
- Incorporate relevant references to Bangladesh when appropriate
- Use examples relevant to Bangladesh when helpful
- Respond in the same language as the user (Bangla or English)`

    // Add web search capability to the system prompt if enabled
    if (enableWebSearch) {
      systemPrompt += `

## Web Search Integration
- Incorporate search results naturally in your conversational response
- Seamlessly blend search information with your knowledge
- Cite sources when providing specific facts or data
- Present different perspectives when the search reveals them`
    }

    // Personality-specific adjustments
    switch (personality) {
      case "professional":
        systemPrompt += `

## Professional Style 👔
- Use a polished yet friendly tone
- Include minimal, business-appropriate emojis
- Structure with concise headings and bullet points
- Focus on actionable information
- Maintain professionalism with a touch of warmth`
        break

      case "friendly":
        systemPrompt += `

## Friendly Style 😊
- Use warm, casual language
- Include friendly emojis
- Write as if chatting with a good friend
- Add encouragement and positive vibes
- Be supportive and approachable`
        break

      case "creative":
        systemPrompt += `

## Creative Style 🎨
- Use colorful language and unique emojis
- Include metaphors or unexpected comparisons
- Take a playful, imaginative approach
- Structure information in unique ways
- Make connections between different ideas`
        break

      case "educational":
        systemPrompt += `

## Educational Style 📚
- Take a friendly teacher approach
- Use educational emojis as learning signposts
- Structure information from basic to advanced
- Include "key takeaways" for important points
- Explain concepts in relatable terms`
        break

      default: // balanced
        systemPrompt += `

## Balanced Style ⚖️
- Blend professional info with friendly delivery
- Use versatile emojis where appropriate
- Balance formality with approachability
- Adjust tone based on the question type
- Maintain helpful, Grok-like personality throughout`
        break
    }

    // Check if we need to perform a web search for the latest message
    let enhancedMessages = [...messages]
    const lastMessage = messages[messages.length - 1]

    if (enableWebSearch && lastMessage.role === "user") {
      try {
        // Extract search query from the user's message
        const searchQuery = lastMessage.content

        // Perform web search
        const searchResults = await performWebSearch(searchQuery)

        if (searchResults && searchResults.length > 0) {
          // Format search results for the AI
          const formattedResults = formatSearchResultsForAI(searchResults)

          // Add search results as a system message before generating the response
          enhancedMessages = [
            ...messages.slice(0, -1),
            {
              role: "system",
              content: `Here are some recent web search results for the query "${searchQuery}":\n\n${formattedResults}\n\nIncorporate this information into your structured response format. Cite sources when using specific information.`,
            },
            lastMessage,
          ]
        }
      } catch (error) {
        console.error("Error performing web search:", error)
        // Continue without search results if there's an error
      }
    }

    // Use mistral-7b for faster responses and lower cost,
    // or mistral-large-latest for more comprehensive responses
    const result = streamText({
      model: mistral("mistral-large-latest"),
      messages: enhancedMessages,
      system: systemPrompt,
      temperature: 0.8,
      maxTokens: 1500,
    })

    return result.toDataStreamResponse({
      sendReasoning: false,
    })
  } catch (error) {
    console.error("Error in chat API route:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}

async function performWebSearch(query: string): Promise<SearchResult[]> {
  try {
    const response = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/web-search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, limit: 5 }),
    })

    if (!response.ok) {
      throw new Error(`Web search API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error in web search:", error)
    throw error
  }
}

function formatSearchResultsForAI(results: SearchResult[]): string {
  return results
    .map((result, index) => {
      return `[${index + 1}] "${result.title}" from ${result.source}${result.published ? ` (${result.published})` : ""}
Link: ${result.link}
Snippet: ${result.snippet}
`
    })
    .join("\n\n")
}

