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
      ],
      docCategories: [
        {
          title: "শুরু করা",
          icon: <Sparkles size={16} className="text-blue-500" />,
          articles: [
            "আপনার অ্যাকাউন্ট তৈরি করা",
            "ড্যাশবোর্ডে নেভিগেট করা",
            "আপনার প্রথম কথোপকথন",
            "এআই ক্ষমতা বোঝা"
          ]
        },
        {
          title: "এআই সহকারী ব্যবহার করা",
          icon: <MessageSquare size={16} className="text-green-500" />,
          articles: [
            "কার্যকর প্রম্পটিং কৌশল",
            "বিভিন্ন এআই ব্যক্তিত্ব ব্যবহার করা",
            "ভয়েস ইনপুট এবং কমান্ড",
            "কথোপকথন সংরক্ষণ এবং সংগঠিত করা"
          ]
        }
      ]
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#1A1B1E] text-white flex flex-col">
      <header className="border-b border-white/10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">{t.help}</h1>
          <button onClick={toggleLanguage} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm">
            {language === "en" ? "বাংলা" : "English"}
          </button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-[#25262B] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">{t.faqTitle}</h2>
              <div className="divide-y divide-white/10">
                {t.faqItems.map((item, index) => (
                  <div key={index} className="py-4">
                    <h3 className="font-medium text-lg mb-2">{item.question}</h3>
                    <p className="text-white/70">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="bg-[#25262B] rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2">{t.docTitle}</h2>
              <p className="text-white/70 mb-4">{t.docDesc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {t.docCategories?.map((category, index) => (
                  <div key={index} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition">
                    <div className="flex items-center gap-2 mb-3">
                      {category.icon}
                      <h3 className="font-medium">{category.title}</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-white/70">
                      {category.articles.map((article, idx) => (
                        <li key={idx} className="hover:text-blue-400 cursor-pointer">{article}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>
          
          <div>
            <section className="bg-[#25262B] rounded-xl p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-2">{t.contactTitle}</h2>
              <p className="text-white/70 mb-4">{t.contactDesc}</p>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/70 mb-1">{t.name}</label>
                  <input 
                    type="text" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full bg-[#1A1B1E] rounded p-2 text-sm border border-white/10 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">{t.email}</label>
                  <input 
                    type="email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full bg-[#1A1B1E] rounded p-2 text-sm border border-white/10 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">{t.subject}</label>
                  <input 
                    type="text" 
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full bg-[#1A1B1E] rounded p-2 text-sm border border-white/10 focus:border-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1">{t.message}</label>
                  <textarea 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full bg-[#1A1B1E] rounded p-2 text-sm border border-white/10 focus:border-blue-500 outline-none min-h-[120px]"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium transition disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '...' : t.send}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

