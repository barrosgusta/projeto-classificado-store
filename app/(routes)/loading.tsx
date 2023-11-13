import { getAds } from "@/actions/get-ads";
import AdListSkeleton from "@/components/skeletons/ad-list-skeleton";
import Container from "@/components/ui/container";

export default async function HomePage() {
    return (
        <Container>
            <div className="space-y-10 pb-10 pt-5 min-h-screen">
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                    <AdListSkeleton title="Anúncios em destaque"/>
                </div>
            </div>
        </Container>
    )
}