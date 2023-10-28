"use client"

import { useState, useEffect } from "react";

type CurrencyProps = {  
    value?: string | number;
};

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
};
  
export default function Currency({ value }: CurrencyProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;
    
    return (
        <div className="font-semibold">
           {formatCurrency(Number(value))}
        </div>
    )
}