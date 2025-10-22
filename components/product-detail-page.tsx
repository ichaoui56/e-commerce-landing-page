"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  Minus,
  Plus,
  Facebook,
  Twitter,
  Instagram,
  Share2,
  Check,
  Package,
  Shield,
  Truck,
} from "lucide-react"
import type { ProductWithDetails } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailPageSimpleProps {
  product: ProductWithDetails
}

export default function ProductDetailPageSimple({ product }: ProductDetailPageSimpleProps) {
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleAddToCart = () => {
    toast({
      title: "Ajouté au panier",
      description: `${quantity} x ${product.name} ajouté au panier`,
    })
  }
    const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M31.5 2c1.3 2.6 3.5 4.7 6.1 5.8 1.2.5 2.5.8 3.9.9V15c-2.6 0-5.2-.7-7.5-2v14.4c0 4.5-1.8 8.7-4.9 11.8-3.1 3.1-7.3 4.9-11.8 4.9s-8.7-1.8-11.8-4.9c-3.1-3.1-4.9-7.3-4.9-11.8s1.8-8.7 4.9-11.8c3.1-3.1 7.3-4.9 11.8-4.9.6 0 1.2 0 1.8.1v7.6c-.6-.2-1.2-.3-1.8-.3-4.3 0-7.8 3.5-7.8 7.8s3.5 7.8 7.8 7.8 7.8-3.5 7.8-7.8V2h6.6z" />
      </svg>
    )

  const handleWishlistToggle = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Retiré de la liste de souhaits" : "Ajouté à la liste de souhaits",
      description: isLiked ? `${product.name} retiré de votre liste` : `${product.name} ajouté à votre liste`,
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3 w-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 md:mt-0 mt-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <nav className="text-xs text-gray-500">
            <ol className="list-none p-0 inline-flex flex-wrap gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#1e3a5f] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#1e3a5f] transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <span>/</span>
              </li>
              <li className="text-gray-800 font-medium text-balance">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail Content */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-6">
          {/* Left Column - Image Gallery */}
          <div className="space-y-3 w-full">
            {/* Main Image */}
            <div className="relative w-full h-[50vh] lg:h-[65vh] bg-white rounded-xl overflow-hidden shadow-lg group">
              {product.images.length > 0 ? (
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span>Aucune image disponible</span>
                </div>
              )}

              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all shadow-lg z-10"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-white hover:scale-110 transition-all shadow-lg z-10"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}

              {/* Top Price Badge */}
              {product.top_price && (
                <div className="absolute top-3 right-3 bg-[#1e3a5f] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  MEILLEUR PRIX
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden cursor-pointer transition-all shadow-sm hover:shadow-md ${
                      index === currentImageIndex
                        ? "ring-2 ring-[#1e3a5f] scale-105"
                        : "hover:ring-2 hover:ring-gray-300 hover:scale-105"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-3 lg:space-y-4 w-full">
            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] text-xs font-semibold rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 text-balance leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-0.5">{renderStars(5)}</div>
                <span className="text-gray-500 text-xs font-medium">(48 Avis)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl md:text-4xl font-light text-[#1e3a5f]">{product.price.toFixed(2)}</span>
                <span className="text-lg text-gray-600 font-light">DHS</span>
              </div>

              {product.shortDescription && (
                <p className="text-gray-600 text-sm leading-relaxed text-pretty border-l-2 border-[#1e3a5f] pl-3 py-1.5 bg-[#1e3a5f]/5">
                  {product.shortDescription}
                </p>
              )}
            </div>

            {/* Stock Info */}
            <div className="flex items-center gap-2 text-sm bg-white rounded-lg p-3 shadow-sm">
              <Package className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Disponibilité :</span>
              <span
                className={`font-semibold flex items-center gap-1.5 ${product.inStock ? "text-green-600" : "text-red-600"}`}
              >
                {product.inStock ? (
                  <>
                    <Check className="h-4 w-4" />
                    En stock
                  </>
                ) : (
                  "Épuisé"
                )}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-row items-stretch sm:items-center gap-3 pt-1">
              {/* Quantity Selector */}
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-white hover:bg-gradient-to-r from-cyan-600 to-cyan-700 transition-all p-3"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 py-2 min-w-[80px] text-center font-semibold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gradient-to-r from-cyan-600 to-cyan-700 hover:text-white transition-all p-3"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:bg-[#152d47] text-white py-5 px-6 rounded-lg font-semibold text-sm tracking-wide transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                AJOUTER AU PANIER
              </Button>
            </div>

           

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg shadow-sm">
                <Shield className="h-6 w-6 text-[#1e3a5f] mb-1" />
                <span className="text-[10px] font-medium text-gray-700">Paiement Sécurisé</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg shadow-sm">
                <Truck className="h-6 w-6 text-[#1e3a5f] mb-1" />
                <span className="text-[10px] font-medium text-gray-700">Livraison Rapide</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 bg-white rounded-lg shadow-sm">
                <Package className="h-6 w-6 text-[#1e3a5f] mb-1" />
                <span className="text-[10px] font-medium text-gray-700">Retour Gratuit</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="pt-3 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs text-gray-700 font-semibold">Partager :</span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 hover:from-[#3b5998] hover:to-[#2d4373] hover:text-white transition-all hover:scale-110 shadow-sm"
                    aria-label="Partager sur Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </button>
                  <a href="https://tiktok.com/@giftpara25" target="_blank"
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 hover:from-[#1da1f2] hover:to-[#0c85d0] hover:text-white transition-all hover:scale-110 shadow-sm"
                    aria-label="Partager sur TikTok"
                  >
                    <TikTok className="h-4 w-4" />
                  </a>
                  <a href="https://www.instagram.com/giftpara25/" target="_blank"
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 hover:from-[#e4405f] hover:to-[#c13584] hover:text-white transition-all hover:scale-110 shadow-sm"
                    aria-label="Partager sur Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <button
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 hover:from-gray-800 hover:to-gray-900 hover:text-white transition-all hover:scale-110 shadow-sm"
                    aria-label="Partager"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 lg:gap-6">
          {/* Full Description */}
          {product.description && (
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-md">
              <h2 className="text-lg md:text-xl font-light text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#1e3a5f] rounded-full"></span>
                Description du produit
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base text-pretty">{product.description}</p>
            </div>
          )}

          {/* Properties */}
          {product.properties && product.properties.length > 0 && (
            <div className="bg-[#1e3a5f]/5 rounded-xl p-4 md:p-6 shadow-md border border-[#1e3a5f]/10">
              <h2 className="text-lg md:text-xl font-light text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#1e3a5f] rounded-full"></span>
                Propriétés & Bénéfices
              </h2>
              <ul className="space-y-2">
                {product.properties.map((property, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-800">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center shadow-sm">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-sm md:text-base leading-relaxed pt-0.5">{property}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
