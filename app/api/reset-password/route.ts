import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import crypto from "crypto"
import { sendEmail } from "@/lib/email"

const prisma = new PrismaClient()

// Schema for validating password reset data
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate the request data
    const validationResult = resetPasswordSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validationResult.error.format() },
        { status: 400 }
      )
    }
    
    const { email } = validationResult.data
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })
    
    if (!user) {
      // For security reasons, don't indicate whether the email exists or not
      return NextResponse.json(
        { success: true, message: "If your email is registered with us, you'll receive a password reset link shortly." },
        { status: 200 }
      )
    }
    
    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex')
    
    // Delete any existing tokens for this user
    await prisma.verificationToken.deleteMany({
      where: {
        identifier: email,
      }
    })
    
    // Save the token with an expiry (1 hour)
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 3600 * 1000) // 1 hour
      }
    })
    
    // Construct reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${token}`
    
    // Send email with reset link
    await sendEmail({
      to: email,
      subject: "Reset Your Password - Onnesha AI Assistant",
      text: `Click the link to reset your password: ${resetUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p>We received a request to reset your password for your Onnesha AI Assistant account.</p>
          <p>Please click the button below to reset your password:</p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #4361ee; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, you can safely ignore this email.</p>
          <p>Thank you,<br>Onnesha AI Assistant Team</p>
        </div>
      `
    })
    
    return NextResponse.json(
      { success: true, message: "If your email is registered with us, you'll receive a password reset link shortly." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    )
  }
} 