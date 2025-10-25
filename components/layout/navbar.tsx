"use client"

import type React from "react"

import {
  Search,
  Heart,
  ChevronDown,
  X,
  Facebook,
  Twitter,
  Instagram,
  Lightbulb,
  Phone,
  Mail,
  MapPin,
  ShoppingBagIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function Navbar() {
  const pathname = usePathname()
  const { toast } = useToast()

  // Separate states for main and sticky navigation
  const [showMainCategories, setShowMainCategories] = useState(false)
  const [showStickyCategories, setShowStickyCategories] = useState(false)
  const [showCartDropdown, setShowCartDropdown] = useState(false)
  const [showShopDropdown, setShowShopDropdown] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState<"menu" | "categories">("menu")
  const [expandedMenuItem, setExpandedMenuItem] = useState<string | null>(null)
  const [expandedSubMenus, setExpandedSubMenus] = useState<Set<string>>(new Set())
  const [isClosing, setIsClosing] = useState(false)

  const TikTok = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M31.5 2c1.3 2.6 3.5 4.7 6.1 5.8 1.2.5 2.5.8 3.9.9V15c-2.6 0-5.2-.7-7.5-2v14.4c0 4.5-1.8 8.7-4.9 11.8-3.1 3.1-7.3 4.9-11.8 4.9s-8.7-1.8-11.8-4.9c-3.1-3.1-4.9-7.3-4.9-11.8s1.8-8.7 4.9-11.8c3.1-3.1 7.3-4.9 11.8-4.9.6 0 1.2 0 1.8.1v7.6c-.6-.2-1.2-.3-1.8-.3-4.3 0-7.8 3.5-7.8 7.8s3.5 7.8 7.8 7.8 7.8-3.5 7.8-7.8V2h6.6z" />
    </svg>
  )

  // Check if current path is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      const newScrolled = window.scrollY > 100
      setIsScrolled(newScrolled)
      // Close dropdowns when scroll state changes
      if (newScrolled) {
        setShowMainCategories(false)
        if (showShopDropdown) {
          setShowShopDropdown(false)
          setHoveredCategory(null)
        }
      } else {
        setShowStickyCategories(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showShopDropdown])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest("[data-cart-dropdown]") && !target.closest("[data-cart-action]")) {
        setShowCartDropdown(false)
      }
    }

    if (showCartDropdown) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [showCartDropdown])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (showMobileSidebar) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showMobileSidebar])

  // Navigation handlers
  const handleMainCategoriesMouseEnter = () => {
    if (!isScrolled) {
      setShowMainCategories(true)
    }
  }

  const handleMainCategoriesMouseLeave = () => {
    if (!isScrolled) {
      setShowMainCategories(false)
    }
  }

  const handleStickyCategoriesMouseEnter = () => {
    if (isScrolled) {
      setShowStickyCategories(true)
    }
  }

  const handleStickyCategoriesMouseLeave = () => {
    if (isScrolled) {
      setShowStickyCategories(false)
    }
  }

  const handleStickyShopMouseEnter = () => {
    if (isScrolled) {
      setShowShopDropdown(true)
    }
  }

  const handleStickyShopMouseLeave = () => {
    if (isScrolled) {
      setShowShopDropdown(false)
      setHoveredCategory(null)
    }
  }

  const handleShopMouseEnter = () => {
    if (!isScrolled) {
      setShowShopDropdown(true)
    }
  }

  const handleShopMouseLeave = () => {
    if (!isScrolled) {
      setShowShopDropdown(false)
      setHoveredCategory(null)
    }
  }

  const toggleMenuItem = (itemName: string) => {
    setExpandedMenuItem(expandedMenuItem === itemName ? null : itemName)
  }

  const toggleSubMenuItem = (subItemName: string) => {
    const newExpandedSubMenus = new Set(expandedSubMenus)
    if (newExpandedSubMenus.has(subItemName)) {
      newExpandedSubMenus.delete(subItemName)
    } else {
      newExpandedSubMenus.add(subItemName)
    }
    setExpandedSubMenus(newExpandedSubMenus)
  }

  const openSidebar = () => {
    setIsClosing(false)
    setShowMobileSidebar(true)
  }

  const closeSidebar = () => {
    setIsClosing(true)
    // Longer timeout for smoother closing animation
    setTimeout(() => {
      setShowMobileSidebar(false)
      setIsClosing(false)
      setExpandedMenuItem(null)
      setExpandedSubMenus(new Set())
      setActiveTab("menu")
    }, 800) // Increased from 600ms to 800ms
  }

  // Create main menu items with dynamic categories
  const mainMenuItems = [
    { name: "ACCUEIL", href: "/", hasSubmenu: false },
    { name: "NOS PRODUITS", href: "/shop", hasSubmenu: false },
    { name: "À PROPOS DE NOUS", href: "/about", hasSubmenu: false },
    { name: "NOS CONSEILS", href: "/conseils", hasSubmenu: false },
    { name: "NOUS CONTACTER", href: "/contact", hasSubmenu: false },
  ]

  return (
    <>
      <header className="bg-white text-gray-800 fixed lg:relative top-0 left-0 right-0 z-50 shadow-sm">
        <div className="bg-gray-900 text-white py-2 px-4 text-sm hidden lg:block">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Giftpara25@gmail.ma</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="whitespace-nowrap">07 02 07 07 83</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                <span className="whitespace-nowrap">Rue annasrine hay raha numéro 001, Casablanca</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="https://www.facebook.com/share/1CqjXsVodb/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.instagram.com/giftpara25/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.tiktok.com/@giftpara25"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 hover:bg-cyan-600 flex items-center justify-center transition-colors duration-300"
              >
                <TikTok className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b">
          <div className="container mx-auto px-4 flex justify-between items-center py-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={openSidebar}
              className="hover:bg-gray-100 w-10 h-10 p-2 relative overflow-hidden group flex-shrink-0"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 flex flex-col justify-center items-center gap-1.5">
                  <div
                    className={`w-5 h-0.5 bg-gray-800 transition-all duration-700 ease-in-out transform origin-center ${
                      showMobileSidebar && !isClosing ? "rotate-45 translate-y-2 bg-cyan-600" : "rotate-0 translate-y-0"
                    }`}
                  />
                  <div
                    className={`w-5 h-0.5 bg-gray-800 transition-all duration-500 ease-in-out ${
                      showMobileSidebar && !isClosing ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  />
                  <div
                    className={`w-5 h-0.5 bg-gray-800 transition-all duration-700 ease-in-out transform origin-center ${
                      showMobileSidebar && !isClosing
                        ? "-rotate-45 -translate-y-2 bg-cyan-600"
                        : "rotate-0 translate-y-0"
                    }`}
                  />
                </div>
              </div>
            </Button>

            <Link href="/" className="flex items-center flex-shrink-0">
              <Image src="/images/logo/logo.png" alt="GiftPara Logo" width={70} height={24} className="object-contain" />
            </Link>

            <Link
              href="/shop"
              className="relative flex items-center hover:text-cyan-600 transition-colors flex-shrink-0"
            >
              <ShoppingBagIcon className="h-6 w-6" />
            </Link>
          </div>

          <div className="border-b relative hidden lg:block">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <nav className="flex-1 flex items-center justify-between gap-4 xl:gap-8">
                <div className="flex items-center justify-between py-2 bg-white flex-shrink-0">
                  <Link href="/">
                    <Image src="/images/logo/logo.png" alt="GiftPara Logo" width={80} height={28} className="object-contain" />
                  </Link>
                </div>

                <div className="flex gap-4 xl:gap-8">
                  <Link
                    href="/"
                    className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                      isActiveLink("/")
                        ? "border-cyan-600 text-cyan-600"
                        : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                    }`}
                  >
                    Accueil
                  </Link>

                  <Link
                    href="/shop"
                    className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                      isActiveLink("/shop")
                        ? "border-cyan-600 text-cyan-600"
                        : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                    }`}
                  >
                    Nos produits
                  </Link>

                  <Link
                    href="/about"
                    className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                      isActiveLink("/about")
                        ? "border-cyan-600 text-cyan-600"
                        : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                    }`}
                  >
                    À propos de nous
                  </Link>

                  <Link
                    href="/conseils"
                    className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                      isActiveLink("/conseils")
                        ? "border-cyan-600 text-cyan-600"
                        : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                    }`}
                  >
                    Nos conseils
                  </Link>

                  <Link
                    href="/contact"
                    className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                      isActiveLink("/contact")
                        ? "border-cyan-600 text-cyan-600"
                        : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                    }`}
                  >
                    Nous contacter
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs xl:text-sm font-medium text-gray-600 flex-shrink-0">
                  <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span className="whitespace-nowrap">Clearance Up to 30% Off</span>
                </div>
              </nav>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Sidebar with Smooth Closing Animation */}
        {showMobileSidebar && (
          <>
            {/* Backdrop with smooth fade */}
            <div
              className={`fixed inset-0 bg-black z-50 lg:hidden transition-all duration-800 ease-in-out ${
                isClosing ? "bg-opacity-0" : "bg-opacity-50"
              }`}
              onClick={closeSidebar}
            />

            {/* Sidebar with enhanced slide animation */}
            <div
              className={`fixed top-0 left-0 h-full w-80 bg-white z-50 lg:hidden shadow-2xl transition-all duration-800 ease-out transform ${
                isClosing ? "-translate-x-full opacity-0 scale-95" : "translate-x-0 opacity-100 scale-100"
              }`}
              style={{
                transformOrigin: "left center",
              }}
            >
              <div className="flex flex-col h-full">
                {/* Enhanced Header with better logo visibility */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
                  <Link href="/" onClick={closeSidebar}>
                    <Image src="/images/logo/logo.png" alt="GiftPara Logo" width={80} height={28} className="object-contain" />
                  </Link>
                  <button
                    onClick={closeSidebar}
                    className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
                  >
                    <X className="h-6 w-6 text-gray-600 group-hover:rotate-90 group-hover:text-cyan-600 transition-all duration-300" />
                  </button>
                </div>

                {/* Search Bar */}
                {/* <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Rechercher des produits..."
                      className="pr-12 border-2 border-gray-200 focus:border-cyan-600 rounded-lg transition-colors duration-200 bg-white"
                    />
                    <button className="absolute right-1 top-1 bottom-1 px-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md transition-colors duration-200">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </div> */}

                {/* Enhanced Tabs with better styling */}
                <div className="flex border-b border-gray-200 bg-white">
                  <button
                    onClick={() => setActiveTab("menu")}
                    className={`flex-1 py-4 px-4 text-sm font-semibold transition-all duration-300 relative ${
                      activeTab === "menu"
                        ? "text-cyan-600 bg-gray-50"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    MENU
                    {activeTab === "menu" && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-600 transform scale-x-100 transition-transform duration-300" />
                    )}
                  </button>
                 
                </div>

                {/* Content with improved animations */}
                <div className="flex-1 overflow-y-auto bg-white">
                  {activeTab === "menu" && (
                    <div className="py-2">
                      {mainMenuItems.map((item, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-b-0">
                          <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all duration-200 group">
                            <Link
                              href={item.href}
                              className={`flex-1 font-medium text-base group-hover:text-cyan-600 transition-colors duration-200 ${
                                isActiveLink(item.href) ? "text-cyan-600" : "text-gray-700"
                              }`}
                              onClick={() => !item.hasSubmenu && closeSidebar()}
                            >
                              {item.name}
                            </Link>
                            {item.hasSubmenu && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  toggleMenuItem(item.name)
                                }}
                                className="p-2 hover:bg-gray-200 rounded-full transition-all duration-200 group-hover:scale-110"
                              >
                                <ChevronDown
                                  className={`h-5 w-5 text-gray-500 transition-all duration-400 ${
                                    expandedMenuItem === item.name ? "rotate-180 text-cyan-600 scale-110" : ""
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-800">Contactez-nous</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Mail className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                      <span>Giftpara25@gmail.ma</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                      <span>07 02 07 07 83</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <MapPin className="h-4 w-4 text-cyan-600 flex-shrink-0" />
                      <span>Rue annasrine hay raha numéro 001, Casablanca</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold mb-3 text-gray-800">Suivez-nous</p>
                    <div className="flex justify-center gap-3">
                      <Link
                        href="https://www.facebook.com/share/1CqjXsVodb/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#3b5998] hover:text-white hover:border-[#3b5998] transition-all duration-300 transform hover:scale-110"
                      >
                        <Facebook className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://www.instagram.com/giftpara25/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#e4405f] hover:text-white hover:border-[#e4405f] transition-all duration-300 transform hover:scale-110"
                      >
                        <Instagram className="h-4 w-4" />
                      </Link>
                      <Link
                        href="https://www.tiktok.com/@giftpara25"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#010101] hover:text-white hover:border-[#010101] transition-all duration-300 transform hover:scale-110"
                      >
                        <TikTok className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className={`fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 transition-transform duration-300 hidden lg:block ${
            isScrolled ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <nav className="flex-1 flex items-center justify-between gap-4 xl:gap-8">
              <div className="flex items-center justify-between py-2 bg-white flex-shrink-0">
                <Link href="/">
                  <Image src="/images/logo/logo.png" alt="GiftPara Logo" width={80} height={28} className="object-contain" />
                </Link>
              </div>

              <div className="flex gap-4 xl:gap-8">
                <Link
                  href="/"
                  className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                    isActiveLink("/")
                      ? "border-cyan-600 text-cyan-600"
                      : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                  }`}
                >
                  Accueil
                </Link>

                <Link
                  href="/shop"
                  className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                    isActiveLink("/shop")
                      ? "border-cyan-600 text-cyan-600"
                      : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                  }`}
                >
                  Nos produits
                </Link>

                <Link
                  href="/about"
                  className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                    isActiveLink("/about")
                      ? "border-cyan-600 text-cyan-600"
                      : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                  }`}
                >
                  À propos de nous
                </Link>

                <Link
                  href="/conseils"
                  className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                    isActiveLink("/conseils")
                      ? "border-cyan-600 text-cyan-600"
                      : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                  }`}
                >
                  Nos Conseils
                </Link>

                <Link
                  href="/contact"
                  className={`flex items-center gap-1 py-6 border-b-2 font-semibold transition-colors whitespace-nowrap text-sm xl:text-base ${
                    isActiveLink("/contact")
                      ? "border-cyan-600 text-cyan-600"
                      : "border-transparent hover:border-cyan-600 hover:text-cyan-600"
                  }`}
                >
                  Nous Contacter
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs xl:text-sm font-medium text-gray-600 flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                <span className="whitespace-nowrap">Liquidation jusqu'à 30% de réduction</span>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}