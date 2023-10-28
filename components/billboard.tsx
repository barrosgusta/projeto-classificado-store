import { Billboard } from "@/types"
import Image from "next/image";

type BillboardProps = {
    data: Billboard;
}

export default function Billboard({ data }: BillboardProps) {
    return (
        <div className="p-4 sm:p-6 rounded-xl overflow-hidden">
            <div 
                className="rounded-xl relative aspect-square md:aspect-[2.4/1]"    
                // style={{ backgroundImage: `url(${data?.imageUrl})`}}
            >
                <Image
                    src={data?.imageUrl}
                    alt={data?.label}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                >

                </Image>
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        {data.label}
                    </div>
                </div>
            </div>
        </div>
    )
}