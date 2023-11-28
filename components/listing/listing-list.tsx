"use client"

import { useRouter, useSearchParams } from "next/navigation";
import ListingListSearch from "./listing-list-search";
import ListingListCards from "./listing-list-cards";
import { Button } from "../ui/button";

type ListingListProps = {
    title: string;
    items: CarAd[];
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}

export default function ListingList({ title, items, hasNextPage, hasPreviousPage }: ListingListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const page = searchParams.get("page") ?? 1;
    const per_page = searchParams.get("per_page") ?? 12;
    const model = searchParams.get("model") ?? "";
    const brand = searchParams.get("brand") ?? "";
    const state = searchParams.get("state") ?? "";
    const city = searchParams.get("city") ?? "";

    const currentFilter = model ? "model" : brand ? "brand" : state ? "state" : city ? "city" : undefined;
    const searchText = model || brand || state || city || "";

    const handleNextPageClick = () => {
        router.push(`?page=${Number(page) + 1}&per_page=${per_page}${currentFilter ? `&${currentFilter}=${searchText}` : ""}`);
    };

    const handlePreviousPageClick = () => {
        router.push(`?page=${Number(page) - 1}&per_page=${per_page}${currentFilter ? `&${currentFilter}=${searchText}` : ""}`);
    };
    
    return (
        <div className="space-y-4">
            <ListingListSearch title={title} />
            <ListingListCards items={items} />
            {(hasNextPage || hasPreviousPage) && (
                <div className="flex justify-center items-center gap-4">
                    <Button 
                        variant="outline" 
                        onClick={handlePreviousPageClick}
                        disabled={!hasPreviousPage}
                    >
                        Anterior
                    </Button>
                    <span className="text-center">Página {page}</span>
                    <Button 
                        variant="outline"
                        onClick={handleNextPageClick}
                        disabled={!hasNextPage}
                    >
                        Próxima
                    </Button>
                </div>
            )}
        </div>
    )
}