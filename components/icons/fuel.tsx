import { cn } from "@/lib/utils";

type FuelpumpProps = {
    className?: string;
    size?: number;
};

export default function Fuelpump({ className, size }: FuelpumpProps) {
    const sizeStyle = size ? size : 25;

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={sizeStyle} height={sizeStyle} viewBox="0 0 75.000000 96.000000"
            preserveAspectRatio="xMidYMid meet"
            className={cn(className)}
        >
            <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
            stroke="none">
            <path d="M275 911 c-11 -5 -31 -21 -45 -36 l-25 -27 -3 -363 -3 -364 -31 -3
            c-38 -4 -58 -30 -42 -55 10 -17 36 -18 314 -18 278 0 304 1 314 17 16 26 -4
            52 -43 56 -31 3 -31 4 -31 61 l0 59 65 4 c58 3 69 8 98 36 l32 32 3 173 3 173
            -70 67 c-61 60 -73 67 -91 57 -29 -15 -25 -52 10 -85 24 -23 30 -37 30 -72 0
            -32 5 -46 20 -55 18 -12 20 -24 20 -118 0 -69 -4 -110 -12 -118 -7 -7 -33 -12
            -60 -12 l-47 0 -3 265 -3 265 -33 32 -32 33 -158 2 c-86 1 -166 -1 -177 -6z
            m313 -83 c7 -7 12 -34 12 -60 l0 -48 -160 0 -160 0 0 48 c0 26 5 53 12 60 17
            17 279 17 296 0z m-100 -300 c66 -70 83 -169 35 -216 l-28 -27 -6 55 c-3 30
            -6 47 -7 37 -3 -31 -44 -108 -74 -138 -33 -33 -63 -38 -72 -12 -7 17 -1 24 41
            49 17 10 16 13 -13 37 -58 49 -50 113 21 172 24 19 47 44 50 55 9 27 16 25 53
            -12z"/>
            </g>
        </svg>
    )
}