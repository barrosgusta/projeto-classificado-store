"use client"

import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Expand } from "lucide-react"
import NextImage from "next/image"
import { MouseEventHandler, useState } from "react"
import IconButton from "./ui/icon-button"
import usePreviewModal from "@/hooks/use-preview-modal"

type ImageCarouselProps = {
    data: CarAd,
    className?: string
} 

export default function ImageCarousel({ data, className }: ImageCarouselProps) {
    const [currImage, setCurrImage] = useState(0)
    const [windowWidth, setWindowWidth] = useState(window?.innerWidth)

    const previewModal = usePreviewModal();

    const onPreview:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        
        previewModal.onOpen(data);
    }

    window?.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)
    })

    let imageWidth = windowWidth;
    let translateStep = 100 / data.images.length;
    let infiniteLoopLimit = 1;

    if (windowWidth > 1024 && data.images.length >= 3) {
        imageWidth /= 3;
        translateStep = 100 / data.images.length;
        infiniteLoopLimit = 3;
    }

    const handleNextImage = () => {
        if (currImage === data.images.length - infiniteLoopLimit) {
            setCurrImage(0)
        } else {
            setCurrImage(currImage + 1)
        }
    }

    const handlePrevImage = () => {
        if (currImage === 0) {
            setCurrImage(data.images.length -  infiniteLoopLimit)
        } else {
            setCurrImage(currImage - 1)
        }
    }

    return (
        <div 
            className={cn(`overflow-hidden w-full relative 
                    min-h-[250px] max-h-[300px] 
                    md:min-h[450px] md:max-h-[500px] 
                    lg:min-h[550px] lg:max-h-[600px]
                    xl:min-h[650px] xl:max-h-[700px]`, className)}
        >
            <div 
                className="
                    inline-flex transition-transform duration-500
                    h-full
                "
                style={{ transform: `translateX(-${currImage * translateStep}%)` }}
            >
                {data.images.map((image) => (
                    <div
                        key={image.id}
                        className="
                            relative 
                            h-[300px]
                            md:h-[500px]
                            lg:h-[600px]
                            xl:h-[700px]
                        "
                        style={{ width: imageWidth }}
                    >
                        <NextImage
                            fill
                            // width={imageWidth}
                            // height={300}
                            className="block object-center object-cover"
                            src={image.url} 
                            alt="image" 
                        />
                    </div>
                ))}
            </div>
            <div className={cn("group absolute inset-0 flex items-center justify-between h-80 md:h-[32rem] duration-300", data.images.length === 1 && "hidden")}>
                <button onClick={handlePrevImage} className="group flex items-center justify-start h-full w-24">
                    <ArrowLeft className="ml-4" size={30} color="white" />
                    <div className="opacity-0 group-hover:opacity-30 absolute top-0 duration-300 bg-gradient-to-r from-zinc-700 h-full w-36" />
                </button>
                <div className="opacity-0 group-hover:opacity-100 transition">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-zinc-600 dark:text-zinc-300" />}
                        />
                    </div>
                </div>
                <button onClick={handleNextImage} className="group flex items-center justify-end h-full w-24" >
                    <ArrowRight className="mr-4" size={30} color="white" />
                    <div className="opacity-0 group-hover:opacity-30 absolute top-0 duration-300 bg-gradient-to-l from-zinc-700 h-full w-36" />
                </button>
            </div>
        </div>
    );
};
