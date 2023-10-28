import { cn } from "@/lib/utils";

type GearshiftProps = {
    className?: string;
    size?: number;
};

export default function Gearshift({ className, size }: GearshiftProps) {
    const sizeStyle = size ? size : 25;

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width={sizeStyle} height={sizeStyle} viewBox="0 0 100.000000 100.000000"
            preserveAspectRatio="xMidYMid meet"
            className={cn(className)}
        >
            <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M462 869 c2 -55 7 -74 21 -83 12 -8 22 -8 35 0 13 9 18 28 20 83 l3
            71 -41 0 -41 0 3 -71z"/>
            <path d="M373 873 c-40 -52 -38 -120 6 -230 l33 -83 88 0 88 0 33 83 c44 110
            46 178 6 230 -15 20 -32 37 -38 37 -5 0 -9 -27 -9 -60 0 -51 -4 -65 -25 -85
            -15 -16 -36 -25 -55 -25 -19 0 -40 9 -55 25 -21 20 -25 34 -25 85 0 33 -4 60
            -9 60 -6 0 -23 -17 -38 -37z"/>
            <path d="M440 440 l0 -80 60 0 60 0 0 80 0 80 -60 0 -60 0 0 -80z"/>
            <path d="M374 301 c-30 -19 -64 -57 -64 -73 0 -5 86 -8 190 -8 105 0 190 4
            190 9 0 16 -42 61 -70 76 -45 23 -206 20 -246 -4z"/>
            <path d="M251 156 c-13 -14 -24 -38 -24 -58 l-2 -33 275 0 275 0 -2 33 c0 20
            -11 44 -24 58 l-22 24 -227 0 -227 0 -22 -24z"/>
            </g>
        </svg>
    )
}