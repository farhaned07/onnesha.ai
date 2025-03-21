"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CreditCard, CheckCircle2 } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  language: "en" | "bn"
}

export default function PaymentModal({ open, onOpenChange, language }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("bkash")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const translations = {
    en: {
      title: "Upgrade to Onnesha Premium",
      subtitle: "Get unlimited access to all features",
      paymentMethods: "Payment Methods",
      bkash: "bKash",
      nagad: "Nagad",
      rocket: "Rocket",
      phoneNumber: "Phone Number",
      phoneNumberPlaceholder: "Enter your phone number",
      price: "Price: 100 BDT / month",
      pay: "Pay Now",
      processing: "Processing...",
      success: "Payment Successful!",
      continue: "Continue",
    },
    bn: {
      title: "অন্বেষা প্রিমিয়ামে আপগ্রেড করুন",
      subtitle: "সমস্ত বৈশিষ্ট্যে অসীমিত অ্যাক্সেস পান",
      paymentMethods: "পেমেন্ট পদ্ধতি",
      bkash: "বিকাশ",
      nagad: "নগদ",
      rocket: "রকেট",
      phoneNumber: "ফোন নম্বর",
      phoneNumberPlaceholder: "আপনার ফোন নম্বর লিখুন",
      price: "মূল্য: ১০০ টাকা / মাস",
      pay: "এখন পেমেন্ট করুন",
      processing: "প্রক্রিয়াকরণ হচ্ছে...",
      success: "পেমেন্ট সফল হয়েছে!",
      continue: "চালিয়ে যান",
    },
  }

  const t = translations[language]

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  const handleClose = () => {
    if (isSuccess) {
      setIsSuccess(false)
      setPhoneNumber("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl md:rounded-2xl max-w-[90vw] p-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">{t.title}</DialogTitle>
          <DialogDescription className="text-xs md:text-sm">{t.subtitle}</DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <div className="space-y-3 md:space-y-4">
            <div>
              <h4 className="text-xs md:text-sm font-medium mb-2 md:mb-3">{t.paymentMethods}</h4>
              <RadioGroup
                defaultValue="bkash"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="flex flex-col space-y-1.5 md:space-y-2"
              >
                {[
                  { value: "bkash", label: t.bkash, color: "bg-pink-600" },
                  { value: "nagad", label: t.nagad, color: "bg-orange-600" },
                  { value: "rocket", label: t.rocket, color: "bg-purple-600" },
                ].map((method) => (
                  <div key={method.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.value} id={method.value} />
                    <Label htmlFor={method.value} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                      <span
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white ${method.color}`}
                      >
                        <CreditCard className="h-2.5 w-2.5 md:h-3 md:w-3" />
                      </span>
                      {method.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-1.5 md:space-y-2">
              <Label htmlFor="phone" className="text-xs md:text-sm">
                {t.phoneNumber}
              </Label>
              <Input
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={t.phoneNumberPlaceholder}
                className="rounded-lg md:rounded-xl text-xs md:text-sm h-8 md:h-10"
              />
            </div>

            <div className="text-xs md:text-sm font-medium">{t.price}</div>

            <DialogFooter className="sm:justify-start mt-2 md:mt-3">
              <Button
                type="button"
                onClick={handlePayment}
                disabled={!phoneNumber || isProcessing}
                className="w-full rounded-full text-xs md:text-sm h-8 md:h-10"
              >
                {isProcessing ? t.processing : t.pay}
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="py-4 md:py-6 flex flex-col items-center justify-center space-y-3 md:space-y-4">
            <CheckCircle2 className="h-12 w-12 md:h-16 md:w-16 text-green-500" />
            <h3 className="text-lg md:text-xl font-semibold text-center">{t.success}</h3>
            <Button onClick={handleClose} className="w-full rounded-full text-xs md:text-sm h-8 md:h-10">
              {t.continue}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

