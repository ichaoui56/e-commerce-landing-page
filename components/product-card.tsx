"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Eye, Loader2, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"
import { useState, useTransition, useEffect, useRef } from "react"
import ProductModal from "./product-modal"

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

interface ProductCardProps {
  product: ProductWithDetails
  isInWishlist?: boolean
  onWishlistChange?: (productId: string, isLiked: boolean) => void
}

export default function ProductCard({ product, isInWishlist = false, onWishlistChange }: ProductCardProps) {
  const isMobile = useIsMobile()
  const { toast } = useToast()
  const [isLiked, setIsLiked] = useState(isInWishlist)
  const [isPending, startTransition] = useTransition()
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [loadedImageUrl, setLoadedImageUrl] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchEndY = useRef<number>(0)
  const isDragging = useRef<boolean>(false)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLiked(isInWishlist)
  }, [isInWishlist])

  const currentImage = product.images[currentImageIndex] || "/placeholder.svg"

  useEffect(() => {
    if (currentImage && currentImage !== loadedImageUrl) {
      setIsImageLoading(true)
    }
  }, [currentImage, loadedImageUrl])

  const handleImageLoad = () => {
    setIsImageLoading(false)
    setLoadedImageUrl(currentImage)
  }

  const handleImageError = () => {
    setIsImageLoading(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (product.images.length <= 1) return
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (product.images.length <= 1) return

    touchEndX.current = e.touches[0].clientX
    touchEndY.current = e.touches[0].clientY

    const deltaX = Math.abs(touchEndX.current - touchStartX.current)
    const deltaY = Math.abs(touchEndY.current - touchStartY.current)

    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault()
      isDragging.current = true
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging.current || product.images.length <= 1) {
      isDragging.current = false
      return
    }

    const swipeDistance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 30

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
      } else {
        setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
      }
    }

    isDragging.current = false
    touchStartX.current = 0
    touchEndX.current = 0
    touchStartY.current = 0
    touchEndY.current = 0
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
    }
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const newLikedState = !isLiked
    setIsLiked(newLikedState)

    if (onWishlistChange) {
      onWishlistChange(product.id, newLikedState)
    }

    toast({
      title: newLikedState ? "Ajouté aux favoris" : "Retiré des favoris",
      description: newLikedState
        ? "Le produit a été ajouté à votre liste de souhaits"
        : "Le produit a été retiré de votre liste de souhaits",
      duration: 2000,
    })
  }

  const handleWhatsAppClick = (e?: React.MouseEvent | string) => {
    // Handle event if it's a MouseEvent
    if (e && typeof e !== 'string' && 'preventDefault' in e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (!product.inStock) {
      toast({
        title: "Produit épuisé",
        description: "Ce produit n'est malheureusement plus disponible",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    const phoneNumber = "212702070783" // Replace with your actual WhatsApp number
    const message = `Bonjour! Je suis intéressé(e) par ce produit:\n\n*${product.name}*\n\nPrix: ${product.price.toFixed(2)} DHS\n\n${product.description || ''}\n\nMerci de me contacter pour plus d'informations!`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const isOutOfStock = !product.inStock

  return (
    <>
      <div className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div
          ref={imageContainerRef}
          className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
          {isImageLoading && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-2 rounded-lg px-3 py-2 shadow-sm">
                <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
                <span className="text-xs text-gray-600 font-medium">Chargement...</span>
              </div>
            </div>
          )}

          <Link href={`/product/${product.id}`}>
            <Image
              src={currentImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-300 cursor-pointer ${isOutOfStock ? "grayscale opacity-75" : ""} ${isImageLoading ? "opacity-50" : "opacity-100"}`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={false}
              draggable={false}
            />
          </Link>

          {product.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-md transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-4 w-4 text-gray-700" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-md transition-all sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-4 w-4 text-gray-700" />
              </button>
            </>
          )}

          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-row gap-1 sm:gap-2 z-20">
            {product.top_price && (
              <div className="px-2 py-1 text-xs font-bold text-white rounded-md bg-[#0b91b3] shadow-sm">TOP</div>
            )}
            {isOutOfStock && (
              <div className="px-2 py-1 text-xs font-bold text-white rounded-md bg-gray-600 shadow-sm">ÉPUISÉ</div>
            )}
          </div>

          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleQuickView}
              className={`bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200 shadow-sm border border-gray-100 ${
                isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              aria-label="Aperçu rapide"
            >
              <Eye className="h-4 w-4 text-gray-600 hover:text-[#0b91b3]" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleWhatsAppClick}
              disabled={isOutOfStock}
              className={`sm:hidden bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8 transition-all duration-200 shadow-sm border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
                !isOutOfStock ? "hover:bg-green-500 hover:text-white hover:border-green-500" : ""
              }`}
              aria-label={isOutOfStock ? "Produit épuisé" : "Contacter sur WhatsApp"}
            >
              <MessageCircle className={`h-4 w-4 transition-colors ${isOutOfStock ? "text-gray-400" : "text-gray-600"}`} />
            </Button>
          </div>

          <div
            className={`hidden sm:block absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 z-20 ${
              isMobile ? "" : "translate-y-full group-hover:translate-y-0"
            }`}
          >
            <Button
              onClick={handleWhatsAppClick}
              disabled={isOutOfStock}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-lg h-10 text-sm"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {isOutOfStock ? "ÉPUISÉ" : "CONTACTER SUR WHATSAPP"}
            </Button>
          </div>
        </div>

        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium truncate">
              {product.category}
            </span>

            <div className="flex items-center gap-1 flex-shrink-0">
              <div className={cn("w-1.5 h-1.5 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
              <span className={cn("text-xs font-medium", product.inStock ? "text-green-600" : "text-red-600")}>
                {product.inStock ? "En stock" : "Épuisé"}
              </span>
            </div>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 hover:text-[#0b91b3] transition-colors cursor-pointer leading-tight">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">{product.description}</p>
          )}

          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-[#0b91b3]">{product.price.toFixed(2)} DHS</span>
          </div>

          {product.properties && product.properties.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.properties.slice(0, 2).map((property, index) => (
                <span key={index} className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                  {property}
                </span>
              ))}
              {product.properties.length > 2 && (
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                  +{product.properties.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isInWishlist={isLiked}
        onWishlistChange={onWishlistChange}
        onWhatsAppClick={handleWhatsAppClick}
      />
    </>
  )
}