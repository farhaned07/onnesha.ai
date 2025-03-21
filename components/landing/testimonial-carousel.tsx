"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Testimonial {
  quote: string
  author: string
  position: string
  image: string
}

interface TestimonialCarouselProps {
  testimonials: {
    title: string
    subtitle: string
    items: Testimonial[]
  }
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.items.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.items.length])

  const handlePrevious = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev - 1 + testimonials.items.length) % testimonials.items.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev + 1) % testimonials.items.length)
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2">
            {testimonials.title}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{testimonials.subtitle}</h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between z-10 px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 rounded-full h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative h-[300px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
              >
                <div className="text-blue-500 dark:text-blue-400 mb-6">
                  <Quote size={48} />
                </div>
                <blockquote className="text-xl md:text-2xl text-center mb-8 max-w-3xl">
                  "{testimonials.items[current].quote}"
                </blockquote>
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={testimonials.items[current].image} alt={testimonials.items[current].author} />
                    <AvatarFallback>
                      {testimonials.items[current].author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-semibold">{testimonials.items[current].author}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonials.items[current].position}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            {testimonials.items.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full mx-1 ${
                  current === index ? "bg-blue-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
                onClick={() => {
                  setAutoplay(false)
                  setCurrent(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

