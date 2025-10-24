import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GiftPara - Expertise en Dermo-Cosmétique",
  description:
    "Découvrez GiftPara, votre référence en dermo-cosmétique. Depuis 2005, nous offrons des soins innovants et efficaces pour les peaux sensibles et fragilisées. Contactez-nous au 07 02 07 07 83 ou à Giftpara25@gmail.ma.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
      </body>
    </html>
  )
}


