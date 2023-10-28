"use client"

import Image from "next/image";
import { Cpu, Expand, GaugeCircle, MapPin } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import { Separator } from "./separator";
import Gearshift from "../icons/gearshift";

type AdCardProps = {
    data: CarAd;
}

export default function AdCard({ data }: AdCardProps) {
    const previewModal = usePreviewModal();
    const router = useRouter();

    const handleClick = () => {
         router.push(`/anuncio/${data.id}`);
    }

    const onPreview:MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        
        previewModal.onOpen(data);
    }

    const isRecentListing = (date: Date): boolean => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const diffInDays = diff / (1000 * 3600 * 24);

        return diffInDays < 3;
    }

    const brand = data?.brand?.name || data.customBrand;
    const model = data?.model?.name || data.customModel;

    return (
        <div onClick={handleClick} className="relative group cursor-pointer rounded-xl border overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm duration-300 md:hover:scale-105 md:hover:shadow-xl"> 
            <div className="aspect-[4/3] min-h-fit min-w-fit rounded-xl bg-grey-100 relative">
                <Image
                    src={data?.images?.[0]?.url}
                    fill
                    alt="Image"
                    className="aspect-[4/3] object-cover rounded-xl shadow-md"
                />
                {isRecentListing(new Date(data?.createdAt)) && (
                    <div className="backdrop-blur-sm px-2 py-1 rounded-bl-xl border-l border-b border-red-900 bg-red-500/95 absolute top-0 right-0 uppercase shadow-md">
                        <p className="text-white text-xs font-semibold drop-shadow-md">Recém anunciado</p>
                    </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
                    <div className="flex gap-x-6 justify-center">
                        <IconButton 
                            onClick={onPreview}
                            icon={<Expand size={20} className="text-zinc-600 dark:text-zinc-300" />}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4 rounded-b-xl bg-white dark:bg-black mb-8 shadow-sm">
                <div>
                    <p className="font-semibold truncate uppercase">
                        {model}
                    </p>
                    <p className="text-xs text-gray-500 uppercase">
                        {brand}
                    </p>
                </div>
                <Separator className="my-2" />
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <Currency value={data?.price} />
                    </div>
                    <div className="flex items-center gap-1">
                        <GaugeCircle size={15} className="text-zinc-600 dark:text-zinc-400" />
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {data?.kms} km
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Gearshift size={15} className="fill-zinc-600 dark:fill-zinc-400" />
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {data?.gearboxType.name}
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Cpu size={15} className="text-zinc-600 dark:text-zinc-400 " />
                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                            {data?.engineTuning.name}
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full pb-2">
                <div className="flex gap-1 items-center justify-center text-xs">
                    <MapPin size={15} />
                    {data?.city?.name} - {data?.state?.name}
                </div>
            </div>
        </div>
    )
}