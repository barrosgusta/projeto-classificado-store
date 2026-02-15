import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ className, children, disabled, type = "button", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-auto rounded-xl bg-primary text-primary-foreground border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50 font-semibold hover:opacity-80 transition-opacity",
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
