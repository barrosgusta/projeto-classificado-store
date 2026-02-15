import Container from "@/components/ui/container"
import { Mail } from "lucide-react"

export default function SupportPage() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center w-full h-[100svh] gap-4">
        <Mail size={40} className="text-muted-foreground/50" />
        <h1 className="text-3xl font-bold">Suporte</h1>
        <p className="text-center text-muted-foreground max-w-md">
          Entre em contato com o suporte através do e-mail{" "}
          <a
            href="mailto:projetoclassificadobr@gmail.com"
            className="text-blue-500 hover:underline transition-colors"
          >
            projetoclassificadobr@gmail.com
          </a>
        </p>
      </div>
    </Container>
  )
}
