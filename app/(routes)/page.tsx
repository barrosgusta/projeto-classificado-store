import ListingListSkeleton from "@/components/skeletons/listing-list-skeleton"
import Container from "@/components/ui/container"
import { Suspense } from "react"
import FeaturedListingsList from "./components/featured-listings-list"
import HeroSection from "@/components/hero-section"

export const dynamic = "force-dynamic"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams

  return (
    <Container>
      <div className="space-y-0 pb-10 pt-0 min-h-[calc(100svh-4rem)]">
        <HeroSection />
        <div className="flex flex-col gap-y-12 px-4 sm:px-6 lg:px-8 py-12">
          <Suspense
            fallback={
              <ListingListSkeleton title="Showroom" />
            }
          >
            <FeaturedListingsList searchParams={params} />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}
