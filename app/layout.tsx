import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Analogent - Analog-Native Intelligence for the Post-Digital Era",
  description:
    "Reinventing the entire AI stack—from hardware to software and algorithms—for a new era of energy-efficient, real-time intelligence.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Suspense fallback={null}>{children}</Suspense>
        <Footer />
      </body>
    </html>
  )
}
