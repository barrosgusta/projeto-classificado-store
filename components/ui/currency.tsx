import { cn } from "@/lib/utils"

type CurrencyProps = {
  value?: string | number
  className?: string
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export default function Currency({ value, className }: CurrencyProps) {
  return <span className={cn("font-semibold", className)}>{formatCurrency(Number(value))}</span>
}
