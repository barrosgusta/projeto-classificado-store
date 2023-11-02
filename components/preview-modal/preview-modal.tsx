"use client"

import usePreviewModal from "@/hooks/use-preview-modal"
import { Tab } from "@headlessui/react";
import GalleyTab from "../gallery/gallery-tab";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import IconButton from "@/components/ui/icon-button";
import { ImageIcon, X } from "lucide-react";
import NextImage from "next/image";
// import { Placeholder } from "../ui/placeholder";


export default function PreviewImagesModal() {
    const previewModal = usePreviewModal();
    const ad = usePreviewModal((state) => state.data);

    if (!ad) return null;

    const handleImageClick = (image: Image) => {
        window.open(image.url, "_blank");
    }


    // const PlaceholderImage = () => (
    //     <Placeholder className="object-cover object-center w-full h-full max-h-[calc(100vh-30vh)]"/>
    // )

    return (
        <Transition show={previewModal.isOpen} appear as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={previewModal.onClose}>
                <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50" />

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center">
                        <Transition.Child 
                             
                            enter="ease-out duration-300" 
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel>

                            <Tab.Group as="div" className="flex flex-col items-center w-full h-full" >
                                <Dialog.Panel className="w-fit h-fit xl:max-w-6xl overflow-hidden rounded-lg text-left align-middle p-5 md:p-16">
                                    {/* <div className="w-96 h-96">
                                        teste
                                    </div> */}
                                    <div className="relative flex w-full items-center overflow-hidden">
                                        <Tab.Panels>
                                            {ad.images.map((image) => (
                                                <Tab.Panel key={image.id}>
                                                    <div 
                                                        className="
                                                            group relative
                                                            inset-0 overflow-hidden rounded-2xl border backdrop-blur-3xl bg-black/75
                                                            w-[400px] h-[250px]
                                                            sm:w-[550px] sm:h-[350px]
                                                            md:w-[700px] md:h-[525px]
                                                            lg:w-[912px] lg:h-[684px]                                                            
                                                        "
                                                    >
                                                        
                                                        <NextImage
                                                            fill
                                                            src={image.url}
                                                            alt="Imagem"
                                                            className="object-contain object-center transition duration-300 ease-in-out group-hover:scale-105"
                                                        />
                                                        <IconButton 
                                                            icon={<ImageIcon size={20} />}
                                                            className="opacity-0 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ease-in-out group-hover:opacity-100"
                                                            onClick={() => { handleImageClick(image) } }
                                                        />
                                                    </div>
                                                </Tab.Panel>
                                            ))}
                                        </Tab.Panels>                                                            
                                        <div className="absolute right-4 top-4">
                                            <IconButton icon={<X size={15} />} onClick={previewModal.onClose} />
                                        </div>                                    
                                    </div>
                                </Dialog.Panel>
                                <div className="fixed h-fit bottom-0 overflow-y-auto w-full translate-y-10 md:translate-y-4">
                                    <div className="flex items-center justify-center">
                                        <Dialog.Panel>
                                            <ScrollArea className="w-full max-w-sm md:max-w-3xl rounded-lg border backdrop-blur-xl bg-white/75 dark:bg-black/75 p-0">
                                                <Tab.List className="grid grid-flow-col justify-evenly gap-4 md:gap-8 p-3 md:p-5">
                                                    {ad.images.map((image) => (
                                                        <GalleyTab className="h-[45px] lg:h-[50px]"  key={image.id} image={image} />
                                                    ))}
                                                </Tab.List>
                                                <ScrollBar orientation="horizontal" />
                                            </ScrollArea>
                                        </Dialog.Panel>
                                    </div>
                                </div>
                            </Tab.Group>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}