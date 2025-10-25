"use client"

import type React from "react"
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUp,
  ExternalLink,
  Sparkles,
  Code,
  Palette,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [email, setEmail] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M31.5 2c1.3 2.6 3.5 4.7 6.1 5.8 1.2.5 2.5.8 3.9.9V15c-2.6 0-5.2-.7-7.5-2v14.4c0 4.5-1.8 8.7-4.9 11.8-3.1 3.1-7.3 4.9-11.8 4.9s-8.7-1.8-11.8-4.9c-3.1-3.1-4.9-7.3-4.9-11.8s1.8-8.7 4.9-11.8c3.1-3.1 7.3-4.9 11.8-4.9.6 0 1.2 0 1.8.1v7.6c-.6-.2-1.2-.3-1.8-.3-4.3 0-7.8 3.5-7.8 7.8s3.5 7.8 7.8 7.8 7.8-3.5 7.8-7.8V2h6.6z" />
    </svg>
  )

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Inscription à la newsletter :", email)
    setEmail("")
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
    setSelectedService(null)
  }

  return (
    <>
      <footer className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800 overflow-hidden">
        {/* Éléments d'arrière-plan */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/5 to-cyan-600/3 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-500/3 to-cyan-500/3 rounded-full blur-2xl"></div>
        </div>

        {/* Section Newsletter */}
        <div className="relative bg-gradient-to-r from-gray-50 to-white">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-cyan-700/3"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-cyan-600 animate-pulse" />
                <span className="text-sm font-medium text-cyan-600 uppercase tracking-wider">Offres Exclusives</span>
                <Sparkles className="h-6 w-6 text-cyan-600 animate-pulse" />
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent">
                Recevez les dernières offres
              </h3>

              <p className="text-gray-600 mb-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Rejoignez notre communauté exclusive et recevez un{" "}
                <span className="text-cyan-600 font-semibold">coupon de 200 DHS</span> pour votre première expérience
                d'achat.
              </p>

              <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Entrez votre adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 bg-white border border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20 h-14 rounded-xl transition-all duration-300 shadow-sm outline-none"
                    required
                  />
                </div>
                <button
                  onClick={handleNewsletterSubmit}
                  className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white px-8 h-14 rounded-xl font-semibold tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  S'abonner <ArrowUp className="h-4 w-4 rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal du pied de page */}
        <div className="relative py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
              {/* Section Marque */}
              <div className="lg:max-w-md space-y-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image src="/images/logo/logo.png" alt="Logo" width={140} height={45} className="object-contain" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/10 to-cyan-700/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  Découvrez les dernières tendances de la mode avec notre collection de vêtements et accessoires premium
                  soigneusement sélectionnés. La qualité rencontre le style dans chaque pièce.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                    <span className="text-gray-600">Des questions ? Appelez-nous 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex-shrink-0"></div>
                    <span className="text-xl font-semibold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer">
                      07 02 07 07 83
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
                {/* Liens rapides */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6 relative">
                    Liens Rapides
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full"></div>
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { name: "Notre histoire", link: "/about" },
                      { name: "Liste de souhaits", link: "/wishlist" },
                      { name: "Contact", link: "/contact" },
                      { name: "Boutique", link: "/shop" },
                      { name: "Panier", link: "/cart" },
                    ].map((link, index) => (
                      <li key={index}>
                        <Link
                          href={link.link}
                          className="text-gray-600 hover:text-cyan-600 transition-all duration-300 flex items-center gap-2 group text-sm md:text-base"
                        >
                          <span className="w-1 h-1 bg-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            {link.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact & Réseaux Sociaux */}
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-6 relative">
                    Restez Connecté
                    <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full"></div>
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <div className="text-gray-600 text-sm md:text-base">
                        <p>Rue annasrine hay raha numéro 001, Casablanca</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                      <a
                        href="mailto:Giftpara25@gmail.ma"
                        className="text-gray-600 hover:text-cyan-600 transition-colors text-sm md:text-base"
                      >
                        Giftpara25@gmail.ma
                      </a>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Suivez-nous</p>
                    <div className="flex gap-3">
                      {[
                        {
                          Icon: Facebook,
                          color: "hover:bg-[#3b5998]",
                          href: "https://www.facebook.com/share/1CqjXsVodb/?mibextid=wwXIfr",
                        },
                        {
                          Icon: Instagram,
                          color: "hover:bg-[#e4405f]",
                          href: "https://www.instagram.com/giftpara25/",
                        },
                        {
                          Icon: TikTok,
                          color: "hover:bg-[#010101]",
                          href: "https://www.tiktok.com/@giftpara25",
                        },
                      ].map(({ Icon, color, href }, index) => (
                        <Link
                          key={index}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ${color} hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-gray-200 hover:border-transparent shadow-sm hover:shadow-md`}
                        >
                          <Icon className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="relative border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center lg:text-left">
                <p className="text-gray-500 text-sm">© 2025 GiftPara Store. Tous droits réservés.</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Créé avec</span>
                  <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                  <span>par</span>
                </div>

                <Link
                  href="https://www.webvisionagency.ma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 hover:from-cyan-600/5 hover:to-cyan-700/5 hover:border-cyan-600/30 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full flex items-center justify-center">
                        <Code className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    </div>

                    <div className="text-left">
                      <p className="text-gray-800 font-semibold text-sm group-hover:text-cyan-600 transition-colors">
                        WebVision Agency
                      </p>
                      <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                        Agence Web & Digital
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Palette className="h-3 w-3 text-cyan-600 group-hover:rotate-12 transition-transform duration-300" />
                    <ExternalLink className="h-3 w-3 text-gray-500 group-hover:text-cyan-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bouton retour en haut */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
          >
            <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        )}
      </footer>
    </>
  )
}