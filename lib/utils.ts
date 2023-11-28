import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNumbersFromString(value: string): number {
  return parseInt(value.replace(/\D/g, ""))
}

export function getListingModelName(ad: CarAd): string {
  let modelName = ""

  if (ad.model !== undefined && ad.model !== null) {
    modelName = ad.model!.name
  } else if (ad.customModel !== undefined) {
    modelName = ad.customModel!
  }

  return modelName
}

export function getListingBrandName(ad: CarAd): string {
  let brandName = ""

  if (ad.brand !== undefined && ad.brand !== null) {
    brandName = ad.brand!.name
  } else if (ad.customBrand !== undefined) {
    brandName = ad.customBrand!
  }

  return brandName
}

export function getListingYear(ad: CarAd): string {
  let year = ""

  if (ad.year !== undefined && ad.year !== null) {
    year = ad.year!.name
  } else if (ad.customYear !== undefined) {
    year = ad.customYear!
  }

  return year
}