"use client"

import { useState, useRef } from "react"
import { ArrowRight, Droplet } from "lucide-react"

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
}

export default function ConseillsPage() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)

    const articles = [
        {
            id: "peaux-mixtes-acneiques",
            title:
                "Découvrez les Secrets d'une Peau Saine avec les Produits GiftPara pour Peaux Mixtes et Grasses à Tendance Acnéique",
            excerpt:
                "Trouvez les bons produits pour les peaux mixtes, grasses et à tendance acnéique. Découvrez comment le Gel Purifiant et la Crème Régulatrice peuvent transformer votre routine beauté.",
            category: "Peaux Mixtes",
            isMiddle: false,
        },
        {
            id: "soins-reparateurs",
            title: "Des Soins Réparateurs et Antiseptiques pour une Peau Saine",
            excerpt:
                "La peau est notre première barrière de protection. Découvrez comment la Crème Réparatrice et le Spray Anti-Septique peuvent favoriser la cicatrisation et protéger votre peau.",
            category: "Réparation",
            isMiddle: true,
        },
        {
            id: "peaux-seches-atopiques",
            title: "Hydratez et Protégez les Peaux Sèches et Atopiques avec GiftPara",
            excerpt:
                "Les peaux sèches et atopiques nécessitent une attention particulière. Découvrez le Gel Nettoyant Surgras et la Crème Emolliente pour une hydratation intensive.",
            category: "Peaux Sèches",
            isMiddle: false,
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Beautiful Page Header with Animation */}
            <div 
                className="relative py-20 overflow-hidden opacity-0 animate-fade-in"
                style={{ animation: 'fadeIn 0.8s ease-out forwards' }}
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/20 to-[#7a8a99]/20"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div 
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-full mb-6 shadow-lg opacity-0 scale-0"
                        style={{ animation: 'scaleIn 0.5s ease-out 0.3s forwards' }}
                    >
                        <Droplet className="w-8 h-8 text-white" />
                    </div>
                    <h1 
                        className="text-5xl font-light text-[#1e3a5f] mb-4 tracking-wide opacity-0 translate-y-8"
                        style={{ animation: 'slideUp 0.6s ease-out 0.4s forwards' }}
                    >
                        Nos Conseils
                    </h1>
                    <p 
                        className="text-[#1e3a5f] font-normal text-lg tracking-wider opacity-0"
                        style={{ animation: 'fadeIn 0.6s ease-out 0.6s forwards' }}
                    >
                        Expertise en Dermo-Cosmétique
                    </p>
                    <div 
                        className="w-24 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] mx-auto mt-6 rounded-full scale-x-0"
                        style={{ animation: 'expandWidth 0.8s ease-out 0.8s forwards' }}
                    ></div>
                </div>
            </div>

            {/* Breadcrumb with Animation */}
            <div 
                className="bg-white shadow-sm opacity-0 -translate-y-5"
                style={{ animation: 'slideDown 0.5s ease-out 0.2s forwards' }}
            >
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center gap-3 text-sm">
                        <a href="/" className="text-gray-500 hover:text-[#1e3a5f] transition-colors">
                            Accueil
                        </a>
                        <span className="text-gray-300">›</span>
                        <span className="text-[#1e3a5f]">Conseils</span>
                    </nav>
                </div>
            </div>

            {/* Articles Grid with Stagger Animation */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <div
                            key={article.id}
                            className="opacity-0 scale-90"
                            style={{ 
                                animation: `scaleIn 0.5s ease-out ${0.2 * (index + 1)}s forwards` 
                            }}
                        >
                            <ConseilCard
                                article={article}
                                isHovered={hoveredCard === article.id}
                                onMouseEnter={() => setHoveredCard(article.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section with Animation */}
            <div className="container mx-auto px-4 py-16">
                <div 
                    className="bg-gradient-to-r from-cyan-600 to-cyan-700 rounded-2xl shadow-2xl p-12 text-center text-white opacity-0 scale-95 hover:scale-100 transition-all duration-300"
                    style={{ animation: 'scaleIn 0.6s ease-out 0.8s forwards' }}
                >
                    <h2 
                        className="text-3xl font-light mb-4 opacity-0 translate-y-5"
                        style={{ animation: 'slideUp 0.6s ease-out 1s forwards' }}
                    >
                        Prêt(e) à transformer votre routine beauté ?
                    </h2>
                    <p 
                        className="text-white/90 mb-8 max-w-2xl mx-auto text-lg opacity-0 translate-y-5"
                        style={{ animation: 'slideUp 0.6s ease-out 1.2s forwards' }}
                    >
                        Découvrez notre gamme complète de soins dermo-cosmétiques conçus pour nourrir et apaiser votre peau.
                    </p>
                    <div
                        className="opacity-0 translate-y-5"
                        style={{ animation: 'slideUp 0.6s ease-out 1.4s forwards' }}
                    >
                        <a href="/shop">
                            <button className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-cyan-700 transition-all duration-300 px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
                                Découvrir nos Produits <ArrowRight className="h-4 w-4" />
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes expandWidth {
                    from {
                        transform: scaleX(0);
                    }
                    to {
                        transform: scaleX(1);
                    }
                }
            `}</style>
        </div>
    )
}

function ConseilCard({
    article,
    isHovered,
    onMouseEnter,
    onMouseLeave,
}: {
    article: any
    isHovered: boolean
    onMouseEnter: () => void
    onMouseLeave: () => void
}) {
    const isDarkCard = article.isMiddle
    const cardRef = useRef<HTMLDivElement>(null)
    const [hoverPosition, setHoverPosition] = useState({ x: 50, y: 50 })
    const [isAnimating, setIsAnimating] = useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            setHoverPosition({ x, y })
            setIsAnimating(true)
        }
        onMouseEnter()
    }

    const handleMouseLeave = () => {
        setIsAnimating(false)
        onMouseLeave()
    }

    // Determine if we should show gradient (dark) or white
    const showGradient = (!isHovered && isDarkCard) || (isHovered && !isDarkCard)
    const textColor = showGradient ? "text-white" : "text-gray-800"
    const excerptColor = showGradient ? "text-white/80" : "text-gray-600"
    const categoryBg = showGradient ? "rgba(255,255,255,0.12)" : "rgba(30,58,95,0.1)"
    const categoryText = showGradient ? "text-white/80" : "text-[#1e3a5f]/70"

    const getBackgroundStyle = () => {
        // Base colors
        const gradientColor = "linear-gradient(135deg, rgb(8, 145, 178) 0%, rgb(14, 116, 144) 100%)"
        const whiteColor = "#ffffff"
        
        // Default state (no hover)
        const baseColor = isDarkCard ? gradientColor : whiteColor
        
        if (!isAnimating) {
            return {
                background: baseColor,
            }
        }
        
        // Hover state: create expanding circle from hover point
        const size = isHovered ? "150%" : "0%"
        
        return {
            background: `
                radial-gradient(
                    circle at ${hoverPosition.x}% ${hoverPosition.y}%, 
                    ${isDarkCard ? whiteColor : "rgb(8, 145, 178)"} 0%,
                    ${isDarkCard ? whiteColor : "rgb(11, 130, 161)"} 50%,
                    ${isDarkCard ? whiteColor : "rgb(14, 116, 144)"} ${size}
                ),
                ${baseColor}
            `,
            transition: "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }
    }

    return (
        <div
            ref={cardRef}
            className="relative rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2"
            style={getBackgroundStyle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Content */}
            <div className="p-8 relative z-10">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 transition-all duration-500"
                    style={{ backgroundColor: categoryBg }}
                >
                    <span className={`text-xs font-medium transition-colors duration-500 ${categoryText}`}>
                        {article.category}
                    </span>
                </div>

                <h3
                    className={`text-xl font-semibold ${textColor} mb-3 line-clamp-2 transition-colors duration-500`}
                >
                    {article.title}
                </h3>

                <p
                    className={`${excerptColor} text-sm leading-relaxed mb-6 line-clamp-3 transition-colors duration-500`}
                >
                    {article.excerpt}
                </p>

                <a href={`/conseils/${article.id}`}>
                    <button
                        className={`w-full ${
                            showGradient 
                                ? "bg-white text-cyan-700 hover:bg-gray-100" 
                                : "bg-gradient-to-r from-cyan-600 to-cyan-700 text-white hover:from-cyan-700 hover:to-cyan-800"
                        } rounded-xl font-semibold tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 px-6 py-3`}
                    >
                        Lire Plus <ArrowRight className="h-4 w-4" />
                    </button>
                </a>
            </div>
        </div>
    )
}