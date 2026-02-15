import getListings from "@/actions/get-listings"
import ListingList from "@/components/listing/listing-list"
import { parseSearchParams } from "@/lib/search-params"

export default async function FeaturedListingsList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { page, per_page, brand, state, city } = parseSearchParams(searchParams)

  // Fetch only the current page from the API with all active filters
  const listings = await getListings({ brand, state, city, page, per_page })

  // Since API returns only the current page, pagination is simpler
  // hasNextPage = we got a full page (might have more)
  // hasPreviousPage = we're not on page 1
  const hasNextPage = listings.length === per_page
  const hasPreviousPage = page > 1

  return (
    <ListingList
      title="Showroom"
      items={listings}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
    />
  )
}
