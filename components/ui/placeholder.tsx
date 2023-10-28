import { cn } from "@/lib/utils"

type PlaceholderProps = {
    className?: string
}

export function Placeholder({ className }: PlaceholderProps) {
    return (
        <svg 
            className={cn(className)}
            id="visual" 
            viewBox="0 0 900 600" 
            width="900" 
            height="600" 
            xmlns="http://www.w3.org/2000/svg" 
            version="1.1">
                <defs>
                    <filter 
                        id="blur1" x="-10%" y="-10%" width="120%" height="120%">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                            <feGaussianBlur stdDeviation="161" result="effect1_foregroundBlur"></feGaussianBlur>
                    </filter>
                </defs>
                    <rect width="900" height="600" fill="#100027"></rect>
                    <g filter="url(#blur1)">
                        <circle cx="112" cy="536" fill="#696e6d" r="357"></circle>
                        <circle cx="6" cy="333" fill="#100027" r="357"></circle>
                        <circle cx="390" cy="471" fill="#696e6d" r="357"></circle>
                        <circle cx="879" cy="276" fill="#696e6d" r="357"></circle>
                        <circle cx="644" cy="167" fill="#100027" r="357"></circle>
                        <circle cx="241" cy="42" fill="#696e6d" r="357"></circle>
                    </g>
        </svg>
    )
}