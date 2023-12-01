"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export default function ListingListSearch({
    title,
}: {
    title: string;
}) {
    const [currentFilter, setCurrentFilter] = useState<"model" | "brand" | "state" | "city" | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearchClick = () => {
        if (!currentFilter) router.replace("/");

        if (currentFilter === "model") {
            router.push(`?model=${searchText}`);
        } else if (currentFilter === "brand") {
            router.push(`?brand=${searchText}`);
        } else if (currentFilter === "state") {
            router.push(`?state=${searchText}`);
        } else if (currentFilter === "city") {
            router.push(`?city=${searchText}`);
        }    
    };
    return (
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
                            <SelectItem value="state">Estado</SelectItem>
                            <SelectItem value="city">Cidade</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input 
                        type="text" 
                        placeholder="Pesquisar" 
                        className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => {setSearchText(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearchClick();
                            }
                        }}
                    />
                    <Button variant="outline" onClick={handleSearchClick}>
                        <Search size={17}/>
                    </Button>
                </div>
            </div>
    )
}