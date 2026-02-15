import NoResults from "../ui/no-results"
import ListingCard from "./listing-card"
import type { CarAd } from "@/types"

export default function ListingListCards({ items }: { items: CarAd[] }) {
  return (
    <>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <ListingCard key={item.id} data={item} index={i} />
        ))}
      </div>
    </>
  )
}
