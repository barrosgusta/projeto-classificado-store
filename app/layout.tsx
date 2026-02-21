import Footer from "@/components/footer"
import Navbar from "@/components/navbar/navbar"

import "./globals.css"
import type { Metadata } from "next"
import { Geist, Crimson_Text } from "next/font/google"
import ModalProvider from "@/providers/modal-provider"
import { ThemeProvider } from "@/providers/theme-provider"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
})

export const metadata: Metadata = {
  title: "Projeto Classificado",
  description: "Uma exposição online para entusiastas de carros.",
}

export const dynamic = "force-dynamic"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geist.variable} ${crimsonText.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ModalProvider />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
