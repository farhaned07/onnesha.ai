import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

interface LandingFooterProps {
  language: "en" | "bn"
}

export default function LandingFooter({ language }: LandingFooterProps) {
  const translations = {
    en: {
      product: "Product",
      solutions: "Solutions",
      resources: "Resources",
      company: "Company",
      legal: "Legal",
      subscribeTitle: "Subscribe to our newsletter",
      subscribeText: "Get the latest news and updates.",
      subscribeButton: "Subscribe",
      subscribeInputPlaceholder: "Enter your email",
      copyright: "© 2023 Onnesha AI. All rights reserved.",
      productLinks: [
        { label: "Features", href: "/features" },
        { label: "Integrations", href: "/integrations" },
        { label: "Pricing", href: "/pricing" },
        { label: "Changelog", href: "/changelog" },
      ],
      solutionsLinks: [
        { label: "For Business", href: "/business" },
        { label: "For Education", href: "/education" },
        { label: "For Healthcare", href: "/healthcare" },
        { label: "For Government", href: "/government" },
      ],
      resourcesLinks: [
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
        { label: "Community", href: "/community" },
        { label: "Support", href: "/support" },
      ],
      companyLinks: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Partners", href: "/partners" },
      ],
      legalLinks: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
      ],
    },
    bn: {
      product: "পণ্য",
      solutions: "সমাধান",
      resources: "রিসোর্স",
      company: "কোম্পানি",
      legal: "আইনি",
      subscribeTitle: "আমাদের নিউজলেটার সাবস্ক্রাইব করুন",
      subscribeText: "সর্বশেষ খবর এবং আপডেট পান।",
      subscribeButton: "সাবস্ক্রাইব",
      subscribeInputPlaceholder: "আপনার ইমেইল লিখুন",
      copyright: "© ২০২৩ অন্বেষা এআই। সমস্ত অধিকার সংরক্ষিত।",
      productLinks: [
        { label: "বৈশিষ্ট্য", href: "/features" },
        { label: "ইন্টিগ্রেশন", href: "/integrations" },
        { label: "মূল্য", href: "/pricing" },
        { label: "পরিবর্তন লগ", href: "/changelog" },
      ],
      solutionsLinks: [
        { label: "ব্যবসার জন্য", href: "/business" },
        { label: "শিক্ষার জন্য", href: "/education" },
        { label: "স্বাস্থ্যসেবার জন্য", href: "/healthcare" },
        { label: "সরকারের জন্য", href: "/government" },
      ],
      resourcesLinks: [
        { label: "ব্লগ", href: "/blog" },
        { label: "ডকুমেন্টেশন", href: "/docs" },
        { label: "কমিউনিটি", href: "/community" },
        { label: "সাপোর্ট", href: "/support" },
      ],
      companyLinks: [
        { label: "আমাদের সম্পর্কে", href: "/about" },
        { label: "ক্যারিয়ার", href: "/careers" },
        { label: "যোগাযোগ", href: "/contact" },
        { label: "পার্টনার", href: "/partners" },
      ],
      legalLinks: [
        { label: "গোপনীয়তা নীতি", href: "/privacy" },
        { label: "সেবার শর্তাবলী", href: "/terms" },
        { label: "কুকি নীতি", href: "/cookies" },
      ],
    },
  }

  const t = translations[language]

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4 inline-block">
              Onnesha AI
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mt-2 mb-4 max-w-md">
              {language === "en"
                ? "Next-generation AI assistant for Bangladesh with seamless bilingual support."
                : "বাংলাদেশের জন্য অবিরাম দ্বিভাষিক সমর্থন সহ পরবর্তী প্রজন্মের এআই সহকারী।"}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">{t.product}</h3>
            <ul className="space-y-2">
              {t.productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">{t.resources}</h3>
            <ul className="space-y-2">
              {t.resourcesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">{t.company}</h3>
            <ul className="space-y-2">
              {t.companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">{t.copyright}</p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              {t.legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

