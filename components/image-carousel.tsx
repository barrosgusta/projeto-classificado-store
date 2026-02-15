"use client"

import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Expand } from "lucide-react"
import NextImage from "next/image"
import { useState, useEffect } from "react"
import { motion } from "motion/react"
import type { MouseEventHandler } from "react"
import IconButton from "./ui/icon-button"
import usePreviewModal from "@/hooks/use-preview-modal"
import type { CarAd } from "@/types"

type ImageCarouselProps = {
  data: CarAd
  className?: string
}

export default function ImageCarousel({ data, className }: ImageCarouselProps) {
  const [currImage, setCurrImage] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  const previewModal = usePreviewModal()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    previewModal.onOpen(data)
  }

  let imageWidth = windowWidth
  let translateStep = 100 / data.images.length
  let visibleCount = 1

  if (windowWidth > 1024 && data.images.length >= 3) {
    imageWidth /= 3
    translateStep = 100 / data.images.length
    visibleCount = 3
  }

  const handleNextImage = () => {
    setCurrImage((prev) =>
      prev === data.images.length - visibleCount ? 0 : prev + 1
    )
  }

  const handlePrevImage = () => {
    setCurrImage((prev) =>
      prev === 0 ? data.images.length - visibleCount : prev - 1
    )
  }

  return (
    <div
      className={cn(
        "overflow-hidden w-full relative",
        "min-h-[250px] max-h-[300px]",
        "md:min-h-[450px] md:max-h-[500px]",
        "lg:min-h-[550px] lg:max-h-[600px]",
        "xl:min-h-[650px] xl:max-h-[700px]",
        className
      )}
    >
      <div
        className="inline-flex h-full"
        style={{
          transform: `translateX(-${currImage * translateStep}%)`,
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {data.images.map((image) => (
          <div
            key={image.id}
            className="relative h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px] shrink-0"
            style={{ width: imageWidth }}
          >
            <NextImage
              fill
              className="block object-center object-cover"
              src={image.url}
              alt="image"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        className={cn(
          "group absolute inset-0 flex items-center justify-between h-80 md:h-[32rem]",
          data.images.length === 1 && "hidden"
        )}
      >
        <motion.button
          onClick={handlePrevImage}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center h-10 w-10 ml-4 bg-black/30 backdrop-blur-sm rounded-xl hover:bg-black/50 transition-colors"
        >
          <ArrowLeft size={20} color="white" />
        </motion.button>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton
            onClick={onPreview}
            icon={<Expand size={20} className="text-foreground/70" />}
          />
        </div>

        <motion.button
          onClick={handleNextImage}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center h-10 w-10 mr-4 bg-black/30 backdrop-blur-sm rounded-xl hover:bg-black/50 transition-colors"
        >
          <ArrowRight size={20} color="white" />
        </motion.button>
      </div>
    </div>
  )
}
