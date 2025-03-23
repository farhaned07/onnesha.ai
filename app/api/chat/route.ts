import { Message } from "ai";
import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

// Reduce system prompt size for faster initial processing
const SYSTEM_PROMPT = `You are Onnesha, an AI assistant with a balanced personality that adapts to the conversation context. Follow these guidelines:

1. Core Traits:
   - Be helpful, clear, and concise
   - Maintain a friendly, professional tone
   - Keep responses under 100 words
   - Use 1-2 relevant emojis naturally

2. Response Style:
   - Start with a brief acknowledgment
   - Provide direct, actionable answers
   - End with a follow-up question or suggestion
   - Use simple, clear language

3. Language Adaptation:
   - For Bengali: Use natural Bangla with appropriate honorifics
   - For English: Be direct and professional
   - Avoid technical jargon unless asked

4. Personality Modes:
   - Friendly: Warm and conversational
   - Professional: Clear and structured
   - Creative: Engaging with examples
   - Educational: Simple explanations
   - Empathetic: Understanding and supportive

Remember: Be helpful while maintaining a natural, engaging conversation flow! 😊`;

// Initialize client once for reuse across requests
const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

// Simple Bengali detection using regex
const BENGALI_REGEX = /[\u0980-\u09FF]/;

// Simple response cache for common queries
// This would be better with Redis in production
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const responseCache = new Map<string, { data: string; timestamp: number }>();

// API request timeout (30 seconds)
const API_TIMEOUT = 30000;

// Create a promise that rejects after specified time
function timeoutPromise(ms: number) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
}

// Add UTF-8 encoding helper
const encodeUTF8 = (text: string) => {
  return new TextEncoder().encode(text);
};

export async function POST(req: Request) {
  const startTime = Date.now();
  
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }
    
    const lastMessage = messages[messages.length - 1].content;
    
    // Generate cache key from messages (simplified version - production would use a hash)
    const cacheKey = messages.map(m => `${m.role}:${m.content}`).join('|');
    
    // Check cache for repeated queries
      const cachedResponse = responseCache.get(cacheKey);
    if (cachedResponse && (Date.now() - cachedResponse.timestamp < CACHE_TTL)) {
      console.log(`Cache hit! Serving cached response (${Date.now() - startTime}ms)`);
      
      // Return cached response as a stream with proper encoding
      const readable = new ReadableStream({
        start(controller) {
          // Send the entire cached content as one chunk with proper encoding
          controller.enqueue(encodeUTF8(`0:${JSON.stringify(cachedResponse.data)}\n`));
          controller.enqueue(encodeUTF8("2:[DONE]\n"));
          controller.close();
        }
      });
      
      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          "x-vercel-ai-data-stream": "v1",
        },
      });
    }
    
    // Optimize detection with pre-compiled regex
    const isBengali = BENGALI_REGEX.test(lastMessage);
    const isJsonRequested = /json|structured|format/i.test(lastMessage);
    
    // Log minimally to reduce overhead
    console.log(`Request: ${messages.length} msgs, ${lastMessage.length} chars, lang: ${isBengali ? 'bn' : 'en'}`);
    
    // Prepare optimized options with only necessary fields
    const options: any = {
      model: "mistral-large-latest",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: Message) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      maxTokens: 800,
    };
    
    if (isJsonRequested) {
      options.response_format = { type: "json_object" };
    }

    // Create a streaming response with timeout
    let streamPromise: any;
    try {
      streamPromise = await Promise.race([
        client.chat.stream(options),
        timeoutPromise(API_TIMEOUT)
      ]);
    } catch (error: any) {
      if (error.message?.includes('timed out')) {
        console.error(`API request timed out after ${API_TIMEOUT}ms`);
        return NextResponse.json({ error: "Request timed out" }, { status: 504 });
      }
      throw error;
    }
    
    // Optimized streaming with proper encoding
    let fullResponse = '';
    
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let packetCount = 0;
          
          for await (const chunk of streamPromise) {
            if (chunk.data.choices[0]?.delta?.content) {
              const content = chunk.data.choices[0].delta.content;
              fullResponse += content;
              
              // Streamlined encoding with proper UTF-8 handling
              controller.enqueue(encodeUTF8(`0:${JSON.stringify(content)}\n`));
              packetCount++;
            }
          }
          
          // Cache the full response for future requests
          if (fullResponse && fullResponse.length > 0) {
            responseCache.set(cacheKey, {
              data: fullResponse,
              timestamp: Date.now()
            });
          }
          
          // Send completion marker with proper encoding
          controller.enqueue(encodeUTF8("2:[DONE]\n"));
          controller.close();
          
          // Log completion time
          console.log(`Completed in ${Date.now() - startTime}ms, ${packetCount} packets`);
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    // Return optimized response with proper encoding headers
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        "x-vercel-ai-data-stream": "v1",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    
    return NextResponse.json(
      { error: "Request failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

