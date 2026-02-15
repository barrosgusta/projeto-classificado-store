"use client"

import usePreviewModal from "@/hooks/use-preview-modal"
import useImageGestures from "@/hooks/use-image-gestures"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import NextImage from "next/image"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
}

export default function PreviewImagesModal() {
  const { isOpen, onClose, data: ad } = usePreviewModal()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const goNext = useCallback(() => {
    if (!ad) return
    setDirection(1)
    setSelectedIndex((i) => (i + 1) % ad.images.length)
  }, [ad])

  const goPrev = useCallback(() => {
    if (!ad) return
    setDirection(-1)
    setSelectedIndex((i) => (i - 1 + ad.images.length) % ad.images.length)
  }, [ad])

  const gestures = useImageGestures({
    onNext: goNext,
    onPrev: goPrev,
    onClose,
  })

  // Reset state when modal closes/opens
  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(0)
      setDirection(1)
      gestures.reset()
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, goNext, goPrev])

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Reset zoom on image change
  useEffect(() => {
    gestures.resetZoom()
  }, [selectedIndex])

  const hasMultiple = ad ? ad.images.length > 1 : false

  return (
    <AnimatePresence>
      {isOpen && ad && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm transition-opacity"
            style={{ backgroundColor: `rgba(0,0,0,${gestures.backdropOpacity})` }}
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className={cn(
              "absolute top-4 right-4 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200",
              gestures.showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <X size={20} className="text-white" />
          </button>

          {/* Image counter */}
          {hasMultiple && (
            <div className={cn(
              "absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-medium transition-all duration-200",
              gestures.showControls ? "opacity-100" : "opacity-0"
            )}>
              {selectedIndex + 1} / {ad.images.length}
            </div>
          )}

          {/* Zoom percentage */}
          {gestures.scale > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs">
              {Math.round(gestures.scale * 100)}%
            </div>
          )}

          {/* Main image area */}
          <motion.div
            ref={imageContainerRef}
            className="relative w-full h-full max-w-6xl max-h-[75vh] mx-4 my-20 touch-none select-none overflow-hidden"
            style={gestures.containerStyle}
            initial={{ scale: 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onTouchStart={gestures.handlers.onTouchStart}
            onTouchMove={gestures.handlers.onTouchMove}
            onTouchEnd={gestures.handlers.onTouchEnd}
          >
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={selectedIndex}
                className="absolute inset-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 380, damping: 36, mass: 0.8 },
                  opacity: { duration: 0.15 },
                }}
                style={gestures.imageStyle}
              >
                <NextImage
                  fill
                  src={ad.images[selectedIndex]?.url}
                  alt="Imagem"
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation arrows (desktop only) */}
          {hasMultiple && gestures.scale <= 1 && (
            <>
              <motion.button
                onClick={goPrev}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200",
                  gestures.showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <ArrowLeft size={24} className="text-white" />
              </motion.button>
              <motion.button
                onClick={goNext}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className={cn(
                  "absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-200",
                  gestures.showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <ArrowRight size={24} className="text-white" />
              </motion.button>
            </>
          )}

          {/* Thumbnail strip */}
          {hasMultiple && gestures.scale <= 1 && (
            <div className={cn(
              "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 max-w-[90vw] transition-all duration-200",
              gestures.showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            )}>
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 overflow-x-auto">
                {ad.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setDirection(index > selectedIndex ? 1 : -1)
                      setSelectedIndex(index)
                      gestures.resetZoom()
                    }}
                    className={cn(
                      "relative shrink-0 h-14 w-14 md:h-16 md:w-16 rounded-xl overflow-hidden transition-all",
                      selectedIndex === index
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-black/60 scale-105"
                        : "opacity-50 hover:opacity-80"
                    )}
                  >
                    <NextImage
                      fill
                      src={image.url}
                      alt=""
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
