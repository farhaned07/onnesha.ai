import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

const prisma = new PrismaClient()

// Schema for validating query parameters
const userLookupSchema = z.object({
  email: z.string().email("Invalid email format"),
})

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get("email")
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }
    
    // Validate the email parameter
    const validationResult = userLookupSchema.safeParse({ email })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      )
    }
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        emailVerified: true,
      },
    })
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
    
    // Return only the userId to avoid exposing sensitive information
    return NextResponse.json(
      { userId: user.id, isVerified: !!user.emailVerified },
      { status: 200 }
    )
  } catch (error) {
    console.error("User lookup error:", error)
    return NextResponse.json(
      { error: "Failed to lookup user" },
      { status: 500 }
    )
  }
} 