"use server"

import axios from "axios"
import type { CarAd } from "@/types"
import { fakeListings } from "@/lib/fake-listings"

const API_URL = process.env.API_URL

interface ListingFilters {
  brand?: string
  state?: string
  city?: string
  page?: number
  per_page?: number
}

export default async function getListings(filters?: ListingFilters): Promise<CarAd[]> {
  try {
    const params = new URLSearchParams()
    if (filters?.brand) params.set("brand", filters.brand)
    if (filters?.state) params.set("state", filters.state)
    if (filters?.city) params.set("city", filters.city)
    if (filters?.page) params.set("page", filters.page.toString())
    if (filters?.per_page) params.set("per_page", filters.per_page.toString())

    const query = params.toString()
    const url = `${API_URL}/anuncios${query ? `?${query}` : ""}`

    const { data } = await axios.get<CarAd[]>(url)
    // TODO: Remove fake listings after testing
    return [...data, ...fakeListings]
  } catch (error) {
    console.error("[GET_LISTINGS]", error)
    return [...fakeListings]
  }
}
