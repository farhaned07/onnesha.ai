"use client"

import { createContext, useContext, ReactNode } from "react"
import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AuthError extends Error {
  type?: string;
}

interface AuthContextType {
  user: any
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { toast } = useToast()
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  const signIn = async (email: string, password: string) => {
    try {
      const result = await nextAuthSignIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!result?.ok) {
        // Determine the specific error
        let errorMessage = "Invalid email or password. Please try again."
        
        if (result?.error === "CredentialsSignin") {
          errorMessage = "Invalid email or password. Please try again."
        } else if (result?.error === "EmailNotVerified") {
          errorMessage = "Please verify your email before signing in."
          router.push(`/verify-email?email=${encodeURIComponent(email)}`)
        } else if (result?.error === "AccessDenied") {
          errorMessage = "Your account has been suspended. Please contact support."
        }
        
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: errorMessage,
        })
        
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error("Sign in error:", error)
      
      if (!(error as AuthError).type) {
        // Only show toast if not already handled above
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: (error as Error).message || "Failed to sign in. Please try again.",
        })
      }
      
      throw error
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      // Call the registration API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        let errorMessage = data.error || "Failed to register. Please try again.";
        
        // Handle specific error types
        if (data.error === "User with this email already exists") {
          errorMessage = "This email is already registered. Please sign in or use a different email.";
        } else if (data.error.includes("Validation failed")) {
          // Extract validation errors for more specific messages
          if (data.details?.password?.message) {
            errorMessage = data.details.password.message;
          } else if (data.details?.email?.message) {
            errorMessage = data.details.email.message;
          } else if (data.details?.name?.message) {
            errorMessage = data.details.name.message;
          }
        }
        
        toast({
          variant: "destructive",
          title: "Registration Error",
          description: errorMessage,
        })
        throw new Error(errorMessage)
      }

      // Send verification email
      try {
        await fetch("/api/send-verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data.user.id, email }),
        })
      } catch (emailError) {
        console.error("Failed to send verification email:", emailError)
        // Continue with redirect even if email fails
      }

      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      })

      // Redirect to email verification page
      router.push(`/verify-email?email=${encodeURIComponent(email)}`)
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await nextAuthSignOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Sign out error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      })
    }
  }

  const resetPassword = async (email: string) => {
    try {
      // Send password reset request
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.error || "Failed to reset password. Please try again."
        
        toast({
          variant: "destructive",
          title: "Error",
          description: errorMessage,
        })
        throw new Error(errorMessage)
      }

      toast({
        title: "Success",
        description: "Password reset instructions have been sent to your email.",
      })
    } catch (error) {
      console.error("Reset password error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: session?.user,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

