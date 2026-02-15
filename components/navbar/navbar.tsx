"use client"

import Container from "@/components/ui/container"
import Link from "next/link"
import NavbarActions from "./navbar-actions"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type NavbarProps = {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(className, "sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/20 supports-[backdrop-filter]:bg-background/40")}
    >
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-start">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-x-3 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-colors flex-shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 .5-1.3L7 7h10l3.5 3.7a2 2 0 0 1 .5 1.3v3a2 2 0 0 1-2 2Z" />
                  <circle cx="7.5" cy="17" r="1.5" />
                  <circle cx="16.5" cy="17" r="1.5" />
                </svg>
              </div>
              <p className="font-semibold text-sm tracking-tight text-foreground leading-tight">Projeto Classificado</p>
            </Link>
          </motion.div>
          <NavbarActions frontEndUrl={process.env.NEXT_PUBLIC_ADMIN_URL!} />
        </div>
      </Container>
    </motion.nav>
  )
}
