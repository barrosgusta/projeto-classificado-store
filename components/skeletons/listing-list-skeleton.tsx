import ListingCardSkeleton from "./listing-card-skeleton";

type AdListSkeletonProps = {
    title: string;
}

export default async function ListingListSkeleton({ title }: AdListSkeletonProps) {
    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="font-bold text-3xl mb-3 md:mb-0">{title}</h3>
                <div className="flex gap-4 p-2 w-96 rounded-xl bg-zinc-300 dark:bg-zinc-600 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
                <ListingCardSkeleton />   
            </div>
        </div>
    )
}