import { getAds } from "@/actions/get-ads";
import AdList from "@/components/ui/ad-list";
import Container from "@/components/ui/container";

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default async function HomePage() {
    const ads = await getAds();
    
    return (
        <Container>
            <div className="space-y-10 pb-10 pt-5">
                {/* <Billboard data={billboard}/> */}
                <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 h-full">
                    <AdList title="Anúncios em destaque" items={ads}/>
                </div>
            </div>
        </Container>
    )
}