"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Bookmark, Share2, Droplet } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
}

// Article data
const articlesData: Record<string, any> = {
    "peaux-mixtes-acneiques": {
        title:
            "Découvrez les Secrets d'une Peau Saine avec les Produits GiftPara pour Peaux Mixtes et Grasses à Tendance Acnéique",
        category: "Peaux Mixtes",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conseil%201-1A42EucC62voBuCzhxkKWWbHhzDidN.jpg",
        content: `
      <h2>Dans le monde des soins de la peau, trouver les bons produits pour les peaux mixtes, grasses et à tendance acnéique peut être un véritable défi.</h2>
      
      <p>Heureusement, la gamme GiftPara propose des solutions efficaces et adaptées pour prendre soin de votre peau au quotidien. Découvrez comment le Gel Purifiant et la Crème Régulatrice peuvent transformer votre routine beauté.</p>

      <h3>GiftPara Gel Purifiant : La Pureté à l'État Brut</h3>
      
      <p>Le Gel Purifiant de GiftPara est spécialement conçu pour l'hygiène quotidienne des peaux mixtes, grasses et à tendance acnéique. Ce gel lavant offre une purification en profondeur tout en respectant l'équilibre naturel de votre peau.</p>

      <h4>Propriétés :</h4>
      <ul>
        <li><strong>Sébordégulateur et Kératolytique :</strong> Aide à réguler la production de sébum et à éliminer les cellules mortes, prévenant ainsi l'apparition des imperfections.</li>
        <li><strong>Apaisant :</strong> Calme les irritations et les rougeurs, laissant votre peau douce et confortable.</li>
        <li><strong>Anti-bactérien :</strong> Lutte contre les bactéries responsables des imperfections, pour une peau plus saine.</li>
      </ul>

      <h3>GiftPara Crème Régulatrice : L'Équilibre Parfait</h3>
      
      <p>La Crème Régulatrice est un soin quotidien qui permet de corriger efficacement les imperfections cutanées liées à l'acné et aide à prévenir leur réapparition. Cette crème légère et non comédogène est idéale pour les peaux mixtes et grasses.</p>

      <h4>Propriétés :</h4>
      <ul>
        <li><strong>Sébordégulateur, Kératolytique et Kératorégulateur :</strong> Régule la production de sébum, exfolie en douceur et normalise le renouvellement cellulaire.</li>
        <li><strong>Apaisant :</strong> Apaise les irritations et réduit les rougeurs.</li>
        <li><strong>Anti-bactérien :</strong> Combat les bactéries responsables des imperfections pour une peau nette et saine.</li>
      </ul>

      <h3>Conseils d'Utilisation</h3>
      
      <p>Pour des résultats optimaux, utilisez le Gel Purifiant matin et soir pour nettoyer votre peau en profondeur. Appliquez ensuite la Crème Régulatrice pour réguler et apaiser votre peau. Avec une utilisation régulière, vous constaterez une nette amélioration de la texture et de l'apparence de votre peau.</p>

      <h3>Pourquoi Choisir GiftPara ?</h3>
      
      <p>La gamme GiftPara est formulée avec des ingrédients actifs qui ciblent spécifiquement les besoins des peaux mixtes, grasses et à tendance acnéique. Les produits sont doux, efficaces et adaptés à une utilisation quotidienne. Ils vous aident à retrouver une peau équilibrée, nette et rayonnante.</p>

      <h3>Conclusion</h3>
      
      <p>Prendre soin de sa peau n'a jamais été aussi simple avec les produits GiftPara. Que vous cherchiez à purifier, réguler ou apaiser votre peau, le Gel Purifiant et la Crème Régulatrice sont vos alliés indispensables pour une peau saine et éclatante. Adoptez dès aujourd'hui la routine GiftPara et dites adieu aux imperfections !</p>
    `,
    },
    "soins-reparateurs": {
        title: "Des Soins Réparateurs et Antiseptiques pour une Peau Saine",
        category: "Réparation",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-22%20at%2002.14.23-nZ01ah97h9glCgtD4xHqOIRsGlbipF.png",
        images: [
            {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-22%20at%2002.00.45-wPQugGPcBwGFPpovS9ObbdWCU3L5Qp.png",
                label: "CREME",
            },
            {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-22%20at%2002.14.23-nZ01ah97h9glCgtD4xHqOIRsGlbipF.png",
                label: "SPRAY",
            },
        ],
        content: `
      <h2>Les Solutions GiftPara pour une Peau Saine</h2>
      
      <p>La peau est notre première barrière de protection contre les agressions extérieures. Qu'il s'agisse de cicatrices, de petites blessures ou de problèmes cutanés, il est essentiel de prendre soin de sa peau avec des produits adaptés.</p>

      <p>La gamme GiftPara propose deux produits incontournables pour favoriser la réparation et la protection de la peau : la Crème Réparatrice et le Spray Anti-Septique. Découvrez comment ces produits peuvent vous aider à maintenir une peau saine et protégée.</p>

      <h3>GiftPara Crème Réparatrice : La Cicatrisation en Douceur</h3>
      
      <p>La Crème Réparatrice de GiftPara est un soin conçu pour favoriser, améliorer et accélérer le processus de cicatrisation de la peau, que ce soit chez l'enfant ou chez l'adulte. Cette crème polyvalente peut être utilisée sur le visage et le corps, offrant une solution complète pour les peaux abîmées.</p>

      <h4>Propriétés :</h4>
      <ul>
        <li><strong>Nourrit et aide à régénérer la peau :</strong> Grâce à des actifs nourrissants, la crème hydrate en profondeur et soutient la régénération cellulaire.</li>
        <li><strong>Favorise la réparation tissulaire :</strong> Aide à réparer les tissus cutanés endommagés, accélérant ainsi le processus de cicatrisation.</li>
        <li><strong>Améliore l'aspect de la cicatrice :</strong> Réduit visiblement les marques laissées par les cicatrices, pour une peau plus lisse et uniforme.</li>
      </ul>

      <h3>GiftPara Spray Anti-Septique : Une Protection Efficace</h3>
      
      <p>Le Spray Anti-Septique de GiftPara est une solution aqueuse conçue pour désinfecter et protéger la peau contre les bactéries et les champignons. Idéal pour les petits bobos du quotidien, ce spray est adapté à toute la famille, enfants et adultes.</p>

      <h4>Propriétés :</h4>
      <ul>
        <li><strong>Anti-bactérien :</strong> Élimine les bactéries responsables des infections, assurant une protection optimale.</li>
        <li><strong>Ne tache pas :</strong> Pratique et discret, le spray ne laisse pas de traces sur la peau ou les vêtements.</li>
        <li><strong>Ne pique pas :</strong> Formulé pour être doux, il ne provoque pas de sensation de brûlure, même sur les peaux sensibles.</li>
      </ul>

      <h3>Conseils d'Utilisation</h3>
      
      <p>Pour des résultats optimaux, appliquez la Crème Réparatrice sur les zones à traiter, en massant délicatement jusqu'à absorption complète. Utilisez-la régulièrement pour favoriser la cicatrisation et améliorer l'aspect des cicatrices. Le Spray Anti-Septique peut être utilisé directement sur les petites blessures ou les zones à désinfecter, en vaporisant une à deux fois par jour selon les besoins.</p>

      <h3>Pourquoi Choisir GiftPara ?</h3>
      
      <p>Les produits GiftPara sont formulés avec des ingrédients actifs qui répondent aux besoins spécifiques de la peau. Que ce soit pour réparer, protéger ou apaiser, la gamme GiftPara offre des solutions efficaces et adaptées à toute la famille. Les produits sont doux, non agressifs et conçus pour une utilisation quotidienne.</p>

      <h3>Conclusion</h3>
      
      <p>Prendre soin de sa peau et la protéger des agressions extérieures n'a jamais été aussi simple avec les produits GiftPara. Que vous ayez besoin de réparer une cicatrice ou de désinfecter une petite blessure, la Crème Réparatrice et le Spray Anti-Septique sont vos alliés indispensables pour une peau saine et protégée. Adoptez dès aujourd'hui la routine GiftPara et offrez à votre peau les soins qu'elle mérite !</p>
    `,
    },
    "peaux-seches-atopiques": {
        title: "Hydratez et Protégez les Peaux Sèches et Atopiques avec GiftPara",
        category: "Peaux Sèches",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/conseils%203-970uEFP3Gp7xBIam7EJKyGSeOsHE90.jpg",
        content: `
      <h2>Hydratez et Protégez les Peaux Sèches et Atopiques avec GiftPara</h2>
      
      <p>Les peaux sèches et atopiques nécessitent une attention particulière et des soins adaptés pour retrouver confort et équilibre. La gamme GiftPara propose deux produits essentiels pour répondre aux besoins spécifiques de ces peaux sensibles : le Gel Nettoyant Surgras et la Crème Emolliente.</p>

      <p>Découvrez comment ces soins peuvent transformer votre routine beauté et apporter un soulagement durable à votre peau.</p>

      <h3>GiftPara Gel Nettoyant Surgras : La Douceur au Quotidien</h3>
      
      <p>Le Gel Nettoyant Surgras de GiftPara est spécialement conçu pour l'hygiène des peaux sèches, très sèches ou à tendance atopique. Ce gel nettoyant sans savon offre une purification en douceur, sans agresser la peau.</p>

      <h4>Propriétés :</h4>
      <ul>
        <li><strong>Assainit et apaise la peau :</strong> Nettoie en profondeur tout en apaisant les irritations.</li>
        <li><strong>Nettoie en douceur sans dessécher la peau :</strong> Formulé pour préserver l'hydratation naturelle de la peau.</li>
        <li><strong>Prévient des sensations de tiraillement et d'inconfort cutané :</strong> Laisse la peau douce et confortable après chaque utilisation.</li>
      </ul>

      <h3>GiftPara Crème Emolliente : L'Hydratation Intensive</h3>
      
      <p>La Crème Emolliente de GiftPara est un soin nourrissant et émollient conçu pour les peaux sèches et à tendance atopique. Cette crème riche hydrate en profondeur et apaise les sensations d'inconfort.</p>

      <h4>Propriétés :</h4>
      <ul>
        <li><strong>Hydrate et active la réparation de l'épiderme :</strong> Restaure la barrière cutanée et favorise la régénération de la peau.</li>
        <li><strong>Apaise l'inconfort cutané et améliore l'aspect de la peau :</strong> Réduit les rougeurs et les démangeaisons, pour une peau plus lisse et plus saine.</li>
        <li><strong>Aide à combattre la sécheresse cutanée :</strong> Apporte une hydratation intense et durable, prévenant la sécheresse cutanée.</li>
      </ul>

      <h3>Conseils d'Utilisation</h3>
      
      <p>Pour des résultats optimaux, utilisez le Gel Nettoyant Surgras matin et soir pour nettoyer votre peau en douceur. Appliquez ensuite la Crème Emolliente en massant délicatement jusqu'à absorption complète. Avec une utilisation régulière, vous constaterez une nette amélioration de l'hydratation et du confort de votre peau.</p>

      <h3>Pourquoi Choisir GiftPara ?</h3>
      
      <p>La gamme GiftPara est formulée avec des ingrédients actifs qui ciblent spécifiquement les besoins des peaux sèches et atopiques. Les produits sont doux, non irritants et adaptés à une utilisation quotidienne, même pour les peaux les plus sensibles. Ils vous aident à retrouver une peau hydratée, apaisée et confortable.</p>

      <h3>Conclusion</h3>
      
      <p>Prendre soin des peaux sèches et atopiques n'a jamais été aussi simple avec les produits GiftPara. Que vous cherchiez à nettoyer en douceur ou à hydrater intensément, le Gel Nettoyant Surgras et la Crème Emolliente sont vos alliés indispensables pour une peau saine et confortable. Adoptez dès aujourd'hui la routine GiftPara et offrez à votre peau les soins qu'elle mérite !</p>
    `,
    },
}

export default function ArticleDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const article = articlesData[slug]

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-light text-gray-800 mb-4">Article non trouvé</h1>
                    <Link href="/conseils">
                        <Button className="bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] text-white">Retour aux conseils</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <motion.div
                className="relative py-20 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://portotheme.com/html/molla/assets/images/page-header-bg.jpg"
                        alt="Pattern Background"
                        fill
                        className="object-cover opacity-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/20 to-[#7a8a99]/20"></div>
                </div>
                <motion.div
                    className="container mx-auto px-4 text-center relative z-10 mt-10 lg:mt-0"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-full mb-6 shadow-lg"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Droplet className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.h1
                        className="text-4xl sm:text-5xl font-light text-[#1e3a5f] mb-4 tracking-wide"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {article.title}
                    </motion.h1>
                    <motion.p
                        className="text-[#1e3a5f] font-normal text-lg tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                       {article.category}
                    </motion.p>
                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] mx-auto mt-6 rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    ></motion.div>
                </motion.div>
            </motion.div>

            {/* Breadcrumb */}
            <motion.div
                className="bg-white shadow-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center gap-3 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-[#1e3a5f] transition-colors">
                            Accueil
                        </Link>
                        <span className="text-gray-300">›</span>
                        <Link href="/conseils" className="text-gray-500 hover:text-[#1e3a5f] transition-colors">
                            Conseils
                        </Link>
                        <span className="text-gray-300">›</span>
                        <span className="text-[#1e3a5f]">{article.category}</span>
                    </nav>
                </div>
            </motion.div>

  {/* Navigation */}
            <motion.div
                className="container mx-auto px-4 py-4 mt-4"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/conseils">
                        <Button
                            variant="outline"
                            className="border-2 border-black hover:border-cyan-600 text-[#1e3a5f] hover:bg-gradient-to-r from-cyan-600 to-cyan-700 hover:text-white rounded-xl font-semibold bg-transparent"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour aux conseils
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Article Content */}
            <motion.div
                className="container mx-auto px-4 py-4"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={fadeInLeft}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <motion.div
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                dangerouslySetInnerHTML={{
                                    __html: article.content
                                        .replace(/<h2>/g, '<h2 class="text-3xl font-light text-gray-800 mt-8 mb-4">')
                                        .replace(/<h3>/g, '<h3 class="text-2xl font-light text-[#1e3a5f] mt-6 mb-3">')
                                        .replace(/<h4>/g, '<h4 class="text-lg font-semibold text-gray-800 mt-4 mb-2">')
                                        .replace(/<p>/g, '<p class="mb-4 text-gray-700 leading-relaxed">')
                                        .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 mb-4">')
                                        .replace(/<li>/g, '<li class="text-gray-700">')
                                        .replace(/<strong>/g, '<strong class="font-semibold text-gray-800">'),
                                }}
                            />

                            {article.images && (
                                <motion.div
                                    className="mt-12 pt-8 border-t border-gray-200"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {article.images.map((img: any, idx: number) => (
                                            <ProductImageCard key={idx} image={img} index={idx} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        className="lg:col-span-1"
                        variants={fadeInRight}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <EngagementCard
                                icon={Heart}
                                title="Aimez cet article"
                                description="Partagez votre appréciation"
                                color="from-red-50 to-pink-50"
                                textColor="text-red-600"
                            />
                            <EngagementCard
                                icon={Bookmark}
                                title="Sauvegardez"
                                description="Pour lire plus tard"
                                color="from-amber-50 to-orange-50"
                                textColor="text-amber-600"
                            />
                            <EngagementCard
                                icon={Share2}
                                title="Partagez"
                                description="Avec vos proches"
                                color="from-blue-50 to-cyan-50"
                                textColor="text-blue-600"
                            />
                        </motion.div>

                        {/* CTA Box */}
                        <motion.div
                            className="bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-2xl shadow-lg p-6 text-white mt-8"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-lg font-semibold mb-3">Découvrez nos produits</h3>
                            <p className="text-white/90 text-sm mb-4">
                                Trouvez les soins adaptés à votre type de peau dans notre gamme complète.
                            </p>
                            <Link href="/shop">
                                <Button className="w-full bg-white text-[#1e3a5f] hover:bg-gray-100 font-semibold rounded-lg">
                                    Voir les produits
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

          
        </div>
    )
}

function ProductImageCard({ image, index }: { image: any; index: number }) {
    const [isHovering, setIsHovering] = useState(false)

    return (
        <motion.div
            className="relative h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            <Image src={image.src || "/placeholder.svg"} alt={image.label} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Label with hover effect */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <motion.div
                    className="text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: isHovering ? 1 : 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-white text-4xl font-light tracking-widest drop-shadow-lg">{image.label}</div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

function EngagementCard({
    icon: Icon,
    title,
    description,
    color,
    textColor,
}: {
    icon: any
    title: string
    description: string
    color: string
    textColor: string
}) {
    return (
        <motion.button
            className={`w-full bg-gradient-to-br ${color} rounded-2xl shadow-lg p-6 text-left border border-gray-100 hover:shadow-xl transition-all duration-300 group`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <div className="flex items-start gap-4">
                <motion.div
                    className={`${textColor} p-3 rounded-lg bg-white/50 group-hover:bg-white transition-colors`}
                    whileHover={{ scale: 1.1 }}
                >
                    <Icon className="h-6 w-6" />
                </motion.div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </motion.button>
    )
}
