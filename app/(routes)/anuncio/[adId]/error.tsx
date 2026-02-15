"use client"

import { useEffect } from "react"
import Container from "@/components/ui/container"

export default function AdError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[AD_ERROR]", error)
  }, [error])

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <h2 className="text-2xl font-bold">Erro ao carregar anuncio</h2>
        <p className="text-muted-foreground max-w-md">
          Nao foi possivel carregar este anuncio. Por favor, tente novamente.
        </p>
        <button
          onClick={reset}
          className="mt-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </Container>
  )
}
