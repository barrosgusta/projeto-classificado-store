import Footer from '@/components/footer'
import Navbar from '@/components/navbar/navbar'

import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { AnimatePresence } from 'framer-motion'
import MobileNavbar from '@/components/navbar/mobile-navbar'

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Projeto Classificado',
  description: 'Projeto Classificado',
}

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
        >
          <ModalProvider />
          <ToastProvider /> 
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
