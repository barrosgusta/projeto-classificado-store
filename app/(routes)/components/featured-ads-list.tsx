import { getAds } from "@/actions/get-ads";
import AdList from "@/components/ui/ad-list";

export async function FeaturedAdsList() {
    const ads = await getAds();

    return (
        <AdList title="Anúncios em destaque" items={ads}/>
    )
}