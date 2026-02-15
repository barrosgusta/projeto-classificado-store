import ListingCardSkeleton from "./listing-card-skeleton"

type AdListSkeletonProps = {
  title: string
}

export default async function ListingListSkeleton({ title }: AdListSkeletonProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h3 className="font-semibold text-2xl tracking-tight text-muted-foreground">{title}</h3>
        <div className="flex gap-2 p-2 w-96 rounded-2xl bg-muted animate-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
        <ListingCardSkeleton />
      </div>
    </div>
  )
}
