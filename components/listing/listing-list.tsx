"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import ListingListSearch from "./listing-list-search"
import ListingListCards from "./listing-list-cards"
import { Button } from "../ui/button"
import type { CarAd } from "@/types"

type ListingListProps = {
  title: string
  items: CarAd[]
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export default function ListingList({
  title,
  items,
  hasNextPage,
  hasPreviousPage,
}: ListingListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page") || 1)
  const per_page = Number(searchParams.get("per_page") || 12)
  const brand = searchParams.get("brand") ?? ""
  const state = searchParams.get("state") ?? ""
  const city = searchParams.get("city") ?? ""

  // Build query string preserving all active filters
  const buildQueryString = (newPage: number) => {
    const params = new URLSearchParams()
    params.set("page", newPage.toString())
    params.set("per_page", per_page.toString())
    if (brand) params.set("brand", brand)
    if (state) params.set("state", state)
    if (city) params.set("city", city)
    return `?${params.toString()}`
  }

  const handleNextPageClick = () => {
    router.push(buildQueryString(page + 1))
  }

  const handlePreviousPageClick = () => {
    router.push(buildQueryString(page - 1))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <ListingListSearch title={title} />
      <ListingListCards items={items} />
      {(hasNextPage || hasPreviousPage) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex justify-center items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handlePreviousPageClick}
              disabled={!hasPreviousPage}
              className="hover:bg-primary hover:text-primary-foreground disabled:opacity-30 rounded-lg transition-all"
            >
              Anterior
            </Button>
          </motion.div>
          <motion.span
            key={`page-${page}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-center text-sm text-muted-foreground min-w-16"
          >
            Página {page}
          </motion.span>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              onClick={handleNextPageClick}
              disabled={!hasNextPage}
              className="hover:bg-primary hover:text-primary-foreground disabled:opacity-30 rounded-lg transition-all"
            >
              Próxima
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
