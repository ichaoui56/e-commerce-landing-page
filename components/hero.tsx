"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Instagram } from "lucide-react"

const carouselSlides = [
  {
    desktopImage: "/images/hero/banner-1.png",
    mobileImage: "/images/hero/banner-1-mobile.png",
    title: "CRÈME HYDRATANTE VISAGE",
    subtitle: "Soin Nourrissant, Hydratant et Protecteur pour Tous Types de Peaux",
    link: "/shop",
  },
  {
    desktopImage: "/images/hero/banner-2.png",
    mobileImage: "/images/hero/banner-2-mobile.jpg",
    title: "GiftPara LINE SPF 50+",
    subtitle:
      "Protégez votre peau avec l'écran solaire GiftPara Line SPF 50+ : une protection extrême, une texture invisible, pour tous types de peaux",
    link: "/products/sunscreen",
  },
]

const featureCards = [
  {
    title: "NOS CONSEILS",
    buttonText: "CLIQUER ICI",
    imageUrl: "/images/sub-hero/conseils.jpg",
    alt: "Nos conseils beauté",
    link: "/conseils",
  },
  {
    title: "NOTRE CATALOGUE",
    buttonText: "VOIR PLUS",
    imageUrl: "/images/sub-hero/catalogue.jpg",
    alt: "Notre catalogue de produits",
    link: "/catalogue",
  },
  {
    title: "NOUS CONTACTER",
    buttonText: "VOIR PLUS",
    imageUrl: "/images/sub-hero/contact.jpg",
    alt: "Nous contacter",
    link: "/contact",
    isContact: true,
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="min-h-screen flex flex-col gap-4 md:gap-6 pb-4 md:pb-6">
      {/* Main Hero Carousel */}
      <div className="relative bg-gradient-to-br from-cyan-50 to-cyan-100 min-h-[50vh] w-[92%] sm:w-[96.5%] rounded-xl mx-auto md:min-h-[65vh] overflow-hidden group sm:mt-[20px] mt-[105px]">
        {/* Carousel Slides */}
        <div className="relative h-full min-h-[50vh] md:min-h-[65vh]">
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={slide.desktopImage || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="hidden md:block object-cover"
                priority={index === 0}
              />
              <Image
                src={slide.mobileImage || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="block md:hidden object-cover"
                priority={index === 0}
              />

            
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-cyan-600 p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white text-cyan-600 p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "bg-cyan-600 w-6 md:w-8 h-2 md:h-2.5"
                  : "bg-white/60 hover:bg-white/80 w-2 md:w-2.5 h-2 md:h-2.5"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Three Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 md:px-6">
        {featureCards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] min-h-[280px] md:min-h-[350px]"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={card.imageUrl || "/placeholder.svg"}
                alt={card.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 group-hover:from-black/80 transition-all duration-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 tracking-wide drop-shadow-lg">
                  {card.title}
                </h3>

                {/* Contact Icons - Only for contact card */}
                {card.isContact && (
                  <div className="flex gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300">
                      <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-start">
                <span className="inline-block bg-white text-gray-900 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base tracking-wide transition-all duration-300 group-hover:bg-cyan-600 group-hover:text-white group-hover:scale-105 shadow-lg">
                  {card.buttonText}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
