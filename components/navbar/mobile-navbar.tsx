import Container from "@/components/ui/container";
import Link from "next/link";
import NavbarActions from "./navbar-actions";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileNavbarProps = {
    className?: string;
}

export default async function MobileNavbar({ className }: MobileNavbarProps) {
    return (
        <nav className={cn(className,"border-b p-4")}>
            <Container>
                <div className="flex justify-start">
                    <MenuIcon className="w-8 h-8" />
                </div>
            </Container>
        </nav>
    )
}