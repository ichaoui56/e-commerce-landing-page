"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Eye, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"
import { useState, useTransition, useEffect } from "react"

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
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [loadedImageUrl, setLoadedImageUrl] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setIsLiked(isInWishlist)
  }, [isInWishlist])

  // Get current image based on current index
  const currentImage = product.images[currentImageIndex] || "/placeholder.svg"

  // Handle image loading when image changes
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
      description: newLikedState ? "Le produit a été ajouté à votre liste de souhaits" : "Le produit a été retiré de votre liste de souhaits",
      duration: 2000,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.inStock) {
      toast({
        title: "Produit épuisé",
        description: "Ce produit n'est malheureusement plus disponible",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Produit ajouté",
          description: `${product.name} a été ajouté à votre panier`,
          duration: 3000,
        })
      }, 500)
    })
  }

  const isOutOfStock = !product.inStock

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Loading Overlay */}
        {isImageLoading && (
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center z-10 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-2 rounded-lg px-3 py-2 shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
              <span className="text-xs text-gray-600 font-medium">Chargement...</span>
            </div>
          </div>
        )}

        {/* Image with clickable area */}
        <Link href={`/product/${product.id}`}>
          <Image
            src={currentImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 cursor-pointer ${
              !isMobile && isHovered ? "scale-105" : "scale-100"
            } ${isOutOfStock ? "grayscale opacity-75" : ""} ${
              isImageLoading ? "opacity-50" : "opacity-100"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onLoad={handleImageLoad}
            onError={handleImageError}
            priority={false}
          />
        </Link>

        {/* Image Navigation Dots - Show when multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1 z-20">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Voir l'image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-row gap-1 sm:gap-2 z-20">
          {product.top_price && (
            <div className="px-2 py-1 text-xs font-bold text-white rounded-md bg-[#e94491] shadow-sm">
              TOP
            </div>
          )}
          {isOutOfStock && (
            <div className="px-2 py-1 text-xs font-bold text-white rounded-md bg-gray-600 shadow-sm">
              ÉPUISÉ
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-col gap-1.5 sm:gap-2 z-20">
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlistToggle}
            disabled={isPending}
            className={`bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200 shadow-sm border border-gray-100 ${
              isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            aria-label="Ajouter aux favoris"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"
              }`}
            />
          </Button>

          {/* Quick View Button */}
          <Link href={`/product/${product.id}`}>
            <Button
              variant="ghost"
              size="icon"
              className={`bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200 shadow-sm border border-gray-100 ${
                isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
              aria-label="Voir le produit"
            >
              <Eye className="h-4 w-4 text-gray-600 hover:text-[#e94491]" />
            </Button>
          </Link>

          {/* Add to Cart Button - Mobile only */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddToCart}
            disabled={isPending || isOutOfStock}
            className={`sm:hidden bg-white/90 backdrop-blur-sm hover:bg-white rounded-full h-8 w-8 transition-all duration-200 shadow-sm border border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${
              !isOutOfStock ? "hover:bg-[#e94491] hover:text-white hover:border-[#e94491]" : ""
            }`}
            aria-label={
              isPending ? "Ajout en cours..." : isOutOfStock ? "Produit épuisé" : "Ajouter au panier"
            }
          >
            <ShoppingCart
              className={`h-4 w-4 transition-colors ${
                isPending ? "animate-pulse" : ""
              } ${isOutOfStock ? "text-gray-400" : "text-gray-600"}`}
            />
          </Button>
        </div>

        {/* Full Add to Cart Button - Desktop only */}
        <div
          className={`hidden sm:block absolute bottom-0 left-0 right-0 p-3 transition-all duration-500 z-20 ${
            isMobile ? "" : "translate-y-full group-hover:translate-y-0"
          }`}
        >
          <Button
            onClick={handleAddToCart}
            disabled={isPending || isOutOfStock}
            className="w-full bg-white/95 backdrop-blur-sm border border-white/50 hover:bg-[#e94491] hover:text-white hover:border-[#e94491] text-gray-700 font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-lg h-10 text-sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isPending ? "AJOUT..." : isOutOfStock ? "ÉPUISÉ" : "AJOUTER AU PANIER"}
          </Button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
        {/* Category */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide font-medium truncate">
            {product.category}
          </span>
          
          {/* Stock Status */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                product.inStock ? "bg-green-500" : "bg-red-500"
              )}
            />
            <span
              className={cn(
                "text-xs font-medium",
                product.inStock ? "text-green-600" : "text-red-600"
              )}
            >
              {product.inStock ? "En stock" : "Épuisé"}
            </span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm sm:text-base font-medium text-gray-800 line-clamp-2 hover:text-[#e94491] transition-colors cursor-pointer leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        {product.description && (
          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-[#e94491]">
            {product.price.toFixed(2)} DHS
          </span>
        </div>

        {/* Key Properties */}
        {product.properties && product.properties.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.properties.slice(0, 2).map((property, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
              >
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
  )
}