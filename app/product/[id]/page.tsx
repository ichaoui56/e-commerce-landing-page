import ProductDetailPageSimple from "@/components/product-detail-page"
import { notFound } from "next/navigation"
import productsData from "@/data/products.json"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  const product = productsData.products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const productWithDates = {
    ...product,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
  }

  return <ProductDetailPageSimple product={productWithDates} />
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = productsData.products.find((p) => p.id === id)

  if (!product) {
    return {
      title: "Produit non trouvé",
    }
  }

  return {
    title: `${product.name} - Health & Science Line`,
    description: product.description || `Achetez ${product.name} à des prix avantageux`,
    openGraph: {
      title: product.name,
      description: product.description || `Achetez ${product.name} à des prix avantageux`,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  }
}

export async function generateStaticParams() {
  return productsData.products.map((product: any) => ({
    id: product.id,
  }))
}
