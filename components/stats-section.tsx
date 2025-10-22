"use client"

import { motion } from "framer-motion"
import { Award, Users, Droplet, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Stat {
    number: string
    label: string
    icon: LucideIcon
}


const stats: Stat[] = [
    { number: "20+", label: "Années d'Expertise", icon: Award },
    { number: "100K+", label: "Clients Satisfaits", icon: Users },
    { number: "50+", label: "Produits Innovants", icon: Droplet },
    { number: "98%", label: "Taux de Satisfaction", icon: Star },
]

const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

export function StatsSection() {
    return (
        <motion.div
            className="container mx-auto px-4 py-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <motion.div
                    className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={staggerContainer}
                >
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

    )
}
