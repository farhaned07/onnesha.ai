"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, MessageSquare, FileText, Globe, Brain } from "lucide-react"

interface AIFeaturesShowcaseProps {
  language: "en" | "bn"
}

export default function AIFeaturesShowcase({ language }: AIFeaturesShowcaseProps) {
  const [activeFeature, setActiveFeature] = useState<number>(0)

  const translations = {
    en: {
      title: "AI Capabilities",
      subtitle: "Explore what our AI can do",
      features: [
        {
          title: "Natural Conversational AI",
          description:
            "Have natural conversations in Bangla and English. Our AI understands context, remembers previous interactions, and responds naturally.",
          icon: <MessageSquare className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=Conversation+Demo",
        },
        {
          title: "Document Analysis",
          description:
            "Upload documents in various formats for instant analysis, summarization, and extraction of key information in your preferred language.",
          icon: <FileText className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=Document+Analysis+Demo",
        },
        {
          title: "Multilingual Translation",
          description:
            "Get high-quality translations between Bangla, English, and other languages with cultural nuances preserved.",
          icon: <Globe className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=Translation+Demo",
        },
        {
          title: "Content Generation",
          description:
            "Generate high-quality content such as articles, product descriptions, emails, and social media posts in both Bangla and English.",
          icon: <Brain className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=Content+Generation+Demo",
        },
      ],
      cta: "Try it yourself",
    },
    bn: {
      title: "এআই সক্ষমতা",
      subtitle: "আমাদের এআই কী করতে পারে তা অন্বেষণ করুন",
      features: [
        {
          title: "প্রাকৃতিক কথোপকথন এআই",
          description:
            "বাংলা এবং ইংরেজিতে প্রাকৃতিক কথোপকথন করুন। আমাদের এআই প্রসঙ্গ বোঝে, আগের ইন্টারঅ্যাকশন মনে রাখে এবং স্বাভাবিকভাবে প্রতিক্রিয়া জানায়।",
          icon: <MessageSquare className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=কথোপকথন+ডেমো",
        },
        {
          title: "নথি বিশ্লেষণ",
          description: "বিভিন্ন ফরম্যাটে নথি আপলোড করুন তাৎক্ষণিক বিশ্লেষণ, সারাংশকরণ এবং আপনার পছন্দের ভাষায় মূল তথ্য নিষ্কাশনের জন্য।",
          icon: <FileText className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=নথি+বিশ্লেষণ+ডেমো",
        },
        {
          title: "বহুভাষিক অনুবাদ",
          description: "বাংলা, ইংরেজি এবং অন্যান্য ভাষার মধ্যে সাংস্কৃতিক সূক্ষ্মতা সংরক্ষণ সহ উচ্চ-মানের অনুবাদ পান।",
          icon: <Globe className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=অনুবাদ+ডেমো",
        },
        {
          title: "কন্টেন্ট জেনারেশন",
          description:
            "বাংলা এবং ইংরেজি উভয় ভাষাতেই নিবন্ধ, পণ্য বিবরণ, ইমেল এবং সোশ্যাল মিডিয়া পোস্টের মতো উচ্চ-মানের কন্টেন্ট তৈরি করুন।",
          icon: <Brain className="h-6 w-6" />,
          demo: "/placeholder.svg?height=500&width=800&text=কন্টেন্ট+জেনারেশন+ডেমো",
        },
      ],
      cta: "নিজে চেষ্টা করুন",
    },
  }

  const t = translations[language]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">
            {t.title}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.subtitle}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="space-y-4">
              {t.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    activeFeature === index
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        activeFeature === index
                          ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild>
                <a href="/demo">
                  {t.cta}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <motion.div
            className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
            key={activeFeature}
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={t.features[activeFeature].demo || "/placeholder.svg"}
              alt={t.features[activeFeature].title}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

