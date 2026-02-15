"use server"

import axios from "axios"

export async function getFipePrice(
  brandId: number,
  modelId: number,
  yearId: string
): Promise<string | null> {
  try {
    const { data } = await axios.get(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
    )
    return data.Valor ?? null
  } catch {
    return null
  }
}
