import Container from "@/components/ui/container";


export default function SupportPage() {
    return (
        <Container>
            <div className="flex flex-col items-center justify-center w-full h-[100svh]">
                <h1 className="text-3xl font-bold mb-4">Suporte</h1>
                <p className="text-center text-gray-500">
                    Entre em contato com o suporte através do e-mail <a href="mailto:projetoclassificadobr@gmail.com" className="text-blue-500 hover:underline">projetoclassificadobr@gmail.com</a>
                </p>
            </div>
        </Container>
    )
}