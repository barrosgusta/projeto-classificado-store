import { z } from "zod"

const searchParamsSchema = z.object({
  page: z.coerce.number().positive().default(1),
  per_page: z.coerce.number().positive().max(50).default(12),
  brand: z.string().optional(),
  model: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
})

export type ListingSearchParams = z.infer<typeof searchParamsSchema>

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): ListingSearchParams {
  const normalized: Record<string, string | undefined> = {}
  for (const [key, value] of Object.entries(params)) {
    normalized[key] = Array.isArray(value) ? value[0] : value
  }
  return searchParamsSchema.parse(normalized)
}
