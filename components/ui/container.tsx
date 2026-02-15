"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      exit={{ opacity: 0, scale: 0.99 }}
      className={cn("mx-auto max-w-7xl", className)}
    >
      {children}
    </motion.div>
  )
}
