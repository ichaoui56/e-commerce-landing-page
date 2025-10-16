"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ChevronDown, SlidersHorizontal } from "lucide-react"
import ProductCard from "./product-card"
import Link from "next/link"
import type { ProductWithDetails } from "@/lib/types"
import productsData from "@/data/products.json"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  topPriceOnly: boolean
}

// Skeleton component for loading state
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm border animate-pulse">
    <div className="aspect-square bg-gray-200"></div>
    <div className="p-3 sm:p-4 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
)

export default function ShopPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("most-popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    inStockOnly: false,
    topPriceOnly: false,
  })
  const [tempFilters, setTempFilters] = useState<FilterState>(filters)

  // Pagination states
  const [displayedProducts, setDisplayedProducts] = useState<ProductWithDetails[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [allFilteredProducts, setAllFilteredProducts] = useState<ProductWithDetails[]>([])

  const PRODUCTS_PER_PAGE = 12

  const products: ProductWithDetails[] = productsData.products.map((p: any) => ({
    ...p,
    createdAt: new Date(p.createdAt),
    updatedAt: new Date(p.updatedAt),
  }))

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))

  const getFilteredAndSortedProducts = () => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)
      const matchesStock = !filters.inStockOnly || product.inStock
      const matchesTopPrice = !filters.topPriceOnly || product.top_price

      return matchesSearch && matchesPrice && matchesCategory && matchesStock && matchesTopPrice
    })

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return b.createdAt.getTime() - a.createdAt.getTime()
        default:
          return 0
      }
    })

    return sorted
  }

  // Update filtered products whenever filters or sort changes
  useEffect(() => {
    const filteredAndSorted = getFilteredAndSortedProducts()
    setAllFilteredProducts(filteredAndSorted)
    setDisplayedProducts(filteredAndSorted.slice(0, PRODUCTS_PER_PAGE))
    setCurrentPage(1)
  }, [filters, sortBy, searchQuery])

  // Load more products function
  const loadMoreProducts = async () => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const nextPage = currentPage + 1
    const startIndex = (nextPage - 1) * PRODUCTS_PER_PAGE
    const endIndex = startIndex + PRODUCTS_PER_PAGE

    const newProducts = allFilteredProducts.slice(startIndex, endIndex)
    setDisplayedProducts((prev) => [...prev, ...newProducts])
    setCurrentPage(nextPage)
    setIsLoading(false)
  }

  const hasMoreProducts = displayedProducts.length < allFilteredProducts.length

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (showFilters && !target.closest("[data-filters-sidebar]") && !target.closest("[data-filters-trigger]")) {
        setShowFilters(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [showFilters])

  // Prevent body scroll when filters are open
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showFilters])

  const updateTempFilter = (type: keyof FilterState, value: any) => {
    setTempFilters((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const applyFilters = () => {
    setFilters(tempFilters)
    setShowFilters(false)
  }

  const clearAllFilters = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 500] as [number, number],
      inStockOnly: false,
      topPriceOnly: false,
    }
    setTempFilters(resetFilters)
    setFilters(resetFilters)
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
          <nav className="flex items-center gap-2 text-sm mb-4 sm:mb-6">
            <Link href="/" className="text-gray-500 hover:text-[#1e3a5f] transition-colors">
              Accueil
            </Link>
            <span className="text-gray-300">›</span>
            <span className="text-[#1e3a5f] font-medium">Boutique</span>
          </nav>

          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Tous les produits</h1>
            <p className="text-gray-600 text-sm">Découvrez notre gamme complète de produits dermatologiques</p>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-600">
              Affichage de {displayedProducts.length} sur {allFilteredProducts.length} produits
            </p>
            <Button
              data-filters-trigger
              onClick={() => setShowFilters(true)}
              variant="outline"
              className="flex items-center gap-2 border-gray-300 hover:border-[#1e3a5f] hover:text-[#1e3a5f] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtres
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {isLoading &&
            Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
        </div>

        {displayedProducts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun produit trouvé correspondant à vos filtres.</p>
            <Button onClick={clearAllFilters} className="mt-4 bg-[#1e3a5f] hover:bg-[#152d4a] text-white">
              Effacer tous les filtres
            </Button>
          </div>
        )}

        {hasMoreProducts && displayedProducts.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <Button
              onClick={loadMoreProducts}
              disabled={isLoading}
              variant="outline"
              className="border-2 border-gray-300 hover:border-[#1e3a5f] hover:text-[#1e3a5f] bg-transparent px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "CHARGEMENT..." : "PLUS DE PRODUITS"}
            </Button>
          </div>
        )}

        {!hasMoreProducts &&
          displayedProducts.length > 0 &&
          displayedProducts.length === allFilteredProducts.length && (
            <div className="text-center mt-8 sm:mt-12">
              <p className="text-gray-500">Vous avez vu tous les produits disponibles</p>
            </div>
          )}
      </div>

      {showFilters && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowFilters(false)} />
          <div
            data-filters-sidebar
            className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out max-w-[90vw]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">FILTRES</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-[#1e3a5f] hover:text-[#152d4a] transition-colors"
                  >
                    Tout effacer
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {/* Category Filter */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">Catégorie</h4>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="space-y-3">
                    {categories.map((categoryName) => (
                      <div key={categoryName} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={categoryName}
                            checked={tempFilters.categories.includes(categoryName)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateTempFilter("categories", [...tempFilters.categories, categoryName])
                              } else {
                                updateTempFilter(
                                  "categories",
                                  tempFilters.categories.filter((c) => c !== categoryName),
                                )
                              }
                            }}
                          />
                          <label htmlFor={categoryName} className="text-sm text-gray-700 cursor-pointer">
                            {categoryName}
                          </label>
                        </div>
                        <span className="text-xs text-gray-500">
                          {products.filter((p) => p.category === categoryName).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">Disponibilité</h4>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="inStock"
                        checked={tempFilters.inStockOnly}
                        onCheckedChange={(checked) => {
                          updateTempFilter("inStockOnly", checked)
                        }}
                      />
                      <label htmlFor="inStock" className="text-sm text-gray-700 cursor-pointer">
                        En stock uniquement
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="topPrice"
                        checked={tempFilters.topPriceOnly}
                        onCheckedChange={(checked) => {
                          updateTempFilter("topPriceOnly", checked)
                        }}
                      />
                      <label htmlFor="topPrice" className="text-sm text-gray-700 cursor-pointer">
                        Meilleurs prix
                      </label>
                    </div>
                  </div>
                </div>

                {/* Price Filter */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-800">Prix</h4>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Fourchette de prix : {tempFilters.priceRange[0]} - {tempFilters.priceRange[1]} DHS
                    </div>
                    <div className="relative px-2">
                      <input
                        type="range"
                        min="0"
                        max="500"
                        value={tempFilters.priceRange[1]}
                        onChange={(e) =>
                          updateTempFilter("priceRange", [tempFilters.priceRange[0], Number.parseInt(e.target.value)])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 px-2">
                      <span>0 DHS</span>
                      <span>500 DHS</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowFilters(false)}
                    variant="outline"
                    className="flex-1 border-gray-300 hover:border-gray-400"
                  >
                    Annuler
                  </Button>
                  <Button onClick={applyFilters} className="flex-1 bg-[#1e3a5f] hover:bg-[#152d4a] text-white">
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
