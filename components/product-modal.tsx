"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, X, ChevronLeft, ChevronRight, Package, CheckCircle2, MessageCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ProductWithDetails {
  id: string
  name: string
  description: string | null
  price: number
  images: string[]
  category: string
  properties: string[]
  inStock: boolean
  top_price: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProductModalProps {
  product: ProductWithDetails
  isOpen: boolean
  onClose: () => void
  isInWishlist?: boolean
  onWishlistChange?: (productId: string, isLiked: boolean) => void
  onWhatsAppClick?: (productId: string) => void
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  isInWishlist = false,
  onWishlistChange,
  onWhatsAppClick,
}: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(isInWishlist)

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const handleWishlistToggle = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    if (onWishlistChange) {
      onWishlistChange(product.id, newLikedState)
    }
  }

  const handleWhatsAppClick = () => {
    if (onWhatsAppClick && product.inStock) {
      onWhatsAppClick(product.id)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0 gap-0">
        <div className="grid lg:grid-cols-2 gap-0 h-full max-h-[95vh]">
          {/* Image Section */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8 flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl"
              aria-label="Fermer"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            {/* Badges */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-2 z-10">
              {product.top_price && (
                <div className="px-3 py-1.5 text-xs font-bold text-white rounded-lg bg-gradient-to-r from-[#0b91b3] to-[#0a7a94] shadow-md">
                  TOP PRIX
                </div>
              )}
              {!product.inStock && (
                <div className="px-3 py-1.5 text-xs font-bold text-white rounded-lg bg-gray-600 shadow-md">ÉPUISÉ</div>
              )}
            </div>

            <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] mb-4 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Image Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-110"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg hover:shadow-xl hover:scale-110"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2 px-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0",
                      index === currentImageIndex
                        ? "border-[#0b91b3] scale-105 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:scale-105",
                    )}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 lg:p-8 flex flex-col overflow-y-auto max-h-[50vh] lg:max-h-[95vh]">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-[#0b91b3] uppercase tracking-wider font-semibold mb-2">
                    {product.category}
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h2>
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className="p-2.5 rounded-full hover:bg-gray-100 transition-all hover:scale-110"
                  aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Heart
                    className={cn(
                      "h-6 w-6 sm:h-7 sm:w-7 transition-all",
                      isLiked ? "fill-red-500 text-red-500 scale-110" : "text-gray-400",
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg w-fit">
                {product.inStock ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">En stock</span>
                  </>
                ) : (
                  <>
                    <Package className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-semibold text-red-600">Épuisé</span>
                  </>
                )}
              </div>
            </div>

            <div className="mb-6 sm:mb-8 p-4 bg-gradient-to-r from-[#0b91b3]/10 to-[#0a7a94]/10 rounded-xl border border-[#0b91b3]/20">
              <p className="text-xs text-gray-600 mb-1 uppercase tracking-wide font-medium">Prix</p>
              <span className="text-3xl sm:text-4xl font-bold text-[#0b91b3]">{product.price.toFixed(2)} DHS</span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#0b91b3] rounded-full" />
                  Description
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.properties && product.properties.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-[#0b91b3] rounded-full" />
                  Propriétés
                </h3>
                <div className="space-y-3">
                  {product.properties.map((property, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#0b91b3] mt-1.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700 leading-relaxed flex-1">{property}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-4 sm:pt-6 space-y-3 border-t border-gray-200">
              <Button
                onClick={handleWhatsAppClick}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-5 sm:py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] text-sm sm:text-base"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {product.inStock ? "CONTACTER SUR WHATSAPP" : "PRODUIT ÉPUISÉ"}
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 font-semibold py-5 sm:py-6 rounded-xl bg-white transition-all hover:scale-[1.02] text-sm sm:text-base"
              >
                CONTINUER VOS ACHATS
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}