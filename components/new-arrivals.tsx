"use client"

import type React from "react"

import type { ProductWithDetails } from "@/lib/types"
import ProductCard from "./product-card"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import productsData from "@/data/products.json"

interface NewArrivalsProps {
  featuredProducts?: ProductWithDetails[]
  wishlistProductIds?: string[]
}

const mockProducts: ProductWithDetails[] = productsData.products.slice(0, 4).map((p) => ({
  ...p,
  createdAt: new Date(p.createdAt),
  updatedAt: new Date(p.updatedAt),
}))

const mockWishlistProductIds: string[] = []

export default function NewArrivals({ featuredProducts, wishlistProductIds }: NewArrivalsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isCarouselMode, setIsCarouselMode] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Use mock data if no products provided or if empty array
  const productsToDisplay = !featuredProducts || featuredProducts.length === 0 ? mockProducts : featuredProducts

  const wishlistIds =
    !wishlistProductIds || wishlistProductIds.length === 0 ? mockWishlistProductIds : wishlistProductIds

  const displayProducts = productsToDisplay.slice(0, 4)

  useEffect(() => {
    const handleResize = () => {
      setIsCarouselMode(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setCurrentIndex(0)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nouveautés</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Découvrez notre dernière collection de soins dermatologiques, soigneusement sélectionnés pour une peau
              saine.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit en vedette disponible pour le moment.</p>
          </div>
        </div>
      </section>
    )
  }

  // Carousel navigation functions
  const nextSlide = () => {
    if (currentIndex < displayProducts.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      scrollToIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      scrollToIndex(currentIndex - 1)
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.scrollWidth / displayProducts.length
      container.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      })
    }
  }

  // Touch/Mouse drag handlers for smooth scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    // Snap to nearest card
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.scrollWidth / displayProducts.length
      const newIndex = Math.round(container.scrollLeft / cardWidth)
      setCurrentIndex(Math.max(0, Math.min(newIndex, displayProducts.length - 1)))
      scrollToIndex(newIndex)
    }
  }

  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < displayProducts.length - 1

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Nouveautés</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Découvrez notre dernière collection de soins dermatologiques haute tolérance, soigneusement formulés pour
            les peaux sensibles.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
            <span>{displayProducts.length} produits en vedette</span>
          </div>
        </div>

        {/* Desktop Grid Layout (≥1024px) */}
        {!isCarouselMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {displayProducts.map((product) => {
              const isInWishlist = wishlistIds.includes(product.id)
              return (
                <div key={product.id} className="transform hover:scale-105 transition-transform duration-300">
                  <ProductCard product={product} isInWishlist={isInWishlist} />
                </div>
              )
            })}
          </div>
        ) : (
          /* Mobile/Tablet Carousel (<1024px) */
          <div className="relative mb-12">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={!canGoPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-2xl border transition-all duration-300 ${
                canGoPrev
                  ? "text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-110"
                  : "text-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Produit précédent"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              disabled={!canGoNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-2xl border transition-all duration-300 ${
                canGoNext
                  ? "text-gray-700 hover:bg-gray-50 hover:shadow-xl hover:scale-110"
                  : "text-gray-300 cursor-not-allowed opacity-50"
              }`}
              aria-label="Produit suivant"
            >
              <ChevronRight size={24} />
            </button>

            {/* Carousel Container */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-4 cursor-grab active:cursor-grabbing"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleDragEnd}
            >
              {displayProducts.map((product, index) => {
                const isInWishlist = wishlistIds.includes(product.id)
                return (
                  <div
                    key={product.id}
                    className="flex-none w-[280px] sm:w-[320px] snap-center"
                    style={{ scrollSnapAlign: "center" }}
                  >
                    <ProductCard product={product} isInWishlist={isInWishlist} />
                  </div>
                )
              })}
              {/* Spacer for last item */}
              <div className="flex-none w-4"></div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {displayProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    scrollToIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-cyan-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Aller au produit ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-full hover:from-cyan-700 hover:to-cyan-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Voir tous les produits
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
