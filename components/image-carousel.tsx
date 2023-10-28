"use client"

import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Expand } from "lucide-react"
import NextImage from "next/image"
import { MouseEventHandler, useEffect, useState } from "react"
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
    let translateStep = 100;
    let infiniteLoopLimit = 1;

    if (windowWidth > 1024 && data.images.length >= 3) {
        imageWidth /= 3;
        translateStep = 100/3 + 0.5;
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
        <div className={cn("overflow-hidden max-h-[700px] w-full relative", className)}>
            <div 
                className="flex h-full md:min-h-[550px] transition-transform duration-500"
                style={{ transform: `translateX(-${currImage * translateStep}%)` }}
            >
                {data.images.map((image) => (
                    <NextImage
                        key={image.id}
                        // style={{ width: imageWidth }}
                        height={500}
                        quality={100}
                        width={imageWidth}
                        className={`block object-cover`}
                        src={image.url} 
                        alt="image" 
                    />
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
