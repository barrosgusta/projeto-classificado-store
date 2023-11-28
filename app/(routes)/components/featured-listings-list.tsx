import getListings from "@/actions/get-listings";
import ListingList from "@/components/listing/listing-list";
import { getListingBrandName, getListingModelName } from "@/lib/utils";

export default async function FeaturedListingsList({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | string[][] | undefined };
}) {
    const listings = await getListings();

    // Pagination
    const page = searchParams["page"] ?? 1;
    const per_page = searchParams["per_page"] ?? 12; 

    // Filters
    const brand = searchParams["brand"] ?? "";
    const model = searchParams["model"] ?? "";
    const state = searchParams["state"] ?? "";
    const city = searchParams["city"] ?? "";


    const filteredListings = listings.filter((listing) => {
        if (brand) {
            return getListingBrandName(listing).toLowerCase().includes(brand.toString().toLowerCase());
        } else if (model) {
            return getListingModelName(listing).toLowerCase().includes(model.toString().toLowerCase());
        } else if (state) {
            return listing.state.name.toLowerCase().includes(state.toString().toLowerCase());
        } else if (city) {
            return listing.city.name.toLowerCase().includes(city.toString().toLowerCase());
        } else {
            return true;
        }
    });

    const start = (Number(page) - 1) * Number(per_page);
    const end = Number(page) * Number(per_page);

    const currentListings = filteredListings.slice(start,end);

    return (
        <ListingList 
            title="Anúncios em destaque" 
            items={currentListings}
            hasNextPage={end < filteredListings.length}
            hasPreviousPage={start > 0}
        />
    )
}