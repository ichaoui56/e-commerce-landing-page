"use client"

import { motion } from "framer-motion"
import { Shield, Leaf, Award, Truck, HeartHandshake, Microscope } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Benefit {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Qualité Dermatologique",
    description: "Produits testés et approuvés par des dermatologues professionnels",
    icon: Microscope,
  },
  {
    id: 2,
    title: "Ingrédients Naturels",
    description: "Formules enrichies d'extraits naturels et actifs végétaux",
    icon: Leaf,
  },
  {
    id: 3,
    title: "Certifications Premium",
    description: "Standards internationaux de qualité et de sécurité",
    icon: Award,
  },
  {
    id: 4,
    title: "Livraison Rapide",
    description: "Expédition gratuite dès 500 DHS partout au Maroc",
    icon: Truck,
  },
  {
    id: 5,
    title: "Satisfaction Garantie",
    description: "98% de clients satisfaits, retour gratuit sous 30 jours",
    icon: HeartHandshake,
  },
  {
    id: 6,
    title: "Sécurité & Confiance",
    description: "Paiement sécurisé et protection de vos données personnelles",
    icon: Shield,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="w-4 h-4" />
            <span>Pourquoi Nous Choisir</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Votre Confiance, Notre Priorité</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Nous nous engageons à vous offrir les meilleurs produits dermatologiques avec un service client exceptionnel
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              variants={fadeInUp}
              whileHover={{ y: -8 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-balance">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed text-pretty">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
