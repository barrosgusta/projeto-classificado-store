"use client"

import Image from "next/image"
import { Expand, GaugeCircle, MapPin } from "lucide-react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "motion/react"

import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import { useRouter } from "next/navigation"
import type { MouseEventHandler } from "react"
import usePreviewModal from "@/hooks/use-preview-modal"
import Gearshift from "../icons/gearshift"
import type { CarAd } from "@/types"

type ListingCardProps = {
  data: CarAd
  index?: number
}

export default function ListingCard({ data, index = 0 }: ListingCardProps) {
  const previewModal = usePreviewModal()
  const router = useRouter()

  const mouseX = useMotionValue(-999)
  const mouseY = useMotionValue(-999)
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  const spotlight = useMotionTemplate`radial-gradient(circle 160px at ${springX}px ${springY}px, rgba(255,255,255,0.08), transparent 80%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    mouseX.set(-999)
    mouseY.set(-999)
  }

  const handleClick = () => {
    router.push(`/anuncio/${data.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    previewModal.onOpen(data)
  }

  const isRecentListing = (date: Date): boolean => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const diffInDays = diff / (1000 * 3600 * 24)
    return diffInDays < 3
  }

  const brand = data?.brand?.name || data.customBrand
  const model = data?.model?.name || data.customModel

  return (
    <motion.div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      className="relative group cursor-pointer overflow-visible"
    >
      {/* Ambient back glow — static blurred image behind the card */}
      <div className="absolute -inset-6 rounded-3xl opacity-40 blur-3xl saturate-200 pointer-events-none -z-10">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt=""
          className="object-cover rounded-3xl"
          unoptimized
        />
      </div>

      <div className="relative z-10 rounded-2xl overflow-hidden bg-card border border-border/50 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[16/10] relative">
        <Image
          src={data?.images?.[0]?.url}
          fill
          alt="Image"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Cursor spotlight */}
        <motion.div
          style={{ background: spotlight }}
          className="absolute inset-0 pointer-events-none z-10"
        />

        {isRecentListing(new Date(data?.createdAt)) && (
          <div className="backdrop-blur-md px-3 py-1 rounded-full bg-primary/90 absolute top-3 right-3 uppercase shadow-sm">
            <p className="text-primary-foreground text-[10px] font-semibold tracking-wide">
              Novo
            </p>
          </div>
        )}

        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 left-3">
          <IconButton
            onClick={onPreview}
            icon={
              <Expand
                size={18}
                className="text-foreground/70"
              />
            }
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-white font-bold text-lg leading-tight truncate uppercase">
                {brand} {model}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-white/70 text-xs">
                  <GaugeCircle size={12} />
                  {data?.kms} km
                </span>
                <span className="inline-flex items-center gap-1 text-white/70 text-xs">
                  <Gearshift size={12} className="fill-white/70" />
                  {data?.gearboxType.name}
                </span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <Currency value={data?.price} className="text-white font-bold text-lg" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2 text-white/50 text-xs">
            <MapPin size={11} />
            {data?.city?.name} - {data?.state?.name}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  )
}
