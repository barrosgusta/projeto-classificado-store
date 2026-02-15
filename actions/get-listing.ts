"use server"

import axios from "axios"
import type { CarAd } from "@/types"
import { fakeListings } from "@/lib/fake-listings"

const API_URL = process.env.API_URL

export default async function getListing(id: string): Promise<CarAd | null> {
  try {
    // TODO: Remove fake listing lookup after testing
    const fakeListing = fakeListings.find((l) => l.id === id)
    if (fakeListing) return fakeListing

    const { data } = await axios.get<CarAd>(`${API_URL}/anuncios/${id}`)
    return data
  } catch (error) {
    console.error("[GET_LISTING]", error)
    return null
  }
}
