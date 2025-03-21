"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserProfile from "@/components/user-profile"
import { motion } from "framer-motion"

interface UserProfileButtonProps {
  language: "en" | "bn"
  userName?: string
  avatarUrl?: string
  hasNotification?: boolean
}

export default function UserProfileButton({
  language,
  userName = "User",
  avatarUrl,
  hasNotification = false,
}: UserProfileButtonProps) {
  const [showProfile, setShowProfile] = useState(false)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full relative"
        onClick={() => setShowProfile(true)}
        aria-label={language === "en" ? "User profile" : "ব্যবহারকারী প্রোফাইল"}
      >
        <Avatar className="h-8 w-8">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={userName} />
          ) : (
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          )}
        </Avatar>

        {hasNotification && (
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-background"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Button>

      {showProfile && <UserProfile language={language} onClose={() => setShowProfile(false)} />}
    </>
  )
}

