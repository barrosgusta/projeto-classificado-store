"use client"

import { ThemeToggle } from "../theme-toggle"
import Button from "../ui/store-button"
import { motion } from "motion/react"

type NavbarActionsProps = {
  frontEndUrl: string
}

export default function NavbarActions({ frontEndUrl }: NavbarActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      className="ml-auto flex items-center gap-x-2 sm:gap-x-4"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          className="bg-primary/90 text-primary-foreground hover:bg-primary text-xs sm:text-sm px-3 sm:px-5 font-medium rounded-lg shadow-sm hover:shadow-md transition-shadow"
          onClick={() => {
            window.location.href = frontEndUrl
          }}
        >
          Anunciar
        </Button>
      </motion.div>
      <ThemeToggle />
    </motion.div>
  )
}
