"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MessageSquare, FileText, Sparkles, Settings, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function HelpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      toast({
        title: language === "en" ? "Message sent" : "বার্তা পাঠানো হয়েছে",
        description: language === "en" 
          ? "We'll get back to you as soon as possible" 
          : "আমরা যত তাড়াতাড়ি সম্ভব আপনার সাথে যোগাযোগ করব",
      })
    }, 1500)
  }

  const translations = {
    en: {
      help: "Help & Support",
      faq: "FAQ",
      documentation: "Documentation",
      contact: "Contact Us",
      search: "Search help articles...",
      popularTopics: "Popular Topics",
      gettingStarted: "Getting Started",
      accountSettings: "Account Settings",
      usingAI: "Using AI Assistant",
      troubleshooting: "Troubleshooting",
      viewAll: "View all",
      faqTitle: "Frequently Asked Questions",
      docTitle: "Documentation",
      docDesc: "Explore our comprehensive guides and tutorials",
      contactTitle: "Contact Support",
      contactDesc: "Get in touch with our support team",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
      faqItems: [
        {
          question: "What is Onnesha AI?",
          answer: "Onnesha AI is an advanced AI assistant optimized for both Bangla and English languages. It's designed to help users with a wide range of tasks, from answering questions to analyzing documents, all with a focus on providing culturally relevant responses for Bangladesh."
        },
        {
          question: "How do I get started with Onnesha AI?",
          answer: "Getting started is easy! Simply create an account, log in, and start chatting with Onnesha. You can ask questions, upload documents for analysis, or use any of our specialized features. Check out our Getting Started guide for more detailed instructions."
        },
        {
          question: "Is my data secure with Onnesha AI?",
          answer: "Yes, we take data security very seriously. All conversations are encrypted, and we have strict privacy policies in place. You can control your data retention settings in your account preferences, and we never share your personal information with third parties without your consent."
        },
        {
          question: "Can I use Onnesha AI in both Bangla and English?",
          answer: "Onnesha AI is specifically designed to work seamlessly in both Bangla and English. You can switch between languages at any time, and Onnesha will automatically detect and respond in the language you're using."
        },
        {
          question: "What file types can I upload for analysis?",
          answer: "Onnesha AI supports a variety of file types including PDF, DOCX, TXT, JPG, and PNG. You can upload these files for analysis, and Onnesha will extract and process the information contained within them."
        },
        {
          question: "Is there a limit to how much I can use Onnesha AI?",
          answer: "Free accounts have certain usage limits, including the number of messages per day and file uploads per month. For unlimited usage, you can upgrade to our Premium plan, which removes these restrictions and provides additional features."
        },
        {
          question: "How accurate is the information provided by Onnesha AI?",
          answer: "Onnesha AI strives to provide accurate and up-to-date information. With the web search feature enabled, it can access current information from the internet. However, as with any AI system, it's always good practice to verify critical information from multiple sources."
        },
        {
          question: "How can I change my account settings?",
          answer: "You can access and modify your account settings by clicking on your profile picture and selecting 'Settings'. From there, you can update your personal information, change your password, adjust notification preferences, and more."
        }
      ],
      docCategories: [
        {
          title: "Getting Started",
          icon: <Sparkles size={16} className="text-blue-500" />,
          articles: [
            "Creating your account",
            "Navigating the dashboard",
            "Your first conversation",
            "Understanding AI capabilities"
          ]
        },
        {
          title: "Using the AI Assistant",
          icon: <MessageSquare size={16} className="text-green-500" />,
          articles: [
            "Effective prompting techniques",
            "Using different AI personalities",
            "Voice input and commands",
            "Saving and organizing conversations"
          ]
        },
        {
          title: "Document Analysis",
          icon: <FileText size={16} className="text-amber-500" />,
          articles: [
            "Supported file formats",
            "Uploading and analyzing documents",
            "Extracting information from images",
            "Managing your uploaded files"
          ]
        },
        {
          title: "Web Search & Research",
          icon: <Globe size={16} className="text-purple-500" />,
          articles: [
            "Enabling web search",
            "Getting up-to-date information",
            "Research techniques with AI",
            "Understanding search results"
          ]
        },
        {
          title: "Account Management",
          icon: <Settings size={16} className="text-slate-500" />,
          articles: [
            "Profile settings and preferences",
            "Language and appearance options",
            "Notification settings",
            "Privacy and security"
          ]
        }
      ]
    },
    bn: {
      help: "সাহায্য এবং সমর্থন",
      faq: "সাধারণ প্রশ্ন",
      documentation: "ডকুমেন্টেশন",
      contact: "যোগাযোগ করুন",
      search: "সাহায্য নিবন্ধ অনুসন্ধান করুন...",
      popularTopics: "জনপ্রিয় বিষয়",
      gettingStarted: "শুরু করা",
      accountSettings: "অ্যাকাউন্ট সেটিংস",
      usingAI: "এআই সহকারী ব্যবহার করা",
      troubleshooting: "সমস্যা সমাধান",
      viewAll: "সব দেখুন",
      faqTitle: "সাধারণ জিজ্ঞাসিত প্রশ্ন",
      docTitle: "ডকুমেন্টেশন",
      docDesc: "আমাদের বিস্তৃত গাইড এবং টিউটোরিয়াল অন্বেষণ করুন",
      contactTitle: "সাপোর্ট যোগাযোগ",
      contactDesc: "আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন",
      name: "নাম",
      email: "ইমেইল",
      subject: "বিষয়",
      message: "বার্তা",
      send: "বার্তা পাঠান",
      faqItems: [
        {
          question: "অন্বেষা এআই কী?",
          answer: "অন্বেষা এআই হল বাংলা এবং ইংরেজি উভয় ভাষার জন্য অপ্টিমাইজ করা একটি উন্নত এআই সহকারী। এটি প্রশ্নের উত্তর দেওয়া থেকে শুরু করে ডকুমেন্ট বিশ্লেষণ পর্যন্ত বিভিন্ন কাজে ব্যবহারকারীদের সাহায্য করার জন্য ডিজাইন করা হয়েছে, সবই বাংলাদেশের জন্য সাংস্কৃতিকভাবে প্রাসঙ্গিক প্রতিক্রিয়া প্রদানের উপর ফোকাস করে।"
        }
      ]
    }
  }

