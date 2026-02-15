"use client"

import Link from "next/link"
import { motion } from "motion/react"

export default function Footer() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="p-10 mt-3 flex flex-col md:flex-row md:justify-end items-center justify-center bg-background/50 backdrop-blur-sm border-t border-border/20 bottom-0 w-full text-xs md:text-sm"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          className="justify-self-end hidden md:block z-10 text-primary/80 hover:text-primary transition-colors font-medium tracking-wide"
          replace
          href="/suporte"
        >
          SUPORTE
        </Link>
      </motion.div>
      <div className="md:absolute right-0 left-0 z-0">
        <p className="text-center text-muted-foreground text-xs">
          &copy; {year} Projeto Classificado. Todos os direitos reservados.
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <Link
          className="md:hidden z-10 text-primary/80 hover:text-primary transition-colors font-medium tracking-wide"
          replace
          href="/suporte"
        >
          SUPORTE
        </Link>
      </motion.div>
    </motion.footer>
  )
}
