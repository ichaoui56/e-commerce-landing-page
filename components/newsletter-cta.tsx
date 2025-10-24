"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSuccess(true)
    setIsSubmitting(false)
    setEmail("")

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cyan-600 to-cyan-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Restez Informé de Nos Nouveautés</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Inscrivez-vous à notre newsletter et recevez{" "}
            <span className="font-bold text-yellow-300">10% de réduction</span> sur votre première commande, plus des
            offres exclusives et conseils beauté
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white">
              <Gift className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Offres Exclusives</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Conseils Beauté</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Mail className="w-5 h-5 text-yellow-300" />
              <span className="font-medium">Nouveautés en Avant-Première</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-14 px-6 text-base bg-white border-0 focus-visible:ring-2 focus-visible:ring-yellow-300"
              />
              <Button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="h-14 px-8 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-base transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Inscription...
                  </span>
                ) : isSuccess ? (
                  "✓ Inscrit!"
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </div>
          </form>

          {/* Success Message */}
          {isSuccess && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-yellow-300 font-medium"
            >
              Merci! Vérifiez votre email pour votre code de réduction.
            </motion.p>
          )}

          {/* Privacy Note */}
          <p className="mt-6 text-white/70 text-sm">
            Nous respectons votre vie privée. Désinscription possible à tout moment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
