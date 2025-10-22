"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Phone,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Beaker,
  Users,
  Award,
  Leaf,
  Shield,
  Heart,
  Star,
} from "lucide-react"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

// Fixed animation variant for contact info cards
const contactCardVariant: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
}

const slideInFromBottom = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Formulaire de contact envoyé :", formData)
    setIsSubmitting(false)
    // Reset form or show success message
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Envoyez-nous un e-mail",
      details: ["Giftpara25@gmail.ma"],
      color: "text-[#1e3a5f]",
      bgColor: "bg-blue-50",
    },
    {
      icon: Phone,
      title: "Appelez-nous",
      details: ["07 02 07 07 83"],
      color: "text-[#7a8a99]",
      bgColor: "bg-gray-50",
    },
    {
      icon: Beaker,
      title: "Nos soins",
      details: ["Formules riches en actifs puissants", "Innovations dermo-cosmétiques"],
      color: "text-[#1e3a5f]",
      bgColor: "bg-blue-50",
    },
    {
      icon: Clock,
      title: "Disponibilité",
      details: ["Lundi à vendredi : 9h00 – 18h00", "Samedi : 10h00 – 16h00"],
      color: "text-[#7a8a99]",
      bgColor: "bg-gray-50",
    },
  ]

  const storeFeatures = [
    {
      icon: Beaker,
      title: "Expertise Dermo-cosmétique",
      description: "Formules développées par des passionnés de dermo-cosmétique avec des années d'expérience",
    },
    {
      icon: Leaf,
      title: "Actifs Puissants",
      description: "Ingrédients sélectionnés pour nourrir et apaiser les peaux sensibles et fragilisées",
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Produits testés dermatologiquement pour votre tranquillité d'esprit",
    },
    {
      icon: Heart,
      title: "Bien-être Assuré",
      description: "Chaque application redonne plaisir et confiance à votre peau",
    },
  ]

  const stats = [
    { number: "100K+", label: "Clients satisfaits", icon: Users },
    { number: "24/7", label: "Support client", icon: Headphones },
    { number: "99%", label: "Satisfaction client", icon: Star },
    { number: "20+", label: "Années d'expertise", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Beautiful Page Header */}
      <motion.div
        className="relative py-20 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://portotheme.com/html/molla/assets/images/page-header-bg.jpg"
            alt="Pattern Background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/20 to-[#7a8a99]/20"></div>
        </div>
        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-full mb-6 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            className="text-5xl font-light text-gray-800 mb-4 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            className="text-[#1e3a5f] font-normal text-lg tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            NOUS SOMMES LÀ POUR VOUS
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] mx-auto mt-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          ></motion.div>
        </motion.div>
      </motion.div>

      {/* Breadcrumb */}
      <motion.div
        className="bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#1e3a5f] transition-colors">
              Accueil
            </Link>
            <span className="text-gray-300">›</span>
            <span className="text-[#1e3a5f]">Contact</span>
          </nav>
        </div>
      </motion.div>

      {/* Contact Information Cards - Fixed Animation */}
      <motion.div
        className="container mx-auto px-4 py-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" variants={staggerContainer}>
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              variants={contactCardVariant}
              whileHover={{ y: -10 }}
            >
              <div
                className={`w-12 h-12 ${info.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <info.icon className={`h-6 w-6 ${info.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{info.title}</h3>
              <div className="space-y-1">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics Section */}
        <motion.div
          className="bg-white py-12 rounded-2xl shadow-xl mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-8">
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={scaleIn}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#1e3a5f]/10 to-[#7a8a99]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-[#1e3a5f]" />
                  </div>
                  <div className="text-3xl font-light text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-full flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-light text-gray-800">Envoyez-nous un message</h2>
                <p className="text-gray-600 text-sm">Nous serions ravis d'avoir de vos nouvelles !</p>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={slideInFromBottom}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={slideInFromBottom}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
                    Votre nom *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-2 border-gray-200 rounded-xl focus:border-[#1e3a5f] h-12 transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </motion.div>
                <motion.div variants={slideInFromBottom}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                    Adresse e-mail *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-2 border-gray-200 rounded-xl focus:border-[#1e3a5f] h-12 transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </motion.div>
              </motion.div>

              <motion.div
                variants={slideInFromBottom}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-2">
                  Sujet *
                </label>
                <Input
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="border-2 border-gray-200 rounded-xl focus:border-[#1e3a5f] h-12 transition-all duration-300 hover:border-gray-300"
                  required
                />
              </motion.div>

              <motion.div
                variants={slideInFromBottom}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
                  Message *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="border-2 border-gray-200 rounded-xl focus:border-[#1e3a5f] min-h-[120px] transition-all duration-300 hover:border-gray-300"
                  placeholder="Dites-nous comment nous pouvons vous aider..."
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] hover:from-[#152a47] hover:to-[#6a7a89] text-white py-4 text-lg font-normal tracking-wider rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Right Side Content */}
          <motion.div
            className="space-y-8"
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Store Features */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-light text-gray-800">Pourquoi nous choisir ?</h3>
                  <p className="text-gray-600 text-sm">Ce qui nous rend spéciaux</p>
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {storeFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors duration-300">
                        <feature.icon className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Customer Support */}
            <motion.div
              className="bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-2xl shadow-xl p-8 text-white"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex items-center gap-3 mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Headphones className="h-8 w-8" />
                <div>
                  <h3 className="text-xl font-semibold">Support client 24/7</h3>
                  <p className="text-white/90 text-sm">Nous sommes là pour vous aider à tout moment</p>
                </div>
              </motion.div>
              <motion.p
                className="text-white/90 mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Notre équipe de support dédiée est disponible 24 heures sur 24 pour vous aider avec toutes vos questions
                sur nos soins dermo-cosmétiques. Obtenez une aide instantanée via nos multiples canaux.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
