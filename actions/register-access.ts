"use server"

import axios from "axios"

const API_URL = process.env.API_URL

export async function registerAccess(adId: string): Promise<void> {
  try {
    await axios.put(`${API_URL}/anuncios/${adId}/access`)
  } catch (error) {
    console.error("[REGISTER_ACCESS]", error)
  }
}
