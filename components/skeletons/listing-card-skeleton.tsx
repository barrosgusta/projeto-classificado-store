export default async function ListingCardSkeleton() {
  return (
    <div className="relative group rounded-2xl overflow-hidden bg-card border border-border/50">
      <div className="aspect-[16/10] bg-muted relative animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <div className="h-5 w-48 bg-muted-foreground/10 rounded" />
          <div className="flex gap-2">
            <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
            <div className="h-3 w-16 bg-muted-foreground/10 rounded" />
          </div>
          <div className="h-3 w-24 bg-muted-foreground/10 rounded" />
        </div>
      </div>
    </div>
  )
}
