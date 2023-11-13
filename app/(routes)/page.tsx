import Container from "@/components/ui/container";
import { Suspense } from "react";
import { FeaturedAdsList } from "./components/featured-ads-list";
import AdListSkeleton from "@/components/skeletons/ad-list-skeleton";

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default async function HomePage() {
    return (
        <Container>
            <div className="space-y-10 pb-10 pt-5 min-h-screen">
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <Suspense fallback={<AdListSkeleton title="Anúncios em destaque" />}>
                        <FeaturedAdsList />
                    </Suspense>  
                </div>
            </div>
        </Container>
    )
}