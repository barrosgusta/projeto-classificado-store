import ListingListSkeleton from "@/components/skeletons/listing-list-skeleton";
import Container from "@/components/ui/container";
import { Suspense } from "react";
import FeaturedListingsList from "./components/featured-listings-list";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export default async function HomePage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | string[][] | undefined };
}) {
    return (
        <Container>
            <div className="space-y-10 pb-10 pt-5 min-h-[calc(100svh-4rem)]">
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <Suspense fallback={<ListingListSkeleton title="Anúncios em destaque" />}>
                        <FeaturedListingsList searchParams={searchParams} />
                    </Suspense>  
                </div>
            </div>
        </Container>
    )
}