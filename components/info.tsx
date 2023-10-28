"use client"

import Currency from "@/components/ui/currency";
import { getNumbersFromString } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Fuelpump from "./icons/fuel";
import Gearshift from "./icons/gearshift";
import { Cpu, GaugeCircle, MapPin, TimerIcon, User } from "lucide-react";
import Turbo from "./icons/turbo";
import { Button } from "./ui/button";
import { handleClientScriptLoad } from "next/script";

import { AiOutlineWhatsApp } from "react-icons/ai";
import { useEffect } from "react";
import next from "next";

type InfoProps = {
    data: CarAd;
    fipePrice?: number;
}

export default function Info({ data, fipePrice }: InfoProps) {
    const router = useRouter();

    const handleWhatsApp = () => {
        window.location.href = `https://wa.me/55${getNumbersFromString(data.seller.phone)}`;
    }

    return (
        <div>
            <h1 className="mb-3 text-3xl font-bold uppercase"><strong>{data.brand?.name || data.customBrand}</strong> {data.model?.name || data.customModel}</h1>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-2xl">
                        <Currency value={data.price} />
                    </p>
                    {fipePrice !== -1 && (
                        <p className="opacity-70">
                            FIPE: {fipePrice}    
                        </p>
                    )}
                </div>
                <Button className="bg-[#25D366] gap-1 text-black border border-zinc-500 dark:hover:text-white rounded-3xl p-5 shadow-lg" variant="secondary" onClick={handleWhatsApp}>
                    <AiOutlineWhatsApp size={20} />
                    <p className="text-xs md:text-sm">Conversar com o vendedor</p>
                </Button>
            </div>
            <hr className="my-4" />

            <div className="flex flex-col items-center gap-y-6">
                <div className="w-full flex items-center justify-center bg-white/40 dark:bg-zinc-900 rounded-lg p-5 shadow-sm border border-zinc-300 dark:border-zinc-800 text-center">
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">KM:</h3> */}
                            <GaugeCircle size={20} className="text-zinc-600 dark:text-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.kms} km
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Câmbio:</h3> */}
                            <Gearshift size={20} className="fill-zinc-600 dark:fill-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.gearboxType.name}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Combustível:</h3> */}
                            <Fuelpump size={20} className="fill-zinc-600 dark:fill-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.fuelType.name}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Ano:</h3> */}
                            <TimerIcon size={20} className="text-zinc-600 dark:text-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.year?.name ? getNumbersFromString(data?.year?.name) : data.customYear}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Local:</h3> */}
                            <MapPin size={20} className="text-zinc-600 dark:text-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.city?.name} {data?.state?.acronym}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Preparação:</h3> */}
                            <Cpu size={20} className="text-zinc-600 dark:text-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.engineTuning.name}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Indução:</h3> */}
                            <Turbo size={20} className="fill-zinc-600 dark:fill-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.inductionType.name}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md shadow-inner p-3 border">
                            {/* <h3 className="font-semibold">Vendedor:</h3> */}
                            <User size={20} className="text-zinc-600 dark:text-zinc-400" />
                            <div className="text-xs md:text-sm">
                                {data?.seller.firstName} {data?.seller.lastName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}