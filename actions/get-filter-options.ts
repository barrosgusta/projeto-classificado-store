"use server"

import axios from "axios"

const API_URL = process.env.API_URL

interface FilterOption {
  id: number
  name: string
}

export async function getBrands(): Promise<FilterOption[]> {
  try {
    const { data } = await axios.get<FilterOption[]>(
      `${API_URL}/anuncios/filters/brands`
    )
    return data || []
  } catch (error) {
    console.error("[GET_BRANDS]", error)
    return []
  }
}

export async function getStates(): Promise<FilterOption[]> {
  try {
    const { data } = await axios.get<FilterOption[]>(
      `${API_URL}/anuncios/filters/states`
    )
    return data || []
  } catch (error) {
    console.error("[GET_STATES]", error)
    return []
  }
}

export async function getCities(stateId: number): Promise<FilterOption[]> {
  try {
    const { data } = await axios.get<FilterOption[]>(
      `${API_URL}/anuncios/filters/cities?stateId=${stateId}`
    )
    return data || []
  } catch (error) {
    console.error("[GET_CITIES]", error)
    return []
  }
}
