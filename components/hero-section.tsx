"use client"

import { motion } from "motion/react"
import { Search } from "lucide-react"

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full py-16 sm:py-24 overflow-hidden"
    >
      {/* Gradient background accent */}
      <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center space-y-6">
          {/* Main tagline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary/80">
              Showroom para entusiastas
            </p>
            <h1 className="font-crimson text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Máquinas que merecem ser vistas
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Não é um classificado. É uma exposição curada para quem respira quatro rodas — cada anúncio, uma máquina com história.
            </p>
          </motion.div>

          {/* Search emphasis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="pt-4"
          >
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Search size={16} className="text-primary/60" />
                <span>Explore a coleção abaixo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
