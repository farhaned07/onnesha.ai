import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Minimal, bare-bones auth configuration
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Just return a simple user object for testing
        if (credentials?.email === "test@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            name: "Test User",
            email: "test@example.com"
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development-only",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 