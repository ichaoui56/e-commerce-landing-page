"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Benali",
    role: "Cliente Fidèle",
    content:
      "Les produits H&S Line ont transformé ma peau sensible. La crème hydratante est devenue mon indispensable quotidien. Résultats visibles en quelques semaines!",
    rating: 5,
    image: "/woman-portrait-1.png",
  },
  {
    id: 2,
    name: "Amina Khalil",
    role: "Dermatologue",
    content:
      "Je recommande H&S Line à mes patients. Des formulations dermatologiques de qualité professionnelle avec des ingrédients naturels. Excellente tolérance cutanée.",
    rating: 5,
    image: "/woman-portrait-2.png",
  },
  {
    id: 3,
    name: "Leila Mansouri",
    role: "Maman de 2 Enfants",
    content:
      "La protection solaire SPF 50+ est parfaite pour toute la famille. Texture légère, pas de traces blanches. Mes enfants adorent!",
    rating: 5,
    image: "/woman-portrait-3.png",
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
      staggerChildren: 0.2,
    },
  },
}

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-cyan-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Témoignages Clients</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Ce Que Disent Nos Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Découvrez les expériences authentiques de nos clients satisfaits qui ont transformé leur routine beauté avec
            nos produits dermatologiques.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
              variants={fadeInUp}
              whileHover={{ y: -10 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-cyan-600" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed text-balance">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-cyan-100">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 font-medium">
            Rejoignez plus de <span className="text-cyan-600 font-bold">100,000+</span> clients satisfaits
          </p>
        </motion.div>
      </div>
    </section>
  )
}
