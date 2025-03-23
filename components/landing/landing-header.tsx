"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Menu, Sun, Moon, ChevronDown } from "lucide-react"
import LanguageToggle from "@/components/language-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface LandingHeaderProps {
  language: "en" | "bn"
  toggleLanguage: () => void
}

export default function LandingHeader({ language, toggleLanguage }: LandingHeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const translations = {
    en: {
      product: "Product",
      solutions: "Solutions",
      pricing: "Pricing",
      resources: "Resources",
      company: "Company",
      login: "Chat",
      signup: "Get Started",
      productMenu: [
        { label: "Features", href: "/features" },
        { label: "AI Capabilities", href: "/capabilities" },
        { label: "Integrations", href: "/integrations" },
        { label: "Roadmap", href: "/roadmap" },
      ],
      solutionsMenu: [
        { label: "For Business", href: "/business" },
        { label: "For Education", href: "/education" },
        { label: "For Healthcare", href: "/healthcare" },
        { label: "For Government", href: "/government" },
      ],
      resourcesMenu: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/api" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Blog", href: "/blog" },
      ],
      companyMenu: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
      chat: "Chat",
      getStarted: "Get Started",
      themeToggle: "Toggle theme",
    },
    bn: {
      product: "পণ্য",
      solutions: "সমাধান",
      pricing: "মূল্য",
      resources: "রিসোর্স",
      company: "কোম্পানি",
      login: "চ্যাট",
      signup: "শুরু করুন",
      productMenu: [
        { label: "বৈশিষ্ট্য", href: "/features" },
        { label: "এআই সক্ষমতা", href: "/capabilities" },
        { label: "ইন্টিগ্রেশন", href: "/integrations" },
        { label: "রোডম্যাপ", href: "/roadmap" },
      ],
      solutionsMenu: [
        { label: "ব্যবসার জন্য", href: "/business" },
        { label: "শিক্ষার জন্য", href: "/education" },
        { label: "স্বাস্থ্যসেবার জন্য", href: "/healthcare" },
        { label: "সরকারের জন্য", href: "/government" },
      ],
      resourcesMenu: [
        { label: "ডকুমেন্টেশন", href: "/docs" },
        { label: "এপিআই রেফারেন্স", href: "/api" },
        { label: "টিউটোরিয়াল", href: "/tutorials" },
        { label: "ব্লগ", href: "/blog" },
      ],
      companyMenu: [
        { label: "আমাদের সম্পর্কে", href: "/about" },
        { label: "ক্যারিয়ার", href: "/careers" },
        { label: "যোগাযোগ", href: "/contact" },
      ],
      chat: "চ্যাট",
      getStarted: "শুরু করুন",
      themeToggle: "থিম পরিবর্তন করুন",
    },
  }

  const t = translations[language]

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      } transition-all duration-200`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-blue-700 dark:text-blue-400">
              Onnesha AI
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t.product} <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {t.productMenu.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t.solutions} <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {t.solutionsMenu.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/pricing" className="text-sm font-medium hover:text-blue-700 dark:hover:text-blue-400">
              {t.pricing}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t.resources} <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {t.resourcesMenu.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t.company} <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {t.companyMenu.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 px-0">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </Button>

              <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

              <Button variant="ghost" size="sm" asChild>
                <Link href="/chat">{t.chat}</Link>
              </Button>

              <Button size="sm" asChild>
                <Link href="/chat">{t.signup}</Link>
              </Button>
            </div>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="grid gap-4 py-4">
                  <Link href="/" className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">
                    {language === "en" ? "Wiser AI" : "ওয়াইজার এআই"}
                  </Link>

                  <div className="grid gap-2">
                    <div className="font-medium mb-1">{t.product}</div>
                    {t.productMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-sm pl-2 py-1 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="grid gap-2">
                    <div className="font-medium mb-1">{t.solutions}</div>
                    {t.solutionsMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-sm pl-2 py-1 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <Link href="/pricing" className="font-medium hover:text-blue-700 dark:hover:text-blue-400">
                    {t.pricing}
                  </Link>

                  <div className="grid gap-2">
                    <div className="font-medium mb-1">{t.resources}</div>
                    {t.resourcesMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-sm pl-2 py-1 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="grid gap-2">
                    <div className="font-medium mb-1">{t.company}</div>
                    {t.companyMenu.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-sm pl-2 py-1 hover:text-blue-700 dark:hover:text-blue-400"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 px-0">
                      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>

                    <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/chat">{t.chat}</Link>
                    </Button>

                    <Button size="sm" asChild>
                      <Link href="/chat">{t.signup}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

