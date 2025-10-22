"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Users,
  Award,
  Globe,
  Sparkles,
  Target,
  Eye,
  TrendingUp,
  Droplet,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

// Animation variants
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

export default function AboutPage() {
  const stats = [
    { number: "20+", label: "Années d'Expertise", icon: Award },
    { number: "100K+", label: "Clients Satisfaits", icon: Users },
    { number: "50+", label: "Produits Innovants", icon: Droplet },
    { number: "98%", label: "Taux de Satisfaction", icon: Star },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion pour la Peau",
      description:
        "Nous vivons et respirons la dermo-cosmétique, à la recherche constante des meilleures solutions pour nourrir et apaiser votre peau.",
    },
    {
      icon: Award,
      title: "Excellence Scientifique",
      description:
        "Chaque formule est développée avec rigueur scientifique et des actifs puissants pour des résultats visibles et durables.",
    },
    {
      icon: Users,
      title: "Expertise Professionnelle",
      description:
        "Nos équipes sont composées de passionnés de dermo-cosmétique avec des années d'expérience auprès des professionnels de la peau.",
    },
    {
      icon: Globe,
      title: "Innovation Mondiale",
      description:
        "Nous combinons les meilleures pratiques internationales avec une compréhension profonde des besoins locaux.",
    },
  ]

  const team = [
    {
      name: "Dr. Marie Dubois",
      role: "Directrice Scientifique",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      description:
        "Avec plus de 20 ans d'expérience en dermatologie et cosmétologie, Marie dirige notre recherche et développement pour créer des formules révolutionnaires.",
    },
    {
      name: "Prof. Ahmed Khalil",
      role: "Responsable de la Formulation",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Ahmed assure que chaque produit H&S Derma répond à nos standards élevés de qualité et d'efficacité, avec une expertise en actifs botaniques.",
    },
    {
      name: "Dr. Sophie Laurent",
      role: "Directrice Médicale",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      description:
        "Sophie apporte son expertise médicale pour garantir que nos produits sont sûrs et efficaces pour les peaux sensibles.",
    },
  ]

  const milestones = [
    {
      year: "2005",
      title: "Fondation",
      description: "H&S Pharma est créée avec la vision de révolutionner les soins dermatologiques",
    },
    { year: "2010", title: "Première Ligne", description: "Lancement de la gamme H&S Derma pour peaux sensibles" },
    {
      year: "2015",
      title: "Reconnaissance",
      description: "Certification ISO et reconnaissance internationale pour l'innovation",
    },
    { year: "2020", title: "Expansion", description: "Présence dans 30 pays avec des partenaires professionnels" },
    { year: "2024", title: "Leadership", description: "Devenue leader en dermo-cosmétique pour peaux sensibles" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Beautiful Page Header */}
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
          className="container mx-auto px-4 text-center relative z-10"
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
            className="text-5xl font-light text-[#1e3a5f] mb-4 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            À Propos de H&S Derma
          </motion.h1>
          <motion.p
            className="text-[#1e3a5f] font-normal text-lg tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            EXPERTISE EN DERMO-COSMÉTIQUE
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
            <span className="text-[#1e3a5f]">À Propos</span>
          </nav>
        </div>
      </motion.div>

      {/* Hero Story Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="space-y-6" variants={fadeInLeft}>
            <motion.div
              className="inline-flex items-center gap-2 text-[#1e3a5f] font-medium"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-5 w-5" />
              <span>Depuis 2005</span>
            </motion.div>
            <motion.h2
              className="text-4xl font-light text-gray-800 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Soigner la Peau, <br />
              <span className="text-[#1e3a5f]">Redéfinir le Bien-être</span>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Lorsque la peau est sensible ou fragilisée, elle peut véritablement impacter notre humeur et notre confort
              au quotidien. Les irritations ou inconforts deviennent alors des sources de gêne, voire de frustration.
              Mais dès que notre peau se rétablit, une sensation de légèreté et de confiance nous envahit.
            </motion.p>
            <motion.p
              className="text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              C'est là que les soins H&S Derma interviennent, offrant des formules riches en actifs puissants et des
              innovations de pointe pour nourrir et apaiser la peau, redonnant ainsi plaisir et bien-être à chaque
              application. La gamme H&S a été conçue par des passionnés de dermo-cosmétique, forts de leurs années
              d'expérience acquises au contact des professionnels de la peau.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/shop">
                <Button className="bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] hover:from-[#152a45] hover:to-[#6a7a89] text-white px-8 py-3 rounded-xl font-semibold tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
                  Découvrir nos Produits <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HS_20250714_112406_0000-K6fFRrBE8E4qWTM8F6tIyWoP737CPN.png"
                alt="H&S Derma Logo"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-2xl blur-3xl opacity-30"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-[#7a8a99] to-[#1e3a5f] rounded-2xl blur-3xl opacity-20"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="bg-white py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={scaleIn}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#1e3a5f]/10 to-[#7a8a99]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-[#1e3a5f]" />
                </div>
                <div className="text-3xl font-light text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            variants={fadeInLeft}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-light text-gray-800">Notre Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Mettre à profit notre savoir-faire et notre expertise pour créer des soins dermo-cosmétiques innovants qui
              transforment la vie des personnes ayant une peau sensible ou fragilisée. Nous nous engageons à offrir des
              formules riches en actifs puissants, développées avec rigueur scientifique et passion.
            </p>
            <div className="flex items-center gap-2 text-[#1e3a5f] font-medium">
              <CheckCircle className="h-5 w-5" />
              <span>Excellence en dermo-cosmétique</span>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
            variants={fadeInRight}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#7a8a99] to-[#1e3a5f] rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-light text-gray-800">Notre Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Devenir le leader mondial en dermo-cosmétique pour peaux sensibles, reconnu pour notre engagement envers
              l'innovation, la qualité et le bien-être des clients. Nous envisageons un avenir où chaque personne peut
              retrouver confiance et sérénité dans sa peau.
            </p>
            <div className="flex items-center gap-2 text-[#7a8a99] font-medium">
              <TrendingUp className="h-5 w-5" />
              <span>Innovation et bien-être</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        className="bg-gradient-to-r from-slate-50 to-white py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={fadeInUp}>
            <h2 className="text-3xl font-light text-gray-800 mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ces principes fondamentaux guident tout ce que nous faisons, de la recherche et développement au service
              de nos clients
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                variants={scaleIn}
                whileHover={{ y: -10 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#1e3a5f]/10 to-[#7a8a99]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="h-6 w-6 text-[#1e3a5f]" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          className="bg-gradient-to-r from-[#1e3a5f] to-[#7a8a99] rounded-2xl shadow-2xl p-12 text-center text-white"
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-3xl font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt(e) à Découvrir la Différence H&S Derma ?
          </motion.h2>
          <motion.p
            className="text-white/90 mb-8 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explorez notre gamme complète de soins dermo-cosmétiques conçus pour nourrir et apaiser votre peau sensible.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/shop">
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#1e3a5f] transition-all duration-300 px-8 py-3 rounded-xl font-semibold"
              >
                Acheter Maintenant
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-[#1e3a5f] transition-all duration-300 px-8 py-3 rounded-xl font-semibold"
              >
                Contactez-nous
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
