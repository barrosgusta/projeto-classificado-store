import { Cpu, GaugeCircle, MapPin } from "lucide-react";
import Gearshift from "../icons/gearshift";
import { Separator } from "../ui/separator";

export default async function ListingCardSkeleton() {
    return (
        <div className="relative group rounded-xl border overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm"> 
            <div className="aspect-[4/3] min-h-fit min-w-fit rounded-xl bg-zinc-300 dark:bg-zinc-600 relative animate-pulse shadow-sm" />
            <div className="p-4 rounded-b-xl bg-white dark:bg-black mb-8">
                <div className="space-y-1">
                    <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md" />
                    <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md" />
                </div>
                <Separator className="my-2" />
                <div className="flex flex-col space-y-2">
                    <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md"/>
                    <div className="flex items-center gap-1">
                        <GaugeCircle size={15} className="text-zinc-600 dark:text-zinc-400" />
                        <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md w-20" />
                    </div>
                    <div className="flex items-center gap-1">
                        <Gearshift size={15} className="fill-zinc-600 dark:fill-zinc-400" />
                        <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md w-20" />
                    </div>
                    <div className="flex items-center gap-1">
                        <Cpu size={15} className="text-zinc-600 dark:text-zinc-400 " />
                        <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md w-20" />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full pb-2">
                <div className="flex gap-1 items-center justify-center text-xs">
                    <MapPin size={15} />
                    <div className="p-2 bg-zinc-300 dark:bg-zinc-600 animate-pulse rounded-md w-48" />
                </div>
            </div>
        </div>
    )
}