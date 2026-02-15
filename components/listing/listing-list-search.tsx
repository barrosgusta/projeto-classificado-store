"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { getBrands, getStates, getCities } from "@/actions/get-filter-options"

interface FilterOption {
  id: number
  name: string
}

export default function ListingListSearch({ title }: { title: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Current filter values from URL
  const brandId = searchParams.get("brand") || ""
  const stateId = searchParams.get("state") || ""
  const cityId = searchParams.get("city") || ""

  // Available options
  const [brands, setBrands] = useState<FilterOption[]>([])
  const [states, setStates] = useState<FilterOption[]>([])
  const [cities, setCities] = useState<FilterOption[]>([])

  // Load brands and states on mount
  useEffect(() => {
    const loadOptions = async () => {
      const [brandsData, statesData] = await Promise.all([
        getBrands(),
        getStates(),
      ])
      setBrands(brandsData)
      setStates(statesData)
    }
    loadOptions()
  }, [])

  // Load cities when state changes
  useEffect(() => {
    if (stateId) {
      const loadCities = async () => {
        const citiesData = await getCities(parseInt(stateId))
        setCities(citiesData)
      }
      loadCities()
    } else {
      setCities([])
    }
  }, [stateId])

  // Build query params from all active filters
  const buildQueryParams = (overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams()

    const brand = overrides.brand ?? brandId
    const state = overrides.state ?? stateId
    const city = overrides.city ?? cityId

    if (brand) params.set("brand", brand)
    if (state) params.set("state", state)
    if (city) params.set("city", city)

    params.set("page", "1") // Reset to first page when filters change

    return `?${params.toString()}`
  }

  const handleBrandChange = (value: string) => {
    router.push(buildQueryParams({ brand: value, state: stateId, city: cityId }))
  }

  const handleStateChange = (value: string) => {
    // Clear city when state changes
    router.push(buildQueryParams({ brand: brandId, state: value, city: "" }))
  }

  const handleCityChange = (value: string) => {
    router.push(buildQueryParams({ brand: brandId, state: stateId, city: value }))
  }

  const handleClearFilters = () => {
    router.push("/")
  }

  const hasActiveFilters = brandId || stateId || cityId

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-semibold text-2xl tracking-tight text-muted-foreground"
        >
          {title}
        </motion.h3>
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="text-xs hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <X size={14} className="mr-1" />
                Limpar Filtros
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {brandId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/15 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm transition-colors"
              >
                <span>
                  Marca: <strong>{brands.find(b => b.id.toString() === brandId)?.name || brandId}</strong>
                </span>
                <button
                  onClick={() =>
                    router.push(buildQueryParams({ brand: "", state: stateId, city: cityId }))
                  }
                  className="hover:opacity-60 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
            {stateId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="inline-flex items-center gap-2 bg-primary/15 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm transition-colors"
              >
                <span>
                  Estado: <strong>{states.find(s => s.id.toString() === stateId)?.name || stateId}</strong>
                </span>
                <button
                  onClick={() =>
                    router.push(buildQueryParams({ brand: brandId, state: "", city: "" }))
                  }
                  className="hover:opacity-60 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
            {cityId && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-primary/15 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm transition-colors"
              >
                <span>
                  Cidade: <strong>{cities.find(c => c.id.toString() === cityId)?.name || cityId}</strong>
                </span>
                <button
                  onClick={() =>
                    router.push(buildQueryParams({ brand: brandId, state: stateId, city: "" }))
                  }
                  className="hover:opacity-60 transition-opacity"
                >
                  <X size={14} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Selects */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-2"
      >
        <Select value={brandId} onValueChange={handleBrandChange}>
          <SelectTrigger className="bg-background border-border/30 focus:ring-primary/30">
            <SelectValue placeholder="Selecionar Marca" />
          </SelectTrigger>
          <SelectContent>
            {brandId && (
              <SelectItem value="">Limpar Marca</SelectItem>
            )}
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id.toString()}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={stateId} onValueChange={handleStateChange}>
          <SelectTrigger className="bg-background border-border/30 focus:ring-primary/30">
            <SelectValue placeholder="Selecionar Estado" />
          </SelectTrigger>
          <SelectContent>
            {stateId && (
              <SelectItem value="">Limpar Estado</SelectItem>
            )}
            {states.map((state) => (
              <SelectItem key={state.id} value={state.id.toString()}>
                {state.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {stateId && (
          <Select value={cityId} onValueChange={handleCityChange}>
            <SelectTrigger className="bg-background border-border/30 focus:ring-primary/30">
              <SelectValue placeholder="Selecionar Cidade" />
            </SelectTrigger>
            <SelectContent>
              {cityId && (
                <SelectItem value="">Limpar Cidade</SelectItem>
              )}
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </motion.div>
    </motion.div>
  )
}
