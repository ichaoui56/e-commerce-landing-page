"use client"

import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react"

const navyBannerItems = [
  "SOINS DERMATOLOGIQUES PROFESSIONNELS",
  "PRODUITS COSMÉTIQUES PREMIUM",
  "BEAUTÉ & BIEN-ÊTRE",
  "INGRÉDIENTS NATURELS",
  "ÉCLAT ET JEUNESSE",
]

const cyanBannerItems = [
  "JUSQU'À 30% DE RÉDUCTION",
  "NOUVEAUTÉS COSMÉTIQUES",
  "LIVRAISON GRATUITE DÈS 500 DHS",
  "FORMULES DERMATOLOGIQUES",
  "QUALITÉ GARANTIE",
]

export default function Banners() {
  return (
    <section>
      {/* Navy Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 mt-6 text-white py-2 sm:py-3 md:py-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/90 to-cyan-700/90"></div>
        <div className="relative flex items-center gap-4 sm:gap-6 md:gap-8 animate-marquee-left whitespace-nowrap">
          {Array.from({ length: 4 }, (_, repeatIndex) =>
            navyBannerItems.map((item, index) => (
              <div
                key={`${repeatIndex}-${index}`}
                className="flex items-center gap-2 text-sm sm:text-base md:text-xl font-semibold"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" />
                <span>{item}</span>
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            )),
          )}
        </div>
      </div>

      {/* Cyan/Light Blue Banner */}
      <div className="bg-gradient-to-r from-gray-50 to-white text-gray-800 py-2 sm:py-3 md:py-4 overflow-hidden border-b border-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/50 to-white"></div>
        <div className="relative flex items-center gap-4 sm:gap-6 md:gap-8 animate-marquee-right whitespace-nowrap">
          {Array.from({ length: 4 }, (_, repeatIndex) =>
            cyanBannerItems.map((item, index) => (
              <div
                key={`${repeatIndex}-${index}`}
                className="flex items-center gap-2 text-sm sm:text-base md:text-xl font-semibold"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-600" />
                <span className="text-gray-700">{item}</span>
              </div>
            )),
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marquee-left 40s linear infinite;
        }

        .animate-marquee-right {
          animation: marquee-right 40s linear infinite;
        }
      `}</style>
    </section>
  )
}