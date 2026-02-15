import { SearchX } from "lucide-react"

export default function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-16 gap-3">
      <SearchX size={40} className="text-muted-foreground/50" />
      <p className="text-muted-foreground text-sm">
        Nenhum resultado encontrado.
      </p>
    </div>
  )
}
