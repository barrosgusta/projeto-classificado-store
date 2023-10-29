import Container from "@/components/ui/container";
import Link from "next/link";
import NavbarActions from "./navbar-actions";
import { cn } from "@/lib/utils";

type NavbarProps = {
    className?: string;
}

export default async function Navbar({ className }: NavbarProps) {
    return (
        <nav className={cn(className, "border-b")}>
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">Projeto Classificado</p>
                    </Link>
                    {/* <MainNav data={categories} /> */}
                    <NavbarActions frontEndUrl={process.env.NEXT_PUBLIC_ADMIN_URL!} />
                </div>
            </Container>
        </nav>
    )
}