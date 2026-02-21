"use client"

import Currency from "@/components/ui/currency"
import { getNumbersFromString } from "@/lib/utils"
import Fuelpump from "./icons/fuel"
import Gearshift from "./icons/gearshift"
import { Calendar, Cpu, GaugeCircle, MapPin, User } from "lucide-react"
import Turbo from "./icons/turbo"
import { Button } from "./ui/button"
import { AiOutlineWhatsApp } from "react-icons/ai"
import type { CarAd } from "@/types"
import { motion } from "motion/react"

type InfoProps = {
  data: CarAd
  fipePrice?: string | null
}

const specs = (data: CarAd) => [
  { icon: <GaugeCircle size={20} className="text-primary" />, label: `${data?.kms} km` },
  { icon: <Gearshift size={20} className="fill-primary" />, label: data?.gearboxType.name },
  { icon: <Fuelpump size={20} className="fill-primary" />, label: data?.fuelType.name },
  {
    icon: <Calendar size={20} className="text-primary" />,
    label: data?.year?.name ? getNumbersFromString(data?.year?.name) : data.customYear,
  },
  {
    icon: <MapPin size={20} className="text-primary" />,
    label: `${data?.city?.name} ${data?.state?.acronym}`,
  },
  { icon: <Cpu size={20} className="text-primary" />, label: data?.engineTuning.name },
  { icon: <Turbo size={20} className="fill-primary" />, label: data?.inductionType.name },
  {
    icon: <User size={20} className="text-primary" />,
    label: `${data?.seller.firstName} ${data?.seller.lastName}`,
  },
]

export default function Info({ data, fipePrice }: InfoProps) {
  const handleWhatsApp = () => {
    window.location.href = `https://wa.me/55${data.seller.phone}`
  }

  return (
    <div>
      <motion.h1
        className="mb-3 text-3xl font-bold uppercase"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <strong>{data.brand?.name || data.customBrand}</strong>{" "}
        {data.model?.name || data.customModel}
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
      >
        <div>
          <p className="text-2xl">
            <Currency value={data.price} />
          </p>
          {fipePrice && (
            <p className="text-muted-foreground text-sm">FIPE: {fipePrice}</p>
          )}
        </div>
        <motion.div whileTap={{ scale: 0.96 }} transition={{ duration: 0.1 }} className="w-full sm:w-auto">
          <Button
            className="bg-[#25D366] gap-1 text-black border-none hover:bg-[#25D366]/80 rounded-xl p-5 shadow-sm w-full sm:w-auto"
            variant="secondary"
            onClick={handleWhatsApp}
          >
            <AiOutlineWhatsApp size={20} />
            <p className="text-xs md:text-sm">Conversar com o vendedor</p>
          </Button>
        </motion.div>
      </motion.div>

      <motion.hr
        className="my-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      />

      <motion.div
        className="flex flex-col items-center gap-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="w-full flex items-center justify-center bg-muted/50 rounded-2xl p-5 border border-border/50 text-center">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
            {specs(data).map((spec, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center justify-center rounded-xl bg-background p-3 border border-border/50"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
              >
                {spec.icon}
                <div className="text-xs md:text-sm mt-1">{spec.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
