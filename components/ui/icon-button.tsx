import { cn } from "@/lib/utils"
import type { MouseEventHandler, ReactElement } from "react"

type IconButtonProps = {
  icon: ReactElement
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function IconButton({ icon, className, onClick }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl flex items-center justify-center bg-background/80 backdrop-blur-sm border border-border shadow-sm p-2 hover:bg-accent transition-colors",
        className
      )}
    >
      {icon}
    </button>
  )
}
