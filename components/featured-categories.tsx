"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Droplet, Sun, Sparkles, Heart } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Category {
  id: number
  title: string
  description: string
  image: string
  icon: LucideIcon
  link: string
  color: string
}

const categories: Category[] = [
  {
    id: 1,
    title: "Hydratation",
    description: "Crèmes et sérums pour une peau nourrie et éclatante",
    image: "/skincare-moisturizer-cream.jpg",
    icon: Droplet,
    link: "/shop?category=hydratation",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Protection Solaire",
    description: "SPF haute protection pour tous types de peaux",
    image: "/sunscreen-spf-protection.jpg",
    icon: Sun,
    link: "/shop?category=solaire",
    color: "from-orange-500 to-yellow-500",
  },
  {
    id: 3,
    title: "Anti-Âge",
    description: "Solutions avancées pour une peau jeune et ferme",
    image: "/anti-aging-serum.jpg",
    icon: Sparkles,
    link: "/shop?category=anti-age",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    title: "Peaux Sensibles",
    description: "Formules douces et apaisantes dermatologiquement testées",
    image: "/sensitive-skin-care.png",
    icon: Heart,
    link: "/shop?category=sensible",
    color: "from-rose-500 to-red-500",
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
      staggerChildren: 0.15,
    },
  },
}

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Nos Catégories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Explorez notre gamme complète de soins dermatologiques adaptés à tous les besoins de votre peau
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <Link
                href={category.link}
                className="group block relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  {/* Icon */}
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <category.icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 text-balance">{category.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-white/90 mb-4 text-pretty">{category.description}</p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Découvrir</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
