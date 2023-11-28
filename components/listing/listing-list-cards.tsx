import NoResults from "../ui/no-results";
import ListingCard from "./listing-card";

export default function ListingListCards({
    items,
}: {
    items: CarAd[];
}) {
    return (
        <>
            {items.length === 0 && <NoResults/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ListingCard key={item.id} data={item} />
                ))}
            </div>
        </>
    )
}