import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CarAd } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNumbersFromString(value: string): number {
  return parseInt(value.replace(/\D/g, ""))
}

export function getListingModelName(ad: CarAd): string {
  if (ad.model !== undefined && ad.model !== null) {
    return ad.model.name
  } else if (ad.customModel !== undefined && ad.customModel !== null) {
    return ad.customModel
  }
  return ""
}

export function getListingBrandName(ad: CarAd): string {
  if (ad.brand !== undefined && ad.brand !== null) {
    return ad.brand.name
  } else if (ad.customBrand !== undefined && ad.customBrand !== null) {
    return ad.customBrand
  }
  return ""
}

export function getListingYear(ad: CarAd): string {
  if (ad.year !== undefined && ad.year !== null) {
    return ad.year.name
  } else if (ad.customYear !== undefined && ad.customYear !== null) {
    return ad.customYear
  }
  return ""
}
