import Link from "next/link"
import Container from "@/components/ui/container"

export default function AdNotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <h2 className="text-2xl font-bold">Anuncio nao encontrado</h2>
        <p className="text-muted-foreground max-w-md">
          O anuncio que voce esta procurando nao existe ou foi removido.
        </p>
        <Link
          href="/"
          className="mt-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Voltar ao inicio
        </Link>
      </div>
    </Container>
  )
}
