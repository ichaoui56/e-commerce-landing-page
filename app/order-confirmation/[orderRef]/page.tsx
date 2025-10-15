"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle,
  Package,
  Truck,
  Phone,
  MapPin,
  Calendar,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getOrderByRef } from "@/lib/actions/orders"

// Update your OrderDetails interface in the React component
interface OrderDetails {
  id: string
  ref_id: string
  name: string
  phone: string
  city: string
  status: string
  created_at: string
  shipping_cost: number
  shipping_option?: string | null // Allow both undefined and null
  total_amount: number
  items: Array<{
    id: string
    quantity: number
    unit_price: number
    subtotal: number
    product: {
      id: string
      name: string
    }
    color: {
      id: string
      name: string
      hex: string
    }
    size: {
      id: string
      label: string
    }
    image_url: string
  }>
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderRef: string }> }) {
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orderData = await getOrderByRef((await params).orderRef)
        if (orderData) {
          setOrder(orderData)
        } else {
          setError("Commande non trouvée")
        }
      } catch (err) {
        console.error("Error loading order:", err)
        setError("Échec du chargement des détails de la commande")
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [params])

  const copyOrderRef = async () => {
    if (order) {
      try {
        await navigator.clipboard.writeText(order.ref_id)
        setCopied(true)
        toast.success("Référence de commande copiée !")
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        toast.error("Échec de la copie de la référence de commande")
      }
    }
  }

  const shareOrder = async () => {
    if (order && navigator.share) {
      try {
        await navigator.share({
          title: `Commande ${order.ref_id}`,
          text: `Ma commande a été confirmée ! Référence de commande : ${order.ref_id}`,
          url: window.location.href,
        })
      } catch (err) {
        // Fallback to copying URL
        copyOrderRef()
      }
    } else {
      copyOrderRef()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 bg-[#e94491] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Package className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-light text-gray-800 mb-2">Chargement de votre commande...</h2>
          <p className="text-gray-600">Veuillez patienter pendant que nous récupérons les détails de votre commande</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Package className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4 tracking-tight">
            Merci pour votre commande !
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Votre commande a été passée avec succès. Une confirmation sera bientôt envoyée sur votre téléphone.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3">
              <Link href="/">Retour à l'accueil</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-[#e94491] text-[#e94491] hover:bg-[#e94491] hover:text-white py-3 bg-transparent"
            >
              <Link href="/orders">Voir mes commandes</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "processing":
        return "text-blue-700 bg-blue-100 border-blue-200"
      case "shipped":
        return "text-purple-700 bg-purple-100 border-purple-200"
      case "delivered":
        return "text-green-700 bg-green-100 border-green-200"
      case "cancelled":
        return "text-red-700 bg-red-100 border-red-200"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "EN ATTENTE D'APPROBATION"
      case "processing":
        return "APPROUVÉE"
      case "shipped":
        return "EXPÉDIÉE"
      case "delivered":
        return "LIVRÉE"
      case "cancelled":
        return "ANNULÉE"
      default:
        return status.toUpperCase()
    }
  }

  // Calculate subtotal from items
  const subtotal = order.items.reduce((total, item) => total + item.subtotal, 0)
  const isPending = order.status.toLowerCase() === "pending"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Success Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-2xl ${
                isPending
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 animate-pulse"
                  : "bg-gradient-to-r from-green-400 to-green-600"
              }`}
            >
              {isPending ? (
                <Clock className="w-12 h-12 text-white" />
              ) : (
                <CheckCircle className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-light text-gray-800 mb-3">
                {isPending ? "⏳ Commande reçue !" : "🎉 Commande confirmée !"}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Merci <strong className="text-[#e94491]">{order.name}</strong> pour votre commande !
                {isPending
                  ? " Votre commande est en attente d'approbation par notre équipe."
                  : " Nous avons reçu votre commande et allons la traiter sous peu."}
              </p>
              <div className="inline-flex items-center gap-2 bg-[#e94491]/10 px-6 py-3 rounded-full">
                <span className="font-semibold text-gray-800">Réf. commande :</span>
                <code className="font-mono font-bold text-[#e94491] text-lg">{order.ref_id}</code>
                <button
                  onClick={copyOrderRef}
                  className="ml-2 p-1 hover:bg-[#e94491]/20 rounded transition-colors"
                  title="Copier la référence de commande"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-[#e94491]" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPending && (
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-4 bg-white/60 rounded-xl border border-yellow-200">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-800 mb-2">Votre commande est en cours de vérification</h3>
                  <p className="text-yellow-700 text-sm leading-relaxed mb-3">
                    Notre équipe examine actuellement votre commande pour s'assurer de la disponibilité des produits.
                    <strong> Les articles ne sont pas encore réservés</strong> et le stock sera confirmé lors de
                    l'approbation.
                  </p>
                  <div className="flex items-center gap-4 text-xs text-yellow-600">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Stock non réservé
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Approbation sous 24h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-light text-gray-800 mb-2">Détails de la commande</h2>
                  <p className="text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Passée le {formatDate(order.created_at)}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(order.status)}`}
                >
                  {getStatusIcon(order.status)}
                  <span>{getStatusText(order.status)}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-[#e94491]/5 to-[#f472b6]/5 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#e94491] rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Informations de contact</h3>
                      <p className="text-gray-700 font-medium">{order.name}</p>
                      <p className="text-gray-600">{order.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Adresse de livraison</h3>
                      <p className="text-gray-700 leading-relaxed">{order.city}</p>
                      {order.shipping_option && (
                        <p className="text-sm text-gray-500 mt-1">Livraison : {order.shipping_option}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                    <Package className="w-6 h-6 text-[#e94491]" />
                    Vos articles ({order.items.length} {order.items.length === 1 ? "article" : "articles"})
                  </h3>
                  <span className="text-sm text-gray-500">
                    {order.items.reduce((total, item) => total + item.quantity, 0)} articles au total
                  </span>
                </div>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id} className="group bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 transition-colors">
                      <div className="flex gap-6">
                        <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
                          <Image
                            src={item.image_url || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#e94491] rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-3 text-lg">{item.product.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: item.color.hex }}
                              />
                              <span className="font-medium">{item.color.name}</span>
                            </div>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span>
                              <strong>Taille :</strong> {item.size.label}
                            </span>
                            <div className="w-px h-4 bg-gray-300"></div>
                            <span>
                              <strong>Qté :</strong> {item.quantity}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">{item.unit_price.toFixed(2)} DHS</span> × {item.quantity}
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-[#e94491] text-lg">{item.subtotal.toFixed(2)} DHS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* What's Next - Updated for approval workflow */}
            <div
              className={`rounded-2xl p-8 border ${
                isPending
                  ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                  : "bg-gradient-to-r from-[#e94491]/10 to-[#f472b6]/10 border-[#e94491]/20"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                ⏭️ Qu'est-ce qui se passe ensuite ?
              </h3>
              <div className="space-y-4">
                {isPending ? (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Vérification et approbation</h4>
                        <p className="text-sm text-gray-600">
                          Notre équipe vérifie la disponibilité des produits et approuve votre commande sous 24h.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500">Réservation du stock</h4>
                        <p className="text-sm text-gray-500">
                          Une fois approuvée, vos articles seront réservés et préparés pour l'expédition.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-500">Expédition et livraison</h4>
                        <p className="text-sm text-gray-500">
                          Votre commande sera expédiée et vous paierez à la livraison.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#e94491] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Traitement de la commande</h4>
                        <p className="text-sm text-gray-600">
                          Nous allons vérifier votre commande et préparer vos articles pour l'expédition.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#e94491] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Expédition</h4>
                        <p className="text-sm text-gray-600">
                          Votre commande sera expédiée dans les 1-2 jours ouvrables.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#e94491] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Livraison et paiement</h4>
                        <p className="text-sm text-gray-600">
                          Vous paierez en espèces à la réception de votre commande.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                📋 Récapitulatif de la commande
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">
                    Articles ({order.items.reduce((total, item) => total + item.quantity, 0)}):
                  </span>
                  <span className="font-medium text-gray-800">{subtotal.toFixed(2)} DHS</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Livraison</span>
                  <span className="font-medium text-gray-800">
                    {order.shipping_cost > 0 ? `${order.shipping_cost.toFixed(2)} DHS` : "Gratuit"}
                  </span>
                </div>
                <div className="flex justify-between py-4 text-xl font-bold border-t-2 border-gray-200">
                  <span className="text-[#e94491]">Total :</span>
                  <span className="text-[#e94491]">{order.total_amount.toFixed(2)} DHS</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#e94491]" />
                Informations de livraison
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💰</span>
                    <p className="text-sm font-semibold text-green-800">Paiement à la livraison</p>
                  </div>
                  <p className="text-xs text-green-700">
                    Aucun paiement anticipé requis. Payez à la réception de votre commande.
                  </p>
                </div>
                <div
                  className={`p-4 rounded-xl border ${
                    isPending
                      ? "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                      : "bg-gradient-to-r from-blue-50 to-sky-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{isPending ? "⏳" : "🚚"}</span>
                    <p className={`text-sm font-semibold ${isPending ? "text-yellow-800" : "text-blue-800"}`}>
                      {isPending ? "En attente d'approbation" : "Livraison estimée"}
                    </p>
                  </div>
                  <p className={`text-xs ${isPending ? "text-yellow-700" : "text-blue-700"}`}>
                    {isPending
                      ? "Votre commande sera traitée une fois approuvée par notre équipe"
                      : "3-5 jours ouvrables à compter de la confirmation de la commande"}
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📱</span>
                    <p className="text-sm font-semibold text-purple-800">Suivi de commande</p>
                  </div>
                  <p className="text-xs text-purple-700">
                    {isPending
                      ? "Nous vous contacterons dès que votre commande sera approuvée."
                      : "Nous vous contacterons par téléphone pour vous tenir informé."}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={shareOrder}
                className="w-full bg-gradient-to-r from-[#e94491] to-[#f472b6] hover:from-[#d63384] hover:to-[#e94491] text-white py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Partager la commande
              </Button>

              <Button asChild className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-xl">
                <Link href="/shop" className="flex items-center justify-center gap-2">
                  Continuer vos achats
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-[#e94491] text-[#e94491] hover:bg-[#e94491] hover:text-white py-3 rounded-xl bg-transparent"
              >
                <Link href="/orders" className="flex items-center justify-center gap-2">
                  <Package className="w-4 h-4" />
                  Voir toutes les commandes
                </Link>
              </Button>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">💬 Besoin d'aide ?</h4>
              <p className="text-sm text-gray-600 mb-4">
                Vous avez des questions sur votre commande ? Nous sommes là pour vous aider !
              </p>
              <div className="space-y-2">
                <Link href="/contact" className="block text-sm text-[#e94491] hover:text-[#d63384] font-medium">
                  📧 Contacter le support
                </Link>
                <Link href="/faq" className="block text-sm text-[#e94491] hover:text-[#d63384] font-medium">
                  ❓ Voir la FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
