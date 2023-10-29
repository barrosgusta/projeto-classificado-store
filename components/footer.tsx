import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-10 mt-3 flex flex-col md:flex-row md:justify-end items-center justify-center bg-white dark:bg-black border-t bottom-0 w-full text-xs md:text-sm">
            <Link className="justify-self-end hidden md:block z-10 text-blue-500 hover:opacity-70" replace passHref href="/suporte">SUPORTE</Link>
            <div className="md:absolute right-0 left-0 z-0">
                <p className="text-center text-black dark:text-white">
                    &copy; 2023 Projeto Classificado. Todos os direitos reservados.
                </p>
            </div>
            <Link 
                className="md:hidden z-10 text-blue-500 hover:opacity-70" 
                replace
                passHref
                href="/suporte" 
            >
                SUPORTE
            </Link>
        </footer>
    )
}