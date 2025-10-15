// app/new-arrivals/page.tsx or components/new-arrivals-wrapper.tsx
import NewArrivals from "@/components/new-arrivals"

export default async function NewArrivalsWrapper() {
  // Pass undefined to use mock data in the component
  return <NewArrivals featuredProducts={undefined as any} wishlistProductIds={undefined as any} />
}