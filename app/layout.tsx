import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ToastProvider } from "@/components/ui/toast"
import { poppins } from "@/app/fonts"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "onnesha - AI Assistant",
  description: "AI assistant optimized for Bangla speakers",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("dark", poppins.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-[#1A1B1E] font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}