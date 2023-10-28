"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ThemeToggle } from "../theme-toogle"
import Button from "../ui/store-button"

type NavbarActionsProps = {
    frontEndUrl: string;
}

export default function NavbarActions({ frontEndUrl }: NavbarActionsProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const router = useRouter();

    if (!isMounted) return null

    console.log(process.env.FRONTEND_URL)
    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button className="dark:bg-white dark:text-black text-sm" onClick={() => {window.location.href = frontEndUrl}}>Anunciar</Button>
            <ThemeToggle />
        </div>
    )
}