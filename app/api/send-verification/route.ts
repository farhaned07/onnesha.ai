import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import crypto from "crypto"
import { sendEmail } from "@/lib/email"

const prisma = new PrismaClient()

// Schema for validating request data
const sendVerificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email format"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate the request data
    const validationResult = sendVerificationSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      )
    }
    
    const { userId, email } = validationResult.data
    
    // Find user to ensure they exist
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
    
    // Generate a verification token
    const token = crypto.randomBytes(32).toString('hex')
    
    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
      }
    })
    
    // Save the token with an expiry (24 hours for email verification)
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 24 * 3600 * 1000) // 24 hours
      }
    })
    
    // Construct verification URL
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email/${token}`
    
    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify Your Email - Onnesha AI Assistant",
      text: `Thank you for registering with Onnesha AI Assistant. Please verify your email by clicking this link: ${verificationUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Verify Your Email</h2>
          <p>Thank you for registering with Onnesha AI Assistant.</p>
          <p>Please click the button below to verify your email address:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #4361ee; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
          <p>If you didn't request this verification, you can safely ignore this email.</p>
          <p>Thank you,<br>Onnesha AI Assistant Team</p>
        </div>
      `
    })
    
    return NextResponse.json(
      { success: true, message: "Verification email sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Send verification error:", error)
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 500 }
    )
  }
} 