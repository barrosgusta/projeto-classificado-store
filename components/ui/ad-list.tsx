"use client"

import NoResults from "@/components/ui/no-results";
import AdCard from "./ad-card";
import { useState } from "react";
import { getAdBrandName, getAdModelName } from "@/lib/utils";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent } from "./dropdown-menu";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import Currency from "./currency";

type AdListProps = {
    title: string;
    items: CarAd[];
}

export default function AdList({ title, items }: AdListProps) {
    const [currentFilter, setCurrentFilter] = useState<"model" | "brand" | "year" | "state" | "city" | undefined>(undefined);
    const [filteredAds, setFilteredAds] = useState<CarAd[]>(items);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        
        if (!currentFilter) return;

        const filtered = items.filter((ad) => {
            if (currentFilter === "model") {
                return getAdModelName(ad).toLowerCase().includes(value.toLowerCase());
            } else if (currentFilter === "brand") {
                return getAdBrandName(ad).toLowerCase().includes(value.toLowerCase());
            // } else if (currentFilter === "year") {
                // return ad.year.toString().includes(value);
            } else if (currentFilter === "state") {
                return ad.state.name.toLowerCase().includes(value.toLowerCase());
            } else if (currentFilter === "city") {
                return ad.city.name.toLowerCase().includes(value.toLowerCase());
            }
        });
        
        // const filtered = items.filter((ad) => getAdModelName(ad).toLowerCase().includes(value.toLowerCase()));
        setFilteredAds(filtered);       
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between">
                <h3 className="font-bold text-3xl mb-3 md:mb-0">{title}</h3>
                <div className="flex gap-4">
                    <Select
                        value={currentFilter}
                        onValueChange={(e) => setCurrentFilter(e as any)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue
                                placeholder="Filtro" 
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="model">Modelo</SelectItem>
                            <SelectItem value="brand">Marca</SelectItem>
                            {/* <SelectItem value="year">Ano</SelectItem> */}
                            <SelectItem value="state">Estado</SelectItem>
                            <SelectItem value="city">Cidade</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input type="text" placeholder="Pesquisar" className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-3xl" onChange={handleSearch}/>
                </div>
            </div>
            {filteredAds.length === 0 && <NoResults/>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredAds.map((item) => (
                    <AdCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    )
}