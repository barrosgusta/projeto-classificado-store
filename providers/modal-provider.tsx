"use client"

import PreviewModal from "@/components/preview-modal/preview-modal";
import { useState, useEffect } from "react";

export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    
    return (
        <>
            <PreviewModal />
        </>
    )
}