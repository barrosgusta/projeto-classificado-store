import { cn } from "@/lib/utils"

type TurboProps = {
  className?: string
  size?: number
}

export default function Turbo({ className, size }: TurboProps) {
  const sizeStyle = size ? size : 25

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={sizeStyle}
      height={sizeStyle}
      viewBox="0 0 75.000000 96.000000"
      preserveAspectRatio="xMidYMid meet"
      className={cn(className)}
    >
      <g
        transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path d="M800 821 c0 -19 -11 -20 -242 -23 l-243 -3 -63 -34 c-70 -38 -101 -70 -140 -145 -22 -43 -26 -64 -26 -136 0 -90 14 -132 72 -207 l24 -33 -31 0 c-30 0 -31 -2 -31 -40 l0 -40 280 0 280 0 0 40 c0 38 -1 40 -31 40 l-31 0 24 33 c56 73 72 117 72 204 l1 83 43 0 c35 0 42 -3 42 -20 0 -17 7 -20 40 -20 l40 0 0 160 0 160 -40 0 c-33 0 -40 -3 -40 -19z m0 -141 l0 -40 -216 0 c-240 0 -264 -5 -309 -65 -50 -65 -45 -143 13 -204 64 -67 157 -68 223 -2 43 43 57 95 42 153 l-10 38 42 0 c36 0 44 -4 49 -22 37 -141 -86 -298 -234 -298 -63 0 -114 23 -165 75 -71 70 -91 145 -63 239 15 51 99 137 148 153 21 6 126 11 258 12 l222 1 0 -40z m-345 -145 c16 -15 25 -36 25 -55 0 -19 -9 -40 -25 -55 -15 -16 -36 -25 -55 -25 -19 0 -40 9 -55 25 -16 15 -25 36 -25 55 0 19 9 40 25 55 15 16 36 25 55 25 19 0 40 -9 55 -25z" />
      </g>
    </svg>
  )
}
