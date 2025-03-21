"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserRound, GraduationCap, Briefcase, HeartHandshake, Sparkles } from "lucide-react"

interface AIPersonalityProps {
  language: "en" | "bn"
  onPersonalityChange: (personality: string) => void
}

export default function AIPersonalitySelector({ language, onPersonalityChange }: AIPersonalityProps) {
  const [activePersonality, setActivePersonality] = useState("balanced")

  const translations = {
    en: {
      title: "AI Personality",
      balanced: "Balanced",
      professional: "Professional",
      friendly: "Friendly",
      creative: "Creative",
      educational: "Educational",
    },
    bn: {
      title: "এআই ব্যক্তিত্ব",
      balanced: "ভারসাম্যপূর্ণ",
      professional: "পেশাদার",
      friendly: "বন্ধুত্বপূর্ণ",
      creative: "সৃজনশীল",
      educational: "শিক্ষামূলক",
    },
  }

  const t = translations[language]

  const personalities = [
    { id: "balanced", name: t.balanced, icon: <UserRound size={16} /> },
    { id: "professional", name: t.professional, icon: <Briefcase size={16} /> },
    { id: "friendly", name: t.friendly, icon: <HeartHandshake size={16} /> },
    { id: "creative", name: t.creative, icon: <Sparkles size={16} /> },
    { id: "educational", name: t.educational, icon: <GraduationCap size={16} /> },
  ]

  const handlePersonalityChange = (personality: string) => {
    setActivePersonality(personality)
    onPersonalityChange(personality)
  }

  return (
    <div className="space-y-1 w-full sm:w-auto">
      <h3 className="text-xs font-medium">{t.title}</h3>
      <Tabs value={activePersonality} onValueChange={handlePersonalityChange} className="w-full">
        <TabsList className="w-full grid grid-cols-5 h-auto">
          {personalities.map((personality) => (
            <TabsTrigger
              key={personality.id}
              value={personality.id}
              className="flex flex-col items-center gap-1 py-1 h-auto"
            >
              {personality.icon}
              <span className="text-[10px] sm:text-xs">{personality.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}

