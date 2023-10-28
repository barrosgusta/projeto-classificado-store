import NextImage from "next/image"
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

type GalleyTabProps = {
    image: Image;
    className?: string;
}

export default function GalleyTab({ image, className }: GalleyTabProps) {
    return (
        <Tab className={cn("relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white dark:bg-black shadow-xl", className)}>
            {({ selected }) => (
                <div>
                    <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden
                    rounded-md">
                        <NextImage
                            fill
                            src={image.url}
                            alt=""
                            className="object-cover object-center"
                        />
                    </span>
                    <span className={cn("absolute inset-0 rounded-md", selected ? "ring-1 ring-offset-2 ring-black dark:ring-white" : "ring-transparent")} />
                </div>
            )}
        </Tab>
    )
}