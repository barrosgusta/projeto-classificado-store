"use client"

import NextImage from "next/image"
import { Tab } from "@headlessui/react"

import GalleyTab from "./gallery-tab"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

type GalleryProps = {
    images: Image[];
}


export default function Gallery({ images }: GalleryProps) {
    return (
        <Tab.Group as="div" className="flex flex-col-reverse" >
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
            
                <ScrollArea className="rounded-lg shadow-inner border p-0">
                    <Tab.List className="grid grid-flow-col gap-6 m-5 mx-[1.7rem]">
                        {images.map((image) => (
                            <GalleyTab className="h-[76px]"  key={image.id} image={image} />
                        ))}
                    </Tab.List>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
                
            </div>
            <Tab.Panels className="aspect-[16/10] w-full">
                {images.map((image) => (
                    <Tab.Panel key={image.id}>
                        <div className="aspect-[16/10] relative h-full w-full sm:rounded-lg overflow-hidden shadow-md">
                            <NextImage
                                fill
                                src={image.url}
                                alt="Imagem"
                                className="object-cover object-center"
                            />
                        </div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}